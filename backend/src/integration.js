// Integration module for connecting to autonomous agents
// This is where clawdy's trading logic hooks into the dashboard

class AgentIntegration {
  constructor(db) {
    this.db = db;
  }

  // Log a trade decision
  logTrade(agentId, token, amount, action, price, reason) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO activities (agent_id, action, details) 
         VALUES (?, ?, ?)`,
        [agentId, 'trade', JSON.stringify({
          token, amount, action, price, reason
        })],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }

  // Log a decision with reasoning
  logDecision(agentId, decision, reasoning, metadata) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO audit_log (agent_id, action, details, result) 
         VALUES (?, ?, ?, ?)`,
        [agentId, decision, reasoning, JSON.stringify(metadata)],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });
  }

  // Check if override is active
  isOverrideActive(agentId) {
    return new Promise((resolve) => {
      this.db.get(
        `SELECT * FROM audit_log 
         WHERE agent_id = ? AND action = 'override' 
         ORDER BY timestamp DESC LIMIT 1`,
        [agentId],
        (err, row) => {
          resolve(row ? row.result === 'stop' : false);
        }
      );
    });
  }

  // Get current rules for agent
  getRules(agentId) {
    return new Promise((resolve) => {
      this.db.all(
        `SELECT rule_name, rule_value FROM rules 
         WHERE agent_id = ? AND enabled = 1`,
        [agentId],
        (err, rows) => {
          const rules = {};
          rows?.forEach(r => rules[r.rule_name] = r.rule_value);
          resolve(rules);
        }
      );
    });
  }

  // Update agent status
  updateAgentStatus(agentId, status, memory_summary) {
    return new Promise((resolve) => {
      this.db.run(
        `UPDATE agents 
         SET status = ?, last_activity = CURRENT_TIMESTAMP, memory_summary = ? 
         WHERE id = ?`,
        [status, memory_summary, agentId],
        (err) => resolve(!err)
      );
    });
  }
}

module.exports = AgentIntegration;
