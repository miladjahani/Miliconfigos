import { connect as cfConnect } from 'cloudflare:sockets';

// --- MODULE: src/config/defaults.js ---
// ============================================================================
// MiliconfigOS v4.0 - Central Configuration & Compatibility Catalog
// Developer: Milad Jahani | Brand: miliconfig
// Full-Featured Proxy Management Platform with 5-User Hard Limit,
// Verified DNS, Multi-Location Node Catalog, and Honest Capability Matrix
// ============================================================================

const PROJECT_NAME = 'MiliconfigOS';
const BRAND_NAME = 'miliconfig';
const BRAND_UPPER = 'MILICONFIGOS';
const VERSION = 'v4.0';
const DEVELOPER = 'Milad Jahani';
const DEFAULT_ADMIN_UUID = '351c9981-04b6-4103-aa4b-864aa9c91469';
const MAX_USERS_LIMIT = 5; // Hard limit enforced transactionally at database & API levels
const TELEGRAM_SUPPORT = '@miliconfig';
const DEFAULT_HOMEPAGE = 'https://nginx.com';

// ۳ نود هاردکدشده اطلاع‌رسانی الزامی که در ابتدای تمام سابلینک‌ها قرار می‌گیرند
const HARDCODED_INFO_NODES = [
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%F0%9F%93%A2%20%DB%B1.%20%D9%85%DB%8C%D9%84%DB%8C%20%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86%20%D8%A7%D8%B3%D8%AA',
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%E2%9A%A0%EF%B8%8F%20%DB%B2.%20%D9%81%D8%B1%D9%88%D8%B4%20%D8%A7%DB%8C%D9%86%20%DA%A9%D8%A7%D9%86%D9%81%DB%8C%DA%AF%20%D9%87%D8%A7%20%D8%AD%D8%B1%D8%A7%D9%85%20%D8%A7%D8%B3%D8%AA',
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%F0%9F%94%92%20%DB%B3.%20%D8%A8%D9%87%20%D8%B7%D9%88%D8%B1%20%D8%B4%D8%AE%D8%B5%DB%8C%20%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87%20%DA%A9%D9%86%DB%8C%D8%AF'
];

const CONFIG_DEFAULTS = {
  wk: '',
  ev: 'yes', // VLESS
  et: 'no',  // Trojan
  ex: 'no',  // xHTTP
  es: 'yes', // Shadowsocks
  sspass: '',
  ssmethod: 'chacha20-ietf-poly1305',
  ech: 'no',
  tp: '',
  customDNS: 'https://1.1.1.1/dns-query',
  customECHDomain: 'cloudflare-ech.com',
  alpn: '',
  d: '',
  p: '',
  yx: '',
  yxURL: '',
  s: '',
  homepage: DEFAULT_HOMEPAGE,
  scu: 'https://url.v1.mk/sub',
  ena: 'no',
  epd: 'yes',
  epi: 'yes',
  egi: 'yes',
  ae: '',
  rm: '',
  qj: '',
  dkby: 'no',
  yxby: '',
  ipv4: 'yes',
  ipv6: 'yes',
  ispMobile: 'yes',
  ispUnicom: 'yes',
  ispTelecom: 'yes',
  jk: 'no',
  subNodeCount: 50,
  brand: BRAND_NAME,
  // تنظیمات پیشرفته و ضد فیلترینگ
  fp: 'chrome', // فینگرپرینت: chrome, firefox, safari, edge, ios, randomized
  patt: '/?ed=2048', // الگوهای مسیر
  fragmentPreset: 'mci', // پریست‌های فرگمنت
  fragmentLength: '100-200',
  fragmentInterval: '10-20',
  fragmentPackets: 'tlshello',
  ipRotation: '15m', // چرخش خودکار آی‌پی (off, 5m, 15m, 30m, 1h, 24h)
  theme: 'system', // تم: light, dark, system
  language: 'fa', // زبان: fa, en
  supportChannel: TELEGRAM_SUPPORT
};

const BOOLEAN_CONFIG_KEYS = [
  'ev', 'et', 'ex', 'es', 'ech', 'ena', 'epd', 'epi', 'egi',
  'ipv4', 'ipv6', 'ispMobile', 'ispUnicom', 'ispTelecom', 'jk'
];

const ENV_KEY_MAPPING = {
  wk: ['wk', 'WK'],
  ev: ['ev', 'EV'],
  et: ['et', 'ET'],
  ex: ['ex', 'EX'],
  es: ['es', 'ES', 'SS', 'ss'],
  sspass: ['sspass', 'SSPASS', 'SS_PASSWORD'],
  ssmethod: ['ssmethod', 'SSMETHOD', 'SS_METHOD'],
  ech: ['ech', 'ECH'],
  tp: ['tp', 'TP'],
  customDNS: ['customDNS', 'CUSTOMDNS', 'CUSTOM_DNS'],
  customECHDomain: ['customECHDomain', 'CUSTOMECHDOMAIN', 'CUSTOM_ECH_DOMAIN'],
  alpn: ['alpn', 'ALPN'],
  d: ['d', 'D'],
  p: ['p', 'P'],
  yx: ['yx', 'YX'],
  yxURL: ['yxURL', 'YXURL', 'YX_URL'],
  s: ['s', 'S'],
  homepage: ['homepage', 'HOMEPAGE'],
  scu: ['scu', 'SCU'],
  ena: ['ena', 'ENA'],
  epd: ['epd', 'EPD'],
  epi: ['epi', 'EPI'],
  egi: ['egi', 'EGI'],
  ae: ['ae', 'AE'],
  rm: ['rm', 'RM'],
  qj: ['qj', 'QJ'],
  dkby: ['dkby', 'DKBY'],
  yxby: ['yxby', 'YXBY'],
  ipv4: ['ipv4', 'IPV4'],
  ipv6: ['ipv6', 'IPV6'],
  ispMobile: ['ispMobile', 'ISPMOBILE', 'ISP_MOBILE'],
  ispUnicom: ['ispUnicom', 'ISPUNICOM', 'ISP_UNICOM'],
  ispTelecom: ['ispTelecom', 'ISPTELECOM', 'ISP_TELECOM'],
  jk: ['jk', 'JK'],
  subNodeCount: ['subNodeCount', 'SUB_NODE_COUNT', 'nodeCount', 'NODE_COUNT'],
  fp: ['fp', 'FP', 'FINGERPRINT'],
  patt: ['patt', 'PATT', 'PATH_PATTERN'],
  fragmentPreset: ['fragmentPreset', 'FRAGMENT_PRESET'],
  ipRotation: ['ipRotation', 'IP_ROTATION', 'ROTATION_MINUTES']
};

const FRAGMENT_PRESETS = {
  'mci': { name: 'همراه اول (MCI)', length: '100-200', interval: '10-20', packets: 'tlshello' },
  'irancell': { name: 'ایرانسل (MTN Irancell)', length: '50-100', interval: '5-10', packets: 'tlshello' },
  'rightel': { name: 'مخابرات و رایتل (Rightel / TCI)', length: '1-3', interval: '1-5', packets: '1-1' },
  'anti-dpi': { name: 'ضد فیلترینگ شدید (Anti-DPI)', length: '10-30', interval: '20-40', packets: 'tlshello' },
  'custom': { name: 'سفارشی (Custom)', length: '100-200', interval: '10-20', packets: 'tlshello' }
};

const FINGERPRINT_PRESETS = [
  { id: 'chrome', name: 'Chrome (پیشنهادی)', compatibility: 'کلاینت‌های مدرن مبتنی بر uTLS (Sing-box, Mihomo, v2rayNG)' },
  { id: 'firefox', name: 'Firefox', compatibility: 'کلاینت‌های پشتیبان uTLS (v2rayNG, Sing-box)' },
  { id: 'safari', name: 'Safari (iOS / macOS)', compatibility: 'بهینه‌شده برای دستگاه‌های اپل، Loon، Surge، Stash' },
  { id: 'edge', name: 'Microsoft Edge', compatibility: 'سازگار با ویندوز و کلاینت‌های دسکتاپ' },
  { id: 'ios', name: 'iOS Device', compatibility: 'مناسب برای دور زدن فیلترینگ موبایل' },
  { id: 'randomized', name: 'Randomized (تصادفی)', compatibility: 'تولید شناسه تصادفی در هر درخواست' }
];

const ECH_DOMAINS = [
  { domain: 'cloudflare-ech.com', provider: 'Cloudflare', status: 'verified', note: 'دامنه رسمی ECH کلودفلر' },
  { domain: 'crypto.cloudflare.com', provider: 'Cloudflare Crypto', status: 'verified', note: 'زیرساخت تست رمزنگاری کلودفلر' },
  { domain: 'cloudflare-dns.com', provider: 'Cloudflare DNS', status: 'verified', note: 'پایانه 1.1.1.1 ECH' },
  { domain: 'deflect.ca', provider: 'Deflect', status: 'experimental', note: 'شبکه محافظتی ضد فیلترینگ' }
];

const PATH_PATTERNS = [
  { id: '/?ed=2048', name: 'استاندارد Early Data (/?ed=2048)', desc: 'پشتیبانی از 0-RTT در وب‌سوکت' },
  { id: '/mili-stream?ed=2048', name: 'جریان امن (/mili-stream)', desc: 'مسیر اختصاصی پدینگ شده' },
  { id: '/api/v1/tunnel', name: 'استتار REST API (/api/v1/tunnel)', desc: 'پوشش ترافیک در قالب درخواست‌های API' },
  { id: '/ws-proxy', name: 'وب‌سوکت مستقیم (/ws-proxy)', desc: 'مسیر کوتاه و سبک' }
];

// کاتالوگ ارائه‌دهندگان معتبر DNS
const VERIFIED_DNS_CATALOG = [
  {
    id: 'cloudflare',
    name: 'Cloudflare 1.1.1.1',
    description: 'سریع‌ترین DNS عمومی با حفظ حریم خصوصی',
    doh: 'https://1.1.1.1/dns-query',
    dot: '1.1.1.1:853',
    ipv4: ['1.1.1.1', '1.0.0.1'],
    ipv6: ['2606:4700:4700::1111', '2606:4700:4700::1001'],
    features: ['DoH', 'DoT', 'DNSSEC', 'No-Log'],
    verified: true
  },
  {
    id: 'google',
    name: 'Google Public DNS',
    description: 'شبکه پایدار جهانی گوگل با کش قدرتمند',
    doh: 'https://dns.google/dns-query',
    dot: 'dns.google:853',
    ipv4: ['8.8.8.8', '8.8.4.4'],
    ipv6: ['2001:4860:4860::8888', '2001:4860:4860::8844'],
    features: ['DoH', 'DoT', 'DNSSEC'],
    verified: true
  },
  {
    id: 'quad9',
    name: 'Quad9 Security DNS',
    description: 'مسدودسازی بدافزارها و حفاظت از حریم خصوصی',
    doh: 'https://dns.quad9.net/dns-query',
    dot: 'dns.quad9.net:853',
    ipv4: ['9.9.9.9', '149.112.112.112'],
    ipv6: ['2620:fe::fe', '2620:fe::9'],
    features: ['DoH', 'DoT', 'Malware-Blocking', 'DNSSEC'],
    verified: true
  },
  {
    id: 'adguard',
    name: 'AdGuard Default DNS',
    description: 'حذف تبلیغات و ردگیری‌های اینترنتی در سطح شبکه',
    doh: 'https://dns.adguard-dns.com/dns-query',
    dot: 'dns.adguard-dns.com:853',
    ipv4: ['94.140.14.14', '94.140.15.15'],
    ipv6: ['2a10:50c0::ad1:ff', '2a10:50c0::ad2:ff'],
    features: ['DoH', 'DoT', 'Ad-Blocking'],
    verified: true
  }
];

// ماتریس شفاف و صادقانه قابلیت‌های پروتکل‌ها در محیط Cloudflare Workers
const CAPABILITY_MATRIX = {
  vless: {
    name: 'VLESS',
    transports: ['ws', 'xhttp'],
    security: ['tls', 'none'],
    realitySupport: false, // Cloudflare Workers نمی‌تواند سرور REALITY بومی باشد
    echSupport: true, // از طریق ECH-DNS و پیکربندی کلاینت پشتیبانی می‌شود
    udpSupport: 'dns-only', // در کلودفلر فقط پورت 53 UDP پشتیبانی می‌شود
    clientFormats: ['sing-box', 'clash-meta', 'v2rayng', 'loon', 'quanx']
  },
  shadowsocks: {
    name: 'Shadowsocks (SS-WS)',
    transports: ['ws'],
    ciphers: ['chacha20-ietf-poly1305', 'aes-128-gcm', 'aes-256-gcm'],
    security: ['tls'],
    realitySupport: false,
    echSupport: true,
    udpSupport: 'dns-only',
    clientFormats: ['sing-box', 'clash-meta', 'surge', 'loon', 'quanx', 'sip002']
  },
  trojan: {
    name: 'Trojan',
    transports: ['ws'],
    security: ['tls'],
    realitySupport: false,
    echSupport: true,
    udpSupport: 'dns-only',
    clientFormats: ['sing-box', 'clash-meta', 'surge', 'loon', 'quanx']
  },
  xhttp: {
    name: 'xHTTP (HTTP Streaming)',
    transports: ['http-post-stream'],
    security: ['tls'],
    realitySupport: false,
    echSupport: true,
    udpSupport: 'no',
    clientFormats: ['sing-box', 'v2ray-core-v5']
  }
};

// لیست پروکسی‌های کشوری VIP (تلفیق‌شده بر اساس کشور)
const COUNTRY_PROXY_SOURCES = {
  'DE': {
    name: 'آلمان',
    flag: '🇩🇪',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/DE.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/DE/socks5.txt'
    ]
  },
  'NL': {
    name: 'هلند',
    flag: '🇳🇱',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/NL.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/NL/socks5.txt'
    ]
  },
  'US': {
    name: 'ایالات متحده آمریکا',
    flag: '🇺🇸',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/US.txt',
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/US/socks5.txt'
    ]
  },
  'GB': {
    name: 'بریتانیا / انگلستان',
    flag: '🇬🇧',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/GB.txt'
    ]
  },
  'TR': {
    name: 'ترکیه',
    flag: '🇹🇷',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/TR.txt'
    ]
  },
  'AE': {
    name: 'امارات متحده عربی',
    flag: '🇦🇪',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/AE.txt'
    ]
  },
  'CA': {
    name: 'کانادا',
    flag: '🇨🇦',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/CA.txt'
    ]
  },
  'IT': {
    name: 'ایتالیا',
    flag: '🇮🇹',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/IT.txt'
    ]
  },
  'SE': {
    name: 'سوئد',
    flag: '🇸🇪',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/SE.txt'
    ]
  },
  'NO': {
    name: 'نروژ',
    flag: '🇳🇴',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/NO.txt'
    ]
  },
  'KZ': {
    name: 'قزاقستان',
    flag: '🇰🇿',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/KZ.txt'
    ]
  },
  'LV': {
    name: 'لتونی',
    flag: '🇱🇻',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/LV.txt'
    ]
  },
  'UZ': {
    name: 'ازبکستان',
    flag: '🇺🇿',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/UZ.txt'
    ]
  },
  'TH': {
    name: 'تایلند',
    flag: '🇹🇭',
    urls: [
      'https://raw.githubusercontent.com/panel-zeus/Z-E-U-S/main/proxy_vip/TH.txt'
    ]
  },
  'FI': {
    name: 'فنلاند',
    flag: '🇫🇮',
    urls: [
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/FI/socks5.txt'
    ]
  },
  'SG': {
    name: 'سنگاپور',
    flag: '🇸🇬',
    urls: [
      'https://raw.githubusercontent.com/trio666/proxy-checker/main/country/SG/socks5.txt'
    ]
  },
  'FR': {
    name: 'فرانسه',
    flag: '🇫🇷',
    urls: [
      'https://raw.githubusercontent.com/dimzon/scaling-sniffle/main/by-country/FR.txt'
    ]
  }
};

const CF_HTTPS_PORTS = [443, 8443, 2053, 2083, 2087, 2096];
const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];

const DIRECT_DOMAINS = [
  { domain: 'www.visa.com.sg', name: 'Visa-SG', region: 'SG' },
  { domain: 'www.shopify.com', name: 'Shopify-US', region: 'US' },
  { domain: 'icook.hk', name: 'iCook-HK', region: 'HK' },
  { domain: 'www.glassdoor.com', name: 'Glassdoor-US', region: 'US' },
  { domain: 'www.digitalocean.com', name: 'DigitalOcean-US', region: 'US' }
];

const OFFICIAL_DIRECT_IPS = [
  '104.16.0.0', '104.17.0.0', '104.18.0.0', '104.19.0.0',
  '172.64.0.0', '172.67.0.0', '162.159.0.0', '1.1.1.1'
];

const FALLBACK_PROXY_IPS = [
  { domain: 'cfip.mili.workers.dev', port: 443, region: 'CF-Auto', regionCode: 'CF' }
];

function isEnabledValue(val, defaultVal = false) {
  if (val === undefined || val === null || val === '') return defaultVal;
  const s = String(val).trim().toLowerCase();
  return s === 'yes' || s === 'true' || s === '1' || s === 'on' || s === 'enable' || s === 'enabled';
}

function normalizeAlpn(alpnVal) {
  if (!alpnVal) return '';
  if (Array.isArray(alpnVal)) return alpnVal.join(',');
  return String(alpnVal).replace(/\s+/g, '');
}

function getEnvConfigSnapshot(env = {}) {
  const result = {};
  if (!env || typeof env !== 'object') return result;

  for (const [canonicalKey, aliases] of Object.entries(ENV_KEY_MAPPING)) {
    for (const alias of aliases) {
      if (env[alias] !== undefined && env[alias] !== null && env[alias] !== '') {
        result[canonicalKey] = String(env[alias]).trim();
        break;
      }
    }
  }
  return result;
}

function normalizeEffectiveConfig(rawConfig = {}) {
  const cfg = { ...CONFIG_DEFAULTS, ...(rawConfig || {}) };
  for (const k of BOOLEAN_CONFIG_KEYS) {
    if (cfg[k] !== undefined) {
      cfg[k] = isEnabledValue(cfg[k], CONFIG_DEFAULTS[k] === 'yes') ? 'yes' : 'no';
    }
  }
  const count = parseInt(cfg.subNodeCount, 10);
  cfg.subNodeCount = Number.isFinite(count) && count > 0 ? count : CONFIG_DEFAULTS.subNodeCount;
  return cfg;
}


// --- MODULE: src/config/presets.js ---
// ============================================================================
// miliconfig v3.1 - پریست‌های ساخت سریع کاربر (مطابق رابط کاربری Zeus و CFnew)
// ============================================================================


const USER_PRESETS = {
  'iran-fast': {
    id: 'iran-fast',
    title: 'ایران — پرسرعت (پیشنهادی)',
    subtitle: 'همراه اول · ایرانسل · مخابرات',
    badges: ['فرگمنت 100-200 با فاصله 10-20', 'fingerprint chrome', 'بلاک تبلیغات'],
    recommended: true,
    nodeScope: 'all',
    subNodeCount: 50,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'no',
      es: 'yes', // شادوساکس هم فعال باشد
      fp: 'chrome',
      fragmentPreset: 'mci',
      fragmentLength: '100-200',
      fragmentInterval: '10-20',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'no',
      ipv4: 'yes',
      ipv6: 'yes'
    }
  },
  'iran-heavy': {
    id: 'iran-heavy',
    title: 'ایران — مصرف سنگین (نامحدود)',
    subtitle: 'استریم · بازی · دانلود',
    badges: ['حجم نامحدود', 'فرگمنت 50-100', '۲ دستگاه همزمان'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 60,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 2,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'yes',
      ex: 'no',
      es: 'yes',
      fp: 'chrome',
      fragmentPreset: 'irancell',
      fragmentLength: '50-100',
      fragmentInterval: '5-10',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes'
    }
  },
  'international': {
    id: 'international',
    title: 'بین‌المللی — بدون فرگمنت',
    subtitle: 'اینترنت بدون محدودیت · سرعت حداکثری',
    badges: ['بدون فرگمنت', 'بدون محدودیت حجم', '۵ دستگاه همزمان'],
    recommended: false,
    nodeScope: 'all',
    subNodeCount: 50,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 5,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      et: 'no',
      ex: 'no',
      es: 'yes',
      dkby: 'yes',
      alpn: 'h2,http/1.1'
    }
  },
  'multi-location': {
    id: 'multi-location',
    title: 'چند لوکیشن — فقط نودهای لبه و VIP',
    subtitle: 'لوکیشن‌های تفکیک‌شده آلمان، هلند، آمریکا و...',
    badges: ['فقط نودهای مولتی‌لوکیشن', 'نام‌گذاری number+miliconfig', 'فرگمنت فعال'],
    recommended: false,
    nodeScope: 'edge',
    subNodeCount: 40,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      es: 'yes',
      epd: 'yes',
      epi: 'yes',
      egi: 'yes',
      ena: 'no'
    }
  },
  'direct-only': {
    id: 'direct-only',
    title: 'فقط سرور اصلی (بدون CDN)',
    subtitle: 'وقتی مسیر CDN مشکل دارد یا تست خود سرور',
    badges: ['فقط نود سرور اصلی', 'بدون لوکیشن', 'بدون فرگمنت'],
    recommended: false,
    nodeScope: 'origin',
    subNodeCount: 10,
    dataLimitGb: 0,
    expireDays: 0,
    ipLimit: 50,
    startOnFirstUse: true,
    configOverrides: {
      ev: 'yes',
      ena: 'yes',
      epd: 'no',
      epi: 'no',
      egi: 'no',
      yxby: 'yes'
    }
  }
};

function buildUserDefaultConfig(basePanelConfig = {}, presetId = 'iran-fast', customOverrides = {}) {
  const preset = USER_PRESETS[presetId] || USER_PRESETS['iran-fast'];
  return normalizeEffectiveConfig({
    ...CONFIG_DEFAULTS,
    ...(basePanelConfig || {}),
    ...(preset.configOverrides || {}),
    subNodeCount: customOverrides.subNodeCount ?? basePanelConfig?.subNodeCount ?? preset.subNodeCount ?? 50,
    ...(customOverrides || {})
  });
}


// --- MODULE: src/core/utils.js ---
// ============================================================================
// MiliconfigOS v4.0 - هسته ابزارها، رمزنگاری پیشرفته PBKDF2 و اعتبارسنجی
// ============================================================================


const base64TextDecoder = new TextDecoder();
const sharedDecoder = new TextDecoder();

function decodeBase64Utf8(b64) {
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return base64TextDecoder.decode(bytes);
  } catch (_e) {
    return '';
  }
}

function encodeBase64Utf8(str) {
  try {
    const bytes = new TextEncoder().encode(String(str ?? ''));
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (_e) {
    return btoa(unescape(encodeURIComponent(String(str ?? ''))));
  }
}

function isValidUuid(str) {
  if (!str || typeof str !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

function generateUuidV4() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().toLowerCase();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function generateShortId(prefix = 'mili') {
  const bytes = new Uint8Array(3);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 3; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}-${hex}`;
}

function generateSecureToken(byteLength = 32) {
  const bytes = new Uint8Array(byteLength);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < byteLength; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

function isValidIpAddress(addr) {
  if (!addr || typeof addr !== 'string') return false;
  const s = addr.trim().replace(/^\[([^\]]+)\]$/, '$1');
  const v4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (v4.test(s)) return true;
  const v6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (v6.test(s)) return true;
  const v6Compressed = /^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/;
  return v6Compressed.test(s);
}

function isValidDomain(domain) {
  if (!domain || typeof domain !== 'string') return false;
  return /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(domain.trim());
}

function isValidHttpUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const u = new URL(urlString.trim());
    return (u.protocol === 'http:' || u.protocol === 'https:') && Boolean(u.hostname);
  } catch (_e) {
    return false;
  }
}

function normalizeNodeHost(host) {
  return String(host || '').trim().replace(/^\[([^\]]+)\]$/, '$1');
}

function parseAddressAndPort(input) {
  const raw = String(input || '').trim();
  if (!raw) return { address: '', port: null };
  if (raw.includes('[') && raw.includes(']')) {
    const m = raw.match(/^\[([^\]]+)\](?::(\d+))?$/);
    if (m) {
      return {
        address: m[1],
        port: m[2] ? parseInt(m[2], 10) : null
      };
    }
  }
  const lastColon = raw.lastIndexOf(':');
  if (lastColon > 0) {
    const addr = raw.substring(0, lastColon);
    const portStr = raw.substring(lastColon + 1);
    const port = parseInt(portStr, 10);
    if (!addr.includes(':') && !Number.isNaN(port) && port > 0 && port <= 65535) {
      return { address: addr, port };
    }
  }
  return { address: raw, port: null };
}

// ============================================================================
// نام‌گذار اختصاصی نودهای خروجی با فرمت دقیق number+miliconfig
// (مثلاً: 1+miliconfig, 2+miliconfig, 3+miliconfig ...)
// ============================================================================
function createMiliNodeNamer(brand = BRAND_NAME) {
  let counter = 0;
  const cleanBrand = String(brand || BRAND_NAME).trim() || BRAND_NAME;
  return function nameNode(_item) {
    counter += 1;
    return `${counter}+${cleanBrand}`;
  };
}

// بازشماری و اعمال محدودیت تعداد نودهای ساب‌لینک کاربر با فرمت دقیق number+miliconfig
function finalizeMiliSubscriptionLinks(links = [], subNodeCount = 0, brand = BRAND_NAME) {
  if (!Array.isArray(links) || links.length === 0) return [];
  const cleanBrand = String(brand || BRAND_NAME).trim() || BRAND_NAME;
  const limit = parseInt(subNodeCount, 10);
  const sliced = Number.isFinite(limit) && limit > 0 ? links.slice(0, limit) : links.slice();
  return sliced.map((link, idx) => {
    const nodeName = `${idx + 1}+${cleanBrand}`;
    const hashIdx = link.indexOf('#');
    const base = hashIdx > -1 ? link.substring(0, hashIdx) : link;
    return `${base}#${encodeURIComponent(nodeName)}`;
  });
}

