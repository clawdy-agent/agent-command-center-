/**
 * Agent Logger - Use this in your agent to log activities to Command Center
 * 
 * Usage:
 *   const logger = new AgentLogger('clawdy', 'http://localhost:3001');
 *   logger.log('trade_executed', { token: 'PUNCH', amount: 0.01 });
 */

class AgentLogger {
  constructor(agentId, commandCenterUrl = 'http://localhost:3001') {
    this.agentId = agentId;
    this.url = commandCenterUrl;
  }

  async log(action, details = {}) {
    try {
      const response = await fetch(`${this.url}/api/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: this.agentId,
          action: action,
          details: JSON.stringify(details)
        })
      });

      if (!response.ok) {
        console.error('Failed to log activity:', response.statusText);
      }
    } catch (error) {
      console.error('Logger error:', error);
    }
  }

  async setRule(ruleName, ruleValue) {
    try {
      await fetch(`${this.url}/api/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: this.agentId,
          rule_name: ruleName,
          rule_value: ruleValue
        })
      });
    } catch (error) {
      console.error('Failed to set rule:', error);
    }
  }

  async getOverride() {
    try {
      const response = await fetch(`${this.url}/api/override/${this.agentId}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to check override:', error);
      return null;
    }
  }
}

module.exports = AgentLogger;
