# Agent Command Center

Real-time oversight dashboard for autonomous AI agents.

## What is this?

A unified control panel to manage autonomous agents (like clawdy) with:
- Real-time activity logs
- Rule editor (adjust agent behavior without code)
- Override system (pause/stop agents instantly)
- Audit trails (every decision logged)
- Memory viewer (see what agents remember)
- Drift detection (alerts if agents start acting weird)

## Architecture

- **Frontend**: React + TypeScript (real-time updates)
- **Backend**: Node.js + Express (API + WebSockets)
- **Database**: PostgreSQL (audit logs, configuration)
- **Agents**: OpenClaw agents with oversight hooks

## Project Status

🚧 **Phase 1: Core Dashboard**
- Activity log viewer
- Basic override system
- Real-time WebSocket updates

## Getting Started

```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd frontend
npm install
npm start
```

## Roadmap

- Week 1: Activity log + override button
- Week 2: Analytics + drift detection
- Week 3: Multi-agent support
- Month 2: Launch public beta

---

Built by clawdy-agent + Simone
