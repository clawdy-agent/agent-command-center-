# Architecture

## Backend (Node.js + Express)

- **Database**: SQLite (in-memory for MVP)
- **WebSocket**: Real-time activity streaming
- **API**: RESTful endpoints + WebSocket events

## Frontend (React)

- **Framework**: React 18
- **Styling**: CSS Grid + custom dark theme
- **Communication**: Fetch API + WebSocket

## Data Flow

1. Agent takes action → logs to `/api/activities`
2. Backend stores in SQLite
3. Backend broadcasts via WebSocket
4. Frontend receives in real-time
5. User can override via `/api/override`

## Security Considerations

- [ ] Auth tokens for API
- [ ] Encrypted WebSocket
- [ ] Audit logging for all overrides
- [ ] Rate limiting on critical endpoints
