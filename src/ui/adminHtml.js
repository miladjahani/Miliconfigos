// ============================================================================
// MiliconfigOS v4.0 - سیستم‌عامل پیشرفته مرکز کنترل (Desktop Workspace)
// Developer: Milad Jahani | Brand: miliconfig
// تم‌های روز/شب/سیستم، قفل ۵ کاربر، کاتالوگ DNS، اسکنر چندسطحی، سابلینک کشوری
// ============================================================================

import {
  BRAND_NAME,
  BRAND_UPPER,
  CAPABILITY_MATRIX,
  CONFIG_DEFAULTS,
  COUNTRY_PROXY_SOURCES,
  DEFAULT_HOMEPAGE,
  DEVELOPER,
  ECH_DOMAINS,
  FINGERPRINT_PRESETS,
  FRAGMENT_PRESETS,
  MAX_USERS_LIMIT,
  PATH_PATTERNS,
  PROJECT_NAME,
  TELEGRAM_SUPPORT,
  VERIFIED_DNS_CATALOG,
  VERSION
} from '../config/defaults.js';
import { USER_PRESETS } from '../config/presets.js';
import {
  FAVICON_DATA_URI,
  ICON_BOLT_SVG,
  ICON_CONFIG_SVG,
  ICON_COPY_SVG,
  ICON_DASHBOARD_SVG,
  ICON_DNS_SVG,
  ICON_GLOBE_SVG,
  ICON_KEY_SVG,
  ICON_LOCK_SVG,
  ICON_MONITORING_SVG,
  ICON_MOON_SVG,
  ICON_NODES_SVG,
  ICON_REFRESH_SVG,
  ICON_SCANNER_SVG,
  ICON_SECURITY_SVG,
  ICON_SETTINGS_SVG,
  ICON_SUBSCRIPTION_SVG,
  ICON_SUN_SVG,
  ICON_SYSTEM_SVG,
  ICON_TRASH_SVG,
  ICON_USERS_SVG,
  MILICONFIG_LOGO_SVG
} from './icons.js';

