# ⚡ Agent Command Center

**Real-time oversight dashboard for autonomous AI agents**

Dashboard for managing, monitoring, and controlling autonomous agents like clawdy. See what they're doing. Stop them if they're acting weird. Change their rules without touching code.

## Why This Exists

Autonomous agents are powerful but risky. You need:
- **Visibility**: What is my agent doing right now?
- **Control**: Can I stop it immediately?
- **Confidence**: Can I adjust its behavior without rewriting code?
- **Proof**: What actually happened? (audit trail)

This is the dashboard for that.

## Features

✅ **Real-time activity log** — See every decision instantly
✅ **Emergency stop button** — Pause/stop agents with one click
✅ **Rule editor** — Adjust agent parameters live (no code changes)
✅ **Audit trail** — Every action logged with reasoning
✅ **Multi-agent support** — Manage multiple agents from one dashboard
✅ **WebSocket streaming** — No refresh needed, updates as they happen
✅ **Docker ready** — Deploy anywhere in minutes

## Quick Start

### Local (Development)

```bash
# Backend (Terminal 1)
cd backend
npm install
npm start

# Frontend (Terminal 2)
cd frontend
npm install
npm start

# Open http://localhost:3000
```

### Docker (Production)

```bash
docker-compose up
# API: http://localhost:3001
# Dashboard: http://localhost:3000
```

## Architecture

```
Agent (clawdy) → API (/api/activities) → Database (SQLite)
                                      ↓
                                  WebSocket
                                      ↓
                                Frontend (React)
                                      ↓
                                    User
```

## API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Status |
| GET | `/api/agents` | List agents |
| GET | `/api/activities` | Recent activity log |
| POST | `/api/activities` | Log new activity |
| GET | `/api/rules/:agent_id` | Get agent rules |
| POST | `/api/rules` | Add/update rule |
| POST | `/api/override` | Emergency stop command |
| GET | `/api/audit/:agent_id` | Audit trail |

## WebSocket Events

```javascript
// Real-time updates
ws.onmessage = (e) => {
  const { type, data } = JSON.parse(e.data);
  
  if (type === 'activity') console.log('New activity:', data);
  if (type === 'override') console.log('Override:', data);
  if (type === 'rule_updated') console.log('Rule changed:', data);
};
```

## Use Cases

### Scenario: Agent Making Bad Trades

1. **See it happening** — Activity log shows the trade in real-time
2. **Understand why** — Audit trail shows the reasoning
3. **Stop it** — Hit the emergency button
4. **Fix the rule** — Adjust `max_loss_per_trade` parameter
5. **Resume** — Agent wakes up with new constraints

### Scenario: Audit/Compliance

- Full audit trail of every decision
- Who authorized what, when
- Why each decision was made
- Complete override history

## Roadmap

### Phase 1 ✅ (Current)
- [x] Dashboard UI
- [x] Real-time activity log
- [x] Rule editor
- [x] Emergency stop button
- [x] Audit logging
- [x] Docker support

### Phase 2 (Next Week)
- [ ] Connect to live trading
- [ ] Solana swap integration
- [ ] Drift detection
- [ ] Analytics dashboard
- [ ] Performance metrics

### Phase 3 (Week 3)
- [ ] Multi-agent orchestration
- [ ] Advanced rules engine
- [ ] Machine learning insights
- [ ] Public API
- [ ] Webhook support

## Integration with clawdy

In `TRADING_SOUL.md`:

```javascript
// Every trade logged to dashboard
await commandCenter.logTrade({
  agent: 'clawdy',
  token: 'PUNCH',
  action: 'buy',
  amount: 0.01,
  reason: 'Good consolidation + volume increasing'
});

// Check if override is active before trading
if (await commandCenter.isOverrideActive('clawdy')) {
  console.log('Agent stopped by user');
  return;
}

// Get current rules
const rules = await commandCenter.getRules('clawdy');
// rules = { max_position_size: '0.5', max_loss: '50%', ... }
```

## Security

- [ ] Authentication (JWT tokens)
- [ ] Rate limiting
- [ ] Encrypted WebSocket
- [ ] Signed audit logs
- [ ] Access control (who can override)

## Contributing

This is a collaborative project between clawdy and Simone.

## License

MIT

---

**Built by:** clawdy-agent + Simone

**Status:** Active Development

**Next checkpoint:** Phase 2 integration + live trading
