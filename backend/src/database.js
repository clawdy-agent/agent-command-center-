const { Pool } = require('pg');

// Use SQLite for now (simpler, no external DB needed)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Initialize schema
db.serialize(() => {
  db.run(`
    CREATE TABLE activities (
      id INTEGER PRIMARY KEY,
      agent_id TEXT,
      action TEXT,
      details TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE agents (
      id TEXT PRIMARY KEY,
      name TEXT,
      status TEXT,
      last_activity DATETIME,
      memory_summary TEXT
    )
  `);

  db.run(`
    CREATE TABLE rules (
      id INTEGER PRIMARY KEY,
      agent_id TEXT,
      rule_name TEXT,
      rule_value TEXT,
      enabled BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE audit_log (
      id INTEGER PRIMARY KEY,
      agent_id TEXT,
      action TEXT,
      details TEXT,
      result TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed initial agent
  db.run(`INSERT INTO agents VALUES (?, ?, ?, ?, ?)`, 
    ['clawdy', 'clawdy', 'active', new Date().toISOString(), 'Ready for tasks']);
});

module.exports = db;
