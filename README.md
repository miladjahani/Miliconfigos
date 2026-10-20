# MiliconfigOS v4.0 — Intelligent Proxy Management & Subscription Platform

![MiliconfigOS Version](https://img.shields.io/badge/version-v4.0--OS-b5ff4d?style=flat-square&labelColor=090d14)
![Developer](https://img.shields.io/badge/Developer-Milad%20Jahani-00f0ff?style=flat-square&labelColor=090d14)
![Brand](https://img.shields.io/badge/Brand-miliconfig-10b981?style=flat-square&labelColor=090d14)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Workers%20%26%20Pages%20%2B%20D1-a855f7?style=flat-square&labelColor=090d14)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square&labelColor=090d14)

**Documentation Language:** [فارسی](فارسی.md) | [English](#english-documentation)

---

## 🌟 Overview

**MiliconfigOS v4.0** is an intelligent, full-featured proxy configuration management and subscription platform designed for **Cloudflare Workers** and **Cloudflare Pages** with persistent **Cloudflare D1** storage.

Developed by **Milad Jahani** under the **miliconfig** brand, MiliconfigOS transforms traditional lightweight proxy worker scripts into a modular, production-ready desktop operating system experience. It features zero hardcoded secrets, transactional user quota enforcement, rule-based combination optimization, verified DNS catalogs, multi-level health scanners, and multi-format subscription delivery.

---

## 🚀 Key Features

### 1. Polished Desktop OS Interface & Nginx Camouflage
- **Desktop Windowing System**: Complete OS-like workspace with traffic light window controls, floating launcher dock, live Jalali/Gregorian clock, and real-time Cloudflare 100k quota meter.
- **Configurable Camouflage & 3-Second Transition**: Upon opening `/`, the application displays the configured homepage (defaulting to `https://nginx.com`), then after approximately 3 seconds performs a smooth hardware-accelerated blur transition to reveal the administrator authentication dialog. Users can click "ورود فوری / Skip & Open Login" or press `ESC`/`Enter` to immediately access the dialog without waiting.
- **Three Genuine Themes**: Light, Dark (AMOLED `#090d14` with neon lime `#b5ff4d` and cyan accents), and System (follows OS `prefers-color-scheme`). Persisted across sessions with zero theme flash.
- **Bilingual Interface**: Full Persian (RTL) and English (LTR) layout switching with instant direction reversal.

### 2. Zero Preconfigured Application Secrets & First-Run Setup
- **No Hardcoded Password**: No default administrator password exists in code, database seeds, or environmental defaults.
- **PBKDF2-HMAC-SHA256 Derivation**: The administrator password is salted with a cryptographically secure 16-byte random salt and derived using 100,000 iterations of PBKDF2-HMAC-SHA256.
- **Transactional First-Run Wizard**: When deployed on a fresh D1 instance, the application prompts the administrator to establish an 8+ character password. Once set, first-run setup is permanently closed, and subsequent sessions require authentication.
- **Rate-Limited Login**: Protects against brute-force attacks by locking out client IPs for 15 minutes after 5 consecutive failures.

### 3. User Management — Hard Limit of Five (5)
- **Transactional Five-User Cap**: Strictly enforces a maximum of 5 user accounts at the database layer (`MAX_USERS_LIMIT = 5`). Attempts to create a 6th user return `400 Bad Request` with `LIMIT_REACHED`.
- **Independent Admin Account**: The administrator account is managed separately in `system_config` and does not consume any user slots.
- **Per-User Permissions**: Individual protocol permissions (VLESS, Shadowsocks, Trojan, xHTTP), custom sub-node limits (`subNodeCount`), data limits (GB), expiration schedules, and unguessable subscription tokens.

### 4. Advanced Proxy Configuration Engine & Capability Honesty
- **Supported Protocols**: VLESS (WebSocket & xHTTP), Shadowsocks (SS-WS with `chacha20-ietf-poly1305` and `aes-128-gcm`), Trojan, and xHTTP streaming.
- **Capability Honesty Matrix**:
  | Protocol / Feature | Cloudflare Runtime Support | Client Support | Notes |
  | :--- | :--- | :--- | :--- |
  | **VLESS (WS)** | ✅ Full (via `cloudflare:sockets`) | ✅ Sing-box, Clash Meta, v2rayNG, Loon | Primary high-speed protocol |
  | **Shadowsocks (WS)** | ✅ Full (AEAD SIP002) | ✅ Sing-box, Clash Meta, Surge, Loon | Bundled with `v2ray-plugin` |
  | **Trojan (WS)** | ✅ Full (SHA-224 auth) | ✅ Sing-box, Clash, Surge, Loon, QuanX | HTTPS camouflage traffic |
  | **xHTTP** | ✅ HTTP POST Streaming | ✅ Sing-box, v2ray-core v5 | Advanced asymmetric padding |
  | **REALITY** | ⚠️ Client config only | ✅ Supported cores | Native server requires external core |
  | **ECH** | ✅ Client DoH / Encrypted SNI | ✅ Modern uTLS / Sing-box / Chrome | Real HTTPS/SVCB ECH records |
  | **UDP Proxying** | ⚠️ DNS Only (Port 53) | ✅ All supported clients | Cloudflare Workers restricts raw UDP |

### 5. Mandatory Hardcoded Informational Nodes
Every client subscription begins with three fixed informational nodes:
1. `📢 ۱. میلی رایگان است`
2. `⚠️ ۲. فروش این کانفیگ ها حرام است`
3. `🔒 ۳. به طور شخصی استفاده کنید`

Following these notice nodes, all active proxy endpoints are sequentially numbered:
`1+miliconfig`, `2+miliconfig`, ..., `N+miliconfig`.

### 6. Location-Aware Multi-Location Catalog & Scanner
- **VIP Country Catalogs**: Categorized endpoints for Germany (`DE 🇩🇪`), Netherlands (`NL 🇳🇱`), United States (`US 🇺🇸`), United Kingdom (`GB 🇬🇧`), Turkey (`TR 🇹🇷`), UAE (`AE 🇦🇪`), Canada (`CA 🇨🇦`), Italy (`IT 🇮🇹`), Sweden (`SE 🇸🇪`), Norway (`NO 🇳🇴`), Kazakhstan (`KZ 🇰🇿`), Uzbekistan (`UZ 🇺🇿`), Finland (`FI 🇫🇮`), France (`FR 🇫🇷`), and Singapore (`SG 🇸🇬`).
- **Multi-Level Scanner**: Distinguishes address syntax validity, port reachability, TLS handshake status, and HTTP response.
- **Multi-Location Sublinks**: Dedicated button to copy All-Countries combined links (`?country=MULTI`) or per-country links (`?country=DE`).

### 7. Real DNS Management & Verified Catalog
- Pre-configured, verified DNS profiles:
  - **Cloudflare DNS**: `https://1.1.1.1/dns-query` (IPv4: `1.1.1.1`, IPv6: `2606:4700:4700::1111`)
  - **Google Public DNS**: `https://dns.google/dns-query` (IPv4: `8.8.8.8`)
  - **Quad9 Security**: `https://dns.quad9.net/dns-query` (Malware blocking)
  - **AdGuard DNS**: `https://dns.adguard-dns.com/dns-query` (Network ad-blocking)
- Routing Profiles: Remote DNS, Direct DNS, Split DNS, and Fake-IP DNS.

### 8. Truthful Usage Telemetry
- Distinguishes configuration delivery requests from actual proxied traffic.
- Traffic counters record transferred bytes directly from Cloudflare WebSocket byte streams (`telemetrySource: Cloudflare WebSocket Byte Counter (Real)`).
- Never displays fabricated GB statistics.

---

## 📁 Directory Structure

```text
miliconfig/
├── src/
│   ├── index.js                  # Main Cloudflare Workers & Pages entrypoint + 1101 protection
│   ├── config/
│   │   ├── defaults.js           # MiliconfigOS 4.0 defaults, 5-user limit, DNS & capability catalogs
│   │   └── presets.js            # User creation presets (Iran Fast, International, etc.)
│   ├── db/
│   │   └── d1.js                 # D1 database layer, auto-migrations, PBKDF2 hashing, sessions, 5-user cap
│   ├── core/
│   │   ├── runtime.js            # WebSocket proxy runtime (VLESS, SS-WS, Trojan) + xHTTP handler
│   │   └── utils.js              # PBKDF2 crypto, timingSafeEqual, URL validator, node namer
│   ├── subscription/
│   │   ├── generator.js          # Subscription engine with time-bucket rotation & country filters
│   │   └── converters.js         # Serializers: Sing-box v1.9+, Clash Meta, Surge, Loon, QuanX, URI
│   ├── api/
│   │   └── handlers.js           # Versioned REST API (/api/v1/...) with rate limiting & audit logs
│   └── ui/
│       ├── icons.js              # Original MiliconfigOS geometric vector logo & navigation SVG icons
│       ├── loginHtml.js          # Desktop login gateway with 3s blur transition & Nginx camouflage
│       ├── adminHtml.js          # MiliconfigOS 4.0 desktop workspace (10 functional modules)
│       └── statusHtml.js         # Customer-facing user status portal (/status/{token})
├── scripts/
│   ├── build.js                  # Modular ESM bundler producing _worker.js
│   ├── obfuscate.js              # AST-based string encryption and Terser minifier
│   └── test-worker.js            # Comprehensive automated test suite (11 test suites)
├── migrations/
│   ├── 0001_init_miliconfig.sql  # Initial migration
│   └── 0002_v4_miliconfigos.sql  # MiliconfigOS 4.0 schema upgrade
├── schema.sql                    # Full D1 SQL schema definition
├── wrangler.toml                 # Cloudflare Workers deployment configuration
└── package.json
```

---

## 🔧 Installation & Deployment

### Method 1: Cloudflare Workers (Recommended)
1. Push this repository to GitHub.
2. In Cloudflare Dashboard, navigate to **Workers & Pages -> Create -> Workers -> Import a repository**.
3. Select your repository. The configuration in `wrangler.toml` (`main = "src/index.js"`) deploys out-of-the-box.
4. To attach D1 persistent storage:
   - Go to **Storage & Databases -> D1 SQL Database** -> Create database (e.g., `miliconfig-db`).
   - Open your Worker -> **Settings -> Bindings -> Add -> D1 database**.
   - Set variable name to `DB` and select your database. Deploy!
   - Tables and indexes are migrated automatically on the first request.

### Method 2: Cloudflare Pages
1. In Cloudflare Dashboard, go to **Workers & Pages -> Create -> Pages -> Connect to Git**.
2. Select repository:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. After deployment, navigate to **Settings -> Functions -> D1 database bindings** and bind `DB`.

### First-Run Setup
1. Open your deployed domain (e.g. `https://your-worker.workers.dev/`).
2. The Nginx camouflage page will load, followed by the blur transition dialog.
3. Because no password exists, the **First-Run Setup Wizard** will appear.
4. Choose an 8+ character password to initialize the administrator account.

---

## 🧪 Automated Testing

Run the automated test suite locally:

```bash
npm run build
npm test
```

The test runner validates:
1. Manual deployment without D1 (Zero Error 1101) & Nginx camouflage gateway.
2. D1 schema creation and MiliconfigOS desktop dashboard rendering.
3. PBKDF2 password setup, session creation, rate limiting, and password changing.
4. 3 Hardcoded informational nodes and `number+miliconfig` naming.
5. Sing-box (JSON) and Clash Meta (YAML with `v2ray-plugin`) serialization.
6. Strict 5-user hard limit enforcement.
7. VIP country proxy scanner.
8. Verified DNS catalog.
9. Node catalog.
10. Audit logs.
11. Real usage monitoring and telemetry reporting.

---

## 🛡️ Security & Privacy

- **Zero Hardcoded Secrets**: No preconfigured passwords, tokens, or default credentials.
- **PBKDF2 Password Storage**: Standard 100,000 iterations with random salt.
- **Timing-Safe Comparison**: Prevents timing attacks on token and password validation.
- **Brute-Force Rate Limiting**: 5-attempt threshold triggers a 15-minute IP lockout.
- **Isolated User Credentials**: Subscriptions utilize unguessable UUIDs and tokens.
- **Sanitized Headers**: Sensitive parameters are never returned in client error messages.

---

## 📄 License & Credits

- **Developer**: Milad Jahani
- **Brand**: miliconfig
- **License**: MIT
