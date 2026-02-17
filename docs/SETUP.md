# Agent Command Center - Setup Guide

## Prerequisites
- Node.js 16+
- npm or yarn

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
# WebSocket: ws://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

## API Endpoints

- `GET /api/health` - Status check
- `GET /api/agents` - List all agents
- `GET /api/activities` - Recent activities
- `POST /api/activities` - Log new activity
- `POST /api/override` - Emergency override command
- `GET /api/rules/:agent_id` - Get agent rules
- `POST /api/rules` - Add new rule
- `GET /api/audit/:agent_id` - Audit log

## WebSocket

Connect to `ws://localhost:3001` for real-time updates on:
- New activities
- Rule changes
- Override commands

## Features

✓ Real-time activity log
✓ Agent selector
✓ Rule editor
✓ Emergency stop button
✓ Audit trail
✓ WebSocket streaming

## Next Steps

- [ ] Connect to Solana trading logic
- [ ] Add drift detection
- [ ] Build analytics dashboard
- [ ] Multi-agent management
