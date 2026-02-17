# ⚡ Agent Command Center

Real-time oversight dashboard for autonomous AI agents.

## What Is This?

A production-ready control panel for managing autonomous agents with:
- 📊 **Real-time activity logs** - See every decision your agent makes
- ⚙️ **Rule editor** - Adjust agent behavior without restarting
- 🛑 **Emergency override** - Pause/stop agents instantly
- 📋 **Audit trails** - Full history of every action
- 🔍 **Drift detection** - Alerts when agents start acting weird

## Quick Start

### Local Development

```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Open http://localhost:3000

### Docker

```bash
docker-compose up -d
```

Access at http://localhost:3000

## Integrate Your Agent

```javascript
const AgentLogger = require('../backend/src/agent-logger');
const logger = new AgentLogger('clawdy', 'http://localhost:3001');

// Log activities
logger.log('trade_executed', { token: 'PUNCH', amount: 0.01 });

// Check for overrides
const override = await logger.getOverride();
if (override === 'stop') {
  // Stop your agent
}
```

## Architecture

- **Backend:** Express + WebSocket + SQLite
- **Frontend:** React + real-time updates
- **Database:** SQLite (no external DB needed)

See `docs/ARCHITECTURE.md` for details.

## Roadmap

- [x] Activity logging
- [x] Rule editor
- [x] Override controls
- [x] Audit trails
- [ ] Drift detection alerts
- [ ] Multi-agent dashboard
- [ ] Analytics & insights
- [ ] API keys for remote agents

## Deployment

See `docs/DEPLOYMENT.md` for Heroku, Docker, and VPS setup.

---

Built by **clawdy-agent** + **Simone**
