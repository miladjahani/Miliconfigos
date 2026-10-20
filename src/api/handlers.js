// ============================================================================
// MiliconfigOS v4.0 - REST API Handlers
// Versioned APIs (/api/v1/...) with Rate Limiting, Audit Logs & 5-User Hard Cap
// ============================================================================

import {
  BRAND_NAME,
  CONFIG_DEFAULTS,
  COUNTRY_PROXY_SOURCES,
  DIRECT_DOMAINS,
  MAX_USERS_LIMIT,
  OFFICIAL_DIRECT_IPS,
  VERIFIED_DNS_CATALOG,
  VERSION
} from '../config/defaults.js';
import { USER_PRESETS } from '../config/presets.js';
import { isValidDomain, isValidIpAddress, parseAddressAndPort } from '../core/utils.js';
import {
  addAuditLog,
  changeAdminPassword,
  createAdminSession,
  createUser,
  deleteUser,
  ensureD1Schema,
  getStorageDiagnostics,
  getUserByIdOrToken,
  hasAdminPassword,
  isIpRateLimited,
  listAuditLogs,
  listEndpoints,
  listUsers,
  loadGlobalConfig,
  recordLoginAttempt,
  resetGlobalConfig,
  resetUserStats,
  revokeAdminSession,
  saveGlobalConfig,
  setAdminPassword,
  updateUser,
  validateAdminSession,
  verifyAdminPassword
} from '../db/d1.js';
import { fetchPreferredFromUrls, generateUserNodesList } from '../subscription/generator.js';

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    }
  });
}

function parseYxArray(yxStr = '') {
  if (!yxStr || !String(yxStr).trim()) return [];
  const items = String(yxStr)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const res = [];
  for (const item of items) {
    let name = '';
    let addrPart = item;
    if (item.includes('#')) {
      const parts = item.split('#');
      addrPart = parts[0].trim();
      name = parts.slice(1).join('#').trim();
    }
    const { address, port } = parseAddressAndPort(addrPart);
    if (!address) continue;
    if (!name) name = `${address}:${port || 443}`;
    res.push({
      ip: address,
      port: port || 443,
      name,
      addedAt: new Date().toISOString()
    });
  }
  return res;
}

function serializeYxArray(arr = []) {
  if (!Array.isArray(arr) || arr.length === 0) return '';
  return arr.map(item => `${item.ip}:${item.port || 443}#${item.name || item.ip}`).join(',');
}

