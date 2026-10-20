// ============================================================================
// MiliconfigOS v4.0 - لایه دیتابیس Cloudflare D1 با Auto-Migration،
// سقف سخت‌گیرانه ۵ کاربر، سیستم نشست‌های امن و رمزنگاری PBKDF2
// ============================================================================

import {
  BRAND_NAME,
  CONFIG_DEFAULTS,
  COUNTRY_PROXY_SOURCES,
  DEFAULT_ADMIN_UUID,
  MAX_USERS_LIMIT,
  OFFICIAL_DIRECT_IPS,
  getEnvConfigSnapshot,
  normalizeEffectiveConfig
} from '../config/defaults.js';
import { buildUserDefaultConfig } from '../config/presets.js';
import {
  derivePasswordHash,
  generateSecureToken,
  generateShortId,
  generateUuidV4,
  isValidUuid,
  verifyPasswordHash
} from '../core/utils.js';

// حافظه کش داخلی هر Isolate جهت کارکرد بدون وقفه و حداکثر سرعت
const memoryStore = {
  initialized: false,
  d1SchemaReady: false,
  bootTime: Date.now(),
  globalConfig: {},
  users: new Map(),
  endpoints: new Map(),
  auditLogs: [],
  trafficHourly: new Map(),
  sessions: new Map(),
  loginAttempts: new Map(),
  lastSyncAt: 0,
  adminPasswordHash: ''
};

export function detectD1Binding(env) {
  if (!env || typeof env !== 'object') return null;
  const priorityNames = ['DB', 'D1', 'db', 'd1', 'MILICONFIG_DB', 'miliconfig_db', 'DATABASE', 'database'];
  for (const name of priorityNames) {
    const candidate = env[name];
    if (candidate && typeof candidate === 'object' && typeof candidate.prepare === 'function') {
      return { db: candidate, bindingName: name };
    }
  }
  for (const [key, val] of Object.entries(env)) {
    if (val && typeof val === 'object' && typeof val.prepare === 'function') {
      return { db: val, bindingName: key };
    }
  }
  return null;
}

export function detectKvBinding(env) {
  if (!env || typeof env !== 'object') return null;
  const priorityNames = ['C', 'c', 'KV', 'kv', 'MILICONFIG_KV'];
  for (const name of priorityNames) {
    const candidate = env[name];
    if (
      candidate &&
      typeof candidate === 'object' &&
      typeof candidate.get === 'function' &&
      typeof candidate.put === 'function' &&
      typeof candidate.prepare !== 'function'
    ) {
      return { kv: candidate, bindingName: name };
    }
  }
  for (const [key, val] of Object.entries(env)) {
    if (
      val &&
      typeof val === 'object' &&
      typeof val.get === 'function' &&
      typeof val.put === 'function' &&
      typeof val.prepare !== 'function'
    ) {
      return { kv: val, bindingName: key };
    }
  }
  return null;
}

function safeBind(stmt, ...params) {
  const sanitized = params.map(p => {
    if (p === undefined) return null;
    if (typeof p === 'number' && !Number.isFinite(p)) return 0;
    if (typeof p === 'boolean') return p ? 1 : 0;
    return p;
  });
  return stmt.bind(...sanitized);
}

export function getAdminUuid(env = {}) {
  const raw = env?.u || env?.U || env?.UUID || env?.uuid || DEFAULT_ADMIN_UUID;
  return String(raw).trim().toLowerCase();
}

