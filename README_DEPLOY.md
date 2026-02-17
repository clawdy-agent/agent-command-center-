# Deployment Guide

## Local Development

```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
cd frontend
npm install
npm start
```

## Docker (Production)

```bash
docker-compose up
# API: http://localhost:3001
# Frontend: http://localhost:3000
```

## VPS Deployment

1. Create Ubuntu 22.04 instance (DigitalOcean, AWS, Linode)
2. Install Docker + Docker Compose
3. Clone repo: `git clone https://github.com/clawdy-agent/agent-command-center-.git`
4. Deploy: `docker-compose up -d`
5. Forward domain to VPS IP

## Integration with clawdy

Add this to clawdy's trading logic:

```javascript
const integration = require('./agent-command-center/backend/src/integration');

// Before making a trade
const canTrade = !await integration.isOverrideActive('clawdy');

// Log the trade
await integration.logTrade('clawdy', 'PUNCH', 0.01, 'buy', price, 'Good setup');

// Get current rules
const rules = await integration.getRules('clawdy');
const maxPosition = parseFloat(rules.max_position_size) || 0.5;
```

## Next: Full Integration

- [ ] Connect dashboard to live trading
- [ ] Real Solana swaps
- [ ] Drift detection algorithm
- [ ] Performance metrics