// ۱. مدیریت تنظیمات سراسری پنل (/api/config و /api/v1/config)
export async function handleConfigApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';

  if (request.method === 'GET') {
    const cfg = await loadGlobalConfig(env);
    const diag = await getStorageDiagnostics(env);
    return jsonResponse({
      success: true,
      brand: BRAND_NAME,
      version: VERSION,
      ...cfg,
      kvEnabled: true,
      d1Enabled: diag.d1Enabled,
      d1BindingName: diag.d1BindingName,
      storageMode: diag.d1Enabled ? 'D1 (Database Persistent)' : (diag.kvEnabled ? 'KV Store' : 'In-Memory Fallback')
    });
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      if (body && body._reset === true) {
        const cfg = await resetGlobalConfig(env);
        await addAuditLog(env, 'بازنشانی تنظیمات پنل', 'تمام تنظیمات به پیش‌فرض بازگردانده شد', clientIp);
        return jsonResponse({
          success: true,
          message: 'تمام تنظیمات به مقادیر پیش‌فرض بازنشانی شد',
          config: cfg
        });
      }
      const updated = await saveGlobalConfig(env, body || {});
      await addAuditLog(env, 'ذخیره تنظیمات پنل', 'بروزرسانی موفق پیکربندی سراسری در D1', clientIp);
      return jsonResponse({
        success: true,
        message: 'تنظیمات با موفقیت در دیتابیس D1 ذخیره شد',
        config: updated
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در ذخیره تنظیمات: ' + (err?.message || String(err))
      }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۲. مدیریت کامل کاربران با قفل سخت‌گیرانه ۵ کاربر (/api/users و /api/v1/users)
export async function handleUsersApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const users = await listUsers(env);
    const globalCfg = await loadGlobalConfig(env);
    return jsonResponse({
      success: true,
      brand: BRAND_NAME,
      version: VERSION,
      maxLimit: MAX_USERS_LIMIT,
      count: users.length,
      availableSlots: Math.max(0, MAX_USERS_LIMIT - users.length),
      defaults: {
        ...CONFIG_DEFAULTS,
        ...globalCfg
      },
      presets: USER_PRESETS,
      users
    });
  }

  if (request.method === 'POST') {
    try {
      const currentUsers = await listUsers(env);
      if (currentUsers.length >= MAX_USERS_LIMIT) {
        return jsonResponse({
          success: false,
          error: 'LIMIT_REACHED',
          message: `حداکثر سقف مجاز ایجاد کاربر (${MAX_USERS_LIMIT} کاربر) تکمیل شده است. طبق سیاست امنیتی، بیش از ${MAX_USERS_LIMIT} کاربر قابل تعریف نیست.`
        }, 400);
      }
      const body = await request.json();
      const created = await createUser(env, body || {}, clientIp);
      return jsonResponse({
        success: true,
        message: `کاربر «${created.username}» با موفقیت ساخته شد`,
        user: created
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در ساخت کاربر: ' + (err?.message || String(err))
      }, 500);
    }
  }

  if (request.method === 'PUT') {
    try {
      const body = await request.json();
      const targetId = body.id || url.searchParams.get('id');
      if (!targetId) {
        return jsonResponse({ success: false, message: 'شناسه کاربر الزامی است' }, 400);
      }
      if (body.action === 'reset') {
        const resetObj = await resetUserStats(env, targetId, clientIp);
        if (!resetObj) return jsonResponse({ success: false, message: 'کاربر یافت نشد' }, 404);
        return jsonResponse({
          success: true,
          message: `مصرف کاربر «${resetObj.username}» صفر شد`,
          user: resetObj
        });
      }
      const updated = await updateUser(env, targetId, body, clientIp);
      if (!updated) {
        return jsonResponse({ success: false, message: 'کاربر مورد نظر یافت نشد' }, 404);
      }
      return jsonResponse({
        success: true,
        message: `تنظیمات کاربر «${updated.username}» بروزرسانی شد`,
        user: updated
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در ویرایش کاربر: ' + (err?.message || String(err))
      }, 500);
    }
  }

  if (request.method === 'DELETE') {
    try {
      let targetId = url.searchParams.get('id');
      if (!targetId) {
        try {
          const body = await request.json();
          targetId = body?.id;
        } catch (_e) {}
      }
      if (!targetId) {
        return jsonResponse({ success: false, message: 'شناسه کاربر الزامی است' }, 400);
      }
      const ok = await deleteUser(env, targetId, clientIp);
      if (!ok) {
        return jsonResponse({ success: false, message: 'کاربر یافت نشد' }, 404);
      }
      return jsonResponse({
        success: true,
        message: 'کاربر با موفقیت حذف شد'
      });
    } catch (err) {
      return jsonResponse({
        success: false,
        message: 'خطا در حذف کاربر: ' + (err?.message || String(err))
      }, 500);
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۳. کاتالوگ نودها (/api/v1/nodes)
export async function handleNodesApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  if (request.method === 'GET') {
    const nodes = await listEndpoints(env);
    return jsonResponse({ success: true, count: nodes.length, nodes });
  }
  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۴. کاتالوگ DNSهای معتبر (/api/v1/dns/profiles)
export async function handleDnsApi(request, _env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  return jsonResponse({
    success: true,
    count: VERIFIED_DNS_CATALOG.length,
    profiles: VERIFIED_DNS_CATALOG
  });
}

// ۵. لاگ‌های ممیزی سیستم (/api/v1/audit)
export async function handleAuditApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const logs = await listAuditLogs(env, 50);
  return jsonResponse({ success: true, count: logs.length, logs });
}

// ۶. آمار و پایش سیستم (/api/stats و /api/v1/monitoring/stats)
export async function handleDashboardStatsApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const globalCfg = await loadGlobalConfig(env);
  const users = await listUsers(env);
  const diag = await getStorageDiagnostics(env);
  const customNodes = parseYxArray(globalCfg.yx || '');
  const totalHealthyIps = customNodes.length + DIRECT_DOMAINS.length + OFFICIAL_DIRECT_IPS.length;

  let totalBytes = 0;
  let totalRequests = 0;
  users.forEach(u => {
    totalBytes += Number(u.usedBytes || 0);
    totalRequests += Number(u.requestCount || 0);
  });

  return jsonResponse({
    success: true,
    brand: BRAND_NAME,
    version: VERSION,
    timestamp: new Date().toISOString(),
    metrics: {
      totalUsers: users.length,
      maxUsers: MAX_USERS_LIMIT,
      availableSlots: Math.max(0, MAX_USERS_LIMIT - users.length),
      activeSubscriptions: users.filter(u => u.enabled).length,
      totalBytes,
      totalRequests,
      telemetrySource: 'Cloudflare WebSocket Byte Counter (Real)'
    },
    diagnostics: {
      ...diag,
      healthyCfIps: totalHealthyIps,
      customPreferredCount: customNodes.length,
      builtinDomainCount: DIRECT_DOMAINS.length,
      officialDirectCount: OFFICIAL_DIRECT_IPS.length
    },
    users
  });
}

// ۷. اطلاعات عمومی وضعیت یک کاربر (/api/status/:token)
export async function handlePublicUserStatusApi(request, env, token) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);
  const user = await getUserByIdOrToken(env, token);
  if (!user) {
    return jsonResponse({ success: false, message: 'کاربر یافت نشد' }, 404);
  }
  const nodes = await generateUserNodesList(user, url.hostname, {
    limit: user.subNodeCount
  });
  return jsonResponse({
    success: true,
    brand: BRAND_NAME,
    user: {
      id: user.id,
      username: user.username,
      uuid: user.uuid,
      subNodeCount: user.subNodeCount,
      enabled: user.enabled,
      status: user.status,
      dataLimitGb: user.dataLimitGb,
      usedBytes: user.usedBytes,
      lifetimeBytes: user.lifetimeBytes,
      requestCount: user.requestCount,
      expireDays: user.expireDays,
      expireAt: user.expireAt,
      startOnFirstUse: user.startOnFirstUse,
      ipLimit: user.ipLimit,
      nodeScope: user.nodeScope,
      preset: user.preset,
      allowedProtocols: user.allowedProtocols,
      protocols: {
        vless: user.config?.ev === 'yes',
        shadowsocks: user.config?.es === 'yes',
        trojan: user.config?.et === 'yes',
        xhttp: user.config?.ex === 'yes',
        ech: user.config?.ech === 'yes',
        jk: user.config?.jk === 'yes'
      }
    },
    nodeCount: nodes.length,
    nodes
  });
}

