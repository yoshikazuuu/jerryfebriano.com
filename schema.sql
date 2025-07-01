-- Guestbook table for Cloudflare D1
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  wpm INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  timestamp TEXT NOT NULL
);

-- Index for efficient sorting by WPM and accuracy
CREATE INDEX IF NOT EXISTS idx_guestbook_ranking 
ON guestbook_entries(wpm DESC, accuracy DESC);

-- Index for timestamp queries if needed
CREATE INDEX IF NOT EXISTS idx_guestbook_timestamp 
ON guestbook_entries(timestamp DESC);

-- Index for user_id queries
CREATE INDEX IF NOT EXISTS idx_guestbook_user_id
ON guestbook_entries(user_id);

-- Table for storing user sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  user_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_active TEXT NOT NULL
); 