// ساخت خودکار و مایگریشن جداول دیتابیس D1 (Auto-Migration)
export async function ensureD1Schema(env = {}, force = false) {
  const detected = detectD1Binding(env);
  if (!detected) {
    ensureMemorySeeded(env);
    return { d1Enabled: false, bindingName: null, migrated: false };
  }
  const { db, bindingName } = detected;
  if (memoryStore.d1SchemaReady && !force) {
    return { d1Enabled: true, bindingName, migrated: true };
  }

  const ddlStatements = [
    `CREATE TABLE IF NOT EXISTS system_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      uuid TEXT NOT NULL UNIQUE,
      sub_node_count INTEGER NOT NULL DEFAULT 50,
      status TEXT NOT NULL DEFAULT 'active',
      enabled INTEGER NOT NULL DEFAULT 1,
      data_limit_gb REAL NOT NULL DEFAULT 0,
      used_bytes INTEGER NOT NULL DEFAULT 0,
      lifetime_bytes INTEGER NOT NULL DEFAULT 0,
      request_count INTEGER NOT NULL DEFAULT 0,
      expire_days INTEGER NOT NULL DEFAULT 0,
      expire_at INTEGER NOT NULL DEFAULT 0,
      start_on_first_use INTEGER NOT NULL DEFAULT 1,
      first_connected_at INTEGER NOT NULL DEFAULT 0,
      ip_limit INTEGER NOT NULL DEFAULT 50,
      node_scope TEXT NOT NULL DEFAULT 'all',
      preset TEXT NOT NULL DEFAULT 'iran-fast',
      allowed_protocols TEXT DEFAULT 'vless,shadowsocks,trojan',
      assigned_nodes TEXT DEFAULT '',
      note TEXT DEFAULT '',
      config_json TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS endpoints (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT 'DE',
      region TEXT DEFAULT '',
      host TEXT NOT NULL,
      port INTEGER NOT NULL DEFAULT 443,
      protocol TEXT NOT NULL DEFAULT 'vless',
      transport TEXT NOT NULL DEFAULT 'ws',
      tls INTEGER NOT NULL DEFAULT 1,
      source TEXT DEFAULT 'catalog',
      status TEXT DEFAULT 'healthy',
      latency INTEGER DEFAULT 0,
      failure_count INTEGER DEFAULT 0,
      health_score INTEGER DEFAULT 100,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      detail TEXT NOT NULL,
      ip TEXT DEFAULT '',
      created_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS traffic_hourly (
      hour_key TEXT PRIMARY KEY,
      bytes INTEGER NOT NULL DEFAULT 0,
      requests INTEGER NOT NULL DEFAULT 0,
      source TEXT DEFAULT 'ws'
    )`,
    `CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      admin INTEGER DEFAULT 1,
      user_id TEXT,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      client_ip TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS login_attempts (
      ip TEXT PRIMARY KEY,
      attempts INTEGER NOT NULL DEFAULT 0,
      locked_until INTEGER NOT NULL DEFAULT 0,
      last_attempt INTEGER NOT NULL
    )`
  ];

  try {
    for (const sql of ddlStatements) {
      await db.prepare(sql).run();
    }
    memoryStore.d1SchemaReady = true;

    // بررسی و اضافه کردن ستون‌های جدید در صورت ارتقا از نسخه ۳ به ۴
    try {
      await db.prepare(`ALTER TABLE users ADD COLUMN allowed_protocols TEXT DEFAULT 'vless,shadowsocks,trojan'`).run();
    } catch (_e) {}
    try {
      await db.prepare(`ALTER TABLE users ADD COLUMN assigned_nodes TEXT DEFAULT ''`).run();
    } catch (_e) {}

    // پر کردن کاتالوگ اولیه‌ی نودها در صورت خالی بودن
    await seedDefaultEndpointsIfEmpty(env);

    return { d1Enabled: true, bindingName, migrated: true };
  } catch (err) {
    ensureMemorySeeded(env);
    return {
      d1Enabled: false,
      bindingName,
      migrated: false,
      error: err?.message || String(err)
    };
  }
}

