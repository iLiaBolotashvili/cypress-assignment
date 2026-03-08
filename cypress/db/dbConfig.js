const Database = require("better-sqlite3")
const path = require("path")

const dbPath = path.join(__dirname, "../../test-results.db")

const db = new Database(dbPath)

db.exec(`
CREATE TABLE IF NOT EXISTS test_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_name TEXT UNIQUE,
  status TEXT,
  duration_ms INTEGER,
  executed_at TEXT
)
`)

module.exports = db