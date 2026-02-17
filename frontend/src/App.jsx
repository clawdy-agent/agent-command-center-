import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [agents, setAgents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('clawdy');
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState(null);

  // Connect to WebSocket
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
    socket.onopen = () => console.log('WebSocket connected');
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'activity') {
        setActivities(prev => [data.data, ...prev]);
      }
    };
    setWs(socket);
    return () => socket.close();
  }, []);

  // Load initial data
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/agents').then(r => r.json()),
      fetch('http://localhost:3001/api/activities').then(r => r.json()),
      fetch(`http://localhost:3001/api/rules/${selectedAgent}`).then(r => r.json())
    ]).then(([a, act, r]) => {
      setAgents(a.agents || []);
      setActivities(act.activities || []);
      setRules(r.rules || []);
      setLoading(false);
    });
  }, [selectedAgent]);

  const handleOverride = async () => {
    const reason = prompt('Override reason?');
    if (!reason) return;

    const response = await fetch('http://localhost:3001/api/override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id: selectedAgent, action: 'stop', reason })
    });
    const data = await response.json();
    alert(data.message);
  };

  const handleAddRule = async () => {
    const ruleName = prompt('Rule name (e.g., max_trade_size)');
    const ruleValue = prompt('Rule value (e.g., 0.5)');
    if (!ruleName || !ruleValue) return;

    const response = await fetch('http://localhost:3001/api/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id: selectedAgent, rule_name: ruleName, rule_value: ruleValue })
    });
    const data = await response.json();
    alert(data.success ? 'Rule added!' : 'Error');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ Agent Command Center</h1>
        <p>Real-time autonomous agent oversight</p>
      </header>

      <div className="container">
        {/* Agent Selector */}
        <div className="panel agent-selector">
          <h2>Agents</h2>
          {agents.map(agent => (
            <button
              key={agent.id}
              className={`agent-btn ${selectedAgent === agent.id ? 'active' : ''}`}
              onClick={() => setSelectedAgent(agent.id)}
            >
              {agent.name} <span className="status">{agent.status}</span>
            </button>
          ))}
        </div>

        {/* Main Dashboard */}
        <div className="main-content">
          {/* Rules Panel */}
          <div className="panel">
            <h2>Rules & Configuration</h2>
            <div className="rules-list">
              {rules.length === 0 ? (
                <p>No rules set</p>
              ) : (
                rules.map(rule => (
                  <div key={rule.id} className="rule-item">
                    <strong>{rule.rule_name}</strong> = {rule.rule_value}
                  </div>
                ))
              )}
            </div>
            <button onClick={handleAddRule} className="btn-secondary">
              + Add Rule
            </button>
          </div>

          {/* Activity Log */}
          <div className="panel">
            <h2>Activity Log</h2>
            {loading ? (
              <p>Loading...</p>
            ) : activities.length === 0 ? (
              <p>No activity yet</p>
            ) : (
              <div className="activities">
                {activities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <span className="action">{activity.action}</span>
                    <span className="time">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="panel controls">
            <h2>Emergency Controls</h2>
            <button onClick={handleOverride} className="btn-danger">
              🛑 STOP AGENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
