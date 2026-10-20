// ============================================================================
// MiliconfigOS v4.0 - درگاه ورود و راه‌اندازی با ترنزیشن سه‌ثانیه‌ای و استتار پس‌زمینه
// Developer: Milad Jahani | Brand: miliconfig
// استتار Nginx با ترنزیشن بلور نرم ۳ ثانیه‌ای، راه‌اندازی اول و ورود امن
// ============================================================================

import {
  BRAND_NAME,
  BRAND_UPPER,
  DEFAULT_HOMEPAGE,
  PROJECT_NAME,
  TELEGRAM_SUPPORT,
  VERSION
} from '../config/defaults.js';
import {
  FAVICON_DATA_URI,
  ICON_KEY_SVG,
  ICON_LOCK_SVG,
  ICON_MOON_SVG,
  ICON_SUN_SVG,
  ICON_SYSTEM_SVG,
  MILICONFIG_LOGO_SVG
} from './icons.js';

export function renderLoginGatewayHtml(options = {}) {
  const initialized = options.initialized !== false;
  const customPath = options.customPath || '';
  const homepageUrl = options.homepage && String(options.homepage).trim() ? options.homepage.trim() : DEFAULT_HOMEPAGE;

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${PROJECT_NAME} ${VERSION} — درگاه سیستم‌عامل مدیریت</title>
  <link rel="icon" href="${FAVICON_DATA_URI}">
  <style>
    :root {
      --bg: #090d14;
      --card-bg: rgba(14, 20, 30, 0.9);
      --glass-border: rgba(181, 255, 77, 0.28);
      --glass-border-subtle: rgba(255, 255, 255, 0.08);
      --neon: #b5ff4d;
      --neon-glow: rgba(181, 255, 77, 0.38);
      --cyan: #00f0ff;
      --cyan-soft: rgba(0, 240, 255, 0.12);
      --text: #f0f6fc;
      --text-muted: #8b949e;
      --input-bg: rgba(7, 10, 16, 0.92);
      --danger: #ff5555;
      --shadow-os: 0 25px 60px rgba(0, 0, 0, 0.85);
    }
    body.light-theme {
      --bg: #f1f5f9;
      --card-bg: rgba(255, 255, 255, 0.94);
      --glass-border: rgba(16, 185, 129, 0.35);
      --glass-border-subtle: rgba(0, 0, 0, 0.08);
      --neon: #059669;
      --neon-glow: rgba(5, 150, 105, 0.28);
      --cyan: #0284c7;
      --cyan-soft: rgba(2, 132, 199, 0.1);
      --text: #0f172a;
      --text-muted: #64748b;
      --input-bg: #f8fafc;
      --danger: #dc2626;
      --shadow-os: 0 20px 50px rgba(0, 0, 0, 0.14);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Vazirmatn", Tahoma, sans-serif; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg);
      color: var(--text);
    }

    /* لایه ۱: پس‌زمینه استتار (Background Camouflage Sandbox) */
    .camouflage-layer {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
      z-index: 1;
      background: #ffffff;
      transition: filter 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .camouflage-layer.blurred {
      filter: blur(14px) brightness(0.4) saturate(1.2);
      transform: scale(1.03);
      pointer-events: none;
    }
    body.light-theme .camouflage-layer.blurred {
      filter: blur(14px) brightness(0.85) saturate(1.1);
    }

    /* بنر شمارش معکوس ۳ ثانیه‌ای جهت جلوگیری از قفل شدن کاربر */
    .countdown-pill {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 10;
      background: rgba(14, 20, 30, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      padding: 6px 16px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--neon);
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      cursor: pointer;
      transition: all 0.25s;
    }
    .countdown-pill:hover {
      background: var(--neon);
      color: #070a0e;
      transform: scale(1.04);
    }

    /* نوار بالای سیستم‌عامل */
    .os-topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: rgba(10, 14, 22, 0.8);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 0.82rem;
      z-index: 20;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }
    .os-topbar.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    body.light-theme .os-topbar {
      background: rgba(255, 255, 255, 0.88);
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-pill {
      display: flex;
      align-items: center;
      gap: 7px;
      font-weight: 800;
      color: var(--neon);
      text-decoration: none;
    }
    .topbar-btn {
      background: transparent;
      border: 1px solid var(--glass-border);
      color: var(--text);
      padding: 3px 10px;
      border-radius: 999px;
      cursor: pointer;
      font-size: 0.78rem;
      display: flex;
      align-items: center;
      gap: 5px;
      text-decoration: none;
      transition: all 0.2s;
    }
    .topbar-btn:hover {
      background: var(--neon);
      color: #070a0e;
    }

    /* لایه مودال و پنجره سیستم‌عامل مدیریت */
    .login-overlay {
      position: fixed;
      inset: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .login-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .os-window {
      width: 100%;
      max-width: 480px;
      background: var(--card-bg);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      box-shadow: var(--shadow-os);
      backdrop-filter: blur(24px);
      overflow: hidden;
      transform: scale(0.92) translateY(24px);
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .login-overlay.active .os-window {
      transform: scale(1) translateY(0);
    }

    .window-header {
      background: rgba(0, 0, 0, 0.28);
      border-bottom: 1px solid var(--glass-border-subtle);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    body.light-theme .window-header {
      background: rgba(0, 0, 0, 0.04);
    }
    .window-dots {
      display: flex;
      gap: 6px;
    }
    .window-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }
    .window-title {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--neon);
      letter-spacing: 0.06em;
    }

    .window-body {
      padding: 30px 26px;
    }
    .brand-hero {
      text-align: center;
      margin-bottom: 22px;
    }
    .brand-icon-wrap {
      width: 68px;
      height: 68px;
      margin: 0 auto 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .app-title {
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: 0.04em;
    }
    .app-sub {
      font-size: 0.82rem;
      color: var(--neon);
      margin-top: 4px;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 16px;
    }
    label {
      display: block;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 7px;
    }
    .input-wrap {
      position: relative;
    }
    input {
      width: 100%;
      padding: 12px 16px;
      background: var(--input-bg);
      border: 1px solid var(--glass-border-subtle);
      border-radius: 12px;
      color: var(--text);
      font-size: 0.95rem;
      outline: none;
      direction: ltr;
      text-align: left;
      transition: all 0.2s;
    }
    input:focus {
      border-color: var(--neon);
      box-shadow: 0 0 12px var(--neon-glow);
    }
    .submit-btn {
      width: 100%;
      padding: 13px;
      background: var(--neon);
      border: none;
      border-radius: 12px;
      color: #070a0e;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      margin-top: 8px;
      transition: all 0.2s;
      box-shadow: 0 4px 16px var(--neon-glow);
    }
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--neon-glow);
    }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .info-card {
      margin-top: 18px;
      padding: 12px 14px;
      background: var(--cyan-soft);
      border: 1px solid rgba(0, 240, 255, 0.28);
      border-radius: 12px;
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    .error-card {
      margin-bottom: 16px;
      padding: 11px 14px;
      background: rgba(255, 85, 85, 0.12);
      border: 1px solid var(--danger);
      border-radius: 12px;
      color: var(--danger);
      font-size: 0.82rem;
      display: none;
      text-align: center;
      font-weight: 600;
    }

    @media (prefers-reduced-motion: reduce) {
      .camouflage-layer, .os-topbar, .login-overlay, .os-window {
        transition: none !important;
      }
    }
  </style>
</head>
<body>
  <!-- پس‌زمینه استتار استانداردی که محتوای https://nginx.com را بارگذاری می‌کند -->
  <iframe id="camoIframe" class="camouflage-layer" src="${homepageUrl}" title="Background Camouflage"></iframe>

  <!-- نشانگر زمان ترنزیشن که به کاربر امکان می‌دهد بدون اتلاف وقت مستقیماً فرم را باز کند -->
  <div class="countdown-pill" id="countdownPill" onclick="triggerLoginTransitionNow()">
    <span>⚡ ورود فوری به پنل مدیریت</span>
    <span id="countdownTimer" style="background: var(--neon); color: #070a0e; padding: 2px 7px; border-radius: 999px; font-weight: 800;">3s</span>
  </div>

  <!-- نوار بالای دسکتاپ -->
  <div class="os-topbar" id="osTopbar">
    <div class="topbar-left">
      <span class="brand-pill">⚡ ${PROJECT_NAME} ${VERSION}</span>
      <span id="liveClock" style="color: var(--text-muted); font-size: 0.78rem;"></span>
    </div>
    <div class="topbar-right">
      <a href="https://t.me/miliconfig" target="_blank" class="topbar-btn">
        💬 پشتیبانی ${TELEGRAM_SUPPORT}
      </a>
      <button class="topbar-btn" onclick="toggleTheme()" id="themeBtn">☀️ روز</button>
    </div>
  </div>

  <!-- دیالوگ ورود / راه‌اندازی اول -->
  <div class="login-overlay" id="loginOverlay">
    <div class="os-window">
      <div class="window-header">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="window-title">${initialized ? 'SECURE LOGIN GATEWAY' : 'FIRST-RUN SETUP WIZARD'}</div>
        <div style="width: 40px;"></div>
      </div>
      <div class="window-body">
        <div class="brand-hero">
          <div class="brand-icon-wrap">
            ${MILICONFIG_LOGO_SVG}
          </div>
          <h1 class="app-title">${PROJECT_NAME}</h1>
          <div class="app-sub">${initialized ? 'درگاه احراز هویت امن مدیر مرکز کنترل' : 'راه‌اندازی اول: تعیین رمز عبور مدیر (PBKDF2)'}</div>
        </div>

        <div class="error-card" id="errBox"></div>

        ${initialized ? `
        <form id="loginForm" onsubmit="handleLogin(event)">
          <div class="form-group">
            <label>رمز عبور مدیر:</label>
            <div class="input-wrap">
              <input type="password" id="pwdInput" placeholder="رمز عبور مدیر..." required autofocus autocomplete="current-password">
            </div>
          </div>
          <button type="submit" class="submit-btn" id="subBtn">ورود به مرکز مدیریت</button>
        </form>
        ` : `
        <form id="setupForm" onsubmit="handleSetup(event)">
          <div class="form-group">
            <label>رمز عبور مدیر (حداقل ۸ کاراکتر):</label>
            <div class="input-wrap">
              <input type="password" id="newPwd" placeholder="حداقل ۸ کاراکتر امن..." required autofocus autocomplete="new-password">
            </div>
          </div>
          <div class="form-group">
            <label>تکرار رمز عبور:</label>
            <div class="input-wrap">
              <input type="password" id="confirmPwd" placeholder="تکرار رمز عبور..." required autocomplete="new-password">
            </div>
          </div>
          <button type="submit" class="submit-btn" id="subBtn">ذخیره رمز عبور و شروع کار پنل</button>
        </form>
        `}

        <div class="info-card">
          📌 <b>اطلاعیه امنیتی:</b> ${initialized
            ? 'احراز هویت با استانداردهای ضد Brute-Force و هش PBKDF2 با نمک اختصاصی حفاظت می‌شود.'
            : 'هیچ رمز عبور پیش‌فرضی در کد وجود ندارد. لطفاً رمز عبور انتخابی خود را با دقت به خاطر بسپارید.'}
        </div>
      </div>
    </div>
  </div>

  <script>
    var remainingSeconds = 3;
    var transitionDone = false;

    function tickCountdown() {
      if (transitionDone) return;
      remainingSeconds -= 1;
      var timerEl = document.getElementById('countdownTimer');
      if (timerEl) timerEl.textContent = remainingSeconds + 's';
      if (remainingSeconds <= 0) {
        triggerLoginTransitionNow();
      } else {
        setTimeout(tickCountdown, 1000);
      }
    }
    setTimeout(tickCountdown, 1000);

    // زدن کلید ESC یا Enter یا کلیک روی دکمه ورود فوری، فوراً دیالوگ را باز می‌کند
    window.addEventListener('keydown', function(e) {
      if (!transitionDone && (e.key === 'Escape' || e.key === 'Enter')) {
        triggerLoginTransitionNow();
      }
    });

    function triggerLoginTransitionNow() {
      if (transitionDone) return;
      transitionDone = true;
      var pill = document.getElementById('countdownPill');
      if (pill) pill.style.display = 'none';

      var iframe = document.getElementById('camoIframe');
      if (iframe) iframe.classList.add('blurred');

      var topbar = document.getElementById('osTopbar');
      if (topbar) topbar.classList.add('visible');

      var overlay = document.getElementById('loginOverlay');
      if (overlay) overlay.classList.add('active');

      setTimeout(function() {
        var inp = document.getElementById('pwdInput') || document.getElementById('newPwd');
        if (inp) inp.focus();
      }, 600);
    }

    function updateClock() {
      var now = new Date();
      var el = document.getElementById('liveClock');
      if (el) el.textContent = now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    function toggleTheme() {
      var isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('mili_theme', isLight ? 'light' : 'dark');
      var btn = document.getElementById('themeBtn');
      if (btn) btn.textContent = isLight ? '🌙 شب' : '☀️ روز';
    }
    if (localStorage.getItem('mili_theme') === 'light') {
      document.body.classList.add('light-theme');
      var b = document.getElementById('themeBtn');
      if (b) b.textContent = '🌙 شب';
    }

    function showErr(msg) {
      var b = document.getElementById('errBox');
      if (!b) return;
      b.textContent = msg;
      b.style.display = 'block';
    }

    async function handleLogin(e) {
      e.preventDefault();
      var pwd = (document.getElementById('pwdInput').value || '').trim();
      var btn = document.getElementById('subBtn');
      btn.disabled = true;
      btn.textContent = 'در حال اعتبارسنجی امن...';

      try {
        var res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pwd })
        });
        var data = await res.json();
        if (data.success) {
          var target = '${customPath ? ('/' + customPath) : '/'}';
          window.location.href = target;
        } else {
          showErr(data.message || 'رمز عبور نادرست است.');
          btn.disabled = false;
          btn.textContent = 'ورود به مرکز مدیریت';
        }
      } catch (err) {
        showErr('خطای شبکه در برقراری ارتباط');
        btn.disabled = false;
        btn.textContent = 'ورود به مرکز مدیریت';
      }
    }

    async function handleSetup(e) {
      e.preventDefault();
      var p1 = (document.getElementById('newPwd').value || '').trim();
      var p2 = (document.getElementById('confirmPwd').value || '').trim();

      if (p1 !== p2) {
        showErr('رمزهای عبور وارد شده یکسان نیستند.');
        return;
      }
      if (p1.length < 8) {
        showErr('رمز عبور باید حداقل ۸ کاراکتر باشد.');
        return;
      }

      var btn = document.getElementById('subBtn');
      btn.disabled = true;
      btn.textContent = 'در حال ثبت امن PBKDF2...';

      try {
        var res = await fetch('/api/v1/auth/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: p1 })
        });
        var data = await res.json();
        if (data.success) {
          window.location.reload();
        } else {
          showErr(data.message || 'خطا در ثبت رمز عبور');
          btn.disabled = false;
          btn.textContent = 'ذخیره رمز عبور و شروع کار پنل';
        }
      } catch (err) {
        showErr('خطای شبکه در برقراری ارتباط');
        btn.disabled = false;
        btn.textContent = 'ذخیره رمز عبور و شروع کار پنل';
      }
    }
  </script>
</body>
</html>`;
}
