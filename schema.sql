-- ============================================================================
-- MiliconfigOS v4.0 - Database Schema (Cloudflare D1)
-- Developer: Milad Jahani | Brand: miliconfig
-- Note: All tables and migrations are automatically created at runtime (Auto-Migration)
-- ============================================================================

CREATE TABLE IF NOT EXISTS system_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
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
);

CREATE TABLE IF NOT EXISTS endpoints (
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
);

CREATE TABLE IF NOT EXISTS preferred_nodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  port INTEGER NOT NULL DEFAULT 443,
  name TEXT NOT NULL,
  colo TEXT DEFAULT '',
  latency INTEGER DEFAULT 0,
  source TEXT DEFAULT 'manual',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  detail TEXT NOT NULL,
  ip TEXT DEFAULT '',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS traffic_hourly (
  hour_key TEXT PRIMARY KEY,
  bytes INTEGER NOT NULL DEFAULT 0,
  requests INTEGER NOT NULL DEFAULT 0,
  source TEXT DEFAULT 'ws'
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  admin INTEGER DEFAULT 1,
  user_id TEXT,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  client_ip TEXT
);

CREATE TABLE IF NOT EXISTS login_attempts (
  ip TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0,
  last_attempt INTEGER NOT NULL
);