async function seedDefaultEndpointsIfEmpty(env) {
  const detected = detectD1Binding(env);
  if (!detected) return;
  const { db } = detected;
  try {
    const row = await db.prepare(`SELECT COUNT(*) as cnt FROM endpoints`).first();
    if (Number(row?.cnt || 0) === 0) {
      const now = Date.now();
      const initialNodes = [
        { id: 'node-de-1', name: 'آلمان ۱ (Frankfurt VIP)', country: 'DE', region: 'Frankfurt', host: '104.16.1.1', port: 443, protocol: 'vless', transport: 'ws', latency: 85, score: 98 },
        { id: 'node-de-2', name: 'آلمان ۲ (Berlin High-Speed)', country: 'DE', region: 'Berlin', host: '104.17.1.1', port: 443, protocol: 'shadowsocks', transport: 'ws', latency: 92, score: 95 },
        { id: 'node-nl-1', name: 'هلند ۱ (Amsterdam Fast)', country: 'NL', region: 'Amsterdam', host: '104.18.1.1', port: 443, protocol: 'vless', transport: 'ws', latency: 88, score: 96 },
        { id: 'node-nl-2', name: 'هلند ۲ (Rotterdam Secure)', country: 'NL', region: 'Rotterdam', host: '104.19.1.1', port: 443, protocol: 'trojan', transport: 'ws', latency: 95, score: 94 },
        { id: 'node-us-1', name: 'آمریکا ۱ (New York East)', country: 'US', region: 'New York', host: '172.64.1.1', port: 443, protocol: 'vless', transport: 'ws', latency: 145, score: 90 },
        { id: 'node-gb-1', name: 'انگلستان ۱ (London Low-Ping)', country: 'GB', region: 'London', host: '172.67.1.1', port: 443, protocol: 'vless', transport: 'ws', latency: 99, score: 93 },
        { id: 'node-tr-1', name: 'ترکیه ۱ (Istanbul Direct)', country: 'TR', region: 'Istanbul', host: '162.159.1.1', port: 443, protocol: 'shadowsocks', transport: 'ws', latency: 68, score: 99 },
        { id: 'node-ae-1', name: 'امارات ۱ (Dubai Low-Latency)', country: 'AE', region: 'Dubai', host: '1.1.1.1', port: 443, protocol: 'vless', transport: 'ws', latency: 55, score: 100 }
      ];
      for (const n of initialNodes) {
        await safeBind(
          db.prepare(
            `INSERT INTO endpoints (
              id, name, country, region, host, port, protocol, transport, tls, source, status, latency, failure_count, health_score, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ),
          n.id, n.name, n.country, n.region, n.host, n.port, n.protocol, n.transport, 1, 'verified_catalog', 'healthy', n.latency, 0, n.score, now, now
        ).run();
      }
    }
  } catch (_e) {}
}

function ensureMemorySeeded(env = {}) {
  if (memoryStore.initialized) return;
  memoryStore.initialized = true;
  const adminUuid = getAdminUuid(env);
  const envSnap = getEnvConfigSnapshot(env);
  memoryStore.globalConfig = { ...envSnap };

  if (memoryStore.endpoints.size === 0) {
    const now = Date.now();
    memoryStore.endpoints.set('node-de-1', {
      id: 'node-de-1', name: 'آلمان ۱ (Frankfurt VIP)', country: 'DE', region: 'Frankfurt', host: '104.16.1.1', port: 443, protocol: 'vless', transport: 'ws', tls: true, status: 'healthy', latency: 85, healthScore: 98, createdAt: now, updatedAt: now
    });
    memoryStore.endpoints.set('node-tr-1', {
      id: 'node-tr-1', name: 'ترکیه ۱ (Istanbul Direct)', country: 'TR', region: 'Istanbul', host: '162.159.1.1', port: 443, protocol: 'shadowsocks', transport: 'ws', tls: true, status: 'healthy', latency: 68, healthScore: 99, createdAt: now, updatedAt: now
    });
  }
}

function mapUserRow(row) {
  if (!row) return null;
  let parsedConfig = {};
  try {
    parsedConfig = typeof row.config_json === 'string' ? JSON.parse(row.config_json) : (row.config_json || row.config || {});
  } catch (_e) {
    parsedConfig = {};
  }
  const subNodeCount = Number.isFinite(Number(row.sub_node_count ?? row.subNodeCount))
    ? Number(row.sub_node_count ?? row.subNodeCount)
    : Number(parsedConfig.subNodeCount ?? 50);
  const effectiveConfig = normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...parsedConfig,
    subNodeCount
  });

  return {
    id: String(row.id),
    username: String(row.username || row.id),
    uuid: String(row.uuid || '').toLowerCase(),
    subNodeCount,
    status: String(row.status || 'active'),
    enabled: Boolean(row.enabled === undefined ? true : Number(row.enabled) !== 0),
    dataLimitGb: Number(row.data_limit_gb ?? row.dataLimitGb ?? 0),
    usedBytes: Number(row.used_bytes ?? row.usedBytes ?? 0),
    lifetimeBytes: Number(row.lifetime_bytes ?? row.lifetimeBytes ?? 0),
    requestCount: Number(row.request_count ?? row.requestCount ?? 0),
    expireDays: Number(row.expire_days ?? row.expireDays ?? 0),
    expireAt: Number(row.expire_at ?? row.expireAt ?? 0),
    startOnFirstUse: Boolean(row.start_on_first_use === undefined ? (row.startOnFirstUse ?? true) : Number(row.start_on_first_use) !== 0),
    firstConnectedAt: Number(row.first_connected_at ?? row.firstConnectedAt ?? 0),
    ipLimit: Number(row.ip_limit ?? row.ipLimit ?? 50),
    nodeScope: String(row.node_scope || row.nodeScope || 'all'),
    preset: String(row.preset || 'iran-fast'),
    allowedProtocols: String(row.allowed_protocols || 'vless,shadowsocks,trojan').split(',').map(s => s.trim()).filter(Boolean),
    assignedNodes: String(row.assigned_nodes || '').split(',').map(s => s.trim()).filter(Boolean),
    note: String(row.note || ''),
    config: effectiveConfig,
    createdAt: Number(row.created_at ?? row.createdAt ?? Date.now()),
    updatedAt: Number(row.updated_at ?? row.updatedAt ?? Date.now())
  };
}

// ============================================================================
// مدیریت سیستم رمز عبور مدیر (بدون هیچ رمز پیش‌فرض؛ راه‌اندازی اول؛ PBKDF2)
// ============================================================================
export async function getAdminPasswordHash(env = {}) {
  await ensureD1Schema(env);
  if (memoryStore.adminPasswordHash) return memoryStore.adminPasswordHash;

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const row = await detectedD1.db.prepare(`SELECT value FROM system_config WHERE key = 'admin_password_hash'`).first();
      if (row && row.value) {
        memoryStore.adminPasswordHash = String(row.value).trim();
        return memoryStore.adminPasswordHash;
      }
    } catch (_e) {}
  }

  const detectedKv = detectKvBinding(env);
  if (detectedKv) {
    try {
      const kvVal = await detectedKv.kv.get('admin_password_hash');
      if (kvVal) {
        memoryStore.adminPasswordHash = String(kvVal).trim();
        return memoryStore.adminPasswordHash;
      }
    } catch (_e) {}
  }

  return memoryStore.adminPasswordHash || '';
}

export async function hasAdminPassword(env = {}) {
  const hash = await getAdminPasswordHash(env);
  return Boolean(hash && hash.length > 0);
}

export async function setAdminPassword(env = {}, plainPassword, clientIp = '') {
  const cleanPass = String(plainPassword || '').trim();
  if (cleanPass.length < 8) {
    throw new Error('رمز عبور مدیر باید حداقل ۸ کاراکتر باشد.');
  }

  const hash = await derivePasswordHash(cleanPass);
  memoryStore.adminPasswordHash = hash;

  const now = Date.now();
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO system_config (key, value, updated_at) VALUES ('admin_password_hash', ?, ?)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
        ),
        hash,
        now
      ).run();
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO system_config (key, value, updated_at) VALUES ('setup_completed_at', ?, ?)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
        ),
        String(now),
        now
      ).run();
    } catch (_e) {}
  }

  const detectedKv = detectKvBinding(env);
  if (detectedKv) {
    try {
      await detectedKv.kv.put('admin_password_hash', hash);
      await detectedKv.kv.put('setup_completed_at', String(now));
    } catch (_e) {}
  }

  await addAuditLog(env, 'تعیین رمز عبور مدیر', 'PBKDF2 Admin Password Configured', clientIp);
  return true;
}

export async function verifyAdminPassword(env = {}, candidatePassword) {
  const cleanPass = String(candidatePassword || '').trim();
  if (!cleanPass) return false;
  const hash = await getAdminPasswordHash(env);
  if (!hash) return false;
  return await verifyPasswordHash(cleanPass, hash);
}

export async function changeAdminPassword(env = {}, currentPassword, newPassword, clientIp = '') {
  const isMatch = await verifyAdminPassword(env, currentPassword);
  if (!isMatch) {
    throw new Error('رمز عبور فعلی نادرست است.');
  }
  return await setAdminPassword(env, newPassword, clientIp);
}

// ============================================================================
// مدیریت نشست‌ها و محدودیت تلاش برای ورود (Session Management & Rate Limiting)
// ============================================================================
export async function createAdminSession(env = {}, clientIp = '') {
  const token = generateSecureToken(32);
  const now = Date.now();
  const expiresAt = now + (30 * 24 * 60 * 60 * 1000); // ۳۰ روز اعتبار

  memoryStore.sessions.set(token, { admin: true, clientIp, expiresAt, createdAt: now });

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO sessions (token, admin, user_id, expires_at, created_at, client_ip)
           VALUES (?, 1, NULL, ?, ?, ?)`
        ),
        token, expiresAt, now, clientIp
      ).run();
    } catch (_e) {}
  }

  return { token, expiresAt };
}

export async function validateAdminSession(env = {}, token) {
  if (!token || typeof token !== 'string') return false;
  const clean = token.trim();
  const now = Date.now();

  if (memoryStore.sessions.has(clean)) {
    const s = memoryStore.sessions.get(clean);
    if (s.expiresAt > now) return true;
    memoryStore.sessions.delete(clean);
  }

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const row = await safeBind(
        detectedD1.db.prepare(`SELECT expires_at FROM sessions WHERE token = ? AND admin = 1`),
        clean
      ).first();
      if (row && Number(row.expires_at) > now) {
        memoryStore.sessions.set(clean, { admin: true, expiresAt: Number(row.expires_at) });
        return true;
      }
    } catch (_e) {}
  }

  return false;
}

