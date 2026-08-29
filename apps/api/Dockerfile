# Multi-stage Dockerfile for NestJS API in Turborepo
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

FROM node:18-alpine AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
# Generate prisma client inside api workspace
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npm run build --workspace=api

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=installer /app .

EXPOSE 3001
ENV NODE_ENV=production
CMD ["npm", "run", "start:prod", "--workspace=api"]
