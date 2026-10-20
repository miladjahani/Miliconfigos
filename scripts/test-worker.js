// ============================================================================
// MiliconfigOS v4.0 - Comprehensive Automated Test Suite
// Unit, Integration, Protocol, Schema, 5-User Hard Cap, PBKDF2 & Security Tests
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const bundlePath = path.join(projectRoot, 'dist', '_worker.js');

function createMockD1Database() {
  const store = new Map();
  store.set('users', []);
  store.set('system_config', []);
  store.set('endpoints', []);
  store.set('audit_logs', []);
  store.set('traffic_hourly', []);
  store.set('sessions', []);
  store.set('login_attempts', []);

  function getTableRows(table) {
    if (!store.has(table)) store.set(table, []);
    return store.get(table);
  }

  return {
    prepare(sql) {
      const trimmed = sql.trim();
      return {
        _sql: trimmed,
        _binds: [],
        bind(...args) {
          this._binds = args;
          return this;
        },
        async run() {
          const s = this._sql;
          if (s.startsWith('CREATE TABLE') || s.startsWith('ALTER TABLE')) {
            return { success: true };
          }
          if (s.includes('INSERT') && s.includes('users')) {
            const rows = getTableRows('users');
            const [id, username, uuid, subNodeCount, status, enabled, dataLimitGb, usedBytes, lifetimeBytes, requestCount, expireDays, expireAt, startOnFirstUse, firstConnectedAt, ipLimit, nodeScope, preset, allowedProtocols, assignedNodes, note, configJson] = this._binds;
            const existingIdx = rows.findIndex(r => r.id === id);
            const rowObj = {
              id, username, uuid,
              sub_node_count: subNodeCount,
              status: status || 'active',
              enabled: enabled ? 1 : 0,
              data_limit_gb: dataLimitGb || 0,
              used_bytes: usedBytes || 0,
              lifetime_bytes: lifetimeBytes || 0,
              request_count: requestCount || 0,
              expire_days: expireDays || 0,
              expire_at: expireAt || 0,
              start_on_first_use: startOnFirstUse ? 1 : 0,
              first_connected_at: firstConnectedAt || 0,
              ip_limit: ipLimit || 50,
              node_scope: nodeScope || 'all',
              preset: preset || 'iran-fast',
              allowed_protocols: allowedProtocols || 'vless,shadowsocks,trojan',
              assigned_nodes: assignedNodes || '',
              note: note || '',
              config_json: configJson || '{}',
              created_at: Date.now(),
              updated_at: Date.now()
            };
            if (existingIdx >= 0) rows[existingIdx] = rowObj;
            else rows.push(rowObj);
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('INSERT') && s.includes('endpoints')) {
            const rows = getTableRows('endpoints');
            const [id, name, country, region, host, port, protocol, transport, tls, source, status, latency, failureCount, healthScore] = this._binds;
            rows.push({
              id, name, country, region, host, port, protocol, transport, tls, source, status, latency, failure_count: failureCount, health_score: healthScore,
              created_at: Date.now(), updated_at: Date.now()
            });
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('system_config') && (s.includes('INSERT') || s.includes('REPLACE'))) {
            const rows = getTableRows('system_config');
            const [k, v] = this._binds;
            const existing = rows.find(r => r.key === k);
            if (existing) existing.value = v;
            else rows.push({ key: k, value: v, updated_at: Date.now() });
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('INSERT') && s.includes('sessions')) {
            const rows = getTableRows('sessions');
            const [token, expiresAt, createdAt, clientIp] = this._binds;
            rows.push({ token, admin: 1, expires_at: expiresAt, created_at: createdAt, client_ip: clientIp });
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('INSERT') && s.includes('login_attempts')) {
            const rows = getTableRows('login_attempts');
            const [ip, attempts, lockedUntil, lastAttempt] = this._binds;
            const existing = rows.find(r => r.ip === ip);
            if (existing) {
              existing.attempts = attempts;
              existing.locked_until = lockedUntil;
              existing.last_attempt = lastAttempt;
            } else {
              rows.push({ ip, attempts, locked_until: lockedUntil, last_attempt: lastAttempt });
            }
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('INSERT INTO audit_logs')) {
            const rows = getTableRows('audit_logs');
            const [action, detail, ip, createdAt] = this._binds;
            rows.unshift({ id: rows.length + 1, action, detail, ip, created_at: createdAt });
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('DELETE FROM users')) {
            const rows = getTableRows('users');
            const id = this._binds[0];
            store.set('users', rows.filter(r => r.id !== id));
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('DELETE FROM sessions')) {
            const rows = getTableRows('sessions');
            const token = this._binds[0];
            store.set('sessions', rows.filter(r => r.token !== token));
            return { success: true, meta: { changes: 1 } };
          }
          if (s.includes('DELETE FROM login_attempts')) {
            const rows = getTableRows('login_attempts');
            const ip = this._binds[0];
            store.set('login_attempts', rows.filter(r => r.ip !== ip));
            return { success: true, meta: { changes: 1 } };
          }
          return { success: true, meta: { changes: 0 } };
        },
        async first(col) {
          const s = this._sql;
          if (s.includes('COUNT(*)')) {
            if (s.includes('users')) return { cnt: getTableRows('users').length };
            if (s.includes('endpoints')) return { cnt: getTableRows('endpoints').length };
            return { cnt: 0 };
          }
          if (s.includes('system_config WHERE key =')) {
            const k = this._binds[0];
            const rows = getTableRows('system_config');
            const hit = rows.find(r => r.key === k);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          if (s.includes('sessions WHERE token =')) {
            const t = this._binds[0];
            const rows = getTableRows('sessions');
            const hit = rows.find(r => r.token === t);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          if (s.includes('login_attempts WHERE ip =')) {
            const ip = this._binds[0];
            const rows = getTableRows('login_attempts');
            const hit = rows.find(r => r.ip === ip);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          if (s.includes('FROM users WHERE id =') || s.includes('FROM users WHERE uuid =')) {
            const val = this._binds[0];
            const rows = getTableRows('users');
            const hit = rows.find(r => r.id === val || r.uuid === val);
            if (!hit) return null;
            return col ? hit[col] : hit;
          }
          return null;
        },
        async all() {
          const s = this._sql;
          if (s.includes('FROM users')) {
            return { success: true, results: [...getTableRows('users')] };
          }
          if (s.includes('FROM endpoints')) {
            return { success: true, results: [...getTableRows('endpoints')] };
          }
          if (s.includes('FROM audit_logs')) {
            return { success: true, results: [...getTableRows('audit_logs')] };
          }
          if (s.includes('FROM system_config')) {
            return { success: true, results: [...getTableRows('system_config')] };
          }
          return { success: true, results: [] };
        }
      };
    }
  };
}

async function runTests() {
  console.log('🧪 [MiliconfigOS v4.0] شروع تست جامع خودکار باندل مبهم‌شده، دیتابیس D1 و ماژول‌ها...');

  assert.ok(fs.existsSync(bundlePath), 'فایل dist/_worker.js باید وجود داشته باشد');
  const rawBundle = fs.readFileSync(bundlePath, 'utf8');

  const tmpTestFile = path.join(projectRoot, 'dist', '_worker_test_stub.mjs');
  const stubCode = rawBundle
    .replace(/import\s*\{\s*connect\s+as\s+cfConnect\s*\}\s*from\s*['"]cloudflare:sockets['"];?/g, 'const cfConnect = () => ({});')
    .replace(/import\s*\{\s*connect\s*\}\s*from\s*['"]cloudflare:sockets['"];?/g, 'const connect = () => ({});');

  fs.writeFileSync(tmpTestFile, stubCode, 'utf8');

  try {
    const mod = await import(tmpTestFile);
    const worker = mod.default;
    assert.ok(worker && typeof worker.fetch === 'function', 'باندل مبهم‌شده باید دارای متد fetch معتبر باشد');

    const adminUuid = '351c9981-04b6-4103-aa4b-864aa9c91469';

    // تست ۱: استقرار دستی بدون D1 و بدون خطای ۱۱۰۱ (صفحه اول با ترنزیشن استتار Nginx)
    const emptyEnv = { u: adminUuid };
    const rootResp = await worker.fetch(new Request('https://mili.example.com/'), emptyEnv, {});
    assert.strictEqual(rootResp.status, 200, 'صفحه اصلی بدون D1 باید با کد 200 باز شود');
    const rootHtml = await rootResp.text();
    assert.ok(rootHtml.includes('MiliconfigOS') && rootHtml.includes('nginx.com'), 'صفحه ورود باید شامل استتار Nginx و برند MiliconfigOS باشد');
    console.log('  ✓ تست ۱ (استقرار دستی بدون D1، بدون خطای 1101 و درگاه استتار Nginx): موفق');

    // تست ۲: اتصال دیتابیس D1 و ساخت خودکار جداول + لود داشبورد MiliconfigOS 4.0
    const mockD1 = createMockD1Database();
    const d1Env = { u: adminUuid, DB: mockD1 };

    const adminResp = await worker.fetch(new Request(`https://mili.example.com/${adminUuid}`), d1Env, {});
    assert.strictEqual(adminResp.status, 200, 'پنل مدیریت با D1 باید با کد 200 باز شود');
    const adminHtml = await adminResp.text();
    assert.ok(adminHtml.includes('MiliconfigOS') && adminHtml.includes('مدیریت کاربران'), 'پنل مدیریت باید شامل MiliconfigOS و بخش کاربران باشد');
    console.log('  ✓ تست ۲ (پنل مدیریت OS و ساخت خودکار جداول D1): موفق');

    // تست ۳: راه‌اندازی اول رمز عبور مدیر با استاندارد PBKDF2، ورود، و تغییر رمز عبور
    const setupPwdResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'MiladJahaniSecurePass2026!' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(setupPwdResp.status, 200, 'تعیین رمز عبور باید 200 برگرداند');
    const setupData = await setupPwdResp.json();
    assert.strictEqual(setupData.success, true);
    assert.ok(setupData.token && setupData.token.length > 20, 'توکن سشن باید تولید شده باشد');

    // تکرار راه‌اندازی باید مسدود شود
    const repeatSetupResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'AnotherPassword!' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(repeatSetupResp.status, 400, 'تکرار راه‌اندازی اول بعد از تعیین رمز عبور باید مسدود شود');

    // ورود موفق مدیر
    const loginResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'MiladJahaniSecurePass2026!' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(loginResp.status, 200, 'ورود با رمز عبور صحیح باید موفق باشد');

    // ورود با رمز نادرست
    const badLoginResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'WrongPassword!' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(badLoginResp.status, 401, 'ورود با رمز نادرست باید 401 برگرداند');

    // تغییر رمز عبور
    const chgPwdResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: 'MiladJahaniSecurePass2026!',
          newPassword: 'MiladJahaniNewSecret2026!'
        })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(chgPwdResp.status, 200, 'تغییر رمز عبور مدیر باید با موفقیت انجام شود');
    console.log('  ✓ تست ۳ (سیستم رمز عبور امن PBKDF2، راه‌اندازی اول، ورود، سشن و تغییر پسورد): موفق');

    // تست ۴: ایجاد کاربر اول و بررسی ۳ نود هاردکدشده اطلاع‌رسانی و نام‌گذاری 1+miliconfig تا 8+miliconfig
    const createResp = await worker.fetch(
      new Request(`https://mili.example.com/api/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'user-vip-1',
          subNodeCount: 8,
          preset: 'iran-fast',
          ev: 'yes',
          es: 'yes',
          et: 'yes'
        })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(createResp.status, 200, 'ایجاد کاربر در D1 باید 200 برگرداند');
    const createdData = await createResp.json();
    assert.strictEqual(createdData.success, true);
    assert.strictEqual(createdData.user.username, 'user-vip-1');
    assert.strictEqual(createdData.user.subNodeCount, 8);

    const newUserUuid = createdData.user.uuid;
    const subRawResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=raw`),
      d1Env,
      {}
    );
    assert.strictEqual(subRawResp.status, 200);
    const rawLinksText = await subRawResp.text();
    const rawLines = rawLinksText.trim().split('\n').filter(Boolean);

    // ۳ نود اول باید نودهای هاردکدشده اطلاع‌رسانی باشند
    assert.ok(decodeURIComponent(rawLines[0]).includes('میلی رایگان است'), 'نود اول باید اطلاع‌رسانی رایگان بودن باشد');
    assert.ok(decodeURIComponent(rawLines[1]).includes('فروش این کانفیگ ها حرام است'), 'نود دوم باید اطلاع‌رسانی عدم فروش باشد');
    assert.ok(decodeURIComponent(rawLines[2]).includes('به طور شخصی استفاده کنید'), 'نود سوم باید اطلاع‌رسانی استفاده شخصی باشد');

    // ۸ نود بعدی باید نام‌گذاری 1+miliconfig تا 8+miliconfig داشته باشند
    const proxyNodes = rawLines.slice(3);
    assert.strictEqual(proxyNodes.length, 8, `تعداد نودهای پروکسی باید دقیقاً برابر با subNodeCount (8) باشد ولی ${proxyNodes.length} بود`);
    proxyNodes.forEach((line, idx) => {
      const expectedTag = `${idx + 1}+miliconfig`;
      const hashPart = decodeURIComponent(line.split('#')[1] || '');
      assert.strictEqual(hashPart, expectedTag, `نام نود شماره ${idx + 1} باید ${expectedTag} باشد ولی ${hashPart} بود`);
    });
    console.log('  ✓ تست ۴ (۳ نود هاردکدشده اطلاع‌رسانی و نام‌گذاری نودها به فرمت 1+miliconfig تا 8+miliconfig): موفق');

    // تست ۵: تست کلاینت‌های Sing-box (JSON معتبر) و Clash Meta (YAML معتبر) با شادوساکس و VLESS
    const clashResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=clash`),
      d1Env,
      {}
    );
    const clashYaml = await clashResp.text();
    assert.ok(clashYaml.includes('"1+miliconfig"'), 'کانفیگ Clash باید شامل نود 1+miliconfig باشد');

    // تست اختصاصی پروتکل شادوساکس در کلاش
    const clashSsResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=clash&proto=ss`),
      d1Env,
      {}
    );
    const clashSsYaml = await clashSsResp.text();
    assert.ok(clashSsYaml.includes('v2ray-plugin') && clashSsYaml.includes('type: ss'), 'کانفیگ Clash شادوساکس باید شامل v2ray-plugin باشد');

    const sbResp = await worker.fetch(
      new Request(`https://mili.example.com/${newUserUuid}/sub?target=singbox`),
      d1Env,
      {}
    );
    const sbJson = JSON.parse(await sbResp.text());
    assert.ok(sbJson.outbounds.some(o => o.tag === '1+miliconfig'), 'کانفیگ Sing-box باید شامل تگ 1+miliconfig باشد');
    console.log('  ✓ تست ۵ (تبدیل اشتراک Clash و Sing-box با شادوساکس و نودهای اطلاع‌رسانی): موفق');

    // تست ۶: قفل سخت‌گیرانه سقف ۵ کاربر (Hard Limit of 5 Users)
    // ایجاد کاربرهای ۲، ۳، ۴ و ۵
    for (let i = 2; i <= 5; i++) {
      const resp = await worker.fetch(
        new Request(`https://mili.example.com/api/v1/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: `user-vip-${i}` })
        }),
        d1Env,
        {}
      );
      assert.strictEqual(resp.status, 200, `ایجاد کاربر ${i} باید موفق باشد`);
    }

    // تلاش برای ایجاد کاربر ششم (باید حتماً با 400 و پیام LIMIT_REACHED رد شود)
    const user6Resp = await worker.fetch(
      new Request(`https://mili.example.com/api/v1/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'user-vip-overflow' })
      }),
      d1Env,
      {}
    );
    assert.strictEqual(user6Resp.status, 400, 'ایجاد بیش از ۵ کاربر باید با کد 400 رد شود');
    const u6Data = await user6Resp.json();
    assert.strictEqual(u6Data.error, 'LIMIT_REACHED', 'خطا باید LIMIT_REACHED باشد');
    console.log('  ✓ تست ۶ (قفل سخت‌گیرانه سقف ۵ کاربر در D1 و APIهای versioned): موفق');

    // تست ۷: APIهای اسکنر کشوری و لیست کشورهای VIP
    const scannerResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/scanner/countries'),
      d1Env,
      {}
    );
    assert.strictEqual(scannerResp.status, 200);
    const scannerData = await scannerResp.json();
    assert.ok(scannerData.countries.some(c => c.code === 'DE'), 'اسکنر باید شامل لیست کشورهای VIP باشد');
    console.log('  ✓ تست ۷ (اسکنر کشوری و لیست کشورهای VIP): موفق');

    // تست ۸: کاتالوگ ارائه‌دهندگان معتبر DNS (Cloudflare, Google, Quad9, AdGuard)
    const dnsResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/dns/profiles'),
      d1Env,
      {}
    );
    assert.strictEqual(dnsResp.status, 200);
    const dnsData = await dnsResp.json();
    assert.ok(dnsData.profiles.some(p => p.id === 'cloudflare'), 'کاتالوگ DNS باید شامل کلودفلر باشد');
    assert.ok(dnsData.profiles.some(p => p.id === 'google'), 'کاتالوگ DNS باید شامل گوگل باشد');
    console.log('  ✓ تست ۸ (کاتالوگ DNSهای معتبر جهانی و پروتکل‌های DoH/DoT): موفق');

    // تست ۹: کاتالوگ نودهای کشوری
    const nodesResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/nodes'),
      d1Env,
      {}
    );
    assert.strictEqual(nodesResp.status, 200);
    const nodesData = await nodesResp.json();
    assert.ok(nodesData.nodes && nodesData.nodes.length > 0, 'کاتالوگ نودها باید شامل پایانه‌های کشوری باشد');
    console.log('  ✓ تست ۹ (کاتالوگ پایانه‌ها و نودهای چندلوکیشن کشوری): موفق');

    // تست ۱۰: لاگ‌های ممیزی سیستم
    const auditResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/audit'),
      d1Env,
      {}
    );
    assert.strictEqual(auditResp.status, 200);
    const auditData = await auditResp.json();
    assert.ok(auditData.logs && auditData.logs.length > 0, 'لاگ‌های ممیزی سیستم باید ثبت شده باشند');
    console.log('  ✓ تست ۱۰ (لاگ‌های ممیزی امنیتی و ردیابی عملیات سیستم): موفق');

    // تست ۱۱: پایش و آمار سیستم (داشبورد واقعی با ذکر منبع ترافیک)
    const statsResp = await worker.fetch(
      new Request('https://mili.example.com/api/v1/monitoring/stats'),
      d1Env,
      {}
    );
    assert.strictEqual(statsResp.status, 200);
    const statsData = await statsResp.json();
    assert.strictEqual(statsData.metrics.totalUsers, 5, 'تعداد کل کاربران باید ۵ باشد');
    assert.strictEqual(statsData.metrics.availableSlots, 0, 'ظرفیت آزاد باید ۰ باشد');
    assert.ok(statsData.metrics.telemetrySource.includes('Real'), 'منبع ترافیک باید مشخص باشد');
    console.log('  ✓ تست ۱۱ (پایش زنده، متریک‌های واقعی و شفافیت سورس ترافیک): موفق');

    console.log('\n🎉 تمام ۱۱ آزمون خودکار MiliconfigOS v4.0 با موفقیت ۱۰۰٪ پاس شدند!');
  } finally {
    if (fs.existsSync(tmpTestFile)) fs.unlinkSync(tmpTestFile);
  }
}

runTests().catch(err => {
  console.error('❌ تست ناموفق بود:', err);
  process.exit(1);
});