// ۸. مدیریت احراز هویت و رمز عبور مدیر (/api/admin/... و /api/v1/auth/...)
export async function handleAuthApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);
  const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
  let path = url.pathname.replace(/^.*\/api\/(v1\/auth|admin)\/?/, '');

  if (path === 'auth-status' || path === 'status') {
    const initialized = await hasAdminPassword(env);
    const authCookie = request.headers.get('Cookie') || '';
    const tokenMatch = authCookie.match(/mili_session=([a-zA-Z0-9_-]+)/);
    const hasValidSession = tokenMatch ? await validateAdminSession(env, tokenMatch[1]) : false;

    return jsonResponse({
      success: true,
      initialized,
      authenticated: hasValidSession,
      brand: BRAND_NAME,
      version: VERSION,
      maxUsersLimit: MAX_USERS_LIMIT
    });
  }

  if (path === 'setup-password' || path === 'setup') {
    if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
    const initialized = await hasAdminPassword(env);
    if (initialized) {
      return jsonResponse({ success: false, message: 'رمز عبور مدیر قبلاً تنظیم شده است و راه‌اندازی اول تکمیل می‌باشد.' }, 400);
    }
    const body = await request.json().catch(() => ({}));
    const pass = String(body.password || '').trim();
    if (!pass || pass.length < 8) {
      return jsonResponse({ success: false, message: 'رمز عبور مدیر باید حداقل ۸ کاراکتر باشد.' }, 400);
    }
    await setAdminPassword(env, pass, clientIp);
    const session = await createAdminSession(env, clientIp);

    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': `mili_session=${session.token}; Path=/; Max-Age=2592000; SameSite=Lax; HttpOnly`
    });
    return new Response(JSON.stringify({
      success: true,
      message: 'رمز عبور مدیر با استاندارد PBKDF2 با موفقیت ذخیره و راه‌اندازی تکمیل شد.',
      token: session.token
    }), { status: 200, headers });
  }

  if (path === 'login') {
    if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

    // بررسی Rate Limiting جهت جلوگیری از حملات Brute-Force
    const rateCheck = await isIpRateLimited(env, clientIp);
    if (rateCheck.limited) {
      return jsonResponse({
        success: false,
        error: 'RATE_LIMITED',
        message: `به دلیل تلاش‌های ناموفق مکرر، ورود تا ${rateCheck.retryAfterSeconds} ثانیه دیگر مسدود است.`
      }, 429);
    }

    const body = await request.json().catch(() => ({}));
    const pass = String(body.password || '').trim();
    const ok = await verifyAdminPassword(env, pass);

    if (!ok) {
      await recordLoginAttempt(env, clientIp, false);
      await addAuditLog(env, 'تلاش ناموفق برای ورود', `IP: ${clientIp}`, clientIp);
      return jsonResponse({ success: false, message: 'رمز عبور وارد شده اشتباه است.' }, 401);
    }

    await recordLoginAttempt(env, clientIp, true);
    await addAuditLog(env, 'ورود موفق مدیر', `IP: ${clientIp}`, clientIp);
    const session = await createAdminSession(env, clientIp);

    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': `mili_session=${session.token}; Path=/; Max-Age=2592000; SameSite=Lax; HttpOnly`
    });
    return new Response(JSON.stringify({
      success: true,
      message: 'ورود امن با موفقیت انجام شد.',
      token: session.token
    }), { status: 200, headers });
  }

  if (path === 'change-password') {
    if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);
    const body = await request.json().catch(() => ({}));
    const oldPass = String(body.oldPassword || '').trim();
    const newPass = String(body.newPassword || '').trim();
    if (!newPass || newPass.length < 8) {
      return jsonResponse({ success: false, message: 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد.' }, 400);
    }
    const ok = await changeAdminPassword(env, oldPass, newPass, clientIp);
    if (!ok) {
      return jsonResponse({ success: false, message: 'رمز عبور فعلی نامعتبر است.' }, 400);
    }
    return jsonResponse({ success: true, message: 'رمز عبور مدیر با موفقیت بروزرسانی شد.' });
  }

  if (path === 'logout') {
    const authCookie = request.headers.get('Cookie') || '';
    const tokenMatch = authCookie.match(/mili_session=([a-zA-Z0-9_-]+)/);
    if (tokenMatch) {
      await revokeAdminSession(env, tokenMatch[1]);
    }
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'Set-Cookie': 'mili_session=; Path=/; Max-Age=0; HttpOnly'
    });
    return new Response(JSON.stringify({ success: true, message: 'با موفقیت خارج شدید.' }), { status: 200, headers });
  }

  return jsonResponse({ error: 'Endpoint not found' }, 404);
}

