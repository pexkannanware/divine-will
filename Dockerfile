# Build stage
FROM node:22.22.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage — Next.js standalone output (minimal runtime, no npm needed)
FROM node:22.22.0-alpine AS runner

WORKDIR /app
ARG DEPLOY_REVISION=development
ENV DEPLOY_REVISION=$DEPLOY_REVISION
LABEL org.opencontainers.image.revision=$DEPLOY_REVISION
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