export async function revokeAdminSession(env = {}, token) {
  if (!token) return;
  const clean = String(token).trim();
  memoryStore.sessions.delete(clean);

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(detectedD1.db.prepare(`DELETE FROM sessions WHERE token = ?`), clean).run();
    } catch (_e) {}
  }
}

export async function recordLoginAttempt(env = {}, ip = '', success = false) {
  const cleanIp = String(ip || 'unknown').trim();
  const now = Date.now();

  if (success) {
    memoryStore.loginAttempts.delete(cleanIp);
    const detectedD1 = detectD1Binding(env);
    if (detectedD1 && memoryStore.d1SchemaReady) {
      try {
        await safeBind(detectedD1.db.prepare(`DELETE FROM login_attempts WHERE ip = ?`), cleanIp).run();
      } catch (_e) {}
    }
    return;
  }

  let attemptObj = memoryStore.loginAttempts.get(cleanIp) || { attempts: 0, lockedUntil: 0 };
  attemptObj.attempts += 1;
  attemptObj.lastAttempt = now;
  if (attemptObj.attempts >= 5) {
    attemptObj.lockedUntil = now + (15 * 60 * 1000); // ۱۵ دقیقه قفل بعد از ۵ تلاش ناموفق
  }
  memoryStore.loginAttempts.set(cleanIp, attemptObj);

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO login_attempts (ip, attempts, locked_until, last_attempt)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(ip) DO UPDATE SET attempts = excluded.attempts, locked_until = excluded.locked_until, last_attempt = excluded.last_attempt`
        ),
        cleanIp, attemptObj.attempts, attemptObj.lockedUntil, now
      ).run();
    } catch (_e) {}
  }
}

export async function isIpRateLimited(env = {}, ip = '') {
  const cleanIp = String(ip || 'unknown').trim();
  const now = Date.now();

  const inMem = memoryStore.loginAttempts.get(cleanIp);
  if (inMem && inMem.lockedUntil > now) {
    return { limited: true, retryAfterSeconds: Math.ceil((inMem.lockedUntil - now) / 1000) };
  }

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const row = await safeBind(
        detectedD1.db.prepare(`SELECT locked_until FROM login_attempts WHERE ip = ?`),
        cleanIp
      ).first();
      if (row && Number(row.locked_until) > now) {
        return { limited: true, retryAfterSeconds: Math.ceil((Number(row.locked_until) - now) / 1000) };
      }
    } catch (_e) {}
  }

  return { limited: false, retryAfterSeconds: 0 };
}

// ============================================================================
// تنظیمات سراسری پنل
// ============================================================================
export async function loadGlobalConfig(env = {}, force = false) {
  await ensureD1Schema(env);
  const envSnap = getEnvConfigSnapshot(env);
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);

  if (!force && memoryStore.lastSyncAt > 0 && Date.now() - memoryStore.lastSyncAt < 15000) {
    return normalizeEffectiveConfig({
      ...CONFIG_DEFAULTS,
      ...envSnap,
      ...memoryStore.globalConfig
    });
  }

  let stored = {};
  if (detectedKv) {
    try {
      const kvRaw = await detectedKv.kv.get('c');
      if (kvRaw) stored = { ...stored, ...JSON.parse(kvRaw) };
    } catch (_e) {}
  }

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await detectedD1.db.prepare(`SELECT key, value FROM system_config`).all();
      const rows = res?.results || [];
      for (const r of rows) {
        if (r && r.key) {
          stored[r.key] = r.value;
        }
      }
    } catch (_e) {}
  }

  memoryStore.globalConfig = { ...memoryStore.globalConfig, ...stored };
  memoryStore.lastSyncAt = Date.now();
  return normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...envSnap,
    ...memoryStore.globalConfig
  });
}

export async function saveGlobalConfig(env = {}, newValues = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);
  const now = Date.now();

  for (const [k, v] of Object.entries(newValues || {})) {
    if (v === '' || v === null || v === undefined) {
      delete memoryStore.globalConfig[k];
    } else {
      memoryStore.globalConfig[k] = String(v);
    }
  }

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      for (const [k, v] of Object.entries(newValues || {})) {
        if (v === '' || v === null || v === undefined) {
          await safeBind(detectedD1.db.prepare(`DELETE FROM system_config WHERE key = ?`), k).run();
        } else {
          await safeBind(
            detectedD1.db.prepare(
              `INSERT INTO system_config (key, value, updated_at) VALUES (?, ?, ?)
               ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
            ),
            k, String(v), now
          ).run();
        }
      }
    } catch (_e) {}
  }

  if (detectedKv) {
    try {
      await detectedKv.kv.put('c', JSON.stringify(memoryStore.globalConfig));
    } catch (_e) {}
  }

  return normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...getEnvConfigSnapshot(env),
    ...memoryStore.globalConfig
  });
}

