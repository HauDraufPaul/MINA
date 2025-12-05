-- Initial schema for mina
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS feeds (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now')),
  last_checked DATETIME
);

CREATE TABLE IF NOT EXISTS feed_items (
  id TEXT PRIMARY KEY,
  feed_id TEXT NOT NULL REFERENCES feeds(id),
  title TEXT,
  content TEXT,
  url TEXT,
  published_at DATETIME,
  is_read INTEGER DEFAULT 0
);

CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts5(title, body_md, content='');
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  title TEXT,
  body_md TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now')),
  updated_at DATETIME,
  tags TEXT
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT,
  status TEXT,
  priority INTEGER,
  due_date DATETIME,
  hub TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS dashboards (
  id TEXT PRIMARY KEY,
  hub TEXT,
  layout_json TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now')),
  updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS music_index (
  id TEXT PRIMARY KEY,
  file_path TEXT NOT NULL,
  title TEXT,
  artist TEXT,
  album TEXT,
  duration INTEGER,
  tags TEXT,
  indexed_at DATETIME DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS lego_collections (
  id TEXT PRIMARY KEY,
  name TEXT,
  items_json TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS projects_creative (
  id TEXT PRIMARY KEY,
  name TEXT,
  files_json TEXT,
  last_run_output TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now'))
);

CREATE TABLE IF NOT EXISTS sync_queue (
  id TEXT PRIMARY KEY,
  entity TEXT,
  entity_id TEXT,
  operation TEXT,
  payload TEXT,
  created_at DATETIME DEFAULT (strftime('%s','now')),
  attempts INTEGER DEFAULT 0
);

COMMIT;
