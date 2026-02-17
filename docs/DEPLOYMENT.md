# Deployment Guide

## Local Development

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

Access: http://localhost:3000

## Docker Deployment

```bash
docker-compose up -d
```

Access: http://localhost:3000
API: http://localhost:3001

## Heroku Deployment

```bash
heroku login
heroku create your-app-name
git push heroku main
heroku open
```

## Environment Variables
- `NODE_ENV` - production/development
- `PORT` - API port (default 3001)

## Database
- SQLite (file-based, no external DB needed)
- Schema auto-initializes on first run