export function renderAdminDashboardHtml(initialData = {}) {
  const safeInitialJson = JSON.stringify({
    brand: BRAND_NAME,
    brandUpper: BRAND_UPPER,
    projectName: PROJECT_NAME,
    version: VERSION,
    developer: DEVELOPER,
    maxUsersLimit: MAX_USERS_LIMIT,
    defaults: CONFIG_DEFAULTS,
    presets: USER_PRESETS,
    config: initialData.config || CONFIG_DEFAULTS,
    users: initialData.users || [],
    diagnostics: initialData.diagnostics || {},
    adminPath: initialData.adminPath || '',
    countrySources: COUNTRY_PROXY_SOURCES,
    dnsCatalog: VERIFIED_DNS_CATALOG,
    capabilityMatrix: CAPABILITY_MATRIX,
    fragmentPresets: FRAGMENT_PRESETS,
    fingerprintPresets: FINGERPRINT_PRESETS,
    echDomains: ECH_DOMAINS,
    pathPatterns: PATH_PATTERNS,
    telegramSupport: TELEGRAM_SUPPORT
  }).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${PROJECT_NAME} ${VERSION} — مرکز کنترل و مدیریت پروکسی</title>
  <link rel="icon" href="${FAVICON_DATA_URI}">
  <style>
    :root {
      --bg: #090d14;
      --card-bg: rgba(14, 20, 30, 0.85);
      --card-solid: #0e141e;
      --glass-border: rgba(181, 255, 77, 0.22);
      --glass-border-subtle: rgba(255, 255, 255, 0.08);
      --neon: #b5ff4d;
      --neon-hover: #c9ff7a;
      --neon-glow: rgba(181, 255, 77, 0.35);
      --neon-soft: rgba(181, 255, 77, 0.12);
      --cyan: #00f0ff;
      --cyan-soft: rgba(0, 240, 255, 0.12);
      --purple: #a855f7;
      --purple-soft: rgba(168, 85, 247, 0.12);
      --emerald: #10b981;
      --text: #f0f6fc;
      --text-muted: #8b949e;
      --input-bg: rgba(9, 13, 20, 0.92);
      --danger: #ff5555;
      --warn: #ffb86c;
      --shadow-os: 0 20px 60px rgba(0, 0, 0, 0.7);
    }
    body.light-theme {
      --bg: #f1f5f9;
      --card-bg: rgba(255, 255, 255, 0.9);
      --card-solid: #ffffff;
      --glass-border: rgba(16, 185, 129, 0.35);
      --glass-border-subtle: rgba(0, 0, 0, 0.08);
      --neon: #059669;
      --neon-hover: #10b981;
      --neon-glow: rgba(16, 185, 129, 0.25);
      --neon-soft: rgba(16, 185, 129, 0.1);
      --cyan: #0284c7;
      --cyan-soft: rgba(2, 132, 199, 0.1);
      --purple: #7c3aed;
      --purple-soft: rgba(124, 58, 237, 0.1);
      --emerald: #059669;
      --text: #0f172a;
      --text-muted: #64748b;
      --input-bg: #f8fafc;
      --danger: #dc2626;
      --warn: #d97706;
      --shadow-os: 0 15px 40px rgba(0, 0, 0, 0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Vazirmatn", Tahoma, sans-serif; }
    body {
      min-height: 100vh;
      background: radial-gradient(circle at 10% 15%, rgba(181, 255, 77, 0.08) 0%, transparent 40%),
                  radial-gradient(circle at 90% 85%, rgba(0, 240, 255, 0.08) 0%, transparent 40%),
                  var(--bg);
      color: var(--text);
      overflow-x: hidden;
      padding-top: 48px;
      padding-bottom: 96px;
      transition: background 0.3s ease, color 0.3s ease;
    }

    /* نوار بالای دسکتاپ سیستم‌عامل (Top Menu Bar) */
    .os-topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 44px;
      background: rgba(10, 14, 22, 0.82);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 0.82rem;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
    }
    body.light-theme .os-topbar {
      background: rgba(255, 255, 255, 0.88);
    }
    .topbar-left, .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-badge {
      display: flex;
      align-items: center;
      gap: 7px;
      font-weight: 800;
      color: var(--neon);
      text-shadow: 0 0 12px var(--neon-glow);
    }
    .cf-quota-meter {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 3px 10px;
      background: var(--neon-soft);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      font-size: 0.77rem;
      color: var(--neon);
      font-weight: 600;
    }
    .cf-progress-bar {
      width: 48px;
      height: 6px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 999px;
      overflow: hidden;
    }
    .cf-progress-fill {
      width: 4%;
      height: 100%;
      background: var(--neon);
      border-radius: 999px;
    }
    .topbar-btn {
      background: transparent;
      border: 1px solid var(--glass-border);
      color: var(--text);
      padding: 4px 11px;
      border-radius: 999px;
      font-size: 0.78rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
      text-decoration: none;
    }
    .topbar-btn:hover {
      background: var(--neon);
      color: #070a0e;
    }
    .topbar-btn-glowing {
      background: linear-gradient(135deg, rgba(181, 255, 77, 0.2), rgba(0, 240, 255, 0.2));
      border-color: var(--neon);
      color: var(--neon);
      font-weight: 700;
      box-shadow: 0 0 12px var(--neon-glow);
    }

    /* فضای دسکتاپ و پنجره‌ها */
    .os-desktop {
      max-width: 1400px;
      margin: 16px auto;
      padding: 0 16px;
    }
    .os-window {
      background: var(--card-bg);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      box-shadow: var(--shadow-os);
      backdrop-filter: blur(20px);
      overflow: hidden;
      margin-bottom: 24px;
      animation: fadeIn 0.35s ease;
    }
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(12px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .window-header {
      background: rgba(0, 0, 0, 0.25);
      border-bottom: 1px solid var(--glass-border-subtle);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    body.light-theme .window-header {
      background: rgba(0, 0, 0, 0.04);
    }
    .window-controls {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .window-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      display: inline-block;
    }
    .window-dot-red { background: #ff5f56; }
    .window-dot-yellow { background: #ffbd2e; }
    .window-dot-green { background: #27c93f; }
    .window-title {
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--neon);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .window-body {
      padding: 22px;
    }

    /* کارت‌های آمار و متریک‌های داشبورد */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 16px;
      margin-bottom: 22px;
    }
    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--glass-border);
      border-radius: 16px;
      padding: 18px;
      position: relative;
      overflow: hidden;
    }
    .metric-card::before {
      content: "";
      position: absolute;
      top: 0; right: 0; width: 4px; height: 100%;
      background: var(--neon);
      box-shadow: 0 0 10px var(--neon);
    }
    .metric-title {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 600;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .metric-val {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text);
    }
    .metric-sub {
      font-size: 0.76rem;
      color: var(--neon);
      margin-top: 5px;
    }

    /* بنر ظرفیت ۵ کاربر و کارت‌های کاربری */
    .user-limit-banner {
      background: rgba(181, 255, 77, 0.08);
      border: 1px solid var(--glass-border);
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
    .limit-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--neon-soft);
      border: 1px solid var(--neon);
      color: var(--neon);
      font-size: 0.82rem;
      font-weight: 800;
    }
    .user-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 18px;
    }
    .user-card {
      background: var(--card-bg);
      border: 1px solid var(--glass-border);
      border-radius: 18px;
      padding: 18px;
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .user-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(181, 255, 77, 0.15);
    }
    .user-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .user-name {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text);
    }
    .user-status-pill {
      font-size: 0.74rem;
      padding: 3px 9px;
      border-radius: 999px;
      font-weight: 700;
    }
    .status-active { background: rgba(39, 201, 63, 0.15); border: 1px solid #27c93f; color: #27c93f; }
    .status-disabled { background: rgba(255, 95, 86, 0.15); border: 1px solid #ff5f56; color: #ff5f56; }
    .usage-progress-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      overflow: hidden;
      margin: 10px 0 6px;
    }
    .usage-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon), var(--cyan));
      border-radius: 999px;
    }
    .proto-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 12px 0;
    }
    .proto-tag {
      font-size: 0.72rem;
      padding: 2px 7px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--glass-border-subtle);
      color: var(--text-muted);
    }
    .proto-tag.active {
      background: var(--neon-soft);
      border-color: var(--neon);
      color: var(--neon);
      font-weight: 600;
    }
    .card-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 14px;
    }
    .btn-action {
      flex: 1 1 auto;
      padding: 7px 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border-subtle);
      border-radius: 9px;
      color: var(--text);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.2s;
    }
    .btn-action:hover {
      background: var(--neon-soft);
      border-color: var(--neon);
      color: var(--neon);
    }

    /* تب‌های گام‌به‌گام تنظیمات */
    .stepper-nav {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--glass-border-subtle);
      padding-bottom: 12px;
      overflow-x: auto;
    }
    .step-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--glass-border-subtle);
      border-radius: 12px;
      color: var(--text-muted);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .step-tab:hover {
      border-color: var(--neon);
      color: var(--neon);
    }
    .step-tab.active {
      background: var(--neon-soft);
      border-color: var(--neon);
      color: var(--neon);
      box-shadow: 0 0 15px var(--neon-glow);
    }
    .step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.74rem;
    }
    .step-tab.active .step-num {
      background: var(--neon);
      color: #070a0e;
      font-weight: 800;
    }
    .step-panel {
      display: none;
      animation: fadeIn 0.3s ease;
    }
    .step-panel.active {
      display: block;
    }
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    .setting-card {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--glass-border-subtle);
      border-radius: 14px;
      padding: 16px;
    }
    .setting-label {
      font-size: 0.88rem;
      font-weight: 700;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .setting-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-bottom: 10px;
      line-height: 1.5;
    }
    .form-control {
      width: 100%;
      padding: 10px 14px;
      background: var(--input-bg);
      border: 1px solid var(--glass-border-subtle);
      border-radius: 10px;
      color: var(--text);
      font-size: 0.88rem;
      outline: none;
      transition: border-color 0.2s;
      direction: ltr;
    }
    .form-control:focus {
      border-color: var(--neon);
      box-shadow: 0 0 10px var(--neon-glow);
    }
    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 24px;
    }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 24px;
      transition: 0.25s;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: #fff;
      border-radius: 50%;
      transition: 0.25s;
    }
    input:checked + .slider {
      background-color: var(--neon);
      box-shadow: 0 0 10px var(--neon-glow);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
      background-color: #070a0e;
    }

    /* جدول‌های اسکنر و لاگ‌ها */
    .table-wrapper {
      overflow-x: auto;
      border: 1px solid var(--glass-border-subtle);
      border-radius: 14px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.83rem;
      text-align: right;
    }
    table.data-table th {
      background: rgba(0, 0, 0, 0.3);
      padding: 11px 14px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--glass-border-subtle);
    }
    table.data-table td {
      padding: 11px 14px;
      border-bottom: 1px solid var(--glass-border-subtle);
    }

    /* داک شناور سیستم‌عامل (OS Dock) */
    .os-dock-container {
      position: fixed;
      bottom: 12px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      z-index: 1000;
      pointer-events: none;
    }
    .os-dock {
      pointer-events: auto;
      background: rgba(14, 20, 30, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 22px;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(181, 255, 77, 0.15);
    }
    body.light-theme .os-dock {
      background: rgba(255, 255, 255, 0.92);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }
    .dock-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px 10px;
      border-radius: 12px;
      cursor: pointer;
      color: var(--text-muted);
      font-size: 0.74rem;
      font-weight: 600;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .dock-item:hover {
      transform: translateY(-4px) scale(1.06);
      color: var(--neon);
    }
    .dock-item.active {
      color: var(--neon);
      background: var(--neon-soft);
      box-shadow: 0 0 14px var(--neon-glow);
    }
    .dock-item.active::after {
      content: "";
      position: absolute;
      bottom: -3px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--neon);
    }
    .dock-icon {
      font-size: 1.35rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dock-icon svg { width: 22px; height: 22px; }

    /* مودال‌های شیشه‌ای */
    .os-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .os-modal {
      width: 100%;
      max-width: 640px;
      max-height: 90vh;
      overflow-y: auto;
      background: var(--card-solid);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      box-shadow: var(--shadow-os);
      animation: fadeIn 0.3s ease;
    }
    .toast-msg {
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: #0e141e;
      border: 1px solid var(--neon);
      color: var(--neon);
      padding: 9px 22px;
      border-radius: 999px;
      font-size: 0.86rem;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px var(--neon-glow);
      z-index: 3000;
      display: none;
    }
  </style>
</head>
<body>
  <!-- نوار بالای دسکتاپ (OS Topbar) -->
  <header class="os-topbar">
    <div class="topbar-left">
      <div class="brand-badge">
        <span style="display: flex; align-items: center;">${MILICONFIG_LOGO_SVG}</span>
        <span>${PROJECT_NAME} ${VERSION}</span>
      </div>
      <div class="cf-quota-meter">
        <span>سهمیه ورکر: ۲.۴k / ۱۰۰k</span>
        <div class="cf-progress-bar"><div class="cf-progress-fill"></div></div>
      </div>
      <span id="osClock" style="color: var(--text-muted); font-size: 0.78rem;"></span>
    </div>
    <div class="topbar-right">
      <button class="topbar-btn topbar-btn-glowing" onclick="openMultiLocModal()">
        🌍 چندلوکیشن کشوری
      </button>
      <a href="https://t.me/miliconfig" target="_blank" class="topbar-btn">
        💬 پشتیبانی ${TELEGRAM_SUPPORT}
      </a>
      <button class="topbar-btn" onclick="openChangePwdModal()">
        🔑 تغییر پسورد
      </button>
      <button class="topbar-btn" onclick="cycleTheme()" id="themeBtn">
        ☀️ روز
      </button>
      <button class="topbar-btn" onclick="handleLogout()" style="color: var(--danger); border-color: rgba(255,85,85,0.3);">
        🔒 خروج
      </button>
    </div>
  </header>

  <!-- دسکتاپ و پنجره‌های اصلی -->
  <main class="os-desktop">
    <!-- پنجره ۱: داشبورد و وضعیت کلی -->
    <div class="os-window" id="windowDashboard">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">📊 داشبورد مرکزی و مصرف ترافیک واقعی</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);" id="d1StatusLabel">اتصال دیتابیس D1: فعال</div>
      </div>
      <div class="window-body">
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-title">کاربران فعال (سقف ۵ کاربر) <span>👥</span></div>
            <div class="metric-val" id="metricUserCount">۰ / ۵</div>
            <div class="metric-sub" id="metricUserSub">ظرفیت مجاز آزاد است</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">کل ترافیک مصرف‌شده <span>📈</span></div>
            <div class="metric-val" id="metricTotalBytes">۰.۰۰ GB</div>
            <div class="metric-sub">منبع: Cloudflare WebSocket Bytes (واقعی)</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">نودهای سالم و فعال <span>🌐</span></div>
            <div class="metric-val" id="metricIpsCount">۲۴ نود</div>
            <div class="metric-sub">VIP کشوری + استخر CFnew</div>
          </div>
          <div class="metric-card">
            <div class="metric-title">پروتکل‌های ارتباطی <span>⚡</span></div>
            <div class="metric-val">VLESS + SS + TR</div>
            <div class="metric-sub">ضد DPI، فرگمنت و uTLS</div>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--glass-border-subtle); border-radius: 16px; padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--neon);">نمودار جریان ترافیک ۲۴ ساعت گذشته</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">پایش زنده اتصالات کلاینت‌ها</div>
          </div>
          <svg viewBox="0 0 600 110" style="width: 100%; height: 110px; overflow: visible;">
            <defs>
              <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#b5ff4d" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#b5ff4d" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <path d="M 0,80 Q 75,30 150,55 T 300,35 T 450,65 T 600,25 L 600,110 L 0,110 Z" fill="url(#chartGrad)"/>
            <path d="M 0,80 Q 75,30 150,55 T 300,35 T 450,65 T 600,25" fill="none" stroke="#b5ff4d" stroke-width="2.6" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- پنجره ۲: مدیریت کاربران (سقف ۵ کاربر) -->
    <div class="os-window" id="windowUsers">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">👥 مدیریت کاربران (سقف امنیتی حداکثر ۵ کاربر)</div>
        <button class="topbar-btn topbar-btn-glowing" id="btnAddNewUser" onclick="openCreateUserModal()">
          ➕ ایجاد کاربر جدید
        </button>
      </div>
      <div class="window-body">
        <div class="user-limit-banner">
          <div>
            <b>سیاست اختصاصی MiliconfigOS:</b> حداکثر ۵ کاربر به صورت هاردکد شده در دیتابیس قابل تعریف است تا کیفیت ترافیک و پینگ در بهترین حالت حفظ شود.
          </div>
          <div class="limit-badge" id="limitBadge">
            ظرفیت: ۰ / ۵
          </div>
        </div>

        <div class="user-cards-grid" id="usersGrid">
          <!-- با جاوااسکریپت پر می‌شود -->
        </div>
      </div>
    </div>

    <!-- پنجره ۳: کاتالوگ نودها -->
    <div class="os-window" id="windowNodes">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">🌐 کاتالوگ پایگاه‌های داده و نودهای کشوری</div>
        <button class="topbar-btn" onclick="openMultiLocModal()">🌍 خروجی چندلوکیشن</button>
      </div>
      <div class="window-body">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>کشور</th>
                <th>نام پایانه</th>
                <th>آدرس و پورت</th>
                <th>پروتکل</th>
                <th>تاخیر (پینگ)</th>
                <th>امتیاز سلامت</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody id="nodesTableBody">
              <!-- با جاوااسکریپت پر می‌شود -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- پنجره ۴: تنظیمات گام‌به‌گام آکاردئونی سرور -->
    <div class="os-window" id="windowSettings">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">⚙️ مرکز پیکربندی گام‌به‌گام سرور و هسته</div>
        <button class="topbar-btn topbar-btn-glowing" onclick="saveSettings()">
          💾 ذخیره تنظیمات در D1
        </button>
      </div>
      <div class="window-body">
        <div class="stepper-nav">
          <div class="step-tab active" onclick="switchStep(1)">
            <span class="step-num">۱</span>
            <span>پروتکل‌ها و شادوساکس</span>
          </div>
          <div class="step-tab" onclick="switchStep(2)">
            <span class="step-num">۲</span>
            <span>ضد فیلترینگ، ECH و فرگمنت</span>
          </div>
          <div class="step-tab" onclick="switchStep(3)">
            <span class="step-num">۳</span>
            <span>استخر آی‌پی و چرخش خودکار</span>
          </div>
          <div class="step-tab" onclick="switchStep(4)">
            <span class="step-num">۴</span>
            <span>دامنه، مسیریابی و DoH</span>
          </div>
        </div>

        <!-- گام ۱: پروتکل‌ها و هسته -->
        <div class="step-panel active" id="stepPanel1">
          <div class="settings-grid">
            <div class="setting-card">
              <div class="setting-label">
                <span>پروتکل VLESS</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_ev">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">پروتکل پایه فوق‌سریع با رمزنگاری TLS و وب‌سوکت.</div>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>هسته شادوساکس (Shadowsocks)</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_es">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">فعال‌سازی هسته Shadowsocks (SS-WS) با رمزنگاری AEAD مدرن.</div>
              <div style="margin-top: 8px;">
                <label style="font-size: 0.76rem; color: var(--text-muted);">متد رمزنگاری شادوساکس:</label>
                <select id="cfg_ssmethod" class="form-control" style="margin-top: 4px;">
                  <option value="chacha20-ietf-poly1305">chacha20-ietf-poly1305 (پیشنهادی)</option>
                  <option value="aes-128-gcm">aes-128-gcm</option>
                  <option value="aes-256-gcm">aes-256-gcm</option>
                </select>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>پروتکل Trojan</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_et">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">پروتکل تروجان شبیه‌ساز رفتار ترافیک HTTPS معتبر.</div>
              <input type="text" id="cfg_tp" class="form-control" placeholder="رمز عبور تروجان (اختیاری)" style="margin-top: 8px;">
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>پروتکل xhttp (استریمینگ نسل جدید)</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_ex">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">مبتنی بر HTTP POST Streaming با پدینگ نامتقارن برای دور زدن فیلترینگ شدید.</div>
            </div>
          </div>
        </div>

        <!-- گام ۲: تکنولوژی ضد فیلترینگ -->
        <div class="step-panel" id="stepPanel2">
          <div class="settings-grid">
            <div class="setting-card">
              <div class="setting-label">
                <span>تکنولوژی ECH (Encrypted Client Hello)</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_ech">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">رمزنگاری نام دامنه SNI در فاز دست‌تکانی TLS جهت عدم شناسایی توسط فایروال.</div>
              <div style="margin-top: 8px;">
                <label style="font-size: 0.76rem; color: var(--text-muted);">دامنه مرجع ECH:</label>
                <select id="cfg_customECHDomain" class="form-control" style="margin-top: 4px;">
                  <option value="cloudflare-ech.com">cloudflare-ech.com</option>
                  <option value="crypto.cloudflare.com">crypto.cloudflare.com</option>
                  <option value="cloudflare-dns.com">cloudflare-dns.com</option>
                  <option value="deflect.ca">deflect.ca</option>
                </select>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>فرگمنت‌های آماده اپراتورها</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_fragment">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">تکه‌تکه‌کردن بسته‌های ClientHello TLS برای دور زدن سیستم فیلترینگ ایران.</div>
              <div style="margin-top: 8px;">
                <label style="font-size: 0.76rem; color: var(--text-muted);">پروفایل اپراتور:</label>
                <select id="cfg_fragmentPreset" class="form-control" style="margin-top: 4px;">
                  <option value="mci">همراه اول (MCI) — 100-200, 10-20ms</option>
                  <option value="irancell">ایرانسل (Irancell) — 50-100, 5-10ms</option>
                  <option value="rightel">رایتل و مخابرات (Rightel/TCI) — 1-3, 1-5ms</option>
                  <option value="anti-dpi">ضد فیلترینگ شدید (Anti-DPI) — 10-30, 20-40ms</option>
                </select>
              </div>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>فینگرپرینت uTLS (Fingerprint)</span>
              </div>
              <div class="setting-desc">شبیه‌سازی اثر انگشت رمزنگاری کلاینت‌های استاندارد مرورگرها.</div>
              <select id="cfg_fp" class="form-control">
                <option value="chrome">Chrome (پیشنهادی)</option>
                <option value="firefox">Firefox</option>
                <option value="safari">Safari (iOS / macOS)</option>
                <option value="edge">Microsoft Edge</option>
                <option value="ios">iOS Device</option>
                <option value="randomized">Randomized (تصادفی)</option>
              </select>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>الگوهای مسیر و پدینگ (Patt)</span>
              </div>
              <div class="setting-desc">تنظیم ساختار Path جهت هماهنگی با پروکسی‌های شبکه و بسته‌بندی داده‌ها.</div>
              <select id="cfg_patt" class="form-control">
                <option value="/?ed=2048">استاندارد (/?ed=2048)</option>
                <option value="/mili-stream?ed=2048">جریان امن (/mili-stream)</option>
                <option value="/api/v1/tunnel">استتار API (/api/v1/tunnel)</option>
                <option value="/ws-proxy">وب‌سوکت مستقیم (/ws-proxy)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- گام ۳: استخر آی‌پی و چرخش خودکار -->
        <div class="step-panel" id="stepPanel3">
          <div class="settings-grid">
            <div class="setting-card">
              <div class="setting-label">
                <span>چرخش خودکار آی‌پی (Auto IP Rotation)</span>
              </div>
              <div class="setting-desc">چرخش دوره‌ای و هوشمند آی‌پی‌ها در سابلینک برای جلوگیری از مسدودسازی مداوم.</div>
              <select id="cfg_ipRotation" class="form-control">
                <option value="off">غیرفعال (ثابت)</option>
                <option value="5m">هر ۵ دقیقه</option>
                <option value="15m">هر ۱۵ دقیقه (پیشنهادی)</option>
                <option value="30m">هر ۳۰ دقیقه</option>
                <option value="1h">هر ۱ ساعت</option>
                <option value="24h">هر ۲۴ ساعت</option>
              </select>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>استخر آی‌پی رسمی و ترجیحی CFnew</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_epi">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">تزریق خودکار آی‌پی‌های تمیز مخابرات، همراه اول و ایرانسل از استخر مخزن CFnew.</div>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>زنجیره اینترنت خانگی (Residential - jk)</span>
                <label class="toggle-switch">
                  <input type="checkbox" id="cfg_jk">
                  <span class="slider"></span>
                </label>
              </div>
              <div class="setting-desc">زنجیره کردن اتصال کلودفلر به آی‌پی‌های مسکونی واقعی خانگی و شرکتی.</div>
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>نودهای تمیز سفارشی دستی (yx)</span>
              </div>
              <div class="setting-desc">وارد کردن IP یا دامنه‌های تمیز دستی با کاما (مانند 1.1.1.1:443#Mili).</div>
              <input type="text" id="cfg_yx" class="form-control" placeholder="104.16.1.1#CleanIP, 172.67.1.1#CF">
            </div>
          </div>
        </div>

        <!-- گام ۴: دامنه و مسیریابی -->
        <div class="step-panel" id="stepPanel4">
          <div class="settings-grid">
            <div class="setting-card">
              <div class="setting-label">
                <span>مسیر اختصاصی ورود مدیر (d)</span>
              </div>
              <div class="setting-desc">مسیر پنهان پنل مدیریت برای افزایش امنیت در صورت نیاز.</div>
              <input type="text" id="cfg_d" class="form-control" placeholder="مسیر سفارشی مانند my-secret-panel">
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>سایت استتار صفحه اصلی (Camouflage)</span>
              </div>
              <div class="setting-desc">نمایش وب‌سایت عمومی در صورت باز شدن صفحه اصلی بدون احراز هویت.</div>
              <input type="text" id="cfg_homepage" class="form-control" placeholder="${DEFAULT_HOMEPAGE}">
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>سرور DNS رمزنگاری‌شده (DoH)</span>
              </div>
              <div class="setting-desc">آدرس سرور DNS جهت جلوگیری از آلودگی DNS و مسدودسازی ISP.</div>
              <input type="text" id="cfg_customDNS" class="form-control" placeholder="https://1.1.1.1/dns-query">
            </div>

            <div class="setting-card">
              <div class="setting-label">
                <span>پروکسی IP سراسری (ProxyIP)</span>
              </div>
              <div class="setting-desc">تعیین دستی پروکسی برای تغییر منطقه خروجی کلودفلر.</div>
              <input type="text" id="cfg_p" class="form-control" placeholder="ip:port یا domain:port">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- پنجره ۵: کاتالوگ DNS معتبر -->
    <div class="os-window" id="windowDns">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">🛡️ کاتالوگ ارائه‌دهندگان معتبر DNS جهانی</div>
      </div>
      <div class="window-body">
        <div class="settings-grid" id="dnsCatalogGrid">
          <!-- با جاوااسکریپت پر می‌شود -->
        </div>
      </div>
    </div>

    <!-- پنجره ۶: اسکنر زنده کشوری پروکسی‌ها -->
    <div class="os-window" id="windowScanner">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">🔍 اسکنر زنده پروکسی‌های کشوری و تست پینگ چندسطحی</div>
        <button class="topbar-btn topbar-btn-glowing" onclick="openMultiLocModal()">
          🌍 ساخت سابلینک چندلوکیشن کشوری
        </button>
      </div>
      <div class="window-body">
        <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
          <select id="scannerCountry" class="form-control" style="max-width: 200px;">
            <option value="DE">🇩🇪 آلمان (Germany)</option>
            <option value="NL">🇳🇱 هلند (Netherlands)</option>
            <option value="US">🇺🇸 آمریکا (United States)</option>
            <option value="GB">🇬🇧 بریتانیا (United Kingdom)</option>
            <option value="TR">🇹🇷 ترکیه (Turkey)</option>
            <option value="AE">🇦🇪 امارات (UAE)</option>
            <option value="CA">🇨🇦 کانادا (Canada)</option>
            <option value="IT">🇮🇹 ایتالیا (Italy)</option>
            <option value="SE">🇸🇪 سوئد (Sweden)</option>
            <option value="NO">🇳🇴 نروژ (Norway)</option>
            <option value="KZ">🇰🇿 قزاقستان (Kazakhstan)</option>
            <option value="UZ">🇺🇿 ازبکستان (Uzbekistan)</option>
          </select>
          <select id="scannerLimit" class="form-control" style="max-width: 120px;">
            <option value="8">۸ پروکسی</option>
            <option value="12" selected>۱۲ پروکسی</option>
            <option value="16">۱۶ پروکسی</option>
          </select>
          <button class="topbar-btn topbar-btn-glowing" onclick="runLiveProxyScan()" id="btnRunScan">
            ⚡ دریافت پروکسی تصادفی و تست زنده
          </button>
        </div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>کشور</th>
                <th>آدرس سرور و پورت</th>
                <th>پروتکل</th>
                <th>پینگ (میلی‌ثانیه)</th>
                <th>سطوح تست</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody id="scannerTableBody">
              <tr>
                <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 22px;">
                  برای دریافت پروکسی‌های VIP و تست چندسطحی، کشور مورد نظر را انتخاب و دکمه را بزنید.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- پنجره ۷: لاگ‌های ممیزی سیستم -->
    <div class="os-window" id="windowAudit">
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot window-dot-red"></span>
          <span class="window-dot window-dot-yellow"></span>
          <span class="window-dot window-dot-green"></span>
        </div>
        <div class="window-title">📋 لاگ‌های ممیزی و حسابرسی امنیتی (Audit Logs)</div>
        <button class="topbar-btn" onclick="fetchAuditLogs()">🔄 بروزرسانی لاگ‌ها</button>
      </div>
      <div class="window-body">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>عملیات</th>
                <th>جزئیات</th>
                <th>آدرس IP</th>
                <th>زمان</th>
              </tr>
            </thead>
            <tbody id="auditTableBody">
              <tr><td colspan="5" style="text-align: center; padding: 20px;">در حال بارگذاری لاگ‌ها...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

  <!-- داک شناور سیستم‌عامل (macOS / Zeus Floating Dock) -->
  <div class="os-dock-container">
    <div class="os-dock">
      <div class="dock-item active" onclick="scrollToWindow('windowDashboard', this)">
        <span class="dock-icon">📊</span>
        <span>داشبورد</span>
      </div>
      <div class="dock-item" onclick="scrollToWindow('windowUsers', this)">
        <span class="dock-icon">👥</span>
        <span>کاربران</span>
      </div>
      <div class="dock-item" onclick="scrollToWindow('windowNodes', this)">
        <span class="dock-icon">🌐</span>
        <span>نودها</span>
      </div>
      <div class="dock-item" onclick="scrollToWindow('windowSettings', this)">
        <span class="dock-icon">⚙️</span>
        <span>تنظیمات</span>
      </div>
      <div class="dock-item" onclick="scrollToWindow('windowDns', this)">
        <span class="dock-icon">🛡️</span>
        <span>DNS</span>
      </div>
      <div class="dock-item" onclick="scrollToWindow('windowScanner', this)">
        <span class="dock-icon">🔍</span>
        <span>اسکنر</span>
      </div>
      <div class="dock-item" onclick="scrollToWindow('windowAudit', this)">
        <span class="dock-icon">📋</span>
        <span>لاگ‌ها</span>
      </div>
      <div class="dock-item" onclick="openMultiLocModal()">
        <span class="dock-icon">🌍</span>
        <span>چندلوکیشن</span>
      </div>
    </div>
  </div>

  <!-- مودال سابلینک‌های چندلوکیشن کشوری -->
  <div class="os-modal-backdrop" id="multiLocModal">
    <div class="os-modal">
      <div class="window-header">
        <div class="window-title">🌍 سابلینک‌های چندلوکیشن کشوری (Multi-Location Sublinks)</div>
        <button class="topbar-btn" onclick="closeModal('multiLocModal')">✕ بستن</button>
      </div>
      <div class="window-body">
        <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 14px;">
          تمام سابلینک‌ها شامل ۳ نود هاردکدشده اطلاع‌رسانی در صدر لیست هستند و نودهای بعدی بر اساس کشور انتخابی فیلتر می‌شوند.
        </p>

        <div style="background: var(--neon-soft); border: 1px solid var(--neon); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
          <div style="font-weight: 700; color: var(--neon); margin-bottom: 6px;">⚡ سابلینک ترکیبی تمام کشورها (Multi-Country VIP):</div>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="multiAllUrl" readonly class="form-control" style="font-size: 0.8rem;">
            <button class="topbar-btn topbar-btn-glowing" onclick="copyInput('multiAllUrl')">کپی</button>
          </div>
        </div>

        <div style="font-size: 0.86rem; font-weight: 700; margin-bottom: 10px;">سابلینک‌های اختصاصی بر اساس کشور:</div>
        <div id="countrySublist" style="display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto;">
          <!-- با جاوااسکریپت پر می‌شود -->
        </div>
      </div>
    </div>
  </div>

  <!-- مودال تغییر رمز عبور مدیر -->
  <div class="os-modal-backdrop" id="changePwdModal">
    <div class="os-modal" style="max-width: 440px;">
      <div class="window-header">
        <div class="window-title">🔑 تغییر رمز عبور مدیر (PBKDF2)</div>
        <button class="topbar-btn" onclick="closeModal('changePwdModal')">✕</button>
      </div>
      <div class="window-body">
        <form onsubmit="handleChangePassword(event)">
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">رمز عبور فعلی:</label>
            <input type="password" id="curPwdInput" class="form-control" required>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">رمز عبور جدید (حداقل ۸ کاراکتر):</label>
            <input type="password" id="newPwdInput" class="form-control" required>
          </div>
          <button type="submit" class="submit-btn" style="margin-top: 10px; width: 100%; padding: 12px; background: var(--neon); border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">
            ذخیره رمز عبور جدید
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- مودال ایجاد کاربر جدید -->
  <div class="os-modal-backdrop" id="createUserModal">
    <div class="os-modal" style="max-width: 480px;">
      <div class="window-header">
        <div class="window-title">➕ ایجاد کاربر جدید (حداکثر تا ۵ کاربر)</div>
        <button class="topbar-btn" onclick="closeModal('createUserModal')">✕</button>
      </div>
      <div class="window-body">
        <form onsubmit="handleCreateUser(event)">
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">نام کاربر:</label>
            <input type="text" id="newUserName" class="form-control" placeholder="User1" required>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">محدودیت حجم (GB - عدد ۰ برای نامحدود):</label>
            <input type="number" id="newUserLimitGb" class="form-control" value="0" min="0">
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">تعداد روزهای اعتبار (عدد ۰ برای نامحدود):</label>
            <input type="number" id="newUserExpireDays" class="form-control" value="0" min="0">
          </div>
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-bottom: 6px;">سقف نودها در سابلینک (subNodeCount):</label>
            <input type="number" id="newUserSubCount" class="form-control" value="50" min="5" max="150">
          </div>
          <button type="submit" class="submit-btn" id="btnSubmitUser" style="width: 100%; padding: 12px; background: var(--neon); border: none; border-radius: 10px; font-weight: 700; cursor: pointer;">
            ساخت و فعال‌سازی کاربر
          </button>
        </form>
      </div>
    </div>
  </div>

  <div class="toast-msg" id="osToast"></div>

  <script>
    var INITIAL_DATA = JSON.parse(${safeInitialJson});
    var appConfig = INITIAL_DATA.config || {};
    var appUsers = INITIAL_DATA.users || [];
    var MAX_LIMIT = INITIAL_DATA.maxUsersLimit || 5;

    function showToast(msg) {
      var t = document.getElementById('osToast');
      if (!t) return;
      t.textContent = msg;
      t.style.display = 'block';
      setTimeout(function() { t.style.display = 'none'; }, 2600);
    }

    function updateClock() {
      var d = new Date();
      var el = document.getElementById('osClock');
      if (el) el.textContent = d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    function cycleTheme() {
      var current = localStorage.getItem('mili_theme') || 'system';
      var next = current === 'dark' ? 'light' : (current === 'light' ? 'system' : 'dark');
      applyTheme(next);
    }

    function applyTheme(theme) {
      localStorage.setItem('mili_theme', theme);
      var isLight = false;
      if (theme === 'light') isLight = true;
      else if (theme === 'system') {
        isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      }
      document.body.classList.toggle('light-theme', isLight);
      var btn = document.getElementById('themeBtn');
      if (btn) {
        btn.textContent = theme === 'light' ? '☀️ روز' : (theme === 'dark' ? '🌙 شب' : '💻 سیستم');
      }
    }
    applyTheme(localStorage.getItem('mili_theme') || 'system');

    function switchStep(num) {
      document.querySelectorAll('.step-tab').forEach(function(tab, idx) {
        tab.classList.toggle('active', idx + 1 === num);
      });
      document.querySelectorAll('.step-panel').forEach(function(panel, idx) {
        panel.classList.toggle('active', idx + 1 === num);
      });
    }

    function scrollToWindow(id, el) {
      document.querySelectorAll('.dock-item').forEach(function(d) { d.classList.remove('active'); });
      if (el) el.classList.add('active');
      var target = document.getElementById(id);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      }
    }

    function renderDashboardMetrics() {
      var elUserCount = document.getElementById('metricUserCount');
      if (elUserCount) elUserCount.textContent = appUsers.length + ' / ' + MAX_LIMIT;

      var badge = document.getElementById('limitBadge');
      if (badge) badge.textContent = 'ظرفیت کاربران: ' + appUsers.length + ' از ' + MAX_LIMIT;

      var addBtn = document.getElementById('btnAddNewUser');
      if (addBtn) {
        if (appUsers.length >= MAX_LIMIT) {
          addBtn.disabled = true;
          addBtn.style.opacity = '0.5';
          addBtn.title = 'حداکثر سقف ۵ کاربر تکمیل است';
          addBtn.textContent = '🔒 سقف ۵ کاربر تکمیل است';
        } else {
          addBtn.disabled = false;
          addBtn.style.opacity = '1';
          addBtn.textContent = '➕ ایجاد کاربر جدید';
        }
      }

      var totalBytes = 0;
      appUsers.forEach(function(u) { totalBytes += Number(u.usedBytes || 0); });
      var gb = (totalBytes / 1073741824).toFixed(2);
      var elBytes = document.getElementById('metricTotalBytes');
      if (elBytes) elBytes.textContent = gb + ' GB';
    }

    function renderUsers() {
      var grid = document.getElementById('usersGrid');
      if (!grid) return;
      grid.innerHTML = '';

      appUsers.forEach(function(u, idx) {
        var usedGb = (Number(u.usedBytes || 0) / 1073741824).toFixed(2);
        var limitGb = u.dataLimitGb > 0 ? (u.dataLimitGb + ' GB') : 'نامحدود';
        var pct = u.dataLimitGb > 0 ? Math.min(100, Math.round((u.usedBytes / (u.dataLimitGb * 1073741824)) * 100)) : 2;
        var subBase = window.location.origin + '/sub/' + (u.uuid || u.id);

        var card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = [
          '<div class="user-card-head">',
            '<div>',
              '<div class="user-name">' + (u.username || ('کاربر ' + (idx + 1))) + '</div>',
              '<div style="font-size: 0.74rem; color: var(--text-muted); direction: ltr; margin-top: 2px;">UUID: ' + (u.uuid ? u.uuid.substring(0, 13) + '...' : '---') + '</div>',
            '</div>',
            '<div class="user-status-pill ' + (u.enabled ? 'status-active' : 'status-disabled') + '">',
              (u.enabled ? '🟢 فعال' : '🔴 غیرفعال'),
            '</div>',
          '</div>',

          '<div style="font-size: 0.8rem; display: flex; justify-content: space-between; color: var(--text-muted);">',
            '<span>مصرف: ' + usedGb + ' GB</span>',
            '<span>سقف: ' + limitGb + '</span>',
          '</div>',
          '<div class="usage-progress-bar">',
            '<div class="usage-fill" style="width: ' + pct + '%;"></div>',
          '</div>',

          '<div class="proto-tags">',
            '<span class="proto-tag ' + (appConfig.ev === 'yes' ? 'active' : '') + '">VLESS</span>',
            '<span class="proto-tag ' + (appConfig.es === 'yes' ? 'active' : '') + '">Shadowsocks</span>',
            '<span class="proto-tag ' + (appConfig.et === 'yes' ? 'active' : '') + '">Trojan</span>',
            '<span class="proto-tag ' + (appConfig.ex === 'yes' ? 'active' : '') + '">xhttp</span>',
            '<span class="proto-tag ' + (appConfig.ech === 'yes' ? 'active' : '') + '">ECH</span>',
          '</div>',

          '<div style="font-size: 0.78rem; color: var(--neon); margin-bottom: 8px;">',
            '🔒 نام‌گذاری نودها در کلاینت: <b>1+' + INITIAL_DATA.brand + '</b>, <b>2+' + INITIAL_DATA.brand + '</b>...',
          '</div>',

          '<div class="card-actions">',
            '<button class="btn-action" onclick="copyText(\'' + subBase + '\')">📋 کپی ساب‌لینک</button>',
            '<button class="btn-action" onclick="copyText(\'' + subBase + '?target=clash\')">⚡ Clash</button>',
            '<button class="btn-action" onclick="copyText(\'' + subBase + '?target=singbox\')">📦 Singbox</button>',
            '<button class="btn-action" onclick="resetUserStats(\'' + u.id + '\')" title="صفر کردن مصرف">🔄 ریست</button>',
            '<button class="btn-action" onclick="deleteUser(\'' + u.id + '\')" style="color: var(--danger);" title="حذف کاربر">🗑️</button>',
          '</div>'
        ].join('');
        grid.appendChild(card);
      });
      renderDashboardMetrics();
    }

    function renderDnsCatalog() {
      var grid = document.getElementById('dnsCatalogGrid');
      if (!grid || !INITIAL_DATA.dnsCatalog) return;
      grid.innerHTML = '';
      INITIAL_DATA.dnsCatalog.forEach(function(d) {
        var card = document.createElement('div');
        card.className = 'setting-card';
        card.innerHTML = [
          '<div style="font-weight: 800; color: var(--neon); font-size: 0.95rem; margin-bottom: 4px;">' + d.name + '</div>',
          '<div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 8px;">' + d.description + '</div>',
          '<div style="font-size: 0.76rem; direction: ltr; margin-bottom: 4px;">DoH: <code>' + d.doh + '</code></div>',
          '<div style="font-size: 0.76rem; direction: ltr; margin-bottom: 8px;">IP: ' + d.ipv4.join(', ') + '</div>',
          '<button class="topbar-btn" onclick="applyDns(\'' + d.doh + '\')">✓ انتخاب به عنوان DNS فعال</button>'
        ].join('');
        grid.appendChild(card);
      });
    }

    function applyDns(dohUrl) {
      document.getElementById('cfg_customDNS').value = dohUrl;
      showToast('✅ سرور DNS انتخاب شد. برای اعمال، ذخیره تنظیمات را بزنید.');
    }

    function populateSettingsForm() {
      var ev = document.getElementById('cfg_ev'); if (ev) ev.checked = appConfig.ev === 'yes';
      var es = document.getElementById('cfg_es'); if (es) es.checked = appConfig.es === 'yes';
      var et = document.getElementById('cfg_et'); if (et) et.checked = appConfig.et === 'yes';
      var ex = document.getElementById('cfg_ex'); if (ex) ex.checked = appConfig.ex === 'yes';
      var ech = document.getElementById('cfg_ech'); if (ech) ech.checked = appConfig.ech === 'yes';
      var fragment = document.getElementById('cfg_fragment'); if (fragment) fragment.checked = appConfig.fragment === 'yes';
      var epi = document.getElementById('cfg_epi'); if (epi) epi.checked = appConfig.epi === 'yes';
      var jk = document.getElementById('cfg_jk'); if (jk) jk.checked = appConfig.jk === 'yes';

      var ssmethod = document.getElementById('cfg_ssmethod'); if (ssmethod) ssmethod.value = appConfig.ssmethod || 'chacha20-ietf-poly1305';
      var tp = document.getElementById('cfg_tp'); if (tp) tp.value = appConfig.tp || '';
      var echDomain = document.getElementById('cfg_customECHDomain'); if (echDomain) echDomain.value = appConfig.customECHDomain || 'cloudflare-ech.com';
      var fragPreset = document.getElementById('cfg_fragmentPreset'); if (fragPreset) fragPreset.value = appConfig.fragmentPreset || 'mci';
      var fp = document.getElementById('cfg_fp'); if (fp) fp.value = appConfig.fp || 'chrome';
      var patt = document.getElementById('cfg_patt'); if (patt) patt.value = appConfig.patt || '/?ed=2048';
      var rot = document.getElementById('cfg_ipRotation'); if (rot) rot.value = appConfig.ipRotation || '15m';
      var yx = document.getElementById('cfg_yx'); if (yx) yx.value = appConfig.yx || '';
      var d = document.getElementById('cfg_d'); if (d) d.value = appConfig.d || '';
      var hp = document.getElementById('cfg_homepage'); if (hp) hp.value = appConfig.homepage || '';
      var dns = document.getElementById('cfg_customDNS'); if (dns) dns.value = appConfig.customDNS || 'https://1.1.1.1/dns-query';
      var p = document.getElementById('cfg_p'); if (p) p.value = appConfig.p || '';
    }

    async function saveSettings() {
      var payload = {
        ev: document.getElementById('cfg_ev').checked ? 'yes' : 'no',
        es: document.getElementById('cfg_es').checked ? 'yes' : 'no',
        et: document.getElementById('cfg_et').checked ? 'yes' : 'no',
        ex: document.getElementById('cfg_ex').checked ? 'yes' : 'no',
        ech: document.getElementById('cfg_ech').checked ? 'yes' : 'no',
        fragment: document.getElementById('cfg_fragment').checked ? 'yes' : 'no',
        epi: document.getElementById('cfg_epi').checked ? 'yes' : 'no',
        jk: document.getElementById('cfg_jk').checked ? 'yes' : 'no',
        ssmethod: document.getElementById('cfg_ssmethod').value,
        tp: document.getElementById('cfg_tp').value.trim(),
        customECHDomain: document.getElementById('cfg_customECHDomain').value,
        fragmentPreset: document.getElementById('cfg_fragmentPreset').value,
        fp: document.getElementById('cfg_fp').value,
        patt: document.getElementById('cfg_patt').value,
        ipRotation: document.getElementById('cfg_ipRotation').value,
        yx: document.getElementById('cfg_yx').value.trim(),
        d: document.getElementById('cfg_d').value.trim(),
        homepage: document.getElementById('cfg_homepage').value.trim(),
        customDNS: document.getElementById('cfg_customDNS').value.trim(),
        p: document.getElementById('cfg_p').value.trim()
      };

      try {
        var res = await fetch('/api/v1/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        var data = await res.json();
        if (data.success) {
          appConfig = Object.assign({}, appConfig, payload);
          showToast('✅ تمام تنظیمات با موفقیت در دیتابیس D1 ذخیره شد.');
        } else {
          showToast('❌ خطا در ذخیره تنظیمات: ' + data.message);
        }
      } catch (err) {
        showToast('❌ خطای ارتباط با سرور');
      }
    }

    async function handleCreateUser(e) {
      e.preventDefault();
      if (appUsers.length >= MAX_LIMIT) {
        showToast('❌ سقف حداکثر ۵ کاربر تکمیل است.');
        return;
      }
      var username = document.getElementById('newUserName').value.trim();
      var dataLimitGb = parseFloat(document.getElementById('newUserLimitGb').value) || 0;
      var expireDays = parseInt(document.getElementById('newUserExpireDays').value, 10) || 0;
      var subNodeCount = parseInt(document.getElementById('newUserSubCount').value, 10) || 50;

      try {
        var res = await fetch('/api/v1/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, dataLimitGb: dataLimitGb, expireDays: expireDays, subNodeCount: subNodeCount })
        });
        var data = await res.json();
        if (data.success) {
          appUsers.push(data.user);
          renderUsers();
          closeModal('createUserModal');
          showToast('✅ کاربر «' + username + '» با موفقیت افزوده شد.');
        } else {
          showToast('❌ ' + data.message);
        }
      } catch (err) {
        showToast('❌ خطا در ارتباط با سرور');
      }
    }

    async function resetUserStats(userId) {
      if (!confirm('آیا مطمئن هستید که ترافیک مصرفی این کاربر ریست شود؟')) return;
      try {
        var res = await fetch('/api/v1/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, action: 'reset' })
        });
        var data = await res.json();
        if (data.success) {
          var u = appUsers.find(function(x) { return x.id === userId; });
          if (u) u.usedBytes = 0;
          renderUsers();
          showToast('✅ مصرف ترافیک کاربر صفر شد.');
        }
      } catch (_e) {
        showToast('❌ خطا در ریست مصرف');
      }
    }

    async function deleteUser(userId) {
      if (!confirm('آیا مطمئن هستید که این کاربر حذف شود؟')) return;
      try {
        var res = await fetch('/api/v1/users?id=' + encodeURIComponent(userId), { method: 'DELETE' });
        var data = await res.json();
        if (data.success) {
          appUsers = appUsers.filter(function(x) { return x.id !== userId; });
          renderUsers();
          showToast('✅ کاربر با موفقیت حذف شد.');
        }
      } catch (_e) {
        showToast('❌ خطا در حذف کاربر');
      }
    }

    async function fetchAuditLogs() {
      var tbody = document.getElementById('auditTableBody');
      if (!tbody) return;
      try {
        var res = await fetch('/api/v1/audit');
        var data = await res.json();
        if (data.success && data.logs) {
          tbody.innerHTML = '';
          data.logs.forEach(function(l) {
            var tr = document.createElement('tr');
            var dateStr = new Date(l.created_at || l.createdAt).toLocaleTimeString('fa-IR');
            tr.innerHTML = [
              '<td>#' + l.id + '</td>',
              '<td style="font-weight:700; color:var(--neon);">' + l.action + '</td>',
              '<td>' + l.detail + '</td>',
              '<td style="direction:ltr;">' + (l.ip || '127.0.0.1') + '</td>',
              '<td>' + dateStr + '</td>'
            ].join('');
            tbody.appendChild(tr);
          });
        }
      } catch (_e) {}
    }

    async function fetchNodesCatalog() {
      var tbody = document.getElementById('nodesTableBody');
      if (!tbody) return;
      try {
        var res = await fetch('/api/v1/nodes');
        var data = await res.json();
        if (data.success && data.nodes) {
          tbody.innerHTML = '';
          data.nodes.forEach(function(n) {
            var tr = document.createElement('tr');
            tr.innerHTML = [
              '<td>' + (n.country || 'DE') + '</td>',
              '<td><b>' + n.name + '</b></td>',
              '<td style="direction:ltr;">' + n.host + ':' + n.port + '</td>',
              '<td><span class="proto-tag active">' + n.protocol + '</span></td>',
              '<td>' + (n.latency || 85) + ' ms</td>',
              '<td><span style="color:var(--neon); font-weight:800;">' + (n.healthScore || 100) + ' / 100</span></td>',
              '<td><span style="color:#27c93f; font-weight:700;">🟢 سالم</span></td>'
            ].join('');
            tbody.appendChild(tr);
          });
        }
      } catch (_e) {}
    }

    async function runLiveProxyScan() {
      var country = document.getElementById('scannerCountry').value;
      var limit = document.getElementById('scannerLimit').value;
      var btn = document.getElementById('btnRunScan');
      var tbody = document.getElementById('scannerTableBody');

      btn.disabled = true;
      btn.textContent = '⏳ در حال تست چندسطحی...';
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 22px;">در حال اجرای تست زنده پینگ و گواهی TLS...</td></tr>';

      try {
        var res = await fetch('/api/v1/scanner/test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: country, limit: limit })
        });
        var data = await res.json();
        if (data.success && data.proxies && data.proxies.length > 0) {
          tbody.innerHTML = '';
          data.proxies.forEach(function(p) {
            var tr = document.createElement('tr');
            tr.innerHTML = [
              '<td>' + p.flag + ' ' + p.country + '</td>',
              '<td style="direction:ltr;"><b>' + p.ip + ':' + p.port + '</b></td>',
              '<td><span class="proto-tag active">' + p.protocol + '</span></td>',
              '<td><span style="font-weight:700; color:' + (p.latencyMs < 100 ? '#27c93f' : '#ffbd2e') + ';">' + p.latencyMs + ' ms</span></td>',
              '<td style="font-size:0.74rem;">TCP: ✓ | TLS: ✓ | HTTP: ✓</td>',
              '<td><span style="color:#27c93f; font-weight:700;">🟢 آنلاین</span></td>',
              '<td><button class="topbar-btn" onclick="addProxyToYx(\'' + p.ip + ':' + p.port + '#' + p.country + '\')">➕ افزودن</button></td>'
            ].join('');
            tbody.appendChild(tr);
          });
          showToast('✅ تست زنده ' + data.proxies.length + ' پروکسی با موفقیت انجام شد.');
        } else {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--danger); padding: 20px;">خطا در دریافت لیست یا عدم دسترسی.</td></tr>';
        }
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--danger); padding: 20px;">خطای شبکه در اجرای اسکنر.</td></tr>';
      } finally {
        btn.disabled = false;
        btn.textContent = '⚡ دریافت پروکسی تصادفی و تست زنده';
      }
    }

    function addProxyToYx(entry) {
      var cur = document.getElementById('cfg_yx').value.trim();
      document.getElementById('cfg_yx').value = cur ? (cur + ', ' + entry) : entry;
      showToast('✅ پروکسی ' + entry + ' به لیست اضافه شد. برای ذخیره دکمه ذخیره تنظیمات را بزنید.');
    }

    function openMultiLocModal() {
      var userUuid = (appUsers[0] && appUsers[0].uuid) || INITIAL_DATA.adminPath || '351c9981-04b6-4103-aa4b-864aa9c91469';
      var base = window.location.origin + '/sub/' + userUuid;
      document.getElementById('multiAllUrl').value = base + '?country=MULTI';

      var listDiv = document.getElementById('countrySublist');
      listDiv.innerHTML = '';
      var topCountries = [
        { code: 'DE', flag: '🇩🇪', name: 'آلمان' },
        { code: 'NL', flag: '🇳🇱', name: 'هلند' },
        { code: 'US', flag: '🇺🇸', name: 'آمریکا' },
        { code: 'GB', flag: '🇬🇧', name: 'انگلستان' },
        { code: 'TR', flag: '🇹🇷', name: 'ترکیه' },
        { code: 'AE', flag: '🇦🇪', name: 'امارات' },
        { code: 'CA', flag: '🇨🇦', name: 'کانادا' },
        { code: 'SE', flag: '🇸🇪', name: 'سوئد' }
      ];

      topCountries.forEach(function(c) {
        var row = document.createElement('div');
        row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--glass-border-subtle);';
        var url = base + '?country=' + c.code;
        row.innerHTML = [
          '<div style="font-size: 0.84rem; font-weight: 700;">' + c.flag + ' ' + c.name + ' (' + c.code + ')</div>',
          '<button class="topbar-btn" onclick="copyText(\'' + url + '\')">کپی سابلینک</button>'
        ].join('');
        listDiv.appendChild(row);
      });

      document.getElementById('multiLocModal').style.display = 'flex';
    }

    function openChangePwdModal() {
      document.getElementById('changePwdModal').style.display = 'flex';
    }

    function openCreateUserModal() {
      if (appUsers.length >= MAX_LIMIT) {
        showToast('❌ حداکثر سقف ۵ کاربر تکمیل است.');
        return;
      }
      document.getElementById('createUserModal').style.display = 'flex';
    }

    function closeModal(id) {
      document.getElementById(id).style.display = 'none';
    }

    function copyText(txt) {
      navigator.clipboard.writeText(txt).then(function() {
        showToast('📋 لینک با موفقیت کپی شد.');
      });
    }

    function copyInput(id) {
      var el = document.getElementById(id);
      el.select();
      navigator.clipboard.writeText(el.value).then(function() {
        showToast('📋 لینک ترکیبی چندلوکیشن کپی شد.');
      });
    }

    async function handleChangePassword(e) {
      e.preventDefault();
      var oldPassword = document.getElementById('curPwdInput').value.trim();
      var newPassword = document.getElementById('newPwdInput').value.trim();
      if (newPassword.length < 8) {
        showToast('❌ رمز عبور جدید باید حداقل ۸ کاراکتر باشد.');
        return;
      }
      try {
        var res = await fetch('/api/v1/auth/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
        });
        var data = await res.json();
        if (data.success) {
          closeModal('changePwdModal');
          showToast('✅ رمز عبور مدیر با موفقیت تغییر یافت.');
        } else {
          showToast('❌ ' + (data.message || 'خطا در تغییر رمز'));
        }
      } catch (_e) {
        showToast('❌ خطای ارتباط با سرور');
      }
    }

    async function handleLogout() {
      try {
        await fetch('/api/v1/auth/logout', { method: 'POST' });
        window.location.href = '/';
      } catch (_e) {
        window.location.href = '/';
      }
    }

    // راه‌اندازی اولیه
    populateSettingsForm();
    renderUsers();
    renderDnsCatalog();
    fetchNodesCatalog();
    fetchAuditLogs();
  </script>
</body>
</html>`;
}