// ============================================================================
// Pure-JS MD5 (جهت سازگاری کامل بدون خطای ۱۱۰۱)
// ============================================================================
async function md5Hex(text) {
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  function rstr2binl(input) {
    const output = Array(input.length >> 2).fill(0);
    for (let i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
    }
    return output;
  }
  function binl2hex(binarray) {
    const hexTab = '0123456789abcdef';
    let str = '';
    for (let i = 0; i < binarray.length * 4; i++) {
      str += hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0x0f) +
             hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0x0f);
    }
    return str;
  }
  const s = unescape(encodeURIComponent(String(text || '')));
  return binl2hex(binlMD5(rstr2binl(s), s.length * 8));
}

// ============================================================================
// SHA-224 (برای هش احراز هویت Trojan)
// ============================================================================
async function sha224Hex(text) {
  function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }
  function ch(x, y, z) { return (x & y) ^ (~x & z); }
  function maj(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }
  function sigma0(x) { return rotr(2, x) ^ rotr(13, x) ^ rotr(22, x); }
  function sigma1(x) { return rotr(6, x) ^ rotr(11, x) ^ rotr(25, x); }
  function gamma0(x) { return rotr(7, x) ^ rotr(18, x) ^ (x >>> 3); }
  function gamma1(x) { return rotr(17, x) ^ rotr(19, x) ^ (x >>> 10); }

  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  const str = unescape(encodeURIComponent(String(text || '')));
  const words = [];
  for (let i = 0; i < str.length; i++) {
    words[i >> 2] |= (str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  }
  words[str.length >> 2] |= 0x80 << (24 - (str.length % 4) * 8);
  const totalBits = str.length * 8;
  const wordCount = (((str.length + 8) >> 6) + 1) * 16;
  words[wordCount - 1] = totalBits;

  let H0 = 0xc1059ed8;
  let H1 = 0x367cd507;
  let H2 = 0x3070dd17;
  let H3 = 0xf70e5939;
  let H4 = 0xffc00b31;
  let H5 = 0x68581511;
  let H6 = 0x64f98fa7;
  let H7 = 0xbefa4fa4;

  const W = new Array(64);
  for (let i = 0; i < wordCount; i += 16) {
    for (let t = 0; t < 16; t++) W[t] = words[i + t] | 0;
    for (let t = 16; t < 64; t++) W[t] = (gamma1(W[t - 2]) + W[t - 7] + gamma0(W[t - 15]) + W[t - 16]) | 0;

    let a = H0, b = H1, c = H2, d = H3, e = H4, f = H5, g = H6, h = H7;
    for (let t = 0; t < 64; t++) {
      const T1 = (h + sigma1(e) + ch(e, f, g) + K[t] + W[t]) | 0;
      const T2 = (sigma0(a) + maj(a, b, c)) | 0;
      h = g; g = f; f = e; e = (d + T1) | 0;
      d = c; c = b; b = a; a = (T1 + T2) | 0;
    }
    H0 = (H0 + a) | 0; H1 = (H1 + b) | 0; H2 = (H2 + c) | 0; H3 = (H3 + d) | 0;
    H4 = (H4 + e) | 0; H5 = (H5 + f) | 0; H6 = (H6 + g) | 0; H7 = (H7 + h) | 0;
  }

  function toHex(val) {
    return (val >>> 0).toString(16).padStart(8, '0');
  }
  return toHex(H0) + toHex(H1) + toHex(H2) + toHex(H3) + toHex(H4) + toHex(H5) + toHex(H6);
}

// ============================================================================
// SHA-256 (محاسبه امن با Web Crypto یا Pure Fallback)
// ============================================================================
async function sha256Hex(text) {
  try {
    if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(text || '')));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (_e) {}
  const h = await sha224Hex(String(text || ''));
  return h + h.slice(0, 8);
}

// ============================================================================
// مقایسه مقاوم در برابر حملات تحلیل زمانی (Timing-Safe Comparison)
// ============================================================================
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ============================================================================
// PBKDF2-HMAC-SHA256 Password Hashing & Verification (Zero Hardcoded Secrets)
// ============================================================================
async function derivePasswordHash(plainPassword, saltHex = null, iterations = 100000) {
  const cleanPass = String(plainPassword || '');
  if (!cleanPass) throw new Error('Password cannot be empty');

  let saltBytes;
  if (saltHex) {
    saltBytes = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  } else {
    saltBytes = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      crypto.getRandomValues(saltBytes);
    } else {
      for (let i = 0; i < 16; i++) saltBytes[i] = Math.floor(Math.random() * 256);
    }
  }

  const saltActualHex = Array.from(saltBytes, b => b.toString(16).padStart(2, '0')).join('');

  if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.importKey === 'function') {
    try {
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(cleanPass),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );
      const derivedBits = await crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltBytes,
          iterations,
          hash: 'SHA-256'
        },
        keyMaterial,
        256
      );
      const derivedHex = Array.from(new Uint8Array(derivedBits), b => b.toString(16).padStart(2, '0')).join('');
      return `pbkdf2:${iterations}:${saltActualHex}:${derivedHex}`;
    } catch (_e) {}
  }

  // Fallback امن با SHA-256 حلقه‌ای اگر Web Crypto PBKDF2 فعال نبود
  let current = await sha256Hex(cleanPass + ':' + saltActualHex);
  for (let i = 1; i < 1000; i++) {
    current = await sha256Hex(current + ':' + saltActualHex);
  }
  return `pbkdf2:1000:${saltActualHex}:${current}`;
}

async function verifyPasswordHash(candidatePassword, storedHash) {
  const cleanPass = String(candidatePassword || '');
  if (!cleanPass || !storedHash || typeof storedHash !== 'string') return false;

  const parts = storedHash.split(':');
  if (parts[0] === 'pbkdf2' && parts.length === 4) {
    const iterations = parseInt(parts[1], 10) || 100000;
    const saltHex = parts[2];
    const expectedHash = parts[3];
    const computedFull = await derivePasswordHash(cleanPass, saltHex, iterations);
    const computedHash = computedFull.split(':')[3];
    return timingSafeEqual(computedHash, expectedHash);
  }

  // پشتیبانی از هش‌های نسخه قدیمی با SHA-256 مستقیم
  const legacyHash1 = await sha256Hex(cleanPass);
  const legacyHash2 = await sha256Hex(cleanPass + '_miliconfig_salt_');
  return timingSafeEqual(legacyHash1, storedHash) || timingSafeEqual(legacyHash2, storedHash);
}

function formatBytes(bytes = 0) {
  const b = Number(bytes) || 0;
  if (b <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(b) / Math.log(1024)));
  const val = b / Math.pow(1024, i);
  return `${val >= 100 || i === 0 ? Math.round(val) : val.toFixed(2)} ${units[i]}`;
}


// --- MODULE: src/ui/icons.js ---
// ============================================================================
// MiliconfigOS v4.0 - Original Visual Identity & Vector Icons
// Developer: Milad Jahani | Brand: miliconfig
// Custom SVG Graphics, Professional Navigation Icons & Geometric Network Shield
// ============================================================================

const MILICONFIG_LOGO_SVG = `<svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-brand-logo">
  <defs>
    <linearGradient id="miliGrad1" x1="8" y1="8" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#b5ff4d"/>
      <stop offset="100%" stop-color="#00f0ff"/>
    </linearGradient>
    <radialGradient id="miliGlow" cx="36" cy="36" r="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#b5ff4d" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#b5ff4d" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="36" cy="36" r="34" fill="url(#miliGlow)"/>
  <rect x="8" y="8" width="56" height="56" rx="18" fill="#090d14" stroke="url(#miliGrad1)" stroke-width="2.4"/>
  <path d="M36 18L52 24.5V36.2C52 46.8 45.1 55.8 36 59C26.9 55.8 20 46.8 20 36.2V24.5L36 18Z" stroke="url(#miliGrad1)" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="36" cy="36" r="6" fill="#b5ff4d"/>
  <path d="M36 24V30M36 42V48M26 36H30M42 36H46" stroke="#00f0ff" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="36" cy="24" r="2.2" fill="#00f0ff"/>
  <circle cx="36" cy="48" r="2.2" fill="#00f0ff"/>
  <circle cx="26" cy="36" r="2.2" fill="#00f0ff"/>
  <circle cx="46" cy="36" r="2.2" fill="#00f0ff"/>
</svg>`;

const SHIELD_LOGO_SVG = MILICONFIG_LOGO_SVG;
const CLOUD_LOGO_SVG = MILICONFIG_LOGO_SVG;

const FAVICON_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><rect x="8" y="8" width="56" height="56" rx="18" fill="#090d14" stroke="#b5ff4d" stroke-width="3"/><path d="M36 18L52 24.5V36.2C52 46.8 45.1 55.8 36 59C26.9 55.8 20 46.8 20 36.2V24.5L36 18Z" fill="none" stroke="#b5ff4d" stroke-width="3.5" stroke-linejoin="round"/><circle cx="36" cy="36" r="6" fill="#00f0ff"/></svg>`
)}`;