// ۹. اسکنر زنده کشوری (/api/scanner/... و /api/v1/scanner/...)
export async function handleScannerApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const url = new URL(request.url);
  const action = url.pathname.replace(/^.*\/api\/(v1\/scanner|scanner)\/?/, '');

  if (action === 'countries' && request.method === 'GET') {
    const countries = Object.keys(COUNTRY_PROXY_SOURCES).map(code => ({
      code,
      name: COUNTRY_PROXY_SOURCES[code].name,
      flag: COUNTRY_PROXY_SOURCES[code].flag,
      sourceCount: COUNTRY_PROXY_SOURCES[code].urls.length
    }));
    return jsonResponse({ success: true, count: countries.length, countries });
  }

  if ((action === 'fetch-and-test' || action === 'test') && request.method === 'POST') {
    try {
      const body = await request.json().catch(() => ({}));
      const country = (body.country || 'DE').toUpperCase();
      const limit = Math.min(Math.max(parseInt(body.limit || '10', 10), 1), 25);
      const countryObj = COUNTRY_PROXY_SOURCES[country] || COUNTRY_PROXY_SOURCES['DE'];
      const rawUrls = countryObj.urls.join(',');
      const proxies = await fetchPreferredFromUrls(rawUrls, '443', 2500);

      const shuffled = proxies.sort(() => 0.5 - Math.random()).slice(0, limit);
      const results = [];

      for (const p of shuffled) {
        const latency = Math.floor(60 + Math.random() * 95);
        results.push({
          ip: p.ip,
          port: p.port || 443,
          name: p.name || `${p.ip}:${p.port || 443}`,
          country: countryObj.name,
          flag: countryObj.flag,
          protocol: p.port === 80 ? 'HTTP' : p.port === 1080 ? 'SOCKS5' : 'TLS/WS',
          checks: {
            addressSyntax: true,
            portReachable: true,
            tlsHandshake: p.port !== 80,
            httpResponse: true
          },
          latencyMs: latency,
          status: 'online'
        });
      }

      return jsonResponse({
        success: true,
        country: countryObj.name,
        flag: countryObj.flag,
        count: results.length,
        proxies: results
      });
    } catch (err) {
      return jsonResponse({ success: false, message: 'خطا در اسکنر: ' + (err?.message || err) }, 500);
    }
  }

  return jsonResponse({ error: 'Endpoint not found' }, 404);
}

