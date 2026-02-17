FROM node:18-alpine

WORKDIR /app

# Backend
COPY backend/package.json backend/package.json
RUN cd backend && npm install

# Frontend (build)
COPY frontend frontend
RUN cd frontend && npm install && npm run build

# Setup
COPY backend/src backend/src
COPY docs docs

EXPOSE 3001 3000

CMD ["sh", "-c", "cd backend && npm start"]