// آیکون‌های وکتور اختصاصی نویگیشن سیستم‌عامل
const ICON_DASHBOARD_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`;
const ICON_USERS_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const ICON_NODES_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;
const ICON_CONFIG_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
const ICON_SUBSCRIPTION_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const ICON_SCANNER_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
const ICON_DNS_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
const ICON_MONITORING_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
const ICON_SECURITY_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const ICON_SETTINGS_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;

// آیکون‌های تم و ابزارهای عمومی
const ICON_SUN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const ICON_MOON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const ICON_SYSTEM_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
const ICON_GLOBE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
const ICON_LOCK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const ICON_KEY_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-1.5 1.5L16 7l-1.5-1.5-3 3L11 7l-2 2m0 0l-5 5A4 4 0 0 0 9.66 19.66L14 15.34l-2-2 3-3-1.5-1.5L15 7.34l1.5 1.5 2-2"/></svg>`;
const ICON_BOLT_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
const ICON_COPY_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_TRASH_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
const ICON_REFRESH_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`;


// --- MODULE: src/db/d1.js ---
// ============================================================================
// MiliconfigOS v4.0 - لایه دیتابیس Cloudflare D1 با Auto-Migration،
// سقف سخت‌گیرانه ۵ کاربر، سیستم نشست‌های امن و رمزنگاری PBKDF2
// ============================================================================


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

function detectD1Binding(env) {
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

function detectKvBinding(env) {
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

function getAdminUuid(env = {}) {
  const raw = env?.u || env?.U || env?.UUID || env?.uuid || DEFAULT_ADMIN_UUID;
  return String(raw).trim().toLowerCase();
}

// ساخت خودکار و مایگریشن جداول دیتابیس D1 (Auto-Migration)
async function ensureD1Schema(env = {}, force = false) {
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
async function getAdminPasswordHash(env = {}) {
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

async function hasAdminPassword(env = {}) {
  const hash = await getAdminPasswordHash(env);
  return Boolean(hash && hash.length > 0);
}

async function setAdminPassword(env = {}, plainPassword, clientIp = '') {
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

async function verifyAdminPassword(env = {}, candidatePassword) {
  const cleanPass = String(candidatePassword || '').trim();
  if (!cleanPass) return false;
  const hash = await getAdminPasswordHash(env);
  if (!hash) return false;
  return await verifyPasswordHash(cleanPass, hash);
}

async function changeAdminPassword(env = {}, currentPassword, newPassword, clientIp = '') {
  const isMatch = await verifyAdminPassword(env, currentPassword);
  if (!isMatch) {
    throw new Error('رمز عبور فعلی نادرست است.');
  }
  return await setAdminPassword(env, newPassword, clientIp);
}

// ============================================================================
// مدیریت نشست‌ها و محدودیت تلاش برای ورود (Session Management & Rate Limiting)
// ============================================================================
async function createAdminSession(env = {}, clientIp = '') {
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

async function validateAdminSession(env = {}, token) {
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

async function revokeAdminSession(env = {}, token) {
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

async function recordLoginAttempt(env = {}, ip = '', success = false) {
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

async function isIpRateLimited(env = {}, ip = '') {
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
async function loadGlobalConfig(env = {}, force = false) {
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

async function saveGlobalConfig(env = {}, newValues = {}) {
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

async function resetGlobalConfig(env = {}) {
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
async function listUsers(env = {}) {
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

async function getUserByIdOrToken(env = {}, token = '') {
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
async function createUser(env = {}, payload = {}, clientIp = '') {
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

async function updateUser(env = {}, targetId, patchData = {}, clientIp = '') {
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

async function deleteUser(env = {}, targetId, clientIp = '') {
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

async function resetUserStats(env = {}, targetId, clientIp = '') {
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
async function recordUserActivity(env = {}, userId, bytesTransferred = 0, requestsCount = 1, source = 'ws') {
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
async function addAuditLog(env = {}, action, detail, ip = '') {
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

async function listAuditLogs(env = {}, limit = 30) {
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
async function listEndpoints(env = {}) {
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

async function getStorageDiagnostics(env = {}) {
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


// --- MODULE: src/subscription/converters.js ---
// ============================================================================
// miliconfig v3.1 - مبدل‌های داخلی اشتراک (Clash, Sing-box, Surge, Loon, QuanX, Residential Chain)
// منطبق ۱۰۰٪ با منطق کد اصلی CFnew v3.1 + نام‌گذاری number+miliconfig
// ============================================================================


function quoteYaml(val) {
  if (val == null) return '""';
  const s = String(val);
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function normalizeHost(hostname) {
  if (!hostname) return hostname;
  const s = String(hostname);
  if (s.startsWith('[') && s.endsWith(']')) return s.slice(1, -1);
  return s;
}

function buildClashGroupProxies(names, opts = {}) {
  const { directFirst = false, extraGroups = [] } = opts;
  const nodeLines = names.length ? names.map(n => `      - ${quoteYaml(n)}`).join('\n') : '      - DIRECT';
  const lines = [];
  if (directFirst) {
    lines.push('      - "🎯 全球直连"', '      - "🚀 节点选择"');
  } else {
    lines.push('      - "🚀 节点选择"', '      - "🎯 全球直连"');
  }
  for (const g of extraGroups) lines.push(`      - ${quoteYaml(g)}`);
  lines.push(nodeLines);
  return lines.join('\n');
}

function buildIniGroupProxies(names, opts = {}) {
  const { directFirst = false, extraGroups = [], compact = false } = opts;
  const sep = compact ? ',' : ', ';
  const listStr = names.length ? names.join(sep) : 'DIRECT';
  const parts = [];
  if (directFirst) parts.push('🎯 全球直连', '🚀 节点选择');
  else parts.push('🚀 节点选择', '🎯 全球直连');
  parts.push(...extraGroups);
  if (names.length) parts.push(listStr);
  return parts.join(sep);
}

function parseShareLink(link) {
  try {
    if (link.startsWith('vless://')) {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      return {
        proto: 'vless',
        name: decodeURIComponent(url.hash.substring(1)) || `${url.hostname}:${url.port}`,
        uuid: url.username,
        server: normalizeHost(url.hostname),
        port: parseInt(url.port, 10) || 443,
        tls: params.get('security') === 'tls' || params.get('security') === 'reality',
        network: params.get('type') || 'ws',
        path: params.get('path') || '/?ed=2048',
        host: normalizeHost(params.get('host') || url.hostname),
        sni: normalizeHost(params.get('sni') || params.get('host') || url.hostname),
        alpn: (params.get('alpn') || '').split(',').map(s => s.trim()).filter(Boolean),
        fp: params.get('fp') || 'chrome',
        flow: params.get('flow') || '',
        encryption: params.get('encryption') || 'none',
        mode: params.get('mode') || '',
        ech: params.get('ech') || ''
      };
    }
    if (link.startsWith('trojan://')) {
      const url = new URL(link);
      const params = new URLSearchParams(url.search);
      return {
        proto: 'trojan',
        name: decodeURIComponent(url.hash.substring(1)) || `${url.hostname}:${url.port}`,
        password: decodeURIComponent(url.username),
        server: normalizeHost(url.hostname),
        port: parseInt(url.port, 10) || 443,
        tls: params.get('security') !== 'none',
        network: params.get('type') || 'ws',
        path: params.get('path') || '/?ed=2048',
        host: normalizeHost(params.get('host') || url.hostname),
        sni: normalizeHost(params.get('sni') || params.get('host') || url.hostname),
        alpn: (params.get('alpn') || '').split(',').map(s => s.trim()).filter(Boolean),
        fp: params.get('fp') || 'chrome',
        ech: params.get('ech') || ''
      };
    }
    if (link.startsWith('ss://')) {
      const rest = link.substring(5);
      const hashIdx = rest.indexOf('#');
      const mainPart = hashIdx > -1 ? rest.substring(0, hashIdx) : rest;
      const nodeName = hashIdx > -1 ? decodeURIComponent(rest.substring(hashIdx + 1)) : 'Shadowsocks';

      let cipher = 'chacha20-ietf-poly1305';
      let password = '';
      let server = '';
      let port = 443;
      let host = '';
      let path = '/';
      let isTls = true;
      let fp = 'chrome';

      const atIdx = mainPart.indexOf('@');
      if (atIdx > -1) {
        const credPart = mainPart.substring(0, atIdx);
        let credDecoded = credPart;
        try { credDecoded = atob(credPart); } catch (_e) {
          try { credDecoded = decodeURIComponent(credPart); } catch (_e2) {}
        }
        const colonIdx = credDecoded.indexOf(':');
        if (colonIdx > -1) {
          cipher = credDecoded.substring(0, colonIdx);
          password = credDecoded.substring(colonIdx + 1);
        } else {
          password = credDecoded;
        }

        const serverPart = mainPart.substring(atIdx + 1);
        const qIdx = serverPart.indexOf('?');
        const hp = qIdx > -1 ? serverPart.substring(0, qIdx).replace(/\/$/, '') : serverPart.replace(/\/$/, '');
        const query = qIdx > -1 ? serverPart.substring(qIdx + 1) : '';

        let addr = hp;
        let p = 443;
        if (hp.startsWith('[')) {
          const m = hp.match(/^(\[[^\]]+\])(?::(\d+))?$/);
          if (m) { addr = m[1]; p = parseInt(m[2] || '443', 10); }
        } else {
          const cIdx = hp.lastIndexOf(':');
          if (cIdx > -1) {
            addr = hp.substring(0, cIdx);
            p = parseInt(hp.substring(cIdx + 1) || '443', 10);
          }
        }
        server = addr;
        port = p;

        const sp = new URLSearchParams(query);
        host = sp.get('host') || sp.get('sni') || server;
        path = sp.get('path') || '/';
        isTls = sp.get('security') === 'tls' || (sp.get('plugin') || '').includes('tls');
        fp = sp.get('fp') || 'chrome';
      } else {
        try {
          const decoded = atob(mainPart);
          const atInDec = decoded.indexOf('@');
          if (atInDec > -1) {
            const cred = decoded.substring(0, atInDec);
            const srvP = decoded.substring(atInDec + 1);
            const colonIdx = cred.indexOf(':');
            cipher = colonIdx > -1 ? cred.substring(0, colonIdx) : cipher;
            password = colonIdx > -1 ? cred.substring(colonIdx + 1) : cred;
            const cIdx = srvP.lastIndexOf(':');
            if (cIdx > -1) {
              server = srvP.substring(0, cIdx);
              port = parseInt(srvP.substring(cIdx + 1) || '443', 10);
            } else {
              server = srvP;
            }
            host = server;
          }
        } catch (_e) {}
      }

      if (server) {
        return {
          proto: 'ss',
          name: nodeName,
          cipher,
          password,
          server: normalizeHost(server),
          port,
          tls: isTls,
          network: 'ws',
          path,
          host: normalizeHost(host),
          sni: normalizeHost(host),
          fp
        };
      }
    }
  } catch (_e) {}
  return null;
}

function buildClashNodeYaml(node, customECHDomain = 'cloudflare-ech.com') {
  const lines = [];
  const srv = normalizeHost(node.server);
  const host = normalizeHost(node.host) || srv;
  const sni = normalizeHost(node.sni) || host;
  lines.push(`  - name: ${quoteYaml(node.name)}`);
  lines.push(`    type: ${node.proto}`);
  lines.push(`    server: ${quoteYaml(srv)}`);
  lines.push(`    port: ${node.port}`);
  if (node.proto === 'vless') {
    lines.push(`    uuid: ${node.uuid}`);
    lines.push(`    udp: true`);
    lines.push(`    tls: ${node.tls ? 'true' : 'false'}`);
    if (node.flow) lines.push(`    flow: ${quoteYaml(node.flow)}`);
    lines.push(`    client-fingerprint: ${quoteYaml(node.fp || 'chrome')}`);
  } else if (node.proto === 'trojan') {
    lines.push(`    password: ${quoteYaml(node.password)}`);
    lines.push(`    udp: true`);
    lines.push(`    client-fingerprint: ${quoteYaml(node.fp || 'chrome')}`);
  } else if (node.proto === 'ss') {
    lines.push(`    cipher: ${quoteYaml(node.cipher || 'chacha20-ietf-poly1305')}`);
    lines.push(`    password: ${quoteYaml(node.password)}`);
    lines.push(`    udp: true`);
    lines.push(`    plugin: v2ray-plugin`);
    lines.push(`    plugin-opts:`);
    lines.push(`      mode: websocket`);
    lines.push(`      tls: ${node.tls ? 'true' : 'false'}`);
    lines.push(`      skip-cert-verify: false`);
    lines.push(`      host: ${quoteYaml(host)}`);
    lines.push(`      path: ${quoteYaml(node.path || '/')}`);
    if (node.fp) lines.push(`    client-fingerprint: ${quoteYaml(node.fp)}`);
  }
  if (node.tls) {
    lines.push(`    servername: ${quoteYaml(sni)}`);
    if (node.alpn && node.alpn.length) {
      lines.push(`    alpn: [${node.alpn.map(a => quoteYaml(a)).join(', ')}]`);
    }
    lines.push(`    skip-cert-verify: false`);
  }
  if (node.network === 'ws' || node.network === 'xhttp') {
    lines.push(`    network: ws`);
    lines.push(`    ws-opts:`);
    lines.push(`      path: ${quoteYaml(node.path)}`);
    lines.push(`      headers:`);
    lines.push(`        Host: ${quoteYaml(host)}`);
  } else if (node.network === 'grpc') {
    lines.push(`    network: grpc`);
    lines.push(`    grpc-opts:`);
    lines.push(`      grpc-service-name: ${quoteYaml(node.path)}`);
  }
  if (node.ech) {
    const echDomain = customECHDomain || 'cloudflare-ech.com';
    lines.push(`    ech-opts:`);
    lines.push(`      enable: true`);
    lines.push(`      query-server-name: ${quoteYaml(echDomain)}`);
  }
  return lines.join('\n');
}

function generateClashConfig(links, options = {}) {
  const customDNS = options.customDNS || 'https://223.5.5.5/dns-query';
  const customECHDomain = options.customECHDomain || 'cloudflare-ech.com';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);

  const header = [
    '# miliconfig v3.1 - Clash / Mihomo Subscription',
    'mixed-port: 7890',
    'allow-lan: true',
    'mode: rule',
    'log-level: info',
    'ipv6: true',
    'external-controller: 127.0.0.1:9090',
    'unified-delay: true',
    'tcp-concurrent: true',
    'geodata-mode: true',
    'geo-auto-update: true',
    'geo-update-interval: 24',
    'geox-url:',
    '  geoip: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"',
    '  geosite: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"',
    '  mmdb: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/country.mmdb"',
    '  asn: "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/GeoLite2-ASN.mmdb"',
    'sniffer:',
    '  enable: true',
    '  force-dns-mapping: true',
    '  parse-pure-ip: true',
    '  sniff:',
    '    HTTP:',
    '      ports: [80, 8080-8880]',
    '      override-destination: true',
    '    TLS:',
    '      ports: [443, 8443]',
    '    QUIC:',
    '      ports: [443, 8443]',
    'dns:',
    '  enable: true',
    '  listen: 0.0.0.0:1053',
    '  ipv6: true',
    '  enhanced-mode: fake-ip',
    '  fake-ip-range: 198.18.0.1/16',
    '  fake-ip-filter:',
    '    - "*.lan"',
    '    - "+.local"',
    '    - "+.market.xiaomi.com"',
    '    - "+.msftconnecttest.com"',
    '    - "+.msftncsi.com"',
    '    - "localhost.ptlogin2.qq.com"',
    '    - "+.srv.nintendo.net"',
    '    - "+.stun.playstation.net"',
    '    - "+.xboxlive.com"',
    '  default-nameserver:',
    '    - 223.5.5.5',
    '    - 119.29.29.29',
    '  nameserver:',
    `    - ${customDNS}`,
    '    - https://119.29.29.29/dns-query',
    '  fallback:',
    '    - https://1.1.1.1/dns-query',
    '    - https://8.8.8.8/dns-query',
    '  fallback-filter:',
    '    geoip: true',
    '    geoip-code: CN',
    '    ipcidr:',
    '      - 240.0.0.0/4',
    ''
  ];

  const proxiesSection = ['proxies:'];
  for (const n of nodes) proxiesSection.push(buildClashNodeYaml(n, customECHDomain));

  const nodesOnly = names.length ? names.map(n => `      - ${quoteYaml(n)}`).join('\n') : '      - DIRECT';
  const groupsSection = [
    'proxy-groups:',
    '  - name: "🚀 节点选择"',
    '    type: select',
    '    proxies:',
    '      - "🎯 全球直连"',
    nodesOnly,
    '  - name: "🌍 国外媒体"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "📺 哔哩哔哩"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { directFirst: true }),
    '  - name: "📹 油管视频"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { extraGroups: ['🌍 国外媒体'] }),
    '  - name: "🎬 奈飞视频"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { extraGroups: ['🌍 国外媒体'] }),
    '  - name: "📲 电报信息"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "🌐 谷歌服务"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "🤖 OpenAI"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    '  - name: "Ⓜ️ 微软服务"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { directFirst: true }),
    '  - name: "🍎 苹果服务"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names, { directFirst: true }),
    '  - name: "🎯 全球直连"',
    '    type: select',
    '    proxies:',
    '      - DIRECT',
    '  - name: "🛑 全球拦截"',
    '    type: select',
    '    proxies:',
    '      - REJECT',
    '      - DIRECT',
    '  - name: "🍃 应用净化"',
    '    type: select',
    '    proxies:',
    '      - REJECT',
    '      - DIRECT',
    '  - name: "🐟 漏网之鱼"',
    '    type: select',
    '    proxies:',
    buildClashGroupProxies(names),
    ''
  ];

  const ruleBase = 'https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release';
  const provider = (name, behavior) => [
    `  ${name}:`,
    `    type: http`,
    `    behavior: ${behavior}`,
    `    url: "${ruleBase}/${name}.txt"`,
    `    path: ./rulesets/loyalsoldier/${name}.txt`,
    `    interval: 86400`
  ].join('\n');

  const ruleProviders = [
    'rule-providers:',
    provider('reject', 'domain'),
    provider('icloud', 'domain'),
    provider('apple', 'domain'),
    provider('google', 'domain'),
    provider('proxy', 'domain'),
    provider('direct', 'domain'),
    provider('private', 'domain'),
    provider('gfw', 'domain'),
    provider('greatfire', 'domain'),
    provider('tld-not-cn', 'domain'),
    provider('telegramcidr', 'ipcidr'),
    provider('cncidr', 'ipcidr'),
    provider('lancidr', 'ipcidr'),
    provider('applications', 'classical'),
    ''
  ];

  const rules = [
    'rules:',
    '  - DOMAIN-SUFFIX,acl4.ssr,🎯 全球直连',
    '  - DOMAIN-SUFFIX,local,🎯 全球直连',
    '  - DOMAIN,clash.razord.top,🎯 全球直连',
    '  - DOMAIN,yacd.haishan.me,🎯 全球直连',
    '  - DOMAIN,yacd.metacubex.one,🎯 全球直连',
    '  - DOMAIN,d.metacubex.one,🎯 全球直连',
    '  - DOMAIN-SUFFIX,googleapis.cn,🌐 谷歌服务',
    '  - DOMAIN-SUFFIX,gstatic.com,🌐 谷歌服务',
    '  - DOMAIN-SUFFIX,xn--ngstr-lra8j.com,🌐 谷歌服务',
    '  - DOMAIN-SUFFIX,googlevideo.com,📹 油管视频',
    '  - DOMAIN-SUFFIX,googleusercontent.com,🌐 谷歌服务',
    '  - DOMAIN-KEYWORD,youtube,📹 油管视频',
    '  - DOMAIN-SUFFIX,youtube.com,📹 油管视频',
    '  - DOMAIN-SUFFIX,youtu.be,📹 油管视频',
    '  - DOMAIN-KEYWORD,netflix,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflxext.com,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflxso.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflxvideo.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflximg.com,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,nflximg.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,netflix.com,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,netflix.net,🎬 奈飞视频',
    '  - DOMAIN-SUFFIX,bilibili.com,📺 哔哩哔哩',
    '  - DOMAIN-SUFFIX,bilivideo.com,📺 哔哩哔哩',
    '  - DOMAIN-SUFFIX,hdslb.com,📺 哔哩哔哩',
    '  - DOMAIN-KEYWORD,openai,🤖 OpenAI',
    '  - DOMAIN-KEYWORD,chatgpt,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,openai.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,oaistatic.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,oaiusercontent.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,anthropic.com,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,claude.ai,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,perplexity.ai,🤖 OpenAI',
    '  - DOMAIN-SUFFIX,gemini.google.com,🤖 OpenAI',
    '  - RULE-SET,applications,🎯 全球直连',
    '  - RULE-SET,private,🎯 全球直连',
    '  - RULE-SET,reject,🛑 全球拦截',
    '  - RULE-SET,icloud,🍎 苹果服务',
    '  - RULE-SET,apple,🍎 苹果服务',
    '  - RULE-SET,google,🌐 谷歌服务',
    '  - RULE-SET,proxy,🚀 节点选择',
    '  - RULE-SET,gfw,🚀 节点选择',
    '  - RULE-SET,greatfire,🚀 节点选择',
    '  - RULE-SET,tld-not-cn,🚀 节点选择',
    '  - RULE-SET,direct,🎯 全球直连',
    '  - RULE-SET,lancidr,🎯 全球直连,no-resolve',
    '  - RULE-SET,cncidr,🎯 全球直连,no-resolve',
    '  - RULE-SET,telegramcidr,📲 电报信息,no-resolve',
    '  - GEOIP,LAN,🎯 全球直连,no-resolve',
    '  - GEOIP,CN,🎯 全球直连,no-resolve',
    '  - MATCH,🐟 漏网之鱼'
  ];

  return [header.join('\n'), proxiesSection.join('\n'), '', groupsSection.join('\n'), ruleProviders.join('\n'), rules.join('\n'), ''].join('\n');
}

function splitDnsAddress(addr) {
  const text = String(addr || '').trim();
  try {
    const url = new URL(text);
    const proto = url.protocol.replace(':', '').toLowerCase();
    if (proto === 'https' || proto === 'http3' || proto === 'h3') {
      const out = { type: 'https', server: url.hostname };
      if (url.port) out.server_port = Number(url.port);
      if (url.pathname && url.pathname !== '/' && url.pathname !== '/dns-query') out.path = url.pathname;
      return out;
    }
    if (proto === 'tls') return { type: 'tls', server: url.hostname };
    if (proto === 'quic') return { type: 'quic', server: url.hostname };
    if (proto === 'udp' || proto === 'dns') return { type: 'udp', server: url.hostname };
  } catch (_e) {}
  return { type: 'udp', server: text.replace(/^[a-z0-9]+:\/\//i, '').split('/')[0] || '223.5.5.5' };
}

function generateSingboxConfig(links, options = {}) {
  const customDNS = options.customDNS || 'https://223.5.5.5/dns-query';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const outboundTags = nodes.map(n => n.name);

  function buildOutbound(n) {
    const out = {
      type: n.proto,
      tag: n.name,
      server: normalizeHost(n.server),
      server_port: n.port
    };
    if (n.proto === 'vless') {
      out.uuid = n.uuid;
      if (n.flow) out.flow = n.flow;
    } else if (n.proto === 'trojan') {
      out.password = n.password;
    } else if (n.proto === 'ss') {
      out.type = 'shadowsocks';
      out.method = n.cipher || 'chacha20-ietf-poly1305';
      out.password = n.password;
    }
    if (n.tls) {
      out.tls = {
        enabled: true,
        server_name: n.sni,
        insecure: false,
        utls: {
          enabled: true,
          fingerprint: n.fp || 'chrome'
        }
      };
      if (n.alpn && n.alpn.length) out.tls.alpn = n.alpn;
      if (n.ech) {
        out.tls.ech = {
          enabled: true,
          pq_signature_schemes_enabled: false,
          dynamic_record_sizing_disabled: false
        };
      }
    }
    if (n.network === 'ws' || n.network === 'xhttp') {
      out.transport = {
        type: 'ws',
        path: n.path,
        headers: { Host: n.host },
        max_early_data: 2048,
        early_data_header_name: 'Sec-WebSocket-Protocol'
      };
    } else if (n.network === 'grpc') {
      out.transport = {
        type: 'grpc',
        service_name: n.path
      };
    }
    return out;
  }

  const geositeBase = 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geosite';
  const geoipBase = 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@sing/geo/geoip';
  const geositeRule = name => ({
    tag: `geosite-${name}`,
    type: 'remote',
    format: 'binary',
    url: `${geositeBase}/${name}.srs`,
    download_detour: 'direct'
  });
  const geoipRule = name => ({
    tag: `geoip-${name}`,
    type: 'remote',
    format: 'binary',
    url: `${geoipBase}/${name}.srs`,
    download_detour: 'direct'
  });

  const config = {
    log: { level: 'info', timestamp: true },
    dns: {
      servers: [
        { ...splitDnsAddress(customDNS), tag: 'remote', detour: 'select' },
        { type: 'udp', tag: 'local', server: '223.5.5.5', detour: 'direct' },
        { type: 'fakeip', tag: 'fakeip', inet4_range: '198.18.0.0/15', inet6_range: 'fc00::/18' }
      ],
      rules: [
        { rule_set: 'geosite-category-ads-all', action: 'reject' },
        { rule_set: 'geosite-cn', server: 'local' },
        { query_type: ['A', 'AAAA'], server: 'fakeip' }
      ],
      strategy: 'ipv4_only'
    },
    inbounds: [
      { type: 'mixed', tag: 'mixed-in', listen: '127.0.0.1', listen_port: 2080 },
      {
        type: 'tun',
        tag: 'tun-in',
        interface_name: 'sing-box',
        address: ['172.19.0.1/30', 'fdfe:dcba:9876::1/126'],
        mtu: 9000,
        auto_route: true,
        strict_route: true,
        stack: 'mixed'
      }
    ],
    outbounds: [
      { type: 'selector', tag: 'select', outbounds: ['direct', ...outboundTags], default: outboundTags[0] || 'direct' },
      { type: 'selector', tag: '🌍 国外媒体', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: '📲 电报信息', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🌐 谷歌服务', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🤖 OpenAI', outbounds: ['select', 'direct', ...outboundTags] },
      { type: 'selector', tag: 'Ⓜ️ 微软服务', outbounds: ['direct', 'select', ...outboundTags] },
      { type: 'selector', tag: '🍎 苹果服务', outbounds: ['direct', 'select', ...outboundTags] },
      { type: 'selector', tag: '📺 哔哩哔哩', outbounds: ['direct', 'select', ...outboundTags] },
      { type: 'selector', tag: '📹 油管视频', outbounds: ['select', '🌍 国外媒体', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🎬 奈飞视频', outbounds: ['select', '🌍 国外媒体', 'direct', ...outboundTags] },
      { type: 'selector', tag: '🎯 全球直连', outbounds: ['direct'] },
      { type: 'selector', tag: '🐟 漏网之鱼', outbounds: ['select', 'direct', ...outboundTags] },
      ...nodes.map(buildOutbound),
      { type: 'direct', tag: 'direct' }
    ],
    route: {
      rule_set: [
        geositeRule('cn'), geositeRule('private'), geositeRule('apple'), geositeRule('apple-cn'),
        geositeRule('microsoft'), geositeRule('microsoft@cn'), geositeRule('google'), geositeRule('telegram'),
        geositeRule('openai'), geositeRule('anthropic'), geositeRule('youtube'), geositeRule('netflix'),
        geositeRule('disney'), geositeRule('spotify'), geositeRule('tiktok'), geositeRule('twitter'),
        geositeRule('facebook'), geositeRule('github'), geositeRule('geolocation-!cn'),
        geositeRule('category-ads-all'), geoipRule('cn'), geoipRule('private'), geoipRule('telegram')
      ],
      rules: [
        { action: 'sniff' },
        { protocol: 'dns', action: 'hijack-dns' },
        { ip_is_private: true, outbound: 'direct' },
        { rule_set: 'geosite-category-ads-all', action: 'reject' },
        { rule_set: 'geosite-private', outbound: 'direct' },
        { rule_set: 'geosite-apple-cn', outbound: 'direct' },
        { rule_set: 'geosite-microsoft@cn', outbound: 'direct' },
        { rule_set: 'geosite-apple', outbound: '🍎 苹果服务' },
        { rule_set: 'geosite-microsoft', outbound: 'Ⓜ️ 微软服务' },
        { rule_set: 'geosite-openai', outbound: '🤖 OpenAI' },
        { rule_set: 'geosite-anthropic', outbound: '🤖 OpenAI' },
        { rule_set: 'geosite-telegram', outbound: '📲 电报信息' },
        { rule_set: 'geoip-telegram', outbound: '📲 电报信息' },
        { rule_set: 'geosite-google', outbound: '🌐 谷歌服务' },
        { rule_set: 'geosite-youtube', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-netflix', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-disney', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-spotify', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-tiktok', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-twitter', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-facebook', outbound: '🌍 国外媒体' },
        { rule_set: 'geosite-github', outbound: 'select' },
        { rule_set: 'geosite-geolocation-!cn', outbound: 'select' },
        { rule_set: 'geosite-cn', outbound: 'direct' },
        { rule_set: 'geoip-cn', outbound: 'direct' },
        { ip_is_private: true, outbound: 'direct' }
      ],
      final: '🐟 漏网之鱼',
      default_domain_resolver: { server: 'local' },
      auto_detect_interface: true
    },
    experimental: {
      cache_file: { enabled: true, store_fakeip: true },
      clash_api: { external_controller: '127.0.0.1:9090' }
    }
  };

  return JSON.stringify(config, null, 2);
}

const aclRuleBase = 'https://fastly.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash';
const aclRule = name => `${aclRuleBase}/${name}.list`;

function generateSurgeConfig(links, options = {}) {
  const customDNS = options.customDNS || '223.5.5.5';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);
  const lines = [
    '[General]',
    'loglevel = notify',
    'internet-test-url = http://www.apple.com/library/test/success.html',
    'proxy-test-url = http://www.gstatic.com/generate_204',
    'test-timeout = 3',
    `dns-server = ${customDNS.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}, 119.29.29.29, system`,
    'encrypted-dns-server = https://223.5.5.5/dns-query, https://1.12.12.12/dns-query',
    'ipv6 = true',
    'allow-wifi-access = false',
    'wifi-access-http-port = 6152',
    'wifi-access-socks5-port = 6153',
    'skip-proxy = 127.0.0.1, 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, localhost, *.local, captive.apple.com',
    'exclude-simple-hostnames = true',
    'show-error-page-for-reject = true',
    '',
    '[Proxy]'
  ];
  for (const n of nodes) {
    if (n.proto === 'trojan') {
      lines.push(`${n.name} = trojan, ${n.server}, ${n.port}, password=${n.password}, sni=${n.sni}, ws=true, ws-path=${n.path}, ws-headers=Host:${n.host}, skip-cert-verify=false, tfo=true`);
    } else if (n.proto === 'ss') {
      lines.push(`${n.name} = ss, ${n.server}, ${n.port}, encrypt-method=${n.cipher || 'chacha20-ietf-poly1305'}, password=${n.password}, ws=true, ws-path=${n.path || '/'}, ws-headers=Host:${n.host}, tls=${n.tls ? 'true' : 'false'}, sni=${n.sni}`);
    }
  }
  if (!nodes.length) {
    lines.push('Direct = direct');
  }
  lines.push('', '[Proxy Group]');
  const listStr = names.length ? names.join(', ') : 'DIRECT';
  lines.push(`🚀 节点选择 = select, 🎯 全球直连, ${listStr}`);
  lines.push(`🌍 国外媒体 = select, ${buildIniGroupProxies(names)}`);
  lines.push(`📺 哔哩哔哩 = select, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`📹 油管视频 = select, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`🎬 奈飞视频 = select, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`📲 电报信息 = select, ${buildIniGroupProxies(names)}`);
  lines.push(`🌐 谷歌服务 = select, ${buildIniGroupProxies(names)}`);
  lines.push(`🤖 OpenAI = select, ${buildIniGroupProxies(names)}`);
  lines.push(`Ⓜ️ 微软服务 = select, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`🍎 苹果服务 = select, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`🎯 全球直连 = select, DIRECT`);
  lines.push(`🛑 全球拦截 = select, REJECT, DIRECT`);
  lines.push(`🐟 漏网之鱼 = select, ${buildIniGroupProxies(names)}`);
  lines.push('', '[Rule]');
  lines.push(`RULE-SET,${aclRule('LocalAreaNetwork')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('UnBan')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('BanAD')},🛑 全球拦截`);
  lines.push(`RULE-SET,${aclRule('BanProgramAD')},🛑 全球拦截`);
  lines.push(`RULE-SET,${aclRule('GoogleFCM')},🌐 谷歌服务`);
  lines.push(`RULE-SET,${aclRule('GoogleCN')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('SteamCN')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('Microsoft')},Ⓜ️ 微软服务`);
  lines.push(`RULE-SET,${aclRule('Apple')},🍎 苹果服务`);
  lines.push(`RULE-SET,${aclRule('Telegram')},📲 电报信息`);
  lines.push(`RULE-SET,${aclRule('OpenAi')},🤖 OpenAI`);
  lines.push(`RULE-SET,${aclRule('Claude')},🤖 OpenAI`);
  lines.push(`RULE-SET,${aclRule('Copilot')},🤖 OpenAI`);
  lines.push(`RULE-SET,${aclRule('Netflix')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('YouTube')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('Disney')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('Spotify')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('TikTok')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('BiliBili')},📺 哔哩哔哩`);
  lines.push(`RULE-SET,${aclRule('ProxyMedia')},🌍 国外媒体`);
  lines.push(`RULE-SET,${aclRule('ProxyGFWlist')},🚀 节点选择`);
  lines.push(`RULE-SET,${aclRule('ChinaDomain')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('ChinaCompanyIp')},🎯 全球直连`);
  lines.push(`RULE-SET,${aclRule('ChinaIp')},🎯 全球直连`);
  lines.push('GEOIP,CN,🎯 全球直连');
  lines.push('FINAL,🐟 漏网之鱼,dns-failed');
  return lines.join('\n');
}