export async function resetGlobalConfig(env = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);
  memoryStore.globalConfig = {};

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await detectedD1.db.prepare(`DELETE FROM system_config WHERE key NOT IN ('admin_password_hash', 'setup_completed_at')`).run();
    } catch (_e) {}
  }

  if (detectedKv) {
    try {
      await detectedKv.kv.delete('c');
    } catch (_e) {}
  }

  return normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...getEnvConfigSnapshot(env)
  });
}

// ============================================================================
// مدیریت کاربران در دیتابیس D1 (قفل تراکنشی حداکثر ۵ کاربر)
// ============================================================================
export async function listUsers(env = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);

  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await detectedD1.db.prepare(`SELECT * FROM users ORDER BY created_at ASC`).all();
      const users = (res?.results || []).map(mapUserRow).filter(Boolean);
      memoryStore.users.clear();
      for (const u of users) memoryStore.users.set(u.id, u);
      return users;
    } catch (_e) {}
  }

  ensureMemorySeeded(env);
  return Array.from(memoryStore.users.values()).sort((a, b) => a.createdAt - b.createdAt);
}

export async function getUserByIdOrToken(env = {}, token = '') {
  if (!token) return null;
  const clean = String(token).trim();
  const cleanLower = clean.toLowerCase().replace(/^\/+|\/+$/g, '');
  const users = await listUsers(env);
  for (const u of users) {
    if (
      u.id.toLowerCase() === cleanLower ||
      u.uuid.toLowerCase() === cleanLower ||
      u.username.toLowerCase() === cleanLower ||
      (u.config?.d && u.config.d.trim().replace(/^\/+|\/+$/g, '').toLowerCase() === cleanLower)
    ) {
      return u;
    }
  }
  return null;
}

