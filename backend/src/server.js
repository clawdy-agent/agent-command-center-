const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const http = require('http');
const db = require('./database');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.send(JSON.stringify({ type: 'connected', message: 'Connected to Agent Command Center' }));
  
  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

const broadcast = (data) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// API Endpoints

app.get('/api/health', (req, res) => {
  res.json({ status: 'running', agents: 1 });
});

app.get('/api/agents', (req, res) => {
  db.all('SELECT * FROM agents', (err, rows) => {
    res.json({ agents: rows || [] });
  });
});

app.get('/api/activities', (req, res) => {
  db.all('SELECT * FROM activities ORDER BY timestamp DESC LIMIT 100', (err, rows) => {
    res.json({ activities: rows || [] });
  });
});

app.post('/api/activities', (req, res) => {
  const { agent_id, action, details } = req.body;
  db.run(
    'INSERT INTO activities (agent_id, action, details) VALUES (?, ?, ?)',
    [agent_id, action, details],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const activity = { id: this.lastID, agent_id, action, details, timestamp: new Date() };
        broadcast({ type: 'activity', data: activity });
        res.json({ success: true, activity });
      }
    }
  );
});

app.post('/api/override', (req, res) => {
  const { agent_id, action, reason } = req.body;
  
  db.run(
    'INSERT INTO audit_log (agent_id, action, details, result) VALUES (?, ?, ?, ?)',
    [agent_id, 'override', reason, action],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        broadcast({ type: 'override', data: { agent_id, action, reason } });
        res.json({ success: true, message: `Override: ${action} on ${agent_id}` });
      }
    }
  );
});

app.get('/api/rules/:agent_id', (req, res) => {
  const { agent_id } = req.params;
  db.all('SELECT * FROM rules WHERE agent_id = ?', [agent_id], (err, rows) => {
    res.json({ rules: rows || [] });
  });
});

app.post('/api/rules', (req, res) => {
  const { agent_id, rule_name, rule_value } = req.body;
  db.run(
    'INSERT INTO rules (agent_id, rule_name, rule_value) VALUES (?, ?, ?)',
    [agent_id, rule_name, rule_value],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        broadcast({ type: 'rule_updated', data: { agent_id, rule_name, rule_value } });
        res.json({ success: true, id: this.lastID });
      }
    }
  );
});

app.get('/api/audit/:agent_id', (req, res) => {
  const { agent_id } = req.params;
  db.all(
    'SELECT * FROM audit_log WHERE agent_id = ? ORDER BY timestamp DESC LIMIT 50',
    [agent_id],
    (err, rows) => {
      res.json({ audit: rows || [] });
    }
  );
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✓ Agent Command Center API on :${PORT}`);
  console.log(`✓ WebSocket ready for real-time updates`);
});
