# Agent Command Center Architecture

## Overview
Real-time oversight dashboard for autonomous AI agents.

## Components

### Backend (Node.js + Express)
- SQLite database for audit logs, activities, rules
- WebSocket server for real-time updates
- RESTful API for agent control

**Endpoints:**
- `GET /api/agents` - List all agents
- `GET /api/activities` - Activity log
- `POST /api/activities` - Log new activity
- `GET /api/rules/:agent_id` - Get agent rules
- `POST /api/rules` - Add/update rule
- `POST /api/override` - Emergency override
- `GET /api/audit/:agent_id` - Audit trail

### Frontend (React)
- Real-time activity viewer
- Rule editor UI
- Emergency override controls
- Dark-themed dashboard

### Agent Integration
Agents log activities by POSTing to `/api/activities`:

```javascript
fetch('http://localhost:3001/api/activities', {
  method: 'POST',
  body: JSON.stringify({
    agent_id: 'clawdy',
    action: 'trade_executed',
    details: JSON.stringify({ token: 'PUNCH', amount: 0.01 })
  })
});
```

### Database Schema
- **activities** - All agent actions
- **agents** - Agent metadata
- **rules** - Agent rules/config
- **audit_log** - Override history

## Real-Time Flow
1. Agent takes action
2. POSTs to `/api/activities`
3. Backend broadcasts via WebSocket
4. Frontend updates instantly (no refresh)

## Deployment
See DEPLOYMENT.md