// ایجاد کاربر جدید با قفل سخت‌گیرانه حداکثر ۵ کاربر
export async function createUser(env = {}, payload = {}, clientIp = '') {
  await ensureD1Schema(env);

  // محدودیت قطعی حداکثر ۵ کاربر طبق دستورالعمل پروژه
  const currentUsers = await listUsers(env);
  if (currentUsers.length >= MAX_USERS_LIMIT) {
    throw new Error(`سقف مجاز ایجاد کاربر (حداکثر ${MAX_USERS_LIMIT} کاربر) پر شده است. برای افزودن کاربر جدید، لطفاً یکی از کاربران قبلی را حذف کنید.`);
  }

  const globalCfg = await loadGlobalConfig(env);
  const now = Date.now();

  const presetId = payload.preset || 'iran-fast';
  const rawName = String(payload.username || payload.name || '').trim();
  const id = payload.id && String(payload.id).trim() ? String(payload.id).trim() : generateShortId('mili');
  const username = rawName || id;
  const uuid = isValidUuid(payload.uuid) ? String(payload.uuid).trim().toLowerCase() : generateUuidV4();

  const subNodeCountRaw = parseInt(payload.subNodeCount ?? payload.config?.subNodeCount ?? globalCfg.subNodeCount ?? 50, 10);
  const subNodeCount = Number.isFinite(subNodeCountRaw) && subNodeCountRaw >= 0 ? subNodeCountRaw : 50;

  const allowedProtocols = Array.isArray(payload.allowedProtocols)
    ? payload.allowedProtocols.join(',')
    : (payload.allowedProtocols || 'vless,shadowsocks,trojan');

  const assignedNodes = Array.isArray(payload.assignedNodes)
    ? payload.assignedNodes.join(',')
    : (payload.assignedNodes || '');

  const mergedUserConfig = buildUserDefaultConfig(
    payload.usePanelDefaults !== false ? globalCfg : CONFIG_DEFAULTS,
    presetId,
    {
      ...(payload.config || {}),
      wk: payload.wk ?? payload.config?.wk ?? globalCfg.wk ?? CONFIG_DEFAULTS.wk,
      ev: payload.ev ?? payload.config?.ev ?? globalCfg.ev ?? CONFIG_DEFAULTS.ev,
      et: payload.et ?? payload.config?.et ?? globalCfg.et ?? CONFIG_DEFAULTS.et,
      ex: payload.ex ?? payload.config?.ex ?? globalCfg.ex ?? CONFIG_DEFAULTS.ex,
      es: payload.es ?? payload.config?.es ?? globalCfg.es ?? CONFIG_DEFAULTS.es,
      sspass: payload.sspass ?? payload.config?.sspass ?? globalCfg.sspass ?? '',
      ssmethod: payload.ssmethod ?? payload.config?.ssmethod ?? globalCfg.ssmethod ?? 'chacha20-ietf-poly1305',
      ech: payload.ech ?? payload.config?.ech ?? globalCfg.ech ?? CONFIG_DEFAULTS.ech,
      tp: payload.tp ?? payload.config?.tp ?? globalCfg.tp ?? CONFIG_DEFAULTS.tp,
      customDNS: payload.customDNS ?? payload.config?.customDNS ?? globalCfg.customDNS ?? CONFIG_DEFAULTS.customDNS,
      customECHDomain: payload.customECHDomain ?? payload.config?.customECHDomain ?? globalCfg.customECHDomain ?? CONFIG_DEFAULTS.customECHDomain,
      alpn: payload.alpn ?? payload.config?.alpn ?? globalCfg.alpn ?? CONFIG_DEFAULTS.alpn,
      d: payload.d ?? payload.config?.d ?? '',
      p: payload.p ?? payload.config?.p ?? globalCfg.p ?? CONFIG_DEFAULTS.p,
      yx: payload.yx ?? payload.config?.yx ?? globalCfg.yx ?? CONFIG_DEFAULTS.yx,
      yxURL: payload.yxURL ?? payload.config?.yxURL ?? globalCfg.yxURL ?? CONFIG_DEFAULTS.yxURL,
      s: payload.s ?? payload.config?.s ?? globalCfg.s ?? CONFIG_DEFAULTS.s,
      homepage: payload.homepage ?? payload.config?.homepage ?? globalCfg.homepage ?? CONFIG_DEFAULTS.homepage,
      scu: payload.scu ?? payload.config?.scu ?? globalCfg.scu ?? CONFIG_DEFAULTS.scu,
      ena: payload.ena ?? payload.config?.ena ?? globalCfg.ena ?? CONFIG_DEFAULTS.ena,
      epd: payload.epd ?? payload.config?.epd ?? globalCfg.epd ?? CONFIG_DEFAULTS.epd,
      epi: payload.epi ?? payload.config?.epi ?? globalCfg.epi ?? CONFIG_DEFAULTS.epi,
      egi: payload.egi ?? payload.config?.egi ?? globalCfg.egi ?? CONFIG_DEFAULTS.egi,
      ae: payload.ae ?? payload.config?.ae ?? globalCfg.ae ?? CONFIG_DEFAULTS.ae,
      rm: payload.rm ?? payload.config?.rm ?? globalCfg.rm ?? CONFIG_DEFAULTS.rm,
      qj: payload.qj ?? payload.config?.qj ?? globalCfg.qj ?? CONFIG_DEFAULTS.qj,
      dkby: payload.dkby ?? payload.config?.dkby ?? globalCfg.dkby ?? CONFIG_DEFAULTS.dkby,
      yxby: payload.yxby ?? payload.config?.yxby ?? globalCfg.yxby ?? CONFIG_DEFAULTS.yxby,
      ipv4: payload.ipv4 ?? payload.config?.ipv4 ?? globalCfg.ipv4 ?? CONFIG_DEFAULTS.ipv4,
      ipv6: payload.ipv6 ?? payload.config?.ipv6 ?? globalCfg.ipv6 ?? CONFIG_DEFAULTS.ipv6,
      ispMobile: payload.ispMobile ?? payload.config?.ispMobile ?? globalCfg.ispMobile ?? CONFIG_DEFAULTS.ispMobile,
      ispUnicom: payload.ispUnicom ?? payload.config?.ispUnicom ?? globalCfg.ispUnicom ?? CONFIG_DEFAULTS.ispUnicom,
      ispTelecom: payload.ispTelecom ?? payload.config?.ispTelecom ?? globalCfg.ispTelecom ?? CONFIG_DEFAULTS.ispTelecom,
      jk: payload.jk ?? payload.config?.jk ?? globalCfg.jk ?? CONFIG_DEFAULTS.jk,
      fp: payload.fp ?? payload.config?.fp ?? globalCfg.fp ?? 'chrome',
      patt: payload.patt ?? payload.config?.patt ?? globalCfg.patt ?? '/?ed=2048',
      fragmentPreset: payload.fragmentPreset ?? payload.config?.fragmentPreset ?? globalCfg.fragmentPreset ?? 'mci',
      ipRotation: payload.ipRotation ?? payload.config?.ipRotation ?? globalCfg.ipRotation ?? '15m',
      subNodeCount
    }
  );

  const dataLimitGb = Math.max(0, parseFloat(payload.dataLimitGb ?? 0) || 0);
  const expireDays = Math.max(0, parseInt(payload.expireDays ?? 0, 10) || 0);
  const expireAt = expireDays > 0 ? now + expireDays * 86400000 : (payload.expireAt ? Number(payload.expireAt) : 0);
  const startOnFirstUse = payload.startOnFirstUse !== undefined ? Boolean(payload.startOnFirstUse) : true;
  const ipLimit = Math.max(1, parseInt(payload.ipLimit ?? 50, 10) || 50);
  const nodeScope = payload.nodeScope === 'origin' || payload.nodeScope === 'edge' ? payload.nodeScope : 'all';
  const note = String(payload.note || '').slice(0, 500);

  const newUserRecord = {
    id,
    username,
    uuid,
    subNodeCount,
    status: 'active',
    enabled: payload.enabled !== false,
    dataLimitGb,
    usedBytes: 0,
    lifetimeBytes: 0,
    requestCount: 0,
    expireDays,
    expireAt,
    startOnFirstUse,
    firstConnectedAt: 0,
    ipLimit,
    nodeScope,
    preset: presetId,
    allowedProtocols: allowedProtocols.split(',').filter(Boolean),
    assignedNodes: assignedNodes.split(',').filter(Boolean),
    note,
    config: mergedUserConfig,
    createdAt: now,
    updatedAt: now
  };

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO users (
            id, username, uuid, sub_node_count, status, enabled,
            data_limit_gb, used_bytes, lifetime_bytes, request_count,
            expire_days, expire_at, start_on_first_use, first_connected_at,
            ip_limit, node_scope, preset, allowed_protocols, assigned_nodes, note, config_json, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ),
        id, username, uuid, subNodeCount, 'active', newUserRecord.enabled ? 1 : 0,
        dataLimitGb, 0, 0, 0,
        expireDays, expireAt, startOnFirstUse ? 1 : 0, 0,
        ipLimit, nodeScope, presetId, allowedProtocols, assignedNodes, note,
        JSON.stringify(mergedUserConfig), now, now
      ).run();
    } catch (e) {
      throw new Error('خطا در ذخیره کاربر در D1: ' + e.message);
    }
  }

  memoryStore.users.set(id, newUserRecord);
  await addAuditLog(env, 'ایجاد کاربر جدید', `${username} (${id})`, clientIp);
  return newUserRecord;
}

