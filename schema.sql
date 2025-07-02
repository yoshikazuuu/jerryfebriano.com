-- Guestbook table for Cloudflare D1 with session management
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id TEXT PRIMARY KEY,
  user_session_id TEXT NOT NULL,
  name TEXT NOT NULL,
  wpm INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  -- Ensure one entry per user session (prevents spam/duplicates)
  UNIQUE(user_session_id)
);

-- Index for efficient sorting by WPM and accuracy
CREATE INDEX IF NOT EXISTS idx_guestbook_ranking 
ON guestbook_entries(wpm DESC, accuracy DESC);

-- Index for timestamp queries if needed
CREATE INDEX IF NOT EXISTS idx_guestbook_timestamp 
ON guestbook_entries(timestamp DESC);

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_guestbook_session 
ON guestbook_entries(user_session_id); 