# Production Dockerfile for FundRaise Pro Backend API
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY backend/package*.json ./
COPY backend/prisma ./prisma/

RUN npm install

COPY backend/ ./

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 5000

CMD ["node", "dist/index.js"]