export async function updateUser(env = {}, targetId, patchData = {}, clientIp = '') {
  await ensureD1Schema(env);
  const users = await listUsers(env);
  const existing = users.find(u => u.id === targetId || u.uuid === targetId);
  if (!existing) return null;

  const now = Date.now();
  const updatedUsername = patchData.username !== undefined ? String(patchData.username).trim() : existing.username;
  const updatedEnabled = patchData.enabled !== undefined ? Boolean(patchData.enabled) : existing.enabled;
  const updatedDataLimit = patchData.dataLimitGb !== undefined ? Math.max(0, parseFloat(patchData.dataLimitGb) || 0) : existing.dataLimitGb;
  const updatedExpireDays = patchData.expireDays !== undefined ? Math.max(0, parseInt(patchData.expireDays, 10) || 0) : existing.expireDays;
  const updatedExpireAt = updatedExpireDays > 0 ? (existing.createdAt + updatedExpireDays * 86400000) : (patchData.expireAt !== undefined ? Number(patchData.expireAt) : existing.expireAt);
  const updatedSubNodeCount = patchData.subNodeCount !== undefined ? Math.max(1, parseInt(patchData.subNodeCount, 10) || 50) : existing.subNodeCount;
  const updatedAllowedProtocols = patchData.allowedProtocols !== undefined
    ? (Array.isArray(patchData.allowedProtocols) ? patchData.allowedProtocols.join(',') : String(patchData.allowedProtocols))
    : existing.allowedProtocols.join(',');

  const mergedConfig = {
    ...existing.config,
    ...(patchData.config || {}),
    subNodeCount: updatedSubNodeCount
  };

  const updatedRecord = {
    ...existing,
    username: updatedUsername,
    enabled: updatedEnabled,
    dataLimitGb: updatedDataLimit,
    expireDays: updatedExpireDays,
    expireAt: updatedExpireAt,
    subNodeCount: updatedSubNodeCount,
    allowedProtocols: updatedAllowedProtocols.split(',').filter(Boolean),
    config: mergedConfig,
    updatedAt: now
  };

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `UPDATE users SET
            username = ?, enabled = ?, data_limit_gb = ?, expire_days = ?,
            expire_at = ?, sub_node_count = ?, allowed_protocols = ?, config_json = ?, updated_at = ?
          WHERE id = ?`
        ),
        updatedUsername, updatedEnabled ? 1 : 0, updatedDataLimit, updatedExpireDays,
        updatedExpireAt, updatedSubNodeCount, updatedAllowedProtocols, JSON.stringify(mergedConfig), now, existing.id
      ).run();
    } catch (_e) {}
  }

  memoryStore.users.set(existing.id, updatedRecord);
  await addAuditLog(env, 'ویرایش کاربر', `${updatedUsername} (${existing.id})`, clientIp);
  return updatedRecord;
}

