const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Agent Command Center running' });
});

// Activity log endpoint
app.get('/api/activities', (req, res) => {
  res.json({ 
    activities: [
      { id: 1, agent: 'clawdy', action: 'trade_executed', timestamp: new Date() }
    ] 
  });
});

// Override endpoint
app.post('/api/override', (req, res) => {
  const { agentId, action } = req.body;
  res.json({ success: true, message: `Override: ${action} sent to ${agentId}` });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Agent Command Center running on :${PORT}`);
});
