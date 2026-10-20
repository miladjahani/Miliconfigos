// ============================================================================
// MiliconfigOS v4.0 - Central Configuration & Compatibility Catalog
// Developer: Milad Jahani | Brand: miliconfig
// Full-Featured Proxy Management Platform with 5-User Hard Limit,
// Verified DNS, Multi-Location Node Catalog, and Honest Capability Matrix
// ============================================================================

export const PROJECT_NAME = 'MiliconfigOS';
export const BRAND_NAME = 'miliconfig';
export const BRAND_UPPER = 'MILICONFIGOS';
export const VERSION = 'v4.0';
export const DEVELOPER = 'Milad Jahani';
export const DEFAULT_ADMIN_UUID = '351c9981-04b6-4103-aa4b-864aa9c91469';
export const MAX_USERS_LIMIT = 5; // Hard limit enforced transactionally at database & API levels
export const TELEGRAM_SUPPORT = '@miliconfig';
export const DEFAULT_HOMEPAGE = 'https://nginx.com';

// ۳ نود هاردکدشده اطلاع‌رسانی الزامی که در ابتدای تمام سابلینک‌ها قرار می‌گیرند
export const HARDCODED_INFO_NODES = [
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%F0%9F%93%A2%20%DB%B1.%20%D9%85%DB%8C%D9%84%DB%8C%20%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86%20%D8%A7%D8%B3%D8%AA',
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%E2%9A%A0%EF%B8%8F%20%DB%B2.%20%D9%81%D8%B1%D9%88%D8%B4%20%D8%A7%DB%8C%D9%86%20%DA%A9%D8%A7%D9%86%D9%81%DB%8C%DA%AF%20%D9%87%D8%A7%20%D8%AD%D8%B1%D8%A7%D9%85%20%D8%A7%D8%B3%D8%AA',
  'vless://00000000-0000-0000-0000-000000000000@127.0.0.1:443?encryption=none&security=none&type=ws#%F0%9F%94%92%20%DB%B3.%20%D8%A8%D9%87%20%D8%B7%D9%88%D8%B1%20%D8%B4%D8%AE%D8%B5%DB%8C%20%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87%20%DA%A9%D9%86%DB%8C%D8%AF'
];

export const CONFIG_DEFAULTS = {
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

export const BOOLEAN_CONFIG_KEYS = [
  'ev', 'et', 'ex', 'es', 'ech', 'ena', 'epd', 'epi', 'egi',
  'ipv4', 'ipv6', 'ispMobile', 'ispUnicom', 'ispTelecom', 'jk'
];

export const ENV_KEY_MAPPING = {
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

export const FRAGMENT_PRESETS = {
  'mci': { name: 'همراه اول (MCI)', length: '100-200', interval: '10-20', packets: 'tlshello' },
  'irancell': { name: 'ایرانسل (MTN Irancell)', length: '50-100', interval: '5-10', packets: 'tlshello' },
  'rightel': { name: 'مخابرات و رایتل (Rightel / TCI)', length: '1-3', interval: '1-5', packets: '1-1' },
  'anti-dpi': { name: 'ضد فیلترینگ شدید (Anti-DPI)', length: '10-30', interval: '20-40', packets: 'tlshello' },
  'custom': { name: 'سفارشی (Custom)', length: '100-200', interval: '10-20', packets: 'tlshello' }
};

export const FINGERPRINT_PRESETS = [
  { id: 'chrome', name: 'Chrome (پیشنهادی)', compatibility: 'کلاینت‌های مدرن مبتنی بر uTLS (Sing-box, Mihomo, v2rayNG)' },
  { id: 'firefox', name: 'Firefox', compatibility: 'کلاینت‌های پشتیبان uTLS (v2rayNG, Sing-box)' },
  { id: 'safari', name: 'Safari (iOS / macOS)', compatibility: 'بهینه‌شده برای دستگاه‌های اپل، Loon، Surge، Stash' },
  { id: 'edge', name: 'Microsoft Edge', compatibility: 'سازگار با ویندوز و کلاینت‌های دسکتاپ' },
  { id: 'ios', name: 'iOS Device', compatibility: 'مناسب برای دور زدن فیلترینگ موبایل' },
  { id: 'randomized', name: 'Randomized (تصادفی)', compatibility: 'تولید شناسه تصادفی در هر درخواست' }
];

export const ECH_DOMAINS = [
  { domain: 'cloudflare-ech.com', provider: 'Cloudflare', status: 'verified', note: 'دامنه رسمی ECH کلودفلر' },
  { domain: 'crypto.cloudflare.com', provider: 'Cloudflare Crypto', status: 'verified', note: 'زیرساخت تست رمزنگاری کلودفلر' },
  { domain: 'cloudflare-dns.com', provider: 'Cloudflare DNS', status: 'verified', note: 'پایانه 1.1.1.1 ECH' },
  { domain: 'deflect.ca', provider: 'Deflect', status: 'experimental', note: 'شبکه محافظتی ضد فیلترینگ' }
];

export const PATH_PATTERNS = [
  { id: '/?ed=2048', name: 'استاندارد Early Data (/?ed=2048)', desc: 'پشتیبانی از 0-RTT در وب‌سوکت' },
  { id: '/mili-stream?ed=2048', name: 'جریان امن (/mili-stream)', desc: 'مسیر اختصاصی پدینگ شده' },
  { id: '/api/v1/tunnel', name: 'استتار REST API (/api/v1/tunnel)', desc: 'پوشش ترافیک در قالب درخواست‌های API' },
  { id: '/ws-proxy', name: 'وب‌سوکت مستقیم (/ws-proxy)', desc: 'مسیر کوتاه و سبک' }
];

// کاتالوگ ارائه‌دهندگان معتبر DNS
export const VERIFIED_DNS_CATALOG = [
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
export const CAPABILITY_MATRIX = {
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
export const COUNTRY_PROXY_SOURCES = {
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

export const CF_HTTPS_PORTS = [443, 8443, 2053, 2083, 2087, 2096];
export const CF_HTTP_PORTS = [80, 8080, 8880, 2052, 2082, 2086, 2095];

export const DIRECT_DOMAINS = [
  { domain: 'www.visa.com.sg', name: 'Visa-SG', region: 'SG' },
  { domain: 'www.shopify.com', name: 'Shopify-US', region: 'US' },
  { domain: 'icook.hk', name: 'iCook-HK', region: 'HK' },
  { domain: 'www.glassdoor.com', name: 'Glassdoor-US', region: 'US' },
  { domain: 'www.digitalocean.com', name: 'DigitalOcean-US', region: 'US' }
];

export const OFFICIAL_DIRECT_IPS = [
  '104.16.0.0', '104.17.0.0', '104.18.0.0', '104.19.0.0',
  '172.64.0.0', '172.67.0.0', '162.159.0.0', '1.1.1.1'
];

export const FALLBACK_PROXY_IPS = [
  { domain: 'cfip.mili.workers.dev', port: 443, region: 'CF-Auto', regionCode: 'CF' }
];

export function isEnabledValue(val, defaultVal = false) {
  if (val === undefined || val === null || val === '') return defaultVal;
  const s = String(val).trim().toLowerCase();
  return s === 'yes' || s === 'true' || s === '1' || s === 'on' || s === 'enable' || s === 'enabled';
}

export function normalizeAlpn(alpnVal) {
  if (!alpnVal) return '';
  if (Array.isArray(alpnVal)) return alpnVal.join(',');
  return String(alpnVal).replace(/\s+/g, '');
}

export function getEnvConfigSnapshot(env = {}) {
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

export function normalizeEffectiveConfig(rawConfig = {}) {
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