export async function deleteUser(env = {}, targetId, clientIp = '') {
  await ensureD1Schema(env);
  const users = await listUsers(env);
  const existing = users.find(u => u.id === targetId || u.uuid === targetId);
  if (!existing) return false;

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(detectedD1.db.prepare(`DELETE FROM users WHERE id = ?`), existing.id).run();
    } catch (_e) {}
  }

  memoryStore.users.delete(existing.id);
  await addAuditLog(env, 'حذف کاربر', `${existing.username} (${existing.id})`, clientIp);
  return true;
}

export async function resetUserStats(env = {}, targetId, clientIp = '') {
  await ensureD1Schema(env);
  const users = await listUsers(env);
  const existing = users.find(u => u.id === targetId || u.uuid === targetId);
  if (!existing) return null;

  const now = Date.now();
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(`UPDATE users SET used_bytes = 0, first_connected_at = 0, updated_at = ? WHERE id = ?`),
        now, existing.id
      ).run();
    } catch (_e) {}
  }

  existing.usedBytes = 0;
  existing.firstConnectedAt = 0;
  existing.updatedAt = now;
  memoryStore.users.set(existing.id, existing);
  await addAuditLog(env, 'صفر کردن مصرف کاربر', `${existing.username} (${existing.id})`, clientIp);
  return existing;
}

// ثبت مصرف ترافیک واقعی از سشن‌های WebSocket
export async function recordUserActivity(env = {}, userId, bytesTransferred = 0, requestsCount = 1, source = 'ws') {
  if (!userId) return;
  const bytes = Number(bytesTransferred) || 0;
  const requests = Number(requestsCount) || 0;
  if (bytes <= 0 && requests <= 0) return;

  const now = Date.now();
  const hourKey = new Date(now).toISOString().slice(0, 13);

  // بروزرسانی کش رم
  if (memoryStore.users.has(userId)) {
    const u = memoryStore.users.get(userId);
    u.usedBytes = (Number(u.usedBytes) || 0) + bytes;
    u.lifetimeBytes = (Number(u.lifetimeBytes) || 0) + bytes;
    u.requestCount = (Number(u.requestCount) || 0) + requests;
    u.updatedAt = now;
  }

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(
          `UPDATE users SET
            used_bytes = used_bytes + ?,
            lifetime_bytes = lifetime_bytes + ?,
            request_count = request_count + ?,
            updated_at = ?
          WHERE id = ?`
        ),
        bytes, bytes, requests, now, userId
      ).run();

      await safeBind(
        detectedD1.db.prepare(
          `INSERT INTO traffic_hourly (hour_key, bytes, requests, source)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(hour_key) DO UPDATE SET
            bytes = bytes + excluded.bytes,
            requests = requests + excluded.requests`
        ),
        hourKey, bytes, requests, source
      ).run();
    } catch (_e) {}
  }
}

// لاگ‌های ممیزی و حسابرسی سیستم
export async function addAuditLog(env = {}, action, detail, ip = '') {
  const now = Date.now();
  const entry = {
    id: memoryStore.auditLogs.length + 1,
    action: String(action || ''),
    detail: String(detail || ''),
    ip: String(ip || ''),
    createdAt: now
  };
  memoryStore.auditLogs.unshift(entry);
  if (memoryStore.auditLogs.length > 50) memoryStore.auditLogs.pop();

  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      await safeBind(
        detectedD1.db.prepare(`INSERT INTO audit_logs (action, detail, ip, created_at) VALUES (?, ?, ?, ?)`),
        entry.action, entry.detail, entry.ip, now
      ).run();
    } catch (_e) {}
  }
}

export async function listAuditLogs(env = {}, limit = 30) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await safeBind(
        detectedD1.db.prepare(`SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?`),
        limit
      ).all();
      return res?.results || [];
    } catch (_e) {}
  }
  return memoryStore.auditLogs.slice(0, limit);
}

// مدیریت کاتالوگ نودها (Endpoints Catalog)
export async function listEndpoints(env = {}) {
  await ensureD1Schema(env);
  const detectedD1 = detectD1Binding(env);
  if (detectedD1 && memoryStore.d1SchemaReady) {
    try {
      const res = await detectedD1.db.prepare(`SELECT * FROM endpoints ORDER BY health_score DESC`).all();
      return (res?.results || []).map(r => ({
        id: r.id,
        name: r.name,
        country: r.country,
        region: r.region || '',
        host: r.host,
        port: r.port,
        protocol: r.protocol,
        transport: r.transport,
        tls: Boolean(r.tls),
        status: r.status,
        latency: r.latency,
        healthScore: r.health_score,
        createdAt: r.created_at,
        updatedAt: r.updated_at
      }));
    } catch (_e) {}
  }
  return Array.from(memoryStore.endpoints.values());
}

export async function getStorageDiagnostics(env = {}) {
  const detectedD1 = detectD1Binding(env);
  const detectedKv = detectKvBinding(env);
  return {
    d1Enabled: Boolean(detectedD1),
    d1BindingName: detectedD1?.bindingName || null,
    kvEnabled: Boolean(detectedKv),
    kvBindingName: detectedKv?.bindingName || null,
    activeMode: detectedD1 ? 'D1 (Database Persistent)' : (detectedKv ? 'KV Store' : 'In-Memory Fallback'),
    d1SchemaReady: memoryStore.d1SchemaReady,
    uptimeSeconds: Math.floor((Date.now() - memoryStore.bootTime) / 1000)
  };
}
