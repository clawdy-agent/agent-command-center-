FROM node:18-alpine

WORKDIR /app

# Backend
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production

# Frontend build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY backend ./backend
COPY frontend ./frontend

RUN cd frontend && npm run build

EXPOSE 3001 3000

CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm start"]
