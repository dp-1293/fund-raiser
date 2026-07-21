# Multi-stage Dockerfile for FundRaise Pro Fullstack Application
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

# Build Backend
COPY backend/package*.json ./backend/
COPY backend/prisma/ ./backend/prisma/
RUN cd backend && npm install && npx prisma generate
COPY backend/ ./backend/
RUN cd backend && npm run build

# Build Frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Runner Stage
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

# Copy built backend code and node_modules
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/prisma ./prisma

# Copy built frontend static files
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 5000

CMD ["node", "dist/index.js"]