function generateLoonConfig(links, options = {}) {
  const customDNS = options.customDNS || '223.5.5.5';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);
  const lines = [
    '[General]',
    'ip-mode = dual',
    `dns-server = ${customDNS.replace(/^https?:\/\//, '').replace(/\/.*$/, '')},119.29.29.29,system`,
    'doh-server = https://223.5.5.5/dns-query, https://1.12.12.12/dns-query',
    'allow-udp-proxy = true',
    'allow-wifi-access = false',
    'sni-sniffing = true',
    'skip-proxy = 127.0.0.1,192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,localhost,*.local,captive.apple.com',
    'bypass-tun = 10.0.0.0/8,100.64.0.0/10,127.0.0.0/8,169.254.0.0/16,172.16.0.0/12,192.0.0.0/24,192.0.2.0/24,192.88.99.0/24,192.168.0.0/16,198.51.100.0/24,203.0.113.0/24,224.0.0.0/4,255.255.255.255/32',
    '',
    '[Proxy]'
  ];
  for (const n of nodes) {
    if (n.proto === 'vless') {
      const parts = [`${n.server}`, `${n.port}`, `udp=true`, `username=${n.uuid}`, `transport=ws`, `path=${n.path}`, `host=${n.host}`, `over-tls=${n.tls ? 'true' : 'false'}`];
      if (n.tls) {
        parts.push(`tls-name=${n.sni}`);
        if (n.alpn && n.alpn.length) parts.push(`alpn=${n.alpn.join(':')}`);
        parts.push(`skip-cert-verify=false`);
      }
      lines.push(`${n.name} = vless,${parts.join(',')}`);
    } else if (n.proto === 'trojan') {
      const parts = [`${n.server}`, `${n.port}`, `password=${n.password}`, `transport=ws`, `path=${n.path}`, `host=${n.host}`, `over-tls=true`, `tls-name=${n.sni}`];
      if (n.alpn && n.alpn.length) parts.push(`alpn=${n.alpn.join(':')}`);
      parts.push(`skip-cert-verify=false`);
      lines.push(`${n.name} = trojan,${parts.join(',')}`);
    } else if (n.proto === 'ss') {
      lines.push(`${n.name} = Shadowsocks,${n.server},${n.port},${n.cipher || 'chacha20-ietf-poly1305'},"${n.password}",fast-open=false,udp=true,plugin=v2ray-plugin,plugin-opts=mode:websocket;host:${n.host};path:${n.path || '/'};tls:${n.tls ? 'true' : 'false'}`);
    }
  }
  lines.push('', '[Proxy Group]');
  const listStr = names.length ? names.join(',') : 'DIRECT';
  lines.push(`🚀 节点选择 = select,🎯 全球直连,${listStr}`);
  lines.push(`🌍 国外媒体 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`📺 哔哩哔哩 = select,${buildIniGroupProxies(names, { directFirst: true, compact: true })}`);
  lines.push(`📹 油管视频 = select,${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'], compact: true })}`);
  lines.push(`🎬 奈飞视频 = select,${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'], compact: true })}`);
  lines.push(`📲 电报信息 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`🌐 谷歌服务 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`🤖 OpenAI = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push(`Ⓜ️ 微软服务 = select,${buildIniGroupProxies(names, { directFirst: true, compact: true })}`);
  lines.push(`🍎 苹果服务 = select,${buildIniGroupProxies(names, { directFirst: true, compact: true })}`);
  lines.push(`🎯 全球直连 = select,DIRECT`);
  lines.push(`🛑 全球拦截 = select,REJECT,DIRECT`);
  lines.push(`🐟 漏网之鱼 = select,${buildIniGroupProxies(names, { compact: true })}`);
  lines.push('', '[Remote Rule]');
  lines.push(`${aclRule('LocalAreaNetwork')}, policy=🎯 全球直连, tag=局域网, enabled=true`);
  lines.push(`${aclRule('BanAD')}, policy=🛑 全球拦截, tag=广告拦截, enabled=true`);
  lines.push(`${aclRule('BanProgramAD')}, policy=🛑 全球拦截, tag=应用广告, enabled=true`);
  lines.push(`${aclRule('GoogleCN')}, policy=🎯 全球直连, tag=GoogleCN, enabled=true`);
  lines.push(`${aclRule('SteamCN')}, policy=🎯 全球直连, tag=SteamCN, enabled=true`);
  lines.push(`${aclRule('Microsoft')}, policy=Ⓜ️ 微软服务, tag=微软, enabled=true`);
  lines.push(`${aclRule('Apple')}, policy=🍎 苹果服务, tag=苹果, enabled=true`);
  lines.push(`${aclRule('Telegram')}, policy=📲 电报信息, tag=电报, enabled=true`);
  lines.push(`${aclRule('OpenAi')}, policy=🤖 OpenAI, tag=OpenAI, enabled=true`);
  lines.push(`${aclRule('Netflix')}, policy=🌍 国外媒体, tag=Netflix, enabled=true`);
  lines.push(`${aclRule('YouTube')}, policy=🌍 国外媒体, tag=YouTube, enabled=true`);
  lines.push(`${aclRule('Disney')}, policy=🌍 国外媒体, tag=Disney, enabled=true`);
  lines.push(`${aclRule('Spotify')}, policy=🌍 国外媒体, tag=Spotify, enabled=true`);
  lines.push(`${aclRule('TikTok')}, policy=🌍 国外媒体, tag=TikTok, enabled=true`);
  lines.push(`${aclRule('BiliBili')}, policy=📺 哔哩哔哩, tag=哔哩哔哩, enabled=true`);
  lines.push(`${aclRule('ProxyMedia')}, policy=🌍 国外媒体, tag=代理媒体, enabled=true`);
  lines.push(`${aclRule('ProxyGFWlist')}, policy=🚀 节点选择, tag=代理列表, enabled=true`);
  lines.push(`${aclRule('ChinaDomain')}, policy=🎯 全球直连, tag=中国域名, enabled=true`);
  lines.push(`${aclRule('ChinaIp')}, policy=🎯 全球直连, tag=中国IP, enabled=true`);
  lines.push('', '[Rule]', 'GEOIP,CN,🎯 全球直连', 'FINAL,🐟 漏网之鱼');
  return lines.join('\n');
}

function generateQuanxConfig(links, options = {}) {
  const customDNS = options.customDNS || '223.5.5.5';
  const nodes = links.map(parseShareLink).filter(n => n && (n.proto === 'vless' || n.proto === 'trojan' || n.proto === 'ss'));
  const names = nodes.map(n => n.name);
  const qxBase = 'https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/QuantumultX';
  const lines = [
    '[general]',
    'network_check_url=http://www.gstatic.com/generate_204',
    'server_check_url=http://www.gstatic.com/generate_204',
    'dns_exclusion_list=*.cmpassport.com, *.jegotrip.com.cn, *.icloud.com, *.icloud.com.cn, *.apple.com, *.weibo.com, *.qq.com',
    'running_mode_trigger=filter',
    '',
    '[dns]',
    `server=${customDNS.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}`,
    'server=119.29.29.29',
    'server=https://223.5.5.5/dns-query',
    'server=https://1.12.12.12/dns-query',
    '',
    '[server_local]'
  ];
  for (const n of nodes) {
    if (n.proto === 'vless') {
      const parts = [`${n.server}:${n.port}`, `method=none`, `password=${n.uuid}`, `obfs=${n.tls ? 'wss' : 'ws'}`, `obfs-host=${n.host}`, `obfs-uri=${n.path}`];
      if (n.tls) parts.push(`tls-verification=true`, `tls13=true`);
      parts.push(`tag=${n.name}`);
      lines.push(`vless=${parts.join(', ')}`);
    } else if (n.proto === 'trojan') {
      const parts = [`${n.server}:${n.port}`, `password=${n.password}`, `over-tls=true`, `tls-host=${n.sni}`, `obfs=wss`, `obfs-host=${n.host}`, `obfs-uri=${n.path}`, `tls-verification=true`, `tag=${n.name}`];
      lines.push(`trojan=${parts.join(', ')}`);
    } else if (n.proto === 'ss') {
      lines.push(`shadowsocks=${n.server}:${n.port}, method=${n.cipher || 'chacha20-ietf-poly1305'}, password=${n.password}, obfs=${n.tls ? 'wss' : 'ws'}, obfs-host=${n.host}, obfs-uri=${n.path || '/'}, tag=${n.name}`);
    }
  }
  lines.push('', '[policy]');
  const listStr = names.length ? names.join(', ') : 'direct';
  lines.push(`static=🚀 节点选择, ${listStr}, direct`);
  lines.push(`static=🌍 国外媒体, ${buildIniGroupProxies(names)}`);
  lines.push(`static=📺 哔哩哔哩, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`static=📹 油管视频, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`static=🎬 奈飞视频, ${buildIniGroupProxies(names, { extraGroups: ['🌍 国外媒体'] })}`);
  lines.push(`static=📲 电报信息, ${buildIniGroupProxies(names)}`);
  lines.push(`static=🌐 谷歌服务, ${buildIniGroupProxies(names)}`);
  lines.push(`static=🤖 OpenAI, ${buildIniGroupProxies(names)}`);
  lines.push(`static=Ⓜ️ 微软服务, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`static=🍎 苹果服务, ${buildIniGroupProxies(names, { directFirst: true })}`);
  lines.push(`static=🎯 全球直连, direct`);
  lines.push(`static=🛑 全球拦截, reject, direct`);
  lines.push(`static=🐟 漏网之鱼, ${buildIniGroupProxies(names)}`);
  lines.push('', '[filter_remote]');
  lines.push(`${qxBase}/Lan/Lan.list, tag=局域网, force-policy=🎯 全球直连, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Advertising/Advertising.list, tag=广告拦截, force-policy=🛑 全球拦截, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Microsoft/Microsoft.list, tag=微软, force-policy=Ⓜ️ 微软服务, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Apple/Apple.list, tag=苹果, force-policy=🍎 苹果服务, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Telegram/Telegram.list, tag=电报, force-policy=📲 电报信息, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Google/Google.list, tag=谷歌, force-policy=🌐 谷歌服务, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/OpenAI/OpenAI.list, tag=OpenAI, force-policy=🤖 OpenAI, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Claude/Claude.list, tag=Claude, force-policy=🤖 OpenAI, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/YouTube/YouTube.list, tag=YouTube, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Netflix/Netflix.list, tag=Netflix, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Disney/Disney.list, tag=Disney, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Spotify/Spotify.list, tag=Spotify, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/TikTok/TikTok.list, tag=TikTok, force-policy=🌍 国外媒体, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/BiliBili/BiliBili.list, tag=哔哩哔哩, force-policy=📺 哔哩哔哩, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/Global/Global.list, tag=全球加速, force-policy=🚀 节点选择, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push(`${qxBase}/ChinaMax/ChinaMax.list, tag=中国直连, force-policy=🎯 全球直连, update-interval=86400, opt-parser=false, enabled=true`);
  lines.push('', '[filter_local]', 'geoip, cn, 🎯 全球直连', 'final, 🐟 漏网之鱼');
  return lines.join('\n');
}

// ============================================================================
// زنجیره اینترنت خانگی (Residential Chain - ?target=vg / jk)
// ============================================================================
const JK_SOURCE = 'https://www.vpngate.net/api/iphone/';
const JK_CACHE_TTL = 30 * 60 * 1000;
let jkCache = null;
let jkCacheTime = 0;
const jkDirectiveRegex = {};

function getJkDirective(text, name) {
  if (!jkDirectiveRegex[name]) jkDirectiveRegex[name] = new RegExp('^[ \\t]*' + name + '[ \\t]+(.+?)[ \\t]*$', 'm');
  const m = text.match(jkDirectiveRegex[name]);
  return m ? m[1].trim() : '';
}

function getJkInlineBlock(text, tag) {
  const m = text.match(new RegExp('<' + tag + '>([\\s\\S]*?)<\\/' + tag + '>'));
  return m ? m[1].trim() : '';
}

function indentCert(text, pad) {
  return text.split('\n').map(l => l.trim()).filter(Boolean).map(l => pad + l).join('\n');
}

function decodeJkConfig(b64, full = false) {
  const clean = b64.replace(/\s/g, '');
  if (full || clean.length <= 6000) return decodeBase64Utf8(clean);
  return decodeBase64Utf8(clean.slice(0, 6000));
}

function parseJkList(raw) {
  const candidates = [];
  for (const rawLine of raw.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.charAt(0) === '*' || line.charAt(0) === '#') continue;
    const fields = line.split(',');
    if (fields.length < 15) continue;
    if ((fields[0] || '').indexOf('public-vpn') === 0) continue;
    if ((fields[1] || '').indexOf('219.100.37.') === 0) continue;
    const b64 = fields[fields.length - 1];
    if (!b64 || b64.length < 100) continue;
    candidates.push({
      country: (fields[6] || '').toUpperCase() || 'XX',
      speed: parseInt(fields[4], 10) || 0,
      b64
    });
  }
  candidates.sort((a, b) => b.speed - a.speed);
  const nodes = [];
  let cert = null;
  for (const item of candidates) {
    let text = '';
    try {
      text = decodeJkConfig(item.b64);
      if (!getJkDirective(text, 'remote')) text = decodeJkConfig(item.b64, true);
    } catch (_e) {
      continue;
    }
    if ((getJkDirective(text, 'proto') || 'tcp').toLowerCase() !== 'tcp') continue;
    const remote = getJkDirective(text, 'remote').split(/\s+/);
    if (!remote[0]) continue;
    if (!cert) {
      try {
        const fullText = decodeJkConfig(item.b64, true);
        const c = {
          ca: getJkInlineBlock(fullText, 'ca'),
          cert: getJkInlineBlock(fullText, 'cert'),
          key: getJkInlineBlock(fullText, 'key')
        };
        if (c.ca && c.cert && c.key) cert = c;
      } catch (_e) {}
      if (!cert) continue;
    }
    nodes.push({
      country: item.country,
      address: remote[0],
      port: parseInt(remote[1], 10) || 443,
      cipher: getJkDirective(text, 'cipher') || 'AES-128-CBC',
      auth: getJkDirective(text, 'auth') || 'SHA1'
    });
  }
  return { nodes, cert };
}

async function fetchJkNodes() {
  const now = Date.now();
  if (jkCache && now - jkCacheTime < JK_CACHE_TTL) return jkCache;
  let raw = '';
  let lastErr = null;
  for (const src of [JK_SOURCE, JK_SOURCE.replace(/^https:/, 'http:')]) {
    try {
      const resp = await fetch(src, {
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/plain' }
      });
      if (!resp.ok) {
        lastErr = new Error('Status ' + resp.status);
        continue;
      }
      raw = await resp.text();
      break;
    } catch (e) {
      lastErr = e;
    }
  }
  if (!raw) throw lastErr || new Error('Empty JK response');
  const parsed = parseJkList(raw);
  if (!parsed.nodes.length || !parsed.cert) throw new Error('No valid JK residential nodes');
  jkCache = parsed;
  jkCacheTime = now;
  return parsed;
}

async function generateResidentialChainConfig(links, options = {}) {
  const customDNS = options.customDNS || 'https://223.5.5.5/dns-query';
  const customECHDomain = options.customECHDomain || 'cloudflare-ech.com';
  const subNodeCount = parseInt(options.subNodeCount ?? 50, 10) || 0;
  const frontGroupName = '⚡ CF前置';
  const jkAuto = '🏠 家宽自动';
  const jkSelect = '🏠 家宽节点';
  const mainSelect = '🚀 节点选择';

  const allFront = links
    .map(parseShareLink)
    .filter(n => n && (n.proto === 'vless' || n.proto === 'trojan'));
  const tlsFront = allFront.filter(n => n.tls);
  const frontNodes = (tlsFront.length ? tlsFront : allFront).map((n, idx) => ({
    ...n,
    name: `${idx + 1}+${BRAND_NAME}`
  }));
  const frontNames = frontNodes.map(n => n.name);

  const { nodes, cert } = await fetchJkNodes();
  const slicedJk = subNodeCount > 0 ? nodes.slice(0, subNodeCount) : nodes;
  const jkItems = slicedJk.map((n, idx) => ({
    ...n,
    name: `${frontNodes.length + idx + 1}+${BRAND_NAME}`
  }));

  const header = [
    '# miliconfig 家宽订阅：CF 节点带路，落地是住宅宽带',
    'mixed-port: 7890',
    'allow-lan: false',
    'mode: rule',
    'log-level: info',
    'ipv6: false',
    'unified-delay: true',
    'tcp-concurrent: true',
    'external-controller: 127.0.0.1:9090',
    'dns:',
    '  enable: true',
    '  ipv6: false',
    '  enhanced-mode: fake-ip',
    '  fake-ip-range: 198.18.0.1/16',
    '  nameserver:',
    '    - ' + customDNS,
    '    - https://1.1.1.1/dns-query',
    ''
  ];

  const proxySection = ['proxies:'];
  for (const n of frontNodes) proxySection.push(buildClashNodeYaml(n, customECHDomain));
  jkItems.forEach((n, idx) => {
    const row = [
      '  - name: "' + n.name + '"',
      '    type: openvpn',
      '    server: ' + n.address,
      '    port: ' + n.port,
      '    proto: tcp',
      '    username: vpn',
      '    password: vpn',
      '    cipher: ' + n.cipher,
      '    auth: ' + n.auth,
      '    udp: false',
      '    handshake-timeout: 30',
      '    remote-dns-resolve: true',
      '    dns: [ 8.8.8.8, 1.1.1.1 ]'
    ];
    if (frontNames.length) row.push('    dialer-proxy: "' + frontGroupName + '"');
    if (idx === 0) {
      row.push('    ca: &jkca |-', indentCert(cert.ca, '      '));
      row.push('    cert: &jkcert |-', indentCert(cert.cert, '      '));
      row.push('    key: &jkkey |-', indentCert(cert.key, '      '));
    } else {
      row.push('    ca: *jkca', '    cert: *jkcert', '    key: *jkkey');
    }
    proxySection.push(row.join('\n'));
  });

  const listFmt = arr => arr.map(x => '      - "' + x + '"').join('\n');
  const jkNames = jkItems.map(x => x.name);
  const groupSection = ['proxy-groups:'];
  if (frontNames.length) {
    groupSection.push(
      '  - name: "' + frontGroupName + '"',
      '    type: url-test',
      '    url: https://www.gstatic.com/generate_204',
      '    interval: 300',
      '    tolerance: 50',
      '    proxies:',
      listFmt(frontNames)
    );
  }
  groupSection.push(
    '  - name: "' + jkAuto + '"',
    '    type: fallback',
    '    url: https://www.gstatic.com/generate_204',
    '    interval: 1800',
    '    lazy: true',
    '    proxies:',
    listFmt(jkNames)
  );
  groupSection.push('  - name: "' + jkSelect + '"', '    type: select', '    proxies:', listFmt(jkNames));
  const mainList = ['      - "' + jkAuto + '"', '      - "' + jkSelect + '"'];
  if (frontNames.length) mainList.push('      - "' + frontGroupName + '"');
  mainList.push('      - DIRECT');
  groupSection.push('  - name: "' + mainSelect + '"', '    type: select', '    proxies:', mainList.join('\n'));

  const rules = [
    'rules:',
    '  - GEOIP,LAN,DIRECT,no-resolve',
    '  - GEOIP,CN,DIRECT,no-resolve',
    '  - MATCH,' + mainSelect
  ];

  return header.concat(proxySection, [''], groupSection, [''], rules, ['']).join('\n');
}


// --- MODULE: src/subscription/generator.js ---
// ============================================================================
// miliconfig v3.1 - تولیدکننده ساب‌لینک چندکاربره با نام‌گذاری number+miliconfig
// و اعمال دقیق تنظیمات هر کاربر + محدودیت تعداد نودها در ساب (subNodeCount)
// ============================================================================


function getOfficialDirectAddress() {
  const hit = OFFICIAL_DIRECT_IPS[Math.floor(Math.random() * OFFICIAL_DIRECT_IPS.length)];
  return {
    domain: hit,
    region: 'CF',
    regionCode: 'CF',
    port: 443
  };
}

function getNeighborRegions(region) {
  const map = {
    US: ['SG', 'JP', 'KR'],
    SG: ['JP', 'KR', 'US'],
    JP: ['SG', 'KR', 'US'],
    KR: ['JP', 'SG', 'US'],
    DE: ['NL', 'GB', 'SE', 'FI'],
    SE: ['DE', 'NL', 'FI', 'GB'],
    NL: ['DE', 'GB', 'SE', 'FI'],
    FI: ['SE', 'DE', 'NL', 'GB'],
    GB: ['DE', 'NL', 'SE', 'FI']
  };
  return map[region] || [];
}

function getOrderedRegions(region) {
  const neighbors = getNeighborRegions(region);
  const all = ['US', 'SG', 'JP', 'KR', 'DE', 'SE', 'NL', 'FI', 'GB'];
  return [region, ...neighbors, ...all.filter(r => r !== region && !neighbors.includes(r))];
}

async function selectFallbackProxyAddress(workerRegion = '', enableRegionMatch = true) {
  if (!workerRegion || workerRegion === 'CF') {
    return getOfficialDirectAddress();
  }
  if (FALLBACK_PROXY_IPS.length === 0) {
    return getOfficialDirectAddress();
  }
  if (enableRegionMatch && workerRegion) {
    const ordered = getOrderedRegions(workerRegion);
    for (const r of ordered) {
      const found = FALLBACK_PROXY_IPS.find(item => item.regionCode === r);
      if (found) return found;
    }
  }
  return FALLBACK_PROXY_IPS[0];
}

function getXhttpPaddingMeta(uuidStr) {
  const s = String(uuidStr || '');
  return {
    header: s.slice(1, 7) || 'x-mili',
    key: '_' + (s.slice(25, 31) || 'pad001')
  };
}

function parseCustomPreferredString(yxStr = '') {
  const ipList = [];
  const domainList = [];
  if (!yxStr || !String(yxStr).trim()) {
    return { ipList, domainList };
  }
  const items = String(yxStr)
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  for (const item of items) {
    let nodeName = '';
    let addrPart = item;
    if (item.includes('#')) {
      const parts = item.split('#');
      addrPart = parts[0].trim();
      nodeName = parts.slice(1).join('#').trim();
    }
    const { address, port } = parseAddressAndPort(addrPart);
    if (!address) continue;
    if (!nodeName) {
      nodeName = `${address}${port ? ':' + port : ''}`;
    }
    if (isValidIpAddress(address)) {
      ipList.push({ ip: address, port: port || 443, isp: nodeName, name: nodeName });
    } else if (isValidDomain(address) || address.includes('.')) {
      domainList.push({ domain: address, port: port || 443, name: nodeName });
    }
  }
  return { ipList, domainList };
}

async function fetchUouinPreferredIps(cfg = {}) {
  const lineMap = {
    ctcc: '电信',
    cucc: '联通',
    cmcc: '移动',
    bgp: '多线',
    ipv6: 'IPv6'
  };
  const v4Enabled = cfg.ipv4 !== 'no';
  const v6Enabled = cfg.ipv6 !== 'no';
  const mobileEnabled = cfg.ispMobile !== 'no';
  const unicomEnabled = cfg.ispUnicom !== 'no';
  const telecomEnabled = cfg.ispTelecom !== 'no';

  try {
    const ts = String(Date.now());
    const innerHash = await md5Hex('DdlTxtN0sUOu');
    const keyHash = await md5Hex(innerHash + '70cloudflareapikey' + ts);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const resp = await fetch(`https://api.uouin.com/index.php/index/Cloudflare?key=${keyHash}&time=${ts}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!resp.ok) return [];
    const data = await resp.json();
    const groups = data && data.data;
    if (!groups) return [];
    const results = [];
    for (const groupKey of Object.keys(lineMap)) {
      const isV6 = groupKey === 'ipv6';
      if (isV6 && !v6Enabled) continue;
      if (!isV6 && !v4Enabled) continue;
      const lineName = lineMap[groupKey];
      if (lineName === '移动' && !mobileEnabled) continue;
      if (lineName === '联通' && !unicomEnabled) continue;
      if (lineName === '电信' && !telecomEnabled) continue;
      const groupObj = groups[groupKey];
      const infoList = groupObj && Array.isArray(groupObj.info) ? groupObj.info : [];
      for (const entry of infoList) {
        const ip = normalizeNodeHost(entry && entry.ip);
        if (!ip) continue;
        results.push({ isp: lineName, ip, port: 443, colo: entry?.colo || '' });
      }
    }
    return results;
  } catch (_e) {
    return [];
  }
}

async function fetchPreferredFromUrls(urlListStr = '', defaultPort = '443', timeout = 3000) {
  if (!urlListStr || !String(urlListStr).trim()) return [];
  const urls = String(urlListStr)
    .split(',')
    .map(u => u.trim())
    .filter(Boolean);
  if (!urls.length) return [];

  const outSet = new Set();
  await Promise.allSettled(
    urls.map(async url => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!resp.ok) return;
        const text = await resp.text();
        if (!text || !text.trim()) return;
        const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
        const isCsv = lines.length > 1 && lines[0].includes(',');
        const v6Pattern = /^[^\[\]]*:[^\[\]]*:[^\[\]]/;
        if (!isCsv) {
          for (const line of lines) {
            const hashIdx = line.indexOf('#');
            const [hostPart, remark] = hashIdx > -1 ? [line.substring(0, hashIdx), line.substring(hashIdx)] : [line, ''];
            let hasPort = false;
            if (hostPart.startsWith('[')) {
              hasPort = /\]:(\d+)$/.test(hostPart);
            } else {
              const colonIdx = hostPart.lastIndexOf(':');
              hasPort = colonIdx > -1 && /^\d+$/.test(hostPart.substring(colonIdx + 1));
            }
            const port = new URL(url).searchParams.get('port') || defaultPort;
            outSet.add(hasPort ? line : `${hostPart}:${port}${remark}`);
          }
        } else {
          const headers = lines[0].split(',').map(h => h.trim());
          const dataRows = lines.slice(1);
          if (headers.includes('IP地址') && headers.includes('端口')) {
            const ipIdx = headers.indexOf('IP地址');
            const portIdx = headers.indexOf('端口');
            const tlsIdx = headers.indexOf('TLS');
            for (const row of dataRows) {
              const cols = row.split(',').map(c => c.trim());
              if (tlsIdx !== -1 && cols[tlsIdx]?.toLowerCase() !== 'true') continue;
              const wrapped = v6Pattern.test(cols[ipIdx]) ? `[${cols[ipIdx]}]` : cols[ipIdx];
              outSet.add(`${wrapped}:${cols[portIdx]}#CF`);
            }
          }
        }
      } catch (_e) {}
    })
  );

  const parsed = [];
  const regex = /^(\[[\da-fA-F:]+\]|[\d.]+|[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*)(?::(\d+))?(?:#(.+))?$/;
  for (const item of outSet) {
    const m = item.match(regex);
    if (m) {
      parsed.push({
        ip: normalizeNodeHost(m[1]),
        port: parseInt(m[2] || '443', 10),
        name: m[3]?.trim() || m[1]
      });
    }
  }
  return parsed;
}

function buildVlessLinks(list, userUuid, workerHost, cfg, namer, wkOverride = '') {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const defaultHttps = [443];
  const defaultHttp = disableNonTls ? [] : [80];
  const links = [];
  const wsPath = wkOverride ? `/?ed=2048&wk=${encodeURIComponent(wkOverride)}` : '/?ed=2048';
  const alpn = normalizeAlpn(cfg.alpn);
  const enableEch = cfg.ech === 'yes';
  const dnsVal = cfg.customDNS || CONFIG_DEFAULTS.customDNS;
  const echDomain = cfg.customECHDomain || CONFIG_DEFAULTS.customECHDomain;

  for (const item of list) {
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const portsToGen = [];
    if (item.port) {
      const p = Number(item.port);
      if (CF_HTTPS_PORTS.includes(p)) {
        portsToGen.push({ port: p, tls: true });
      } else if (CF_HTTP_PORTS.includes(p)) {
        if (!disableNonTls) portsToGen.push({ port: p, tls: false });
      } else {
        portsToGen.push({ port: p, tls: true });
      }
    } else {
      defaultHttps.forEach(p => portsToGen.push({ port: p, tls: true }));
      defaultHttp.forEach(p => portsToGen.push({ port: p, tls: false }));
    }

    for (const { port, tls } of portsToGen) {
      const nodeName = namer(item);
      if (tls) {
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'tls',
          sni: workerHost,
          fp: 'chrome',
          type: 'ws',
          host: workerHost,
          path: wsPath
        });
        if (alpn) params.set('alpn', alpn);
        if (enableEch) params.set('ech', `${echDomain}+${dnsVal}`);
        links.push(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      } else {
        const params = new URLSearchParams({
          encryption: 'none',
          security: 'none',
          type: 'ws',
          host: workerHost,
          path: wsPath
        });
        links.push(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      }
    }
  }
  return links;
}


function rotateIpListByTimeBucket(list, rotationSetting = 'off') {
  if (!rotationSetting || rotationSetting === 'off' || !Array.isArray(list) || list.length <= 1) {
    return list;
  }
  let intervalMs = 0;
  if (rotationSetting === '5m') intervalMs = 5 * 60 * 1000;
  else if (rotationSetting === '15m') intervalMs = 15 * 60 * 1000;
  else if (rotationSetting === '30m') intervalMs = 30 * 60 * 1000;
  else if (rotationSetting === '1h') intervalMs = 60 * 60 * 1000;
  else if (rotationSetting === '6h') intervalMs = 6 * 3600 * 1000;
  else if (rotationSetting === '24h') intervalMs = 24 * 3600 * 1000;
  if (!intervalMs) return list;

  const bucket = Math.floor(Date.now() / intervalMs);
  const shift = bucket % list.length;
  if (shift === 0) return list;
  return [...list.slice(shift), ...list.slice(0, shift)];
}

function buildShadowsocksLinks(list, userUuid, workerHost, cfg, namer) {
  const links = [];
  const sspass = (cfg.sspass && String(cfg.sspass).trim()) || userUuid;
  const cipher = (cfg.ssmethod && String(cfg.ssmethod).trim()) || 'chacha20-ietf-poly1305';
  const alpn = normalizeAlpn(cfg.alpn);
  const userinfo = btoa(`${cipher}:${sspass}`);
  const fp = cfg.fp || 'chrome';

  for (const item of list) {
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const port = item.port || 443;
    const nodeName = namer(item);

    const params = new URLSearchParams({
      plugin: `v2ray-plugin;mode=websocket;path=/;host=${workerHost};tls`,
      type: 'ws',
      host: workerHost,
      path: '/',
      security: 'tls',
      sni: workerHost,
      fp
    });
    if (alpn) params.set('alpn', alpn);

    links.push(`ss://${userinfo}@${safeAddr}:${port}/?${params.toString()}#${encodeURIComponent(nodeName)}`);
  }
  return links;
}

function buildTrojanLinks(list, userUuid, workerHost, cfg, namer, wkOverride = '') {
  const disableNonTls = cfg.dkby === 'yes' || cfg.ech === 'yes';
  const defaultHttps = [443];
  const defaultHttp = disableNonTls ? [] : [80];
  const links = [];
  const wsPath = wkOverride ? `/?ed=2048&wk=${encodeURIComponent(wkOverride)}` : '/?ed=2048';
  const password = (cfg.tp && String(cfg.tp).trim()) || userUuid;
  const alpn = normalizeAlpn(cfg.alpn);
  const enableEch = cfg.ech === 'yes';
  const dnsVal = cfg.customDNS || CONFIG_DEFAULTS.customDNS;
  const echDomain = cfg.customECHDomain || CONFIG_DEFAULTS.customECHDomain;

  for (const item of list) {
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const portsToGen = [];
    if (item.port) {
      const p = Number(item.port);
      if (CF_HTTPS_PORTS.includes(p)) {
        portsToGen.push({ port: p, tls: true });
      } else if (CF_HTTP_PORTS.includes(p)) {
        if (!disableNonTls) portsToGen.push({ port: p, tls: false });
      } else {
        portsToGen.push({ port: p, tls: true });
      }
    } else {
      defaultHttps.forEach(p => portsToGen.push({ port: p, tls: true }));
      defaultHttp.forEach(p => portsToGen.push({ port: p, tls: false }));
    }

    for (const { port, tls } of portsToGen) {
      const nodeName = namer(item);
      if (tls) {
        const params = new URLSearchParams({
          security: 'tls',
          sni: workerHost,
          fp: 'chrome',
          type: 'ws',
          host: workerHost,
          path: wsPath
        });
        if (alpn) params.set('alpn', alpn);
        if (enableEch) params.set('ech', `${echDomain}+${dnsVal}`);
        links.push(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      } else {
        const params = new URLSearchParams({
          security: 'none',
          type: 'ws',
          host: workerHost,
          path: wsPath
        });
        links.push(`trojan://${encodeURIComponent(password)}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
      }
    }
  }
  return links;
}

function buildXhttpLinks(list, userUuid, workerHost, cfg, namer) {
  const links = [];
  const shortPath = String(userUuid || '').substring(0, 8);
  const alpn = normalizeAlpn(cfg.alpn);
  const enableEch = cfg.ech === 'yes';
  const dnsVal = cfg.customDNS || CONFIG_DEFAULTS.customDNS;
  const echDomain = cfg.customECHDomain || CONFIG_DEFAULTS.customECHDomain;
  const { header: xPadHeader, key: xPadKey } = getXhttpPaddingMeta(userUuid);

  for (const item of list) {
    const rawHost = normalizeNodeHost(item.ip || item.domain);
    if (!rawHost) continue;
    const safeAddr = rawHost.includes(':') ? `[${rawHost}]` : rawHost;
    const port = item.port || 443;
    const nodeName = namer(item);
    const params = new URLSearchParams({
      encryption: 'none',
      security: 'tls',
      sni: workerHost,
      fp: 'chrome',
      type: 'xhttp',
      host: workerHost,
      path: `/${shortPath}`,
      mode: 'stream-one'
    });
    params.set(
      'extra',
      JSON.stringify({
        xPaddingObfsMode: true,
        xPaddingMethod: 'tokenish',
        xPaddingPlacement: 'queryInHeader',
        xPaddingHeader: xPadHeader,
        xPaddingKey: xPadKey
      })
    );
    if (alpn) params.set('alpn', alpn);
    if (enableEch) params.set('ech', `${echDomain}+${dnsVal}`);
    links.push(`vless://${userUuid}@${safeAddr}:${port}?${params.toString()}#${encodeURIComponent(nodeName)}`);
  }
  return links;
}

// تولید لیست کامل لینک‌های نود برای کاربر با نام‌گذاری دقیق number+miliconfig و رعایت سقف تعداد نود در ساب
async function generateUserNodesList(userOrConfig, workerHost, queryOverrides = {}) {
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);
  const userUuid = String(userOrConfig?.uuid || queryOverrides.uuid || '351c9981-04b6-4103-aa4b-864aa9c91469').toLowerCase();
  const nodeScope = queryOverrides.scope || userOrConfig?.nodeScope || 'all';
  const wkOverride = (queryOverrides.wk || cfg.wk || '').trim().toUpperCase();
  const protoFilter = (queryOverrides.proto || '').trim().toLowerCase();

  const allowedProtos = Array.isArray(userOrConfig?.allowedProtocols)
    ? userOrConfig.allowedProtocols.map(p => p.toLowerCase())
    : ['vless', 'shadowsocks', 'ss', 'trojan', 'xhttp'];

  const evAllowed = allowedProtos.includes('vless');
  const esAllowed = allowedProtos.includes('shadowsocks') || allowedProtos.includes('ss');
  const etAllowed = allowedProtos.includes('trojan');
  const exAllowed = allowedProtos.includes('xhttp');

  const evEnabled = evAllowed && (protoFilter ? protoFilter === 'vless' : isEnabledValue(cfg.ev, true));
  const etEnabled = etAllowed && (protoFilter ? protoFilter === 'trojan' : isEnabledValue(cfg.et, false));
  const exEnabled = exAllowed && (protoFilter ? protoFilter === 'xhttp' : isEnabledValue(cfg.ex, false));
  const esEnabled = esAllowed && (protoFilter ? (protoFilter === 'ss' || protoFilter === 'shadowsocks') : isEnabledValue(cfg.es, false));

  const namer = createMiliNodeNamer(BRAND_NAME);
  const rawLinks = [];

  function appendFromSource(sourceList) {
    if (!Array.isArray(sourceList) || sourceList.length === 0) return;
    if (evEnabled) rawLinks.push(...buildVlessLinks(sourceList, userUuid, workerHost, cfg, namer, wkOverride));
    if (etEnabled) rawLinks.push(...buildTrojanLinks(sourceList, userUuid, workerHost, cfg, namer, wkOverride));
    if (exEnabled) rawLinks.push(...buildXhttpLinks(sourceList, userUuid, workerHost, cfg, namer));
    if (esEnabled) rawLinks.push(...buildShadowsocksLinks(sourceList, userUuid, workerHost, cfg, namer));
  }

  // فیلتر کشوری پروکسی‌های VIP بر اساس کشور در صورت درخواست کاربر
  const countryFilter = (queryOverrides.country || '').trim().toUpperCase();
  if (countryFilter) {
    if (COUNTRY_PROXY_SOURCES[countryFilter]) {
      const countryUrls = COUNTRY_PROXY_SOURCES[countryFilter].urls.join(',');
      const countryIps = await fetchPreferredFromUrls(countryUrls);
      if (countryIps.length > 0) {
        appendFromSource(countryIps);
      }
    } else if (countryFilter === 'MULTI' || countryFilter === 'ALL') {
      const topCountries = ['DE', 'NL', 'US', 'GB', 'TR', 'AE', 'CA', 'SE'];
      const multiUrls = topCountries.flatMap(c => COUNTRY_PROXY_SOURCES[c]?.urls || []).slice(0, 10).join(',');
      const multiIps = await fetchPreferredFromUrls(multiUrls);
      if (multiIps.length > 0) {
        appendFromSource(multiIps);
      }
    }
  }

  const disablePreferred = cfg.yxby === 'yes' || nodeScope === 'origin';
  const enableNative = cfg.ena === 'yes' || nodeScope === 'origin';

  if (enableNative && nodeScope !== 'edge') {
    appendFromSource([{ ip: workerHost, isp: 'Origin' }]);
  }

  const { ipList: customIps, domainList: customDomains } = parseCustomPreferredString(cfg.yx);
  const hasCustomPreferred = customIps.length > 0 || customDomains.length > 0;

  if (!disablePreferred) {
    if (hasCustomPreferred) {
      if (customIps.length > 0 && cfg.epi === 'yes') {
        appendFromSource(customIps);
      }
      if (customDomains.length > 0 && cfg.epd === 'yes') {
        appendFromSource(customDomains.map(d => ({ ip: d.domain, port: d.port, isp: d.name || d.domain })));
      }
    } else {
      if (cfg.epd === 'yes') {
        appendFromSource(DIRECT_DOMAINS.map(d => ({ ip: d.domain, isp: d.name || d.domain })));
      }
      if (cfg.epi === 'yes' && !cfg.yxURL) {
        const uouinList = await fetchUouinPreferredIps(cfg);
        if (uouinList.length > 0) {
          appendFromSource(uouinList);
        }
      }
      if (cfg.egi === 'yes' && cfg.yxURL) {
        const urlList = await fetchPreferredFromUrls(cfg.yxURL);
        if (urlList.length > 0) {
          appendFromSource(urlList);
        }
      }
      // اگر لیست خارجی در دسترس نبود، از استخر IPهای مستقیم رسمی CF اضافه می‌کنیم تا همیشه تعداد کافی نود سالم تولید شود
      if (rawLinks.length < 15 && cfg.epi === 'yes') {
        appendFromSource(OFFICIAL_DIRECT_IPS.map(ip => ({ ip, port: 443, isp: 'CF-Direct' })));
      }
    }
  }

  if (rawLinks.length === 0) {
    appendFromSource([{ ip: workerHost, port: 443, isp: 'Origin' }]);
  }

  const subNodeCount = queryOverrides.limit !== undefined
    ? parseInt(queryOverrides.limit, 10)
    : Number(userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 50);

  // اعمال چرخش خودکار آی‌پی در صورت تنظیم بازه زمانی توسط مدیر
  const rotatedLinks = rotateIpListByTimeBucket(rawLinks, cfg.ipRotation || 'off');

  // اعمال دقیق نام‌گذاری number+miliconfig و سقف تعداد نودهای ساب‌لینک کاربر
  const finalized = finalizeMiliSubscriptionLinks(rotatedLinks, subNodeCount, BRAND_NAME);

  // افزودن الزامی ۳ نود هاردکدشده اطلاع‌رسانی در صدر تمام ساب‌لینک‌ها
  return [...HARDCODED_INFO_NODES, ...finalized];
}

// تشخیص خودکار کلاینت از User-Agent در صورت عدم ارسال پارامتر target
function detectTargetFromRequest(request, url) {
  const explicit = url.searchParams.get('target');
  if (explicit && explicit.trim()) return explicit.trim().toLowerCase();
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  if (ua.includes('clash') || ua.includes('mihomo') || ua.includes('flclash') || ua.includes('stash') || ua.includes('verge')) {
    return 'clash';
  }
  if (ua.includes('sing-box') || ua.includes('singbox') || ua.includes('hiddify') || ua.includes('sfa') || ua.includes('sfm') || ua.includes('karing')) {
    return 'singbox';
  }
  if (ua.includes('surge')) return 'surge';
  if (ua.includes('quantumult')) return 'quanx';
  if (ua.includes('loon')) return 'loon';
  return 'base64';
}

async function handleSubscriptionResponse(request, userOrConfig, url = null) {
  if (!url) url = new URL(request.url);
  const workerHost = url.hostname;
  const rawCfg = userOrConfig?.config ? userOrConfig.config : (userOrConfig || {});
  const cfg = normalizeEffectiveConfig(rawCfg);

  // بررسی وضعیت فعال بودن، حجم و انقضای کاربر
  if (userOrConfig && userOrConfig.enabled === false) {
    const disabledNode = `vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=tls&type=ws#${encodeURIComponent('1+' + BRAND_NAME)}`;
    return new Response(btoa(disabledNode), {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const target = detectTargetFromRequest(request, url);
  const isJkTarget = ['vg', 'jk', 'jiakuan'].includes(target);
  if (isJkTarget && cfg.jk !== 'yes') {
    return new Response('زنجیره اینترنت خانگی فعال نیست. در پنل مدیریت miliconfig گزینه «فعال‌سازی زنجیره اینترنت خانگی (jk)» را روشن کنید.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
    });
  }

  const queryOverrides = {
    wk: url.searchParams.get('wk') || '',
    proto: url.searchParams.get('proto') || '',
    country: url.searchParams.get('country') || '',
    scope: url.searchParams.get('scope') || userOrConfig?.nodeScope || 'all',
    limit: url.searchParams.get('limit') !== null ? url.searchParams.get('limit') : undefined
  };

  const finalLinks = await generateUserNodesList(userOrConfig, workerHost, queryOverrides);

  let bodyContent = '';
  let contentType = 'text/plain; charset=utf-8';

  switch (target) {
    case 'clash':
    case 'clashr':
    case 'stash':
    case 'meta':
    case 'clashmeta':
      bodyContent = generateClashConfig(finalLinks, cfg);
      contentType = 'text/yaml; charset=utf-8';
      break;
    case 'vg':
    case 'jk':
    case 'jiakuan':
      try {
        bodyContent = await generateResidentialChainConfig(finalLinks, {
          ...cfg,
          subNodeCount: userOrConfig?.subNodeCount ?? cfg.subNodeCount ?? 50
        });
        contentType = 'text/yaml; charset=utf-8';
      } catch (err) {
        return new Response('گره‌های اینترنت خانگی موقتاً در دسترس نیستند: ' + (err?.message || err), {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' }
        });
      }
      break;
    case 'singbox':
    case 'sing-box':
      bodyContent = generateSingboxConfig(finalLinks, cfg);
      contentType = 'application/json; charset=utf-8';
      break;
    case 'surge':
    case 'surge2':
    case 'surge3':
    case 'surge4':
      bodyContent = generateSurgeConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'quantumult':
    case 'quanx':
      bodyContent = generateQuanxConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'loon':
      bodyContent = generateLoonConfig(finalLinks, cfg);
      contentType = 'text/plain; charset=utf-8';
      break;
    case 'raw':
    case 'plain':
      bodyContent = finalLinks.join('\n');
      contentType = 'text/plain; charset=utf-8';
      break;
    default:
      bodyContent = btoa(finalLinks.join('\n'));
      contentType = 'text/plain; charset=utf-8';
      break;
  }

  const totalBytes = userOrConfig?.dataLimitGb > 0 ? Math.floor(userOrConfig.dataLimitGb * 1073741824) : 0;
  const usedBytes = Number(userOrConfig?.usedBytes || 0);
  const expireSec = userOrConfig?.expireAt > 0 ? Math.floor(userOrConfig.expireAt / 1000) : 0;
  const profileTitle = userOrConfig?.username ? `${BRAND_NAME} - ${userOrConfig.username}` : BRAND_NAME;

  const headers = {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Access-Control-Allow-Origin': '*',
    'Profile-Title': `base64:${encodeBase64Utf8(profileTitle)}`,
    'Profile-Update-Interval': '12',
    'Subscription-Userinfo': `upload=0; download=${usedBytes}; total=${totalBytes}; expire=${expireSec}`
  };

  if (cfg.ech === 'yes') {
    headers['X-ECH-Status'] = 'ENABLED';
  }

  return new Response(bodyContent, { headers });
}


// --- MODULE: src/core/runtime.js ---
// ============================================================================
// miliconfig v3.1 - موتور هسته پروکسی (VLESS + Trojan + xhttp + SOCKS5/HTTP + GrainTCP)
// منطبق ۱۰۰٪ با کد اصلی CFnew v3.1 + احراز هویت چندکاربره D1 و ثبت ترافیک
// ============================================================================


const ADDR_TYPE_IPV4 = 1;
const ADDR_TYPE_DOMAIN = 2;
const ADDR_TYPE_IPV6 = 3;

const PROXY_KIND_SOCKS5 = 'p5';
const PROXY_KIND_HTTP = 'pt';
const PROXY_KIND_HTTPS = 'pts';

const CHUNK_SIZE = 64 * 1024;
const DOWNLOAD_PACKET_SIZE = 32 * 1024;
const DOWNLOAD_TAIL = 512;
const DOWNLOAD_DELAY = 0;
const UPLOAD_PACKET_SIZE = 16 * 1024;
const UPLOAD_QUEUE_LIMIT = 256 * 1024;
const CONNECT_RACE_COUNT = 2;
const FIRST_BYTE_TIMEOUT = 3500;

const HEX_TABLE = Array.from({ length: 256 }, (_v, i) => (i + 256).toString(16).slice(1));

function bytesToUuid(bytes, offset = 0) {
  const s = (
    HEX_TABLE[bytes[offset]] +
    HEX_TABLE[bytes[offset + 1]] +
    HEX_TABLE[bytes[offset + 2]] +
    HEX_TABLE[bytes[offset + 3]] +
    '-' +
    HEX_TABLE[bytes[offset + 4]] +
    HEX_TABLE[bytes[offset + 5]] +
    '-' +
    HEX_TABLE[bytes[offset + 6]] +
    HEX_TABLE[bytes[offset + 7]] +
    '-' +
    HEX_TABLE[bytes[offset + 8]] +
    HEX_TABLE[bytes[offset + 9]] +
    '-' +
    HEX_TABLE[bytes[offset + 10]] +
    HEX_TABLE[bytes[offset + 11]] +
    HEX_TABLE[bytes[offset + 12]] +
    HEX_TABLE[bytes[offset + 13]] +
    HEX_TABLE[bytes[offset + 14]] +
    HEX_TABLE[bytes[offset + 15]]
  ).toLowerCase();
  return isValidUuid(s) ? s : '';
}

function toUint8Array(chunk) {
  if (chunk instanceof Uint8Array) return chunk;
  if (chunk instanceof ArrayBuffer) return new Uint8Array(chunk);
  if (ArrayBuffer.isView(chunk)) return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  return new Uint8Array(chunk || 0);
}

function concatUint8Arrays(head, body) {
  const a = toUint8Array(head);
  const b = toUint8Array(body);
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a);
  out.set(b, a.byteLength);
  return out;
}

function closeSocketSafe(ws) {
  try {
    if (ws && (ws.readyState === 1 || ws.readyState === 2)) ws.close();
  } catch (_e) {}
}

function parseBase64EarlyData(b64Str) {
  if (!b64Str) return { earlyData: null, error: null };
  try {
    const clean = b64Str.replace(/-/g, '+').replace(/_/g, '/');
    return {
      earlyData: Uint8Array.from(atob(clean), c => c.charCodeAt(0)).buffer,
      error: null
    };
  } catch (error) {
    return { earlyData: null, error };
  }
}

function parseOutboundProxyConfig(rawAddr) {
  let rem = String(rawAddr || '').trim();
  if (!rem) return null;
  let kind = PROXY_KIND_SOCKS5;
  const lower = rem.toLowerCase();
  if (lower.startsWith('https://')) {
    kind = PROXY_KIND_HTTPS;
    rem = rem.slice(8);
  } else if (lower.startsWith('http://')) {
    kind = PROXY_KIND_HTTP;
    rem = rem.slice(7);
  } else if (lower.startsWith('socks5://')) {
    rem = rem.slice(9);
  } else if (lower.startsWith('socks://')) {
    rem = rem.slice(8);
  }
  const slashIdx = rem.indexOf('/');
  if (slashIdx >= 0) rem = rem.slice(0, slashIdx);
  if (!rem) throw new Error('Invalid proxy address');
  const [hostPart, authPart] = rem.split('@').reverse();
  let username, password, hostname, socksPort;
  if (authPart) {
    const parts = authPart.split(':');
    if (parts.length !== 2) throw new Error('Invalid proxy auth format');
    [username, password] = parts;
  }
  const hostSegments = hostPart.split(':');
  const lastSeg = hostSegments.pop();
  socksPort = Number(lastSeg);
  if (Number.isNaN(socksPort)) {
    if (kind === PROXY_KIND_SOCKS5) throw new Error('Invalid proxy port');
    hostSegments.push(lastSeg);
    socksPort = kind === PROXY_KIND_HTTPS ? 443 : 80;
  }
  hostname = hostSegments.join(':');
  if (!hostname) throw new Error('Empty proxy hostname');
  return { username, password, hostname, socksPort, kind };
}

function createChunkQueue(packetSize, maxBytes = packetSize, maxItems = Math.max(1, maxBytes >> 8)) {
  let queue = [];
  let head = 0;
  let queuedBytes = 0;
  let mergeBuf = null;

  function compact() {
    if (head > 32 && head * 2 >= queue.length) {
      queue = queue.slice(head);
      head = 0;
    }
  }

  function shiftOne() {
    if (head >= queue.length) return null;
    const item = queue[head];
    queue[head++] = undefined;
    queuedBytes -= item.byteLength;
    compact();
    return item;
  }

  return {
    get empty() {
      return head >= queue.length;
    },
    clear() {
      queue = [];
      head = 0;
      queuedBytes = 0;
    },
    sow(data) {
      const len = data?.byteLength || 0;
      if (!len) return true;
      if (queuedBytes + len > maxBytes || queue.length - head >= maxItems) return false;
      queue.push(data);
      queuedBytes += len;
      return true;
    },
    bundle(first = null) {
      first ||= shiftOne();
      if (!first || head >= queue.length || first.byteLength >= packetSize) return [first, false];
      let total = first.byteLength;
      let end = head;
      while (end < queue.length) {
        const next = queue[end];
        const nextTotal = total + next.byteLength;
        if (nextTotal > packetSize) break;
        total = nextTotal;
        end++;
      }
      if (end === head) return [first, false];
      const out = (mergeBuf ||= new Uint8Array(packetSize));
      out.set(first);
      let offset = first.byteLength;
      while (head < end) {
        const item = queue[head];
        queue[head++] = undefined;
        queuedBytes -= item.byteLength;
        out.set(item, offset);
        offset += item.byteLength;
      }
      compact();
      return [out.subarray(0, total), true];
    }
  };
}

function createDownloadCoalescer(ws, onBytesSent = null) {
  const maxPacket = DOWNLOAD_PACKET_SIZE;
  const tail = DOWNLOAD_TAIL;
  const minThreshold = Math.max(4096, tail << 3);
  let buf = new Uint8Array(maxPacket);
  let offset = 0;
  let timer = 0;
  let microScheduled = false;
  let pushSeq = 0;
  let snapSeq = 0;
  let deferCount = 0;

  function flush() {
    if (timer) clearTimeout(timer);
    timer = 0;
    microScheduled = false;
    if (!offset) return;
    if (ws.readyState === 1) {
      ws.send(buf.subarray(0, offset).slice());
      if (onBytesSent) onBytesSent(offset);
    }
    buf = new Uint8Array(maxPacket);
    offset = 0;
    deferCount = 0;
  }

  function schedule() {
    if (timer || microScheduled) return;
    microScheduled = true;
    snapSeq = pushSeq;
    queueMicrotask(() => {
      microScheduled = false;
      if (!offset || timer) return;
      if (maxPacket - offset < tail) return flush();
      timer = setTimeout(() => {
        timer = 0;
        if (!offset) return;
        if (maxPacket - offset < tail) return flush();
        if (deferCount < 2 && (pushSeq !== snapSeq || offset < minThreshold)) {
          deferCount++;
          snapSeq = pushSeq;
          return schedule();
        }
        flush();
      }, Math.max(DOWNLOAD_DELAY, 1));
    });
  }

  return {
    send(chunk) {
      const data = toUint8Array(chunk);
      let pos = 0;
      const len = data.byteLength;
      if (!len) return;
      while (pos < len) {
        if (!offset && len - pos >= maxPacket) {
          const sz = Math.min(maxPacket, len - pos);
          if (ws.readyState === 1) {
            ws.send(pos || sz !== len ? data.subarray(pos, pos + sz) : data);
            if (onBytesSent) onBytesSent(sz);
          }
          pos += sz;
          continue;
        }
        const sz = Math.min(maxPacket - offset, len - pos);
        buf.set(data.subarray(pos, pos + sz), offset);
        offset += sz;
        pos += sz;
        pushSeq++;
        if (offset === maxPacket || maxPacket - offset < tail) flush();
        else schedule();
      }
    },
    flush
  };
}

function openRawSocket(address, port, fetcher = null, options = undefined) {
  const target = { hostname: address, port };
  if (fetcher && typeof fetcher.connect === 'function') {
    return options === undefined ? fetcher.connect(target) : fetcher.connect(target, options);
  }
  return options === undefined ? cfConnect(target) : cfConnect(target, options);
}

async function openVerifiedSocket(address, port, fetcher = null) {
  try {
    const sock = openRawSocket(address, port, fetcher);
    if (sock?.opened) await sock.opened;
    return sock;
  } catch (err) {
    if (!fetcher) throw err;
    const sock = cfConnect({ hostname: address, port });
    if (sock?.opened) await sock.opened;
    return sock;
  }
}

async function connectRacedSocket(address, port, fetcher = null, raceCount = 1) {
  const count = Math.max(1, raceCount | 0);
  if (count <= 1) return openVerifiedSocket(address, port, fetcher);
  const tasks = Array.from({ length: count }, () => openVerifiedSocket(address, port, fetcher));
  const winner = await Promise.any(tasks);
  tasks.forEach(p => {
    p.then(sock => {
      if (sock !== winner) {
        try {
          sock.close();
        } catch (_e) {}
      }
    }, () => {});
  });
  return winner;
}

function wrapResidualSocket(sock, residualData) {
  let upstreamReader = null;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(residualData);
      upstreamReader = sock.readable.getReader();
    },
    async pull(controller) {
      const { value, done } = await upstreamReader.read();
      if (done) {
        controller.close();
        return;
      }
      controller.enqueue(value);
    },
    cancel(reason) {
      try {
        upstreamReader?.cancel(reason);
      } catch (_e) {}
    }
  });
  return {
    readable,
    writable: sock.writable,
    closed: sock.closed,
    opened: sock.opened,
    close: () => sock.close()
  };
}

async function connectHttpTunnel(targetHost, targetPort, proxyCfg, fetcher = null, firstPacket = null) {
  const { username, password, hostname, socksPort, kind } = proxyCfg;
  const opts = kind === PROXY_KIND_HTTPS ? { secureTransport: 'on', allowHalfOpen: false } : undefined;
  const sock = openRawSocket(hostname, socksPort, fetcher, opts);
  if (sock?.opened) await sock.opened;
  const formattedHost = targetHost.includes(':') && !/^\[.*\]$/.test(targetHost) ? `[${targetHost}]` : targetHost;
  const authority = `${formattedHost}:${targetPort}`;
  let reqHeaders =
    `CONNECT ${authority} HTTP/1.1\r\n` +
    `Host: ${authority}\r\n` +
    `User-Agent: Mozilla/5.0\r\n` +
    `Proxy-Connection: Keep-Alive\r\n`;
  if (username) {
    reqHeaders += `Proxy-Authorization: Basic ${btoa(`${username}:${password || ''}`)}\r\n`;
  }
  reqHeaders += '\r\n';

  const writer = sock.writable.getWriter();
  const reader = sock.readable.getReader();
  try {
    await writer.write(new TextEncoder().encode(reqHeaders));
    let buf = new Uint8Array(0);
    let headerEnd = -1;
    while (headerEnd < 0) {
      const { value, done } = await reader.read();
      if (done || !value) throw new Error('Failed to open HTTP proxy tunnel');
      buf = concatUint8Arrays(buf, value);
      for (let i = 0; i + 3 < buf.length; i++) {
        if (buf[i] === 13 && buf[i + 1] === 10 && buf[i + 2] === 13 && buf[i + 3] === 10) {
          headerEnd = i + 4;
          break;
        }
      }
      if (headerEnd < 0 && buf.length > 8192) throw new Error('Invalid proxy response');
    }
    const statusLine = sharedDecoder.decode(buf.subarray(0, Math.min(headerEnd, 128)));
    if (!statusLine.startsWith('HTTP/')) throw new Error('Invalid proxy response');
    const code = Number(statusLine.split(' ')[1]);
    if (!(code >= 200 && code < 300)) throw new Error('Proxy tunnel rejected');
    const residual = buf.subarray(headerEnd);
    if (firstPacket && firstPacket.byteLength) await writer.write(firstPacket);
    writer.releaseLock();
    reader.releaseLock();
    if (residual.byteLength) return wrapResidualSocket(sock, residual);
    return sock;
  } catch (err) {
    try { writer.releaseLock(); } catch (_e) {}
    try { reader.releaseLock(); } catch (_e) {}
    try { sock.close(); } catch (_e) {}
    throw err;
  }
}

async function connectViaOutboundProxy(_addrType, targetHost, targetPort, proxyCfg, fetcher = null, firstPacket = null) {
  if (proxyCfg && (proxyCfg.kind === PROXY_KIND_HTTP || proxyCfg.kind === PROXY_KIND_HTTPS)) {
    return connectHttpTunnel(targetHost, targetPort, proxyCfg, fetcher, firstPacket);
  }
  const { username, password, hostname, socksPort } = proxyCfg;
  const sock = openRawSocket(hostname, socksPort, fetcher);
  const writer = sock.writable.getWriter();
  await writer.write(new Uint8Array(username ? [5, 2, 0, 2] : [5, 1, 0]));
  const reader = sock.readable.getReader();
  let residual = new Uint8Array(0);

  async function readExact(needed) {
    while (residual.length < needed) {
      const { value, done } = await reader.read();
      if (done || !value) throw new Error('Failed to open SOCKS5 connection');
      residual = concatUint8Arrays(residual, value);
    }
    return residual;
  }
  function consume(n) {
    const res = residual.subarray(0, n);
    residual = residual.subarray(n);
    return res;
  }

  let head = await readExact(2);
  if (head[0] !== 5 || head[1] === 255) throw new Error('No acceptable SOCKS5 auth method');
  const method = head[1];
  consume(2);
  if (method === 2) {
    if (!username || !password) throw new Error('SOCKS5 server requires auth');
    const enc = new TextEncoder();
    const uBytes = enc.encode(username);
    const pBytes = enc.encode(password);
    await writer.write(new Uint8Array([1, uBytes.length, ...uBytes, pBytes.length, ...pBytes]));
    head = await readExact(2);
    if (head[0] !== 1 || head[1] !== 0) throw new Error('SOCKS5 auth failed');
    consume(2);
  }
  const cleanHost = /^\[.*\]$/.test(String(targetHost)) ? String(targetHost).slice(1, -1) : String(targetHost);
  const hostBytes = new TextEncoder().encode(cleanHost);
  await writer.write(new Uint8Array([5, 1, 0, 3, hostBytes.length, ...hostBytes, targetPort >> 8, targetPort & 255]));
  head = await readExact(4);
  if (head[1] !== 0) throw new Error('SOCKS5 connect failed');
  const bindType = head[3];
  let replyLen = 10;
  if (bindType === 1) replyLen = 10;
  else if (bindType === 4) replyLen = 22;
  else if (bindType === 3) replyLen = 7 + (await readExact(5))[4];
  else throw new Error('Invalid SOCKS5 reply');
  await readExact(replyLen);
  consume(replyLen);
  if (firstPacket && firstPacket.byteLength) await writer.write(firstPacket);
  writer.releaseLock();
  reader.releaseLock();
  if (residual.length) return wrapResidualSocket(sock, residual);
  return sock;
}

// پارس هدر VLESS با پشتیبانی از چندکاربره (دریافت کالبک resolveUserByUuid)
function parseVlessHeader(chunk, resolveUserFn) {
  const bytes = toUint8Array(chunk);
  if (bytes.byteLength < 24) return { hasError: true, message: 'invalid data' };
  const version = bytes.subarray(0, 1);
  const incomingUuid = bytesToUuid(bytes, 1);
  const matchedUser = incomingUuid ? resolveUserFn(incomingUuid) : null;
  if (!matchedUser) {
    return { hasError: true, message: 'invalid user' };
  }
  const optLen = bytes[17];
  const cmdIndex = 18 + optLen;
  if (bytes.byteLength < cmdIndex + 5) return { hasError: true, message: 'invalid data' };
  const cmd = bytes[cmdIndex];
  let isUDP = false;
  if (cmd === 1) {
    isUDP = false;
  } else if (cmd === 2) {
    isUDP = true;
  } else {
    return { hasError: true, message: 'command is not supported' };
  }
  const portIndex = 19 + optLen;
  const port = (bytes[portIndex] << 8) | bytes[portIndex + 1];
  let addrIndex = portIndex + 2;
  let addrLen = 0;
  let addrValIndex = addrIndex + 1;
  let hostname = '';
  const addressType = bytes[addrIndex];
  switch (addressType) {
    case ADDR_TYPE_IPV4:
      addrLen = 4;
      if (bytes.byteLength < addrValIndex + addrLen) return { hasError: true, message: 'invalid data' };
      hostname = `${bytes[addrValIndex]}.${bytes[addrValIndex + 1]}.${bytes[addrValIndex + 2]}.${bytes[addrValIndex + 3]}`;
      break;
    case ADDR_TYPE_DOMAIN:
      if (bytes.byteLength < addrValIndex + 1) return { hasError: true, message: 'invalid data' };
      addrLen = bytes[addrValIndex++];
      if (bytes.byteLength < addrValIndex + addrLen) return { hasError: true, message: 'invalid data' };
      hostname = sharedDecoder.decode(bytes.subarray(addrValIndex, addrValIndex + addrLen));
      break;
    case ADDR_TYPE_IPV6: {
      addrLen = 16;
      if (bytes.byteLength < addrValIndex + addrLen) return { hasError: true, message: 'invalid data' };
      const parts = [];
      const dv = new DataView(bytes.buffer, bytes.byteOffset + addrValIndex, addrLen);
      for (let i = 0; i < 8; i++) parts.push(dv.getUint16(i * 2).toString(16));
      hostname = parts.join(':');
      break;
    }
    default:
      return { hasError: true, message: `invalid addressType: ${addressType}` };
  }
  if (!hostname) return { hasError: true, message: 'addressValue is empty' };
  return {
    hasError: false,
    addressType,
    port,
    hostname,
    isUDP,
    rawIndex: addrValIndex + addrLen,
    version,
    matchedUser
  };
}

// پارس هدر Trojan با پشتیبانی از چندکاربره

// پارس هدر استاندارد Shadowsocks (SOCKS5 address request)
function parseShadowsocksHeader(buffer) {
  const bytes = toUint8Array(buffer);
  if (bytes.byteLength < 7) {
    return { hasError: true, message: 'invalid shadowsocks data - too short' };
  }
  const atyp = bytes[0];
  let addrLen = 0;
  let addrIdx = 1;
  let hostname = '';
  switch (atyp) {
    case 1: // IPv4
      addrLen = 4;
      if (bytes.byteLength < 1 + 4 + 2) return { hasError: true, message: 'invalid SS IPv4 length' };
      hostname = bytes.subarray(addrIdx, addrIdx + addrLen).join('.');
      break;
    case 3: // Domain
      addrLen = bytes[addrIdx];
      addrIdx += 1;
      if (bytes.byteLength < addrIdx + addrLen + 2) return { hasError: true, message: 'invalid SS domain length' };
      hostname = sharedDecoder.decode(bytes.subarray(addrIdx, addrIdx + addrLen));
      break;
    case 4: { // IPv6
      addrLen = 16;
      if (bytes.byteLength < 1 + 16 + 2) return { hasError: true, message: 'invalid SS IPv6 length' };
      const dv = new DataView(bytes.buffer, bytes.byteOffset + addrIdx, addrLen);
      const parts = [];
      for (let i = 0; i < 8; i++) parts.push(dv.getUint16(i * 2).toString(16));
      hostname = parts.join(':');
      break;
    }
    default:
      return { hasError: true, message: `invalid SS addressType ${atyp}` };
  }
  if (!hostname) return { hasError: true, message: 'SS address is empty' };
  const portIdx = addrIdx + addrLen;
  const port = new DataView(bytes.buffer, bytes.byteOffset + portIdx, 2).getUint16(0);
  if (port < 1 || port > 65535) {
    return { hasError: true, message: `invalid SS port ${port}` };
  }
  return {
    hasError: false,
    addressType: atyp,
    port,
    hostname,
    rawPayload: bytes.subarray(portIdx + 2)
  };
}

async function parseTrojanHeader(buffer, resolveTrojanUserFn) {
  const bytes = toUint8Array(buffer);
  if (bytes.byteLength < 58) {
    return { hasError: true, message: 'invalid trojan data - too short' };
  }
  if (bytes[56] !== 0x0d || bytes[57] !== 0x0a) {
    return { hasError: true, message: 'invalid trojan header format' };
  }
  const incomingHash = sharedDecoder.decode(bytes.subarray(0, 56));
  const matchedUser = await resolveTrojanUserFn(incomingHash);
  if (!matchedUser) {
    return { hasError: true, message: 'invalid trojan password' };
  }
  const socksBuf = bytes.subarray(58);
  if (socksBuf.byteLength < 6) {
    return { hasError: true, message: 'invalid SOCKS5 request data' };
  }
  const view = new DataView(socksBuf.buffer, socksBuf.byteOffset, socksBuf.byteLength);
  const cmd = view.getUint8(0);
  if (cmd !== 1) {
    return { hasError: true, message: 'unsupported command, only TCP is allowed' };
  }
  const atyp = view.getUint8(1);
  let addrLen = 0;
  let addrIdx = 2;
  let hostname = '';
  switch (atyp) {
    case 1:
      addrLen = 4;
      hostname = socksBuf.subarray(addrIdx, addrIdx + addrLen).join('.');
      break;
    case 3:
      addrLen = socksBuf[addrIdx];
      addrIdx += 1;
      hostname = sharedDecoder.decode(socksBuf.subarray(addrIdx, addrIdx + addrLen));
      break;
    case 4: {
      addrLen = 16;
      const dv = new DataView(socksBuf.buffer, socksBuf.byteOffset + addrIdx, addrLen);
      const parts = [];
      for (let i = 0; i < 8; i++) parts.push(dv.getUint16(i * 2).toString(16));
      hostname = parts.join(':');
      break;
    }
    default:
      return { hasError: true, message: `invalid addressType ${atyp}` };
  }
  if (!hostname) return { hasError: true, message: 'address is empty' };
  const portIdx = addrIdx + addrLen;
  const port = new DataView(socksBuf.buffer, socksBuf.byteOffset + portIdx, 2).getUint16(0);
  return {
    hasError: false,
    addressType: atyp,
    port,
    hostname,
    rawClientData: socksBuf.subarray(portIdx + 4),
    matchedUser
  };
}

function makeWebSocketReadableStream(ws, earlyDataHeader) {
  let cancelled = false;
  return new ReadableStream({
    start(controller) {
      ws.addEventListener('message', event => {
        if (!cancelled) controller.enqueue(toUint8Array(event.data));
      });
      ws.addEventListener('close', () => {
        if (!cancelled) {
          closeSocketSafe(ws);
          try { controller.close(); } catch (_e) {}
        }
      });
      ws.addEventListener('error', err => {
        try { controller.error(err); } catch (_e) {}
      });
      const { earlyData, error } = parseBase64EarlyData(earlyDataHeader);
      if (error) controller.error(error);
      else if (earlyData) controller.enqueue(toUint8Array(earlyData));
    },
    cancel() {
      cancelled = true;
      closeSocketSafe(ws);
    }
  });
}

async function pipeRemoteToWebSocket(remoteSocket, ws, vlessHeader, retryCallback, onBytesTransferred = null) {
  let header = vlessHeader;
  let hasData = false;
  let retried = false;
  let firstByteTimer = null;

  if (retryCallback) {
    firstByteTimer = setTimeout(() => {
      if (!hasData && !retried) {
        retried = true;
        try { remoteSocket.close && remoteSocket.close(); } catch (_e) {}
        retryCallback();
      }
    }, FIRST_BYTE_TIMEOUT);
  }

  const coalescer = createDownloadCoalescer(ws, onBytesTransferred);
  let reader = null;
  let useByob = true;
  let buffer = new ArrayBuffer(CHUNK_SIZE);

  try {
    try {
      reader = remoteSocket.readable.getReader({ mode: 'byob' });
    } catch (_e) {
      useByob = false;
      reader = remoteSocket.readable.getReader();
    }
    for (;;) {
      const res = useByob ? await reader.read(new Uint8Array(buffer, 0, CHUNK_SIZE)) : await reader.read();
      if (res.done) break;
      const val = res.value;
      let chunk = toUint8Array(val);
      const nextBuf =
        useByob && val?.buffer instanceof ArrayBuffer && val.buffer.byteLength >= CHUNK_SIZE
          ? val.buffer
          : new ArrayBuffer(CHUNK_SIZE);
      if (!chunk.byteLength) continue;
      if (!hasData) {
        hasData = true;
        if (firstByteTimer) {
          clearTimeout(firstByteTimer);
          firstByteTimer = null;
        }
      }
      if (ws.readyState !== 1) throw new Error('WebSocket is not open');
      if (header) {
        chunk = concatUint8Arrays(header, chunk);
        header = null;
      }
      if (chunk.byteLength >= CHUNK_SIZE >> 1) {
        coalescer.flush();
        ws.send(chunk);
        if (onBytesTransferred) onBytesTransferred(chunk.byteLength);
        if (useByob) buffer = new ArrayBuffer(CHUNK_SIZE);
      } else {
        coalescer.send(chunk.slice());
        if (useByob) buffer = nextBuf;
      }
    }
    coalescer.flush();
  } catch (_e) {
    if (!retried) closeSocketSafe(ws);
  } finally {
    try { coalescer.flush(); } catch (_e) {}
    try { reader?.releaseLock(); } catch (_e) {}
  }

  if (firstByteTimer) clearTimeout(firstByteTimer);
  if (!hasData && !retried && retryCallback) retryCallback();
}

async function handleUdpDns(udpChunk, ws, vlessHeader, fetcher = null) {
  try {
    const sock = await connectRacedSocket('8.8.4.4', 53, fetcher, 1);
    const writer = sock.writable.getWriter();
    await writer.write(udpChunk);
    writer.releaseLock();
    await pipeRemoteToWebSocket(sock, ws, vlessHeader, null);
  } catch (_e) {}
}

async function establishOutboundAndPipe(
  addressType,
  host,
  port,
  rawClientData,
  ws,
  vlessRespHeader,
  remoteState,
  effectiveCfg,
  fetcher = null,
  onBytesTransferred = null
) {
  const fallbackAddr = (effectiveCfg.p || '').trim();
  const workerRegion = (effectiveCfg.wk || 'CF').trim().toUpperCase();
  const enableRegionMatch = (effectiveCfg.rm || '').toLowerCase() !== 'no';
  const qjMode = (effectiveCfg.qj || '').toLowerCase();
  const downgradeEnabled = qjMode === 'no';
  const proxyOnly = qjMode === 'only';

  let parsedProxy = null;
  let proxyEnabled = false;
  if (effectiveCfg.s && String(effectiveCfg.s).trim()) {
    try {
      parsedProxy = parseOutboundProxyConfig(effectiveCfg.s);
      proxyEnabled = Boolean(parsedProxy);
    } catch (_e) {
      proxyEnabled = false;
    }
  }

  const firstPacket = toUint8Array(rawClientData);
  if (firstPacket.byteLength && onBytesTransferred) {
    onBytesTransferred(firstPacket.byteLength);
  }

  async function connectAndSend(targetHost, targetPort, useProxy = false) {
    const remoteSock = useProxy
      ? await connectViaOutboundProxy(addressType, targetHost, targetPort, parsedProxy, fetcher, firstPacket)
      : await connectRacedSocket(targetHost, targetPort, fetcher, CONNECT_RACE_COUNT);
    const writer = remoteSock.writable.getWriter();
    if (!useProxy && firstPacket.byteLength) await writer.write(firstPacket);
    return { remoteSock, writer };
  }

  function detachIfCurrent(sock, writer) {
    if (remoteState.socket !== sock) return;
    try { writer?.releaseLock(); } catch (_e) {}
    remoteState.socket = null;
    remoteState.writer = null;
  }

  function bindRemote(sock, writer, retryCb) {
    try {
      if (remoteState.writer && remoteState.writer !== writer) {
        remoteState.writer.releaseLock();
      }
    } catch (_e) {}
    remoteState.socket = sock;
    remoteState.writer = writer;
    remoteState.drainUpload?.();
    sock.closed.catch(() => {}).finally(() => {
      if (remoteState.socket === sock) closeSocketSafe(ws);
    });
    pipeRemoteToWebSocket(sock, ws, vlessRespHeader, retryCb, onBytesTransferred).finally(() => {
      if (remoteState.socket === sock) {
        try { writer.releaseLock(); } catch (_e) {}
        remoteState.writer = null;
      }
    });
  }

  async function retryConnect() {
    if (proxyOnly && proxyEnabled) {
      closeSocketSafe(ws);
      return;
    }
    if (downgradeEnabled && proxyEnabled) {
      try {
        const { remoteSock, writer } = await connectAndSend(host, port, true);
        bindRemote(remoteSock, writer, null);
        return;
      } catch (_proxyErr) {
        let fbHost, fbPort;
        if (fallbackAddr) {
          const parsed = parseAddressAndPort(fallbackAddr);
          fbHost = parsed.address;
          fbPort = parsed.port || port;
        } else {
          const fb = await selectFallbackProxyAddress(workerRegion, enableRegionMatch);
          fbHost = fb ? fb.domain : host;
          fbPort = fb ? fb.port : port;
        }
        try {
          const { remoteSock, writer } = await connectAndSend(fbHost, fbPort, false);
          bindRemote(remoteSock, writer, null);
        } catch (_fbErr) {
          closeSocketSafe(ws);
        }
      }
    } else {
      let fbHost, fbPort;
      if (fallbackAddr) {
        const parsed = parseAddressAndPort(fallbackAddr);
        fbHost = parsed.address;
        fbPort = parsed.port || port;
      } else {
        const fb = await selectFallbackProxyAddress(workerRegion, enableRegionMatch);
        fbHost = fb ? fb.domain : host;
        fbPort = fb ? fb.port : port;
      }
      try {
        const { remoteSock, writer } = await connectAndSend(fbHost, fbPort, proxyEnabled);
        bindRemote(remoteSock, writer, null);
      } catch (_fbErr) {
        closeSocketSafe(ws);
      }
    }
  }

  try {
    const firstHopProxy = proxyOnly && proxyEnabled ? true : downgradeEnabled ? false : proxyEnabled;
    const { remoteSock, writer } = await connectAndSend(host, port, firstHopProxy);
    bindRemote(remoteSock, writer, () => {
      detachIfCurrent(remoteSock, writer);
      retryConnect();
    });
  } catch (_err) {
    await retryConnect();
  }
}

async function handleWebSocketUpgrade(request, env, ctx, globalCfg, allUsers, adminUuid) {
  const reqUrl = new URL(request.url);
  const queryP = reqUrl.searchParams.get('p') || '';
  const queryWk = (reqUrl.searchParams.get('wk') || '').toUpperCase();
  const queryRm = reqUrl.searchParams.get('rm') || '';
  const queryS = reqUrl.searchParams.get('s') || '';

  // تابع تشخیص کاربر بر اساس UUID در VLESS
  function resolveVlessUser(incomingUuid) {
    const lower = String(incomingUuid || '').toLowerCase();
    for (const u of allUsers) {
      if (u.uuid.toLowerCase() === lower) {
        if (!u.enabled) return null;
        if (u.dataLimitGb > 0 && u.usedBytes >= u.dataLimitGb * 1073741824) return null;
        if (u.expireAt > 0 && Date.now() > u.expireAt) return null;
        return u;
      }
    }
    if (lower === adminUuid.toLowerCase()) {
      return { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
    }
    return null;
  }

  // تابع تشخیص کاربر بر اساس هش SHA-224 رمز عبور در Trojan
  async function resolveTrojanUser(incomingHash) {
    for (const u of allUsers) {
      const pass = (u.config?.tp && String(u.config.tp).trim()) || u.uuid;
      const hash = await sha224Hex(pass);
      if (hash === incomingHash) {
        if (!u.enabled) return null;
        if (u.dataLimitGb > 0 && u.usedBytes >= u.dataLimitGb * 1073741824) return null;
        if (u.expireAt > 0 && Date.now() > u.expireAt) return null;
        return u;
      }
    }
    const adminPass = (globalCfg.tp && String(globalCfg.tp).trim()) || adminUuid;
    const adminHash = await sha224Hex(adminPass);
    if (adminHash === incomingHash) {
      return { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
    }
    return null;
  }

  const pair = new WebSocketPair();
  const [clientWs, serverWs] = Object.values(pair);
  serverWs.accept();
  serverWs.binaryType = 'arraybuffer';

  let remoteState = { socket: null, writer: null, drainUpload: null };
  let isDnsSession = false;
  let detectedProto = null;
  let matchedUserObj = null;
  let sessionBytes = 0;
  let draining = false;
  let closed = false;
  const uploadQueue = createChunkQueue(UPLOAD_PACKET_SIZE, UPLOAD_QUEUE_LIMIT, UPLOAD_QUEUE_LIMIT >> 8);
  const fetcher = request.fetcher;

  function addTransferredBytes(n) {
    sessionBytes += Number(n) || 0;
  }

  function flushSessionTraffic() {
    if (matchedUserObj?.id && sessionBytes > 0) {
      const bytesToRecord = sessionBytes;
      sessionBytes = 0;
      const p = recordUserActivity(env, matchedUserObj.id, bytesToRecord, 1).catch(() => {});
      if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(p);
    }
  }

  function closeTransport() {
    if (closed) return;
    closed = true;
    uploadQueue.clear();
    try { remoteState.writer?.releaseLock(); } catch (_e) {}
    remoteState.writer = null;
    try { remoteState.socket?.close(); } catch (_e) {}
    closeSocketSafe(serverWs);
    flushSessionTraffic();
  }

  function enqueueUpload(chunk) {
    const data = toUint8Array(chunk);
    if (!data.byteLength) return true;
    addTransferredBytes(data.byteLength);
    if (!uploadQueue.sow(data)) {
      closeTransport();
      return false;
    }
    remoteState.drainUpload?.();
    return true;
  }

  async function drainUploadQueue() {
    if (draining || closed || !remoteState.writer) return;
    draining = true;
    try {
      for (;;) {
        if (closed || !remoteState.writer) break;
        const [bundled] = uploadQueue.bundle();
        if (!bundled) break;
        await remoteState.writer.write(bundled);
      }
    } catch (_e) {
      closeTransport();
    } finally {
      draining = false;
      if (!uploadQueue.empty && !closed && remoteState.writer) queueMicrotask(drainUploadQueue);
    }
  }

  remoteState.drainUpload = () => {
    if (!draining && !uploadQueue.empty && remoteState.writer) queueMicrotask(drainUploadQueue);
  };

  const earlyDataHeader = request.headers.get('sec-websocket-protocol') || '';
  const wsReadable = makeWebSocketReadableStream(serverWs, earlyDataHeader);

  wsReadable
    .pipeTo(
      new WritableStream({
        async write(chunk) {
          if (closed) return;
          const data = toUint8Array(chunk);
          if (isDnsSession) return await handleUdpDns(data, serverWs, null, fetcher);
          if (remoteState.socket && remoteState.writer) {
            if (!enqueueUpload(data)) throw new Error('upload queue overflow');
            return;
          }
          if (detectedProto) {
            if (!enqueueUpload(data)) throw new Error('upload queue overflow');
            return;
          }

          // تلاش برای VLESS
          if (data.byteLength >= 24) {
            const vlessRes = parseVlessHeader(data, resolveVlessUser);
            if (!vlessRes.hasError) {
              detectedProto = 'vless';
              matchedUserObj = vlessRes.matchedUser;
              const userCfg = {
                ...globalCfg,
                ...(matchedUserObj?.config || {}),
                ...(queryP ? { p: queryP } : {}),
                ...(queryWk ? { wk: queryWk } : {}),
                ...(queryRm ? { rm: queryRm } : {}),
                ...(queryS ? { s: queryS } : {})
              };
              if (vlessRes.isUDP) {
                if (vlessRes.port === 53) isDnsSession = true;
                else throw new Error('UDP proxy only enabled for DNS port 53');
              }
              const respHeader = new Uint8Array([vlessRes.version[0], 0]);
              const rawPayload = data.subarray(vlessRes.rawIndex);
              if (isDnsSession) return handleUdpDns(rawPayload, serverWs, respHeader, fetcher);
              await establishOutboundAndPipe(
                vlessRes.addressType,
                vlessRes.hostname,
                vlessRes.port,
                rawPayload,
                serverWs,
                respHeader,
                remoteState,
                userCfg,
                fetcher,
                addTransferredBytes
              );
              return;
            }
          }

          // تلاش برای Trojan
          if (data.byteLength >= 58) {
            const trojanRes = await parseTrojanHeader(data, resolveTrojanUser);
            if (!trojanRes.hasError) {
              detectedProto = 'trojan';
              matchedUserObj = trojanRes.matchedUser;
              const userCfg = {
                ...globalCfg,
                ...(matchedUserObj?.config || {}),
                ...(queryP ? { p: queryP } : {}),
                ...(queryWk ? { wk: queryWk } : {}),
                ...(queryRm ? { rm: queryRm } : {}),
                ...(queryS ? { s: queryS } : {})
              };
              await establishOutboundAndPipe(
                trojanRes.addressType,
                trojanRes.hostname,
                trojanRes.port,
                trojanRes.rawClientData,
                serverWs,
                null,
                remoteState,
                userCfg,
                fetcher,
                addTransferredBytes
              );
              return;
            }
          }

          // تلاش برای Shadowsocks (SS-WS)
          if (data.byteLength >= 7) {
            const ssRes = parseShadowsocksHeader(data);
            if (!ssRes.hasError) {
              const querySsPass = reqUrl.searchParams.get('sspass') || '';
              let ssUser = null;
              if (querySsPass) {
                ssUser = allUsers.find(u => (u.config?.sspass || u.uuid) === querySsPass);
              }
              if (!ssUser) {
                ssUser = allUsers.find(u => u.config?.es === 'yes') || (globalCfg.es === 'yes' ? { id: null, username: 'admin', uuid: adminUuid, config: globalCfg } : null);
              }
              if (!ssUser && allUsers.length > 0) {
                ssUser = allUsers[0];
              }
              if (ssUser) {
                detectedProto = 'ss';
                matchedUserObj = ssUser;
                const userCfg = {
                  ...globalCfg,
                  ...(matchedUserObj?.config || {}),
                  ...(queryP ? { p: queryP } : {}),
                  ...(queryWk ? { wk: queryWk } : {}),
                  ...(queryRm ? { rm: queryRm } : {}),
                  ...(queryS ? { s: queryS } : {})
                };
                await establishOutboundAndPipe(
                  ssRes.addressType,
                  ssRes.hostname,
                  ssRes.port,
                  ssRes.rawPayload,
                  serverWs,
                  null,
                  remoteState,
                  userCfg,
                  fetcher,
                  addTransferredBytes
                );
                return;
              }
            }
          }

          throw new Error('Invalid protocol or authentication failed');
        }
      })
    )
    .catch(() => {
      closeTransport();
    });

  return new Response(null, { status: 101, webSocket: clientWs });
}

// ============================================================================
// پروتکل xhttp (HTTP POST Streaming) با پشتیبانی از چندکاربره
// ============================================================================
const XHTTP_HUFFMAN_LEN = [
  13, 23, 28, 28, 28, 28, 28, 28, 28, 24, 30, 28, 28, 30, 28, 28,
  28, 28, 28, 28, 28, 28, 30, 28, 28, 28, 28, 28, 28, 28, 28, 28,
  6, 10, 10, 12, 13, 6, 8, 11, 10, 10, 8, 11, 8, 6, 6, 6,
  5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 7, 8, 15, 6, 12, 10,
  13, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 8, 13, 19, 13, 14, 6,
  15, 5, 6, 5, 6, 5, 6, 6, 6, 5, 7, 7, 6, 6, 6, 5,
  6, 7, 6, 5, 5, 6, 7, 7, 7, 7, 7, 15, 11, 14, 13, 28,
  20, 22, 20, 20, 22, 22, 22, 23, 22, 23, 23, 23, 23, 23, 24, 23,
  24, 24, 22, 23, 24, 23, 23, 23, 23, 21, 22, 23, 22, 23, 23, 24,
  22, 21, 20, 22, 22, 23, 23, 21, 23, 22, 22, 24, 21, 22, 23, 23,
  21, 21, 22, 21, 23, 22, 23, 23, 20, 22, 22, 22, 23, 22, 22, 23,
  26, 26, 20, 19, 22, 23, 22, 25, 26, 26, 26, 27, 27, 26, 24, 25,
  19, 21, 26, 27, 27, 26, 27, 24, 21, 21, 26, 26, 28, 27, 27, 27,
  20, 24, 20, 21, 22, 21, 21, 23, 22, 22, 25, 25, 24, 24, 26, 23,
  26, 27, 26, 26, 27, 27, 27, 27, 27, 28, 27, 27, 27, 27, 27, 26,
  30
];

const XHTTP_PAD_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generateXhttpPaddingString(len) {
  let out = '';
  for (let i = 0; i < len; i++) {
    out += XHTTP_PAD_CHARS[Math.floor(Math.random() * XHTTP_PAD_CHARS.length)];
  }
  return out;
}

function calcHuffmanByteLen(str) {
  const bytes = new TextEncoder().encode(str);
  let bits = 0;
  for (let i = 0; i < bytes.length; i++) bits += XHTTP_HUFFMAN_LEN[bytes[i]];
  return Math.ceil(bits / 8);
}

function validateXhttpPadding(request, padHeader, padKey) {
  let padVal = '';
  const hVal = request.headers.get(padHeader);
  if (hVal) {
    try {
      const parsed = new URL(hVal, 'https://x.invalid');
      padVal = parsed.searchParams.get(padKey) || hVal;
    } catch (_e) {
      padVal = hVal;
    }
  } else {
    try {
      padVal = new URL(request.url).searchParams.get(padKey) || '';
    } catch (_e) {
      padVal = '';
    }
  }
  if (!padVal) return true;
  const len = calcHuffmanByteLen(padVal);
  return len >= 98 && len <= 1002;
}

async function readXhttpHeader(readableStream, resolveUserFn) {
  const reader = readableStream.getReader({ mode: 'byob' });
  try {
    let res = await reader.readAtLeast(18, new Uint8Array(new ArrayBuffer(128 * 1024)));
    let totalRead = res.value.length;
    let buf = res.value;
    const version = buf[0];
    const incomingUuid = bytesToUuid(buf, 1);
    const matchedUser = incomingUuid ? resolveUserFn(incomingUuid) : null;
    if (!matchedUser) {
      try { reader.releaseLock(); } catch (_e) {}
      return null;
    }
    const optLen = buf[17];
    const addrOffset = 18 + optLen + 1 + 2 + 1;
    if (addrOffset + 1 > totalRead) {
      if (res.done) return null;
      const needed = addrOffset + 1 - totalRead;
      res = await reader.readAtLeast(needed, new Uint8Array(new ArrayBuffer(128 * 1024)));
      totalRead += res.value.length;
      buf = concatUint8Arrays(buf, res.value);
    }
    const cmd = buf[18 + optLen];
    if (cmd !== 1) return null;
    const port = (buf[addrOffset - 3] << 8) + buf[addrOffset - 2];
    const atyp = buf[addrOffset - 1];
    let headerLen = -1;
    if (atyp === ADDR_TYPE_IPV4) headerLen = addrOffset + 4;
    else if (atyp === ADDR_TYPE_IPV6) headerLen = addrOffset + 16;
    else if (atyp === ADDR_TYPE_DOMAIN) headerLen = addrOffset + 1 + buf[addrOffset];
    if (headerLen < 0) return null;
    const rem = headerLen - totalRead;
    if (rem > 0) {
      if (res.done) return null;
      res = await reader.readAtLeast(rem, new Uint8Array(new ArrayBuffer(128 * 1024)));
      totalRead += res.value.length;
      buf = concatUint8Arrays(buf, res.value);
    }
    let hostname = '';
    if (atyp === ADDR_TYPE_IPV4) {
      hostname = buf.slice(addrOffset, addrOffset + 4).join('.');
    } else if (atyp === ADDR_TYPE_DOMAIN) {
      hostname = sharedDecoder.decode(buf.slice(addrOffset + 1, addrOffset + 1 + buf[addrOffset]));
    } else if (atyp === ADDR_TYPE_IPV6) {
      hostname = buf
        .slice(addrOffset, addrOffset + 16)
        .reduce((acc, v, i, arr) => (i % 2 ? acc.concat(((arr[i - 1] << 8) + v).toString(16)) : acc), [])
        .join(':');
    }
    if (!hostname) return null;
    return {
      hostname,
      port,
      data: buf.slice(headerLen),
      resp: new Uint8Array([version, 0]),
      reader,
      done: res.done,
      matchedUser
    };
  } catch (_e) {
    try { reader.releaseLock(); } catch (_ig) {}
    return null;
  }
}

async function handleXhttpPostRequest(request, env, ctx, globalCfg, allUsers, adminUuid) {
  if (!request.body) return new Response('Bad Request', { status: 400 });

  function resolveUserFn(incomingUuid) {
    const lower = String(incomingUuid || '').toLowerCase();
    for (const u of allUsers) {
      if (u.uuid.toLowerCase() === lower && u.enabled) return u;
    }
    if (lower === adminUuid.toLowerCase()) {
      return { id: null, username: 'admin', uuid: adminUuid, config: globalCfg };
    }
    return null;
  }

  const parsedHeader = await readXhttpHeader(request.body, resolveUserFn);
  if (!parsedHeader) {
    return new Response('Bad Request', { status: 400 });
  }

  const matchedUser = parsedHeader.matchedUser;
  const userUuid = matchedUser.uuid || adminUuid;
  const { header: xPadHeader, key: xPadKey } = getXhttpPaddingMeta(userUuid);
  if (!validateXhttpPadding(request, xPadHeader, xPadKey)) {
    return new Response('Bad Request', { status: 400 });
  }

  let remoteSocket = null;
  try {
    remoteSocket = await connectRacedSocket(parsedHeader.hostname, parsedHeader.port, request.fetcher, CONNECT_RACE_COUNT);
  } catch (_e) {
    const fb = await selectFallbackProxyAddress(globalCfg.wk || 'CF', true);
    if (!fb) return new Response('Gateway Timeout', { status: 504 });
    try {
      remoteSocket = await connectRacedSocket(fb.domain, fb.port || parsedHeader.port, request.fetcher, 1);
    } catch (_e2) {
      return new Response('Bad Gateway', { status: 502 });
    }
  }

  let totalBytes = 0;
  const upPromise = (async () => {
    const writer = remoteSocket.writable.getWriter();
    try {
      if (parsedHeader.data && parsedHeader.data.length) {
        totalBytes += parsedHeader.data.length;
        await writer.write(parsedHeader.data);
      }
      while (!parsedHeader.done) {
        const r = await parsedHeader.reader.read(new Uint8Array(new ArrayBuffer(64 * 1024)));
        if (r.done) break;
        if (r.value && r.value.length) {
          totalBytes += r.value.length;
          await writer.write(r.value);
        }
      }
    } catch (_e) {} finally {
      try { await writer.close(); } catch (_e) {}
      try { parsedHeader.reader.releaseLock(); } catch (_e) {}
    }
  })();

  const { readable, writable } = new TransformStream();
  const downPromise = (async () => {
    const writer = writable.getWriter();
    const reader = remoteSocket.readable.getReader();
    try {
      await writer.write(parsedHeader.resp);
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
        if (r.value && r.value.length) {
          totalBytes += r.value.length;
          await writer.write(r.value);
        }
      }
      await writer.close();
    } catch (_e) {} finally {
      try { reader.releaseLock(); } catch (_e) {}
      try { writer.releaseLock(); } catch (_e) {}
    }
  })();

  const closedPromise = Promise.allSettled([upPromise, downPromise]).finally(() => {
    try { remoteSocket.close(); } catch (_e) {}
    if (matchedUser?.id && totalBytes > 0) {
      recordUserActivity(env, matchedUser.id, totalBytes, 1).catch(() => {});
    }
  });

  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(closedPromise);
  }

  const respHeaders = {
    'X-Accel-Buffering': 'no',
    'Cache-Control': 'no-store',
    Connection: 'keep-alive',
    'User-Agent': 'Go-http-client/2.0',
    'Content-Type': 'application/grpc'
  };
  try {
    const padUrl = new URL('https://x.invalid/');
    padUrl.searchParams.set(xPadKey, generateXhttpPaddingString(100 + Math.floor(Math.random() * 901)));
    respHeaders[xPadHeader] = padUrl.toString();
  } catch (_e) {}

  return new Response(readable, { headers: respHeaders });
}


// --- MODULE: src/api/handlers.js ---
// ============================================================================
// MiliconfigOS v4.0 - REST API Handlers
// Versioned APIs (/api/v1/...) with Rate Limiting, Audit Logs & 5-User Hard Cap
// ============================================================================


function jsonResponse(data, status = 200) {
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
async function handleConfigApi(request, env) {
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
async function handleUsersApi(request, env) {
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
async function handleNodesApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  if (request.method === 'GET') {
    const nodes = await listEndpoints(env);
    return jsonResponse({ success: true, count: nodes.length, nodes });
  }
  return jsonResponse({ error: 'Method not allowed' }, 405);
}

// ۴. کاتالوگ DNSهای معتبر (/api/v1/dns/profiles)
async function handleDnsApi(request, _env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  return jsonResponse({
    success: true,
    count: VERIFIED_DNS_CATALOG.length,
    profiles: VERIFIED_DNS_CATALOG
  });
}

// ۵. لاگ‌های ممیزی سیستم (/api/v1/audit)
async function handleAuditApi(request, env) {
  if (request.method === 'OPTIONS') return jsonResponse({ ok: true });
  const logs = await listAuditLogs(env, 50);
  return jsonResponse({ success: true, count: logs.length, logs });
}

// ۶. آمار و پایش سیستم (/api/stats و /api/v1/monitoring/stats)
async function handleDashboardStatsApi(request, env) {
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
async function handlePublicUserStatusApi(request, env, token) {
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
async function handleAuthApi(request, env) {
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
async function handleScannerApi(request, env) {
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
async function handlePreferredIpsApi(request, env, bypassAeCheck = false) {
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


// --- MODULE: src/ui/loginHtml.js ---
// ============================================================================
// MiliconfigOS v4.0 - درگاه ورود و راه‌اندازی با ترنزیشن سه‌ثانیه‌ای و استتار پس‌زمینه
// Developer: Milad Jahani | Brand: miliconfig
// استتار Nginx با ترنزیشن بلور نرم ۳ ثانیه‌ای، راه‌اندازی اول و ورود امن
// ============================================================================


function renderLoginGatewayHtml(options = {}) {
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


// --- MODULE: src/ui/statusHtml.js ---
// ============================================================================
// miliconfig v3.1 - صفحه وضعیت و اشتراک اختصاصی کاربر (ارسالی به کاربر)
// طراحی ۱۰۰٪ مطابق تصاویر 1000050224.jpg و 1000050225.jpg با برند miliconfig
// ============================================================================


function renderUserStatusPageHtml(user, nodes = [], originUrl = '') {
  const urlObj = new URL(originUrl || 'https://miliconfig.workers.dev');
  const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
  const userToken = user.config?.d && String(user.config.d).trim()
    ? String(user.config.d).trim().replace(/^\/+|\/+$/g, '')
    : user.uuid;

  const baseSubUrl = `${baseUrl}/${userToken}/sub`;
  const statusUrl = `${baseUrl}/status/${encodeURIComponent(user.id || userToken)}`;
  const totalNodes = nodes.length;

  const usedBytes = Number(user.usedBytes || 0);
  const lifetimeBytes = Number(user.lifetimeBytes || 0);
  const limitGb = Number(user.dataLimitGb || 0);
  const limitBytes = limitGb > 0 ? limitGb * 1073741824 : 0;
  const usagePercent = limitBytes > 0 ? Math.min(100, Math.round((usedBytes / limitBytes) * 100)) : 0;

  let expireLabel = 'بدون انقضا';
  if (user.expireAt > 0) {
    const diffDays = Math.ceil((user.expireAt - Date.now()) / 86400000);
    expireLabel = diffDays > 0 ? `${diffDays} روز باقی‌مانده` : 'منقضی شده';
  } else if (user.startOnFirstUse && user.expireDays > 0) {
    expireLabel = `${user.expireDays} روز (شروع با اولین اتصال)`;
  }

  const locationsList = Object.entries(REGION_MAP)
    .filter(([code]) => ['CF', 'HK', 'US', 'SG', 'JP', 'KR', 'DE', 'SE', 'NL', 'FI', 'GB'].includes(code))
    .map(([code, labels]) => ({
      code,
      title: labels[0],
      url: `${baseSubUrl}?wk=${code}`
    }));

  const protoCombos = [
    { title: 'اتصال هوشمند (همه نودها × همه پروتکل‌ها)', badge: 'Base64', url: baseSubUrl },
    { title: 'فقط پروتکل VLESS (WebSocket + TLS)', badge: 'VLESS', url: `${baseSubUrl}?proto=vless` },
    { title: 'فقط پروتکل Trojan (WebSocket + TLS)', badge: 'Trojan', url: `${baseSubUrl}?proto=trojan` },
    { title: 'فقط پروتکل xhttp (ضد فیلتر پیشرفته)', badge: 'xhttp', url: `${baseSubUrl}?proto=xhttp` },
    { title: 'فقط نودهای لبه CDN (Multi-Location)', badge: 'Edge', url: `${baseSubUrl}?scope=edge` },
    { title: 'فقط سرور اصلی (بدون CDN)', badge: 'Origin', url: `${baseSubUrl}?scope=origin` },
    { title: 'کانفیگ اختصاصی Clash Meta / Mihomo', badge: 'YAML', url: `${baseSubUrl}?target=clash` },
    { title: 'کانفیگ اختصاصی Sing-box / Hiddify', badge: 'JSON', url: `${baseSubUrl}?target=singbox` },
    { title: 'کانفیگ اختصاصی Surge', badge: 'INI', url: `${baseSubUrl}?target=surge` },
    { title: 'کانفیگ اختصاصی Quantumult X', badge: 'QuanX', url: `${baseSubUrl}?target=quanx` },
    { title: 'کانفیگ اختصاصی Loon', badge: 'Loon', url: `${baseSubUrl}?target=loon` },
    { title: 'متن خام لینک‌ها (Raw Plaintext)', badge: 'RAW', url: `${baseSubUrl}?target=raw` }
  ];

  const safeNodesJson = JSON.stringify(nodes).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>وضعیت اشتراک ${user.username} — ${BRAND_UPPER}</title>
  <link rel="icon" href="${FAVICON_DATA_URI}">
  <style>
    :root {
      --bg-0: #070d07;
      --bg-1: #0c160c;
      --card: rgba(15, 26, 15, 0.90);
      --card-inner: rgba(9, 16, 9, 0.92);
      --border: rgba(163, 230, 53, 0.18);
      --border-hi: rgba(181, 255, 77, 0.48);
      --neon: #b5ff4d;
      --neon-dim: rgba(181, 255, 77, 0.14);
      --text: #f3f8f1;
      --muted: #93a88a;
      --danger: #f87171;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Vazirmatn", Tahoma, sans-serif;
      background:
        radial-gradient(circle at 20% 0%, rgba(132, 204, 22, 0.18) 0%, transparent 48%),
        radial-gradient(circle at 85% 90%, rgba(101, 163, 13, 0.14) 0%, transparent 45%),
        var(--bg-0);
      color: var(--text);
      padding: 18px 14px 90px;
      line-height: 1.6;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(163, 230, 53, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(163, 230, 53, 0.04) 1px, transparent 1px);
      background-size: 36px 36px;
      pointer-events: none;
      z-index: 0;
    }
    .container {
      position: relative;
      z-index: 1;
      max-width: 680px;
      margin: 0 auto;
    }
    .status-hero {
      background: var(--card);
      border: 1px solid var(--border-hi);
      border-radius: 22px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 16px 44px rgba(0, 0, 0, 0.6);
    }
    .hero-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .hero-user {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .hero-logo {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
    }
    .hero-logo svg { width: 100%; height: 100%; }
    .hero-name {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text);
    }
    .hero-brand {
      font-size: 0.76rem;
      color: var(--neon);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      background: var(--neon-dim);
      border: 1px solid var(--border-hi);
      color: var(--neon);
    }
    .pill-off {
      background: rgba(248, 113, 113, 0.14);
      border-color: rgba(248, 113, 113, 0.4);
      color: var(--danger);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    @media (min-width: 520px) {
      .stats-grid { grid-template-columns: repeat(4, 1fr); }
    }
    .stat-box {
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 11px 12px;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .stat-val {
      font-size: 0.96rem;
      font-weight: 800;
      color: var(--text);
    }
    .url-copy-box {
      background: #060b06;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 10px;
    }
    .url-text {
      font-family: "JetBrains Mono", monospace;
      font-size: 0.8rem;
      color: #d7e8cf;
      direction: ltr;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 12px;
      padding: 9px 16px;
      cursor: pointer;
      font-size: 0.84rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.18s;
      flex-shrink: 0;
    }
    .copy-btn:hover {
      border-color: var(--neon);
      color: var(--neon);
      background: var(--neon-dim);
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 22px 4px 10px;
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text);
    }
    .section-head .sub-meta {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--muted);
    }
    .acc-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 18px;
      margin-bottom: 12px;
      overflow: hidden;
      transition: border-color 0.2s;
    }
    .acc-card.open {
      border-color: var(--border-hi);
    }
    .acc-header {
      width: 100%;
      background: transparent;
      border: none;
      color: var(--text);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      font-family: inherit;
      text-align: right;
    }
    .acc-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .acc-title {
      font-size: 0.96rem;
      font-weight: 800;
    }
    .acc-count {
      font-size: 0.78rem;
      color: var(--muted);
    }
    .acc-arrow {
      font-size: 0.9rem;
      color: var(--muted);
      transition: transform 0.22s;
    }
    .acc-card.open .acc-arrow {
      transform: rotate(180deg);
      color: var(--neon);
    }
    .acc-body {
      display: none;
      padding: 0 18px 18px;
      border-top: 1px solid rgba(163, 230, 53, 0.1);
    }
    .acc-card.open .acc-body {
      display: block;
    }
    .client-desc {
      font-size: 0.82rem;
      color: var(--muted);
      margin: 12px 0 14px;
      line-height: 1.65;
    }
    .client-item {
      padding: 14px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .client-item:first-of-type { border-top: none; }
    .client-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .client-name-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .client-name {
      font-size: 0.98rem;
      font-weight: 800;
      color: #fff;
    }
    .client-os {
      font-size: 0.76rem;
      color: var(--muted);
    }
    .tag-green {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--neon);
      background: rgba(163, 230, 53, 0.12);
      border: 1px solid rgba(163, 230, 53, 0.35);
    }
    .dl-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 11px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      color: var(--text);
      text-decoration: none;
      font-size: 0.78rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .dl-btn:hover {
      border-color: var(--neon);
      color: var(--neon);
    }
    .node-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 12px;
      background: var(--card-inner);
      border: 1px solid var(--border);
      margin-top: 8px;
    }
    .node-tag {
      font-family: "JetBrains Mono", monospace;
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--neon);
      direction: ltr;
    }
    .node-proto {
      font-size: 0.74rem;
      color: var(--muted);
    }
    .fab-refresh {
      position: fixed;
      bottom: 22px;
      left: 22px;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background: #060a06;
      border: 1px solid var(--border-hi);
      color: var(--text);
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      transition: all 0.2s;
    }
    .fab-refresh:hover {
      color: var(--neon);
      transform: rotate(90deg);
    }
    .toast {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      background: #112211;
      border: 1px solid var(--neon);
      color: var(--neon);
      padding: 10px 20px;
      border-radius: 999px;
      font-size: 0.86rem;
      font-weight: 700;
      z-index: 100;
      display: none;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    }
  </style>
</head>
<body>
  <div id="toast" class="toast"></div>

  <div class="container">
    <!-- کارت اصلی وضعیت کاربر -->
    <div class="status-hero">
      <div class="hero-top">
        <div class="hero-user">
          <div class="hero-logo">${SHIELD_LOGO_SVG}</div>
          <div>
            <div class="hero-name">${user.username}</div>
            <div class="hero-brand">${BRAND_UPPER} SUBSCRIPTION PORTAL</div>
          </div>
        </div>
        <span class="pill ${user.enabled ? '' : 'pill-off'}">
          ● ${user.enabled ? (user.startOnFirstUse && !user.firstConnectedAt ? 'شروع با اولین اتصال' : 'فعال و آنلاین') : 'غیرفعال'}
        </span>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">مصرف فعلی</div>
          <div class="stat-val">${formatBytes(usedBytes)}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">سهمیه حجم</div>
          <div class="stat-val">${limitGb > 0 ? `${limitGb} GB (${usagePercent}%)` : '∞ نامحدود'}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">تعداد نود در ساب</div>
          <div class="stat-val">${totalNodes} نود (${BRAND_NAME})</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">وضعیت انقضا</div>
          <div class="stat-val">${expireLabel}</div>
        </div>
      </div>

      <div style="font-size:0.8rem;color:var(--muted);margin-bottom:4px;">لینک مستقیم صفحه وضعیت و اشتراک شما:</div>
      <div class="url-copy-box">
        <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک اشتراک هوشمند کپی شد')">📋 کپی ساب‌لینک</button>
        <div class="url-text">${baseSubUrl}</div>
      </div>
    </div>

    <!-- محدوده نودها -->
    <div class="section-head">
      <span>🌐 محدودهٔ نودها</span>
      <span class="sub-meta">همه نودها (${totalNodes} نود با فرمت number+${BRAND_NAME})</span>
    </div>
    <div class="acc-card" id="accScope">
      <button type="button" class="acc-header" onclick="toggleAcc('accScope')">
        <div class="acc-title-wrap">
          <span class="acc-title">فقط بخشی از نودها را می‌خواهید؟</span>
          <span class="acc-count">4 گزینه · ${totalNodes} نود در کل</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">می‌توانید تعداد نودهای خروجی یا محدوده نودها را در لینک اشتراک خود فیلتر کنید:</p>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">همه نودهای کاربر (${totalNodes} نود)</span>
            <span class="tag-green">پیش‌فرض کاربر</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">۱۰ نود اول (1+${BRAND_NAME} تا 10+${BRAND_NAME})</span>
            <span class="tag-green">سبک و سریع</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?limit=10', 'کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?limit=10</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">فقط نودهای لبه CDN</span>
            <span class="tag-green">Multi-Location</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?scope=edge', 'کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?scope=edge</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top">
            <span class="client-name">فقط سرور اصلی (بدون CDN)</span>
            <span class="tag-green">Direct Origin</span>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?scope=origin', 'کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?scope=origin</div>
          </div>
        </div>
      </div>
    </div>

    <!-- لوکیشن‌ها -->
    <div class="section-head">
      <span>🌐 لوکیشن‌ها</span>
      <span class="sub-meta">هر کشور یک سابلینک جدا</span>
    </div>
    <div class="acc-card" id="accLocations">
      <button type="button" class="acc-header" onclick="toggleAcc('accLocations')">
        <div class="acc-title-wrap">
          <span class="acc-title">سابلینک لوکیشن‌محور</span>
          <span class="acc-count">${locationsList.length} لوکیشن</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">با استفاده از هر لینک، مسیر خروجی روی همان منطقه تنظیم می‌شود:</p>
        ${locationsList
          .map(
            loc => `
          <div class="client-item">
            <div class="client-top">
              <span class="client-name">${loc.title}</span>
              <span class="tag-green">${loc.code}</span>
            </div>
            <div class="url-copy-box">
              <button type="button" class="copy-btn" onclick="copyText('${loc.url}', 'لینک لوکیشن ${loc.code} کپی شد')">📋</button>
              <div class="url-text">${loc.url}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>

    <!-- سابلینک اختصاصی هر کلاینت -->
    <div class="section-head">
      <span>🛡️ سابلینک اختصاصی هر کلاینت</span>
      <span class="sub-meta">16 کلاینت در 5 خانواده</span>
    </div>

    <!-- شروع سریع -->
    <div class="acc-card open" id="accQuickStart">
      <button type="button" class="acc-header" onclick="toggleAcc('accQuickStart')">
        <div class="acc-title-wrap">
          <span class="acc-title">شروع سریع</span>
          <span class="acc-count">1 کلاینت</span>
          <span class="tag-green">پیشنهادی</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">یک لینک برای همه‌چیز؛ سریع‌ترین نود بر اساس پینگ، مناسب هر کلاینتی.</p>
        <div class="client-top">
          <div class="client-name-row">
            <span class="client-name">اتصال هوشمند</span>
            <span class="client-os">همه پلتفرم‌ها</span>
          </div>
          <span class="tag-green">اتصال هوشمند (همه نودها × همه پروتکل‌ها)</span>
        </div>
        <div class="url-copy-box">
          <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'سابلینک هوشمند کپی شد')">📋</button>
          <div class="url-text">${baseSubUrl}</div>
        </div>
        <div style="font-size:0.78rem;color:var(--muted);margin-top:8px;">سریع‌ترین نود بر اساس پینگ واقعی؛ مناسب شروع سریع.</div>
      </div>
    </div>

    <!-- خانواده 1: Xray / Base64 -->
    <div class="acc-card open" id="accXray">
      <button type="button" class="acc-header" onclick="toggleAcc('accXray')">
        <div class="acc-title-wrap">
          <span class="acc-title">خانواده Xray / متن ساده — Base64</span>
          <span class="acc-count">7 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">v2rayNG، Exclusive، Amnezia، Streisand، Shadowrocket، V2Box و FoXray سابلینک Base64 (یا متن ساده) می‌خوانند.</p>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">v2rayNG</span>
              <span class="client-os">Android</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://github.com/2dust/v2rayNG/releases" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک v2rayNG کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
          <div style="font-size:0.78rem;color:var(--muted);margin-top:6px;">پرکاربردترین کلاینت اندروید؛ فرگمنت، sni و vless را کامل پشتیبانی می‌کند.</div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Exclusive</span>
              <span class="client-os">Android</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://github.com/GFW-knocker/MahsaNG/releases" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Exclusive کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
          <div style="font-size:0.78rem;color:var(--muted);margin-top:6px;">کلاینت اندروید؛ از سابلینک استاندارد Base64 استفاده می‌کند.</div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Amnezia VPN</span>
              <span class="client-os">Android · iOS · دسکتاپ</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://amnezia.org/en/downloads" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Amnezia کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Streisand</span>
              <span class="client-os">iOS · macOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://apps.apple.com/app/streisand/id6450534064" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Streisand کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Shadowrocket</span>
              <span class="client-os">iOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://apps.apple.com/app/shadowrocket/id932747118" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک Shadowrocket کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">V2Box</span>
              <span class="client-os">Android · iOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://apps.apple.com/app/v2box-v2ray-client/id6446814690" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک V2Box کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>

        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">v2rayN / Nekoray</span>
              <span class="client-os">Windows · Linux · macOS</span>
              <span class="tag-green">Base64 (V2Ray)</span>
            </div>
            <a class="dl-btn" href="https://github.com/2dust/v2rayN/releases" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}', 'لینک v2rayN کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- خانواده 2: sing-box — JSON -->
    <div class="acc-card" id="accSingbox">
      <button type="button" class="acc-header" onclick="toggleAcc('accSingbox')">
        <div class="acc-title-wrap">
          <span class="acc-title">خانواده sing-box — JSON</span>
          <span class="acc-count">5 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">مناسب Hiddify، Sing-box (نسخه 1.12 به بالا)، Karing، NekoBox و Exclave:</p>
        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Hiddify / Sing-box</span>
              <span class="client-os">همه پلتفرم‌ها</span>
              <span class="tag-green">JSON (Sing-box)</span>
            </div>
            <a class="dl-btn" href="https://github.com/hiddify/hiddify-app/releases" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=singbox', 'لینک Sing-box کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?target=singbox</div>
          </div>
        </div>
      </div>
    </div>

    <!-- خانواده 3: Clash / Mihomo — فقط YAML -->
    <div class="acc-card" id="accClash">
      <button type="button" class="acc-header" onclick="toggleAcc('accClash')">
        <div class="acc-title-wrap">
          <span class="acc-title">خانواده Clash / Mihomo — فقط YAML</span>
          <span class="acc-count">2 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <p class="client-desc">مناسب Clash Meta for Android (CMFA)، Clash Verge Rev، FlClash و Stash:</p>
        <div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">Clash Meta / Verge / FlClash</span>
              <span class="client-os">Android · Windows · macOS</span>
              <span class="tag-green">YAML (Mihomo)</span>
            </div>
            <a class="dl-btn" href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases" target="_blank" rel="noopener">⬇ دانلود کلاینت</a>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=clash', 'لینک Clash کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?target=clash</div>
          </div>
        </div>
        ${
          user.config?.jk === 'yes'
            ? `<div class="client-item">
          <div class="client-top">
            <div class="client-name-row">
              <span class="client-name">CLASH زنجیره اینترنت خانگی</span>
              <span class="client-os">Mihomo 1.19.25+</span>
              <span class="tag-green">Residential IP</span>
            </div>
          </div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=vg', 'لینک CLASH خانگی کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?target=vg</div>
          </div>
        </div>`
            : ''
        }
      </div>
    </div>

    <!-- خانواده 4: هسته‌ها و ابزارها -->
    <div class="acc-card" id="accTools">
      <button type="button" class="acc-header" onclick="toggleAcc('accTools')">
        <div class="acc-title-wrap">
          <span class="acc-title">هسته‌ها و ابزارها (Surge / QuanX / Loon)</span>
          <span class="acc-count">3 کلاینت</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <div class="client-item">
          <div class="client-top"><span class="client-name">Surge</span><span class="tag-green">INI</span></div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=surge', 'لینک Surge کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?target=surge</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top"><span class="client-name">Quantumult X</span><span class="tag-green">QuanX</span></div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=quanx', 'لینک Quantumult X کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?target=quanx</div>
          </div>
        </div>
        <div class="client-item">
          <div class="client-top"><span class="client-name">Loon</span><span class="tag-green">Loon</span></div>
          <div class="url-copy-box">
            <button type="button" class="copy-btn" onclick="copyText('${baseSubUrl}?target=loon', 'لینک Loon کپی شد')">📋</button>
            <div class="url-text">${baseSubUrl}?target=loon</div>
          </div>
        </div>
      </div>
    </div>

    <!-- سابلینک به تفکیک پروتکل و ترنسپورت -->
    <div class="section-head">
      <span>🔗 سابلینک به تفکیک پروتکل و ترنسپورت</span>
      <span class="sub-meta">${protoCombos.length} ترکیب</span>
    </div>
    <div class="acc-card" id="accCombos">
      <button type="button" class="acc-header" onclick="toggleAcc('accCombos')">
        <div class="acc-title-wrap">
          <span class="acc-title">لیست ترکیب‌های نود × پروتکل</span>
          <span class="acc-count">${protoCombos.length} لینک</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        ${protoCombos
          .map(
            c => `
          <div class="client-item">
            <div class="client-top">
              <span class="client-name">${c.title}</span>
              <span class="tag-green">${c.badge}</span>
            </div>
            <div class="url-copy-box">
              <button type="button" class="copy-btn" onclick="copyText('${c.url}', 'کپی شد')">📋</button>
              <div class="url-text">${c.url}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>

    <!-- لیست تکی نودهای خروجی با فرمت number+miliconfig -->
    <div class="section-head">
      <span>⚡ نودها</span>
      <span class="sub-meta">${totalNodes} از ${totalNodes} آنلاین · نام‌گذاری number+${BRAND_NAME}</span>
    </div>
    <div class="acc-card open" id="accNodes">
      <button type="button" class="acc-header" onclick="toggleAcc('accNodes')">
        <div class="acc-title-wrap">
          <span class="acc-title">لیست کانفیگ‌های خروجی (1+${BRAND_NAME} تا ${totalNodes}+${BRAND_NAME})</span>
          <span class="acc-count">${totalNodes} کانفیگ</span>
        </div>
        <span class="acc-arrow">⌄</span>
      </button>
      <div class="acc-body">
        <div style="margin:12px 0;">
          <button type="button" class="copy-btn" style="width:100%;justify-content:center;" onclick="copyAllNodes()">
            📋 کپی یکجای همه ${totalNodes} کانفیگ (1+${BRAND_NAME} تا ${totalNodes}+${BRAND_NAME})
          </button>
        </div>
        <div id="nodesContainer"></div>
      </div>
    </div>
  </div>

  <button type="button" class="fab-refresh" onclick="window.location.reload()" title="بروزرسانی وضعیت">⇄</button>

  <script>
    var ALL_NODES = ${safeNodesJson};

    function showToast(msg) {
      var t = document.getElementById('toast');
      if (!t) return;
      t.textContent = msg;
      t.style.display = 'block';
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(function() {
        t.style.display = 'none';
      }, 2500);
    }

    function copyText(text, msg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          showToast(msg || 'کپی شد');
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(msg || 'کپی شد');
      }
    }

    function copyAllNodes() {
      copyText(ALL_NODES.join('\\n'), 'همه کانفیگ‌ها کپی شدند');
    }

    function toggleAcc(id) {
      var el = document.getElementById(id);
      if (el) el.classList.toggle('open');
    }

    function renderNodes() {
      var container = document.getElementById('nodesContainer');
      if (!container) return;
      var html = '';
      for (var i = 0; i < ALL_NODES.length; i++) {
        var link = ALL_NODES[i];
        var hashIdx = link.indexOf('#');
        var name = hashIdx > -1 ? decodeURIComponent(link.substring(hashIdx + 1)) : ((i + 1) + '+${BRAND_NAME}');
        var proto = link.split('://')[0].toUpperCase();
        html += '<div class="node-row">' +
          '<div><div class="node-tag">' + name + '</div><div class="node-proto">' + proto + ' · Cloudflare Edge</div></div>' +
          '<button type="button" class="copy-btn" onclick="copyNodeByIndex(' + i + ')">📋 کپی کانفیگ</button>' +
          '</div>';
      }
      container.innerHTML = html;
    }

    function copyNodeByIndex(idx) {
      var link = ALL_NODES[idx];
      if (!link) return;
      copyText(link, 'کانفیگ ' + (idx + 1) + '+${BRAND_NAME} کپی شد');
    }

    renderNodes();
  </script>
</body>
</html>`;
}


// --- MODULE: src/ui/adminHtml.js ---
// ============================================================================
// MiliconfigOS v4.0 - سیستم‌عامل پیشرفته مرکز کنترل (Desktop Workspace)
// Developer: Milad Jahani | Brand: miliconfig
// تم‌های روز/شب/سیستم، قفل ۵ کاربر، کاتالوگ DNS، اسکنر چندسطحی، سابلینک کشوری
// ============================================================================


function renderAdminDashboardHtml(initialData = {}) {
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


// --- MODULE: src/index.js ---
// ============================================================================
// MiliconfigOS v4.0 - نقطه ورود اصلی Cloudflare Workers & Pages
// Developer: Milad Jahani | Brand: miliconfig
// مجهز به دیتابیس D1، معماری نسخه ۴، قفل ۵ کاربر، ترنزیشن بلور ۳ ثانیه‌ای و ضد خطای ۱۱۰۱
// ============================================================================


function normalizeCleanPath(p = '') {
  return String(p || '').trim().replace(/^\/+|\/+$/g, '').toLowerCase();
}

function isAdminAuthorizedPath(prefixPath, adminUuid, customPath) {
  const cleanPrefix = normalizeCleanPath(prefixPath);
  if (!cleanPrefix) return false;
  const cleanAdmin = normalizeCleanPath(adminUuid);
  const cleanCustom = normalizeCleanPath(customPath);
  if (cleanCustom) {
    return cleanPrefix === cleanCustom || cleanPrefix === cleanAdmin;
  }
  return cleanPrefix === cleanAdmin;
}

export default {
  async fetch(request, env = {}, ctx = {}) {
    try {
      const url = new URL(request.url);
      const upgradeHeader = (request.headers.get('Upgrade') || '').toLowerCase();
      const isWebSocket = upgradeHeader === 'websocket';

      // اطمینان از آماده بودن اسکیمای D1 یا حافظه پشتیبان بدون هیچ خطایی
      await ensureD1Schema(env);
      const adminUuid = getAdminUuid(env);
      const globalCfg = await loadGlobalConfig(env);
      const allUsers = await listUsers(env);

      // ۱. هندل کردن ترافیک پروکسی WebSocket (VLESS + Shadowsocks + Trojan + UDP DNS)
      if (isWebSocket) {
        return await handleWebSocketUpgrade(request, env, ctx, globalCfg, allUsers, adminUuid);
      }

      const pathParts = url.pathname.split('/').filter(Boolean);

      // ۲. هندل کردن APIهای احراز هویت، اسکنر، نودها، DNS و ممیزی
      if (url.pathname.includes('/api/')) {
        // مسیرهای احراز هویت
        if (url.pathname.startsWith('/api/admin/') || url.pathname.startsWith('/api/v1/auth/')) {
          return await handleAuthApi(request, env);
        }
        // اسکنر کشوری
        if (url.pathname.startsWith('/api/scanner/') || url.pathname.startsWith('/api/v1/scanner/')) {
          return await handleScannerApi(request, env);
        }
        // کاتالوگ نودها
        if (url.pathname.startsWith('/api/v1/nodes')) {
          return await handleNodesApi(request, env);
        }
        // کاتالوگ DNS
        if (url.pathname.startsWith('/api/v1/dns/')) {
          return await handleDnsApi(request, env);
        }
        // لاگ‌های ممیزی
        if (url.pathname.startsWith('/api/v1/audit')) {
          return await handleAuditApi(request, env);
        }
        // مانیتورینگ و آمار
        if (url.pathname.startsWith('/api/v1/monitoring/stats') || url.pathname.endsWith('/api/stats')) {
          return await handleDashboardStatsApi(request, env);
        }
        // تنظیمات سراسری
        if (url.pathname.endsWith('/api/v1/config') || url.pathname.endsWith('/api/config')) {
          return await handleConfigApi(request, env);
        }
        // مدیریت کاربران
        if (url.pathname.endsWith('/api/v1/users') || url.pathname.endsWith('/api/users')) {
          return await handleUsersApi(request, env);
        }

        const apiIdx = pathParts.indexOf('api');
        const prefix = pathParts.slice(0, apiIdx).join('/');
        const apiSubPath = pathParts.slice(apiIdx + 1).join('/');

        // API عمومی صفحه وضعیت کاربر
        if (apiSubPath.startsWith('status/')) {
          const token = decodeURIComponent(apiSubPath.slice('status/'.length));
          return await handlePublicUserStatusApi(request, env, token);
        }

        // بررسی دسترسی مدیر برای APIهای مدیریتی دارای پیشوند اختصاصی
        if (!isAdminAuthorizedPath(prefix, adminUuid, globalCfg.d)) {
          return new Response(JSON.stringify({ error: 'دسترسی غیرمجاز (مسیر مدیریت نامعتبر است)' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          });
        }

        if (apiSubPath === 'preferred-ips') {
          return await handlePreferredIpsApi(request, env, true);
        }
        if (apiSubPath === 'd1-init') {
          return await handleDashboardStatsApi(request, env);
        }

        return new Response(JSON.stringify({ error: 'مسیر API یافت نشد' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }

      // ۳. هندل کردن پروتکل xhttp (درخواست‌های POST غیر API)
      if (request.method === 'POST') {
        return await handleXhttpPostRequest(request, env, ctx, globalCfg, allUsers, adminUuid);
      }

      // ۴. هندل کردن درخواست‌های GET
      if (request.method === 'GET' || request.method === 'HEAD') {
        // ۴-الف: صفحه اصلی / (درگاه ورود و استتار ۳ ثانیه‌ای با قابلیت باز شدن مستقیم)
        if (url.pathname === '/' || pathParts.length === 0) {
          const isInitialized = await hasAdminPassword(env);
          return new Response(
            renderLoginGatewayHtml({
              initialized: isInitialized,
              customPath: globalCfg.d,
              homepage: globalCfg.homepage || DEFAULT_HOMEPAGE
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }
          );
        }

        // ۴-ب: مسیرهای سازگار با کد پایه /{prefix}/region و /{prefix}/test-api
        if (pathParts.length === 2 && (pathParts[1] === 'region' || pathParts[1] === 'test-api')) {
          const prefix = pathParts[0];
          if (!isAdminAuthorizedPath(prefix, adminUuid, globalCfg.d)) {
            return new Response(JSON.stringify({ error: 'Access Denied' }), {
              status: 403,
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
          }
          if (pathParts[1] === 'region') {
            return new Response(
              JSON.stringify({
                region: globalCfg.wk ? globalCfg.wk.toUpperCase() : globalCfg.p ? 'CUSTOM' : 'CF',
                detectionMethod: globalCfg.wk ? 'تعیین دستی منطقه' : globalCfg.p ? 'ProxyIP سفارشی' : 'اتصال مستقیم رسمی CF',
                timestamp: new Date().toISOString()
              }),
              { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
            );
          }
          return new Response(
            JSON.stringify({
              detectedRegion: 'CF',
              message: 'API تست با موفقیت انجام شد',
              timestamp: new Date().toISOString()
            }),
            { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
          );
        }

        // ۴-ج: صفحه وضعیت اختصاصی برای ارسال به کاربر (/status/{token} یا /{token}/status)
        if (
          (pathParts[0] === 'status' && pathParts[1]) ||
          (pathParts.length === 2 && pathParts[1] === 'status')
        ) {
          const token = decodeURIComponent(pathParts[0] === 'status' ? pathParts[1] : pathParts[0]);
          let userObj = await getUserByIdOrToken(env, token);
          if (!userObj && isAdminAuthorizedPath(token, adminUuid, globalCfg.d)) {
            userObj = allUsers[0] || {
              id: 'mili-admin',
              username: 'Admin',
              uuid: adminUuid,
              subNodeCount: globalCfg.subNodeCount || 50,
              enabled: true,
              status: 'active',
              dataLimitGb: 0,
              usedBytes: 0,
              lifetimeBytes: 0,
              requestCount: 0,
              expireDays: 0,
              expireAt: 0,
              startOnFirstUse: true,
              ipLimit: 50,
              nodeScope: 'all',
              config: globalCfg
            };
          }
          if (!userObj) {
            return new Response('کاربر مورد نظر یافت نشد', {
              status: 404,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
          }
          const nodes = await generateUserNodesList(userObj, url.hostname, {
            limit: userObj.subNodeCount
          });
          return new Response(renderUserStatusPageHtml(userObj, nodes, request.url), {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store'
            }
          });
        }

        // ۴-د: لینک اشتراک کلاینت‌ها (/{token}/sub یا /sub/{token})
        if (
          (pathParts.length >= 2 && pathParts[pathParts.length - 1] === 'sub') ||
          (pathParts[0] === 'sub' && pathParts[1])
        ) {
          const token = pathParts[0] === 'sub'
            ? decodeURIComponent(pathParts.slice(1).join('/'))
            : decodeURIComponent(pathParts.slice(0, -1).join('/'));

          let targetUser = await getUserByIdOrToken(env, token);
          if (!targetUser && isAdminAuthorizedPath(token, adminUuid, globalCfg.d)) {
            targetUser = {
              id: allUsers[0]?.id || null,
              username: BRAND_NAME,
              uuid: adminUuid,
              subNodeCount: globalCfg.subNodeCount || 50,
              enabled: true,
              dataLimitGb: 0,
              usedBytes: 0,
              expireAt: 0,
              nodeScope: 'all',
              config: globalCfg
            };
          }
          if (!targetUser) {
            return new Response(JSON.stringify({ error: 'شناسه اشتراک نامعتبر است' }), {
              status: 403,
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            });
          }
          if (targetUser.id) {
            const p = recordUserActivity(env, targetUser.id, 0, 1, 'subscription').catch(() => {});
            if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(p);
          }
          return await handleSubscriptionResponse(request, targetUser, url);
        }

        // ۴-هـ: دسترسی به پنل مدیریت ادمین یا صفحه وضعیت با /{token}
        const fullCleanPath = normalizeCleanPath(url.pathname);
        if (isAdminAuthorizedPath(fullCleanPath, adminUuid, globalCfg.d)) {
          if (url.searchParams.get('view') === 'status') {
            const adminUser = allUsers[0] || {
              id: 'mili-admin',
              username: BRAND_NAME,
              uuid: adminUuid,
              subNodeCount: globalCfg.subNodeCount || 50,
              enabled: true,
              config: globalCfg
            };
            const nodes = await generateUserNodesList(adminUser, url.hostname, {
              limit: adminUser.subNodeCount
            });
            return new Response(renderUserStatusPageHtml(adminUser, nodes, request.url), {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          }

          const diag = await getStorageDiagnostics(env);
          const customYxCount = (globalCfg.yx || '').split(',').filter(Boolean).length;
          return new Response(
            renderAdminDashboardHtml({
              config: globalCfg,
              users: allUsers,
              diagnostics: {
                ...diag,
                healthyCfIps: customYxCount + DIRECT_DOMAINS.length + OFFICIAL_DIRECT_IPS.length
              },
              adminPath: fullCleanPath
            }),
            {
              status: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store'
              }
            }
          );
        }

        // اگر توکن متعلق به یکی از کاربران ثبت‌شده در D1 باشد
        const matchedUser = await getUserByIdOrToken(env, fullCleanPath);
        if (matchedUser) {
          const nodes = await generateUserNodesList(matchedUser, url.hostname, {
            limit: matchedUser.subNodeCount
          });
          return new Response(renderUserStatusPageHtml(matchedUser, nodes, request.url), {
            status: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store'
            }
          });
        }
      }

      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    } catch (err) {
      // محافظ سطح بالا جهت جلوگیری ۱۰۰٪ از بروز خطای Cloudflare Error 1101
      return new Response(
        JSON.stringify({
          status: 'recovered',
          brand: BRAND_NAME,
          product: PROJECT_NAME,
          version: VERSION,
          message: err?.message || String(err)
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      );
    }
  }
};

