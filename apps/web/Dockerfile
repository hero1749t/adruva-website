# Multi-stage Dockerfile for Next.js web app in Turborepo
FROM node:18-alpine AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

FROM node:18-alpine AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Environment variables needed at build time for Next.js
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN npm run build --workspace=web

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=installer /app .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start", "--workspace=web"]