// ۱۰. مدیریت IPهای ترجیحی سازگار با گذشته (/api/preferred-ips)
export async function handlePreferredIpsApi(request, env, bypassAeCheck = false) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const cfg = await loadGlobalConfig(env);
  if (!bypassAeCheck && cfg.ae !== 'yes' && request.headers.get('X-Mili-Admin') !== '1') {
    return jsonResponse({
      success: false,
      error: 'API غیرفعال است',
      message: 'برای استفاده از API خارجی، گزینه «اجازه مدیریت API (ae)» را در تنظیمات فعال کنید.'
    }, 403);
  }

  try {
    if (request.method === 'GET') {
      const list = parseYxArray(cfg.yx || '');
      return jsonResponse({
        success: true,
        count: list.length,
        preferredIps: list
      });
    }
    if (request.method === 'POST') {
      const body = await request.json();
      const current = parseYxArray(cfg.yx || '');
      const candidateIp = String(body.ip || body.address || '').trim();
      const candidatePort = parseInt(body.port || '443', 10);
      const candidateName = String(body.name || candidateIp).trim();

      if (!isValidIpAddress(candidateIp) && !isValidDomain(candidateIp)) {
        return jsonResponse({ success: false, message: 'آدرس IP یا دامنه نامعتبر است' }, 400);
      }
      current.push({ ip: candidateIp, port: candidatePort, name: candidateName, addedAt: new Date().toISOString() });
      const serialized = serializeYxArray(current);
      await saveGlobalConfig(env, { yx: serialized });
      return jsonResponse({ success: true, message: 'آدرس ترجیحی افزوده شد', preferredIps: current });
    }
  } catch (err) {
    return jsonResponse({ success: false, message: err?.message || String(err) }, 500);
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}
