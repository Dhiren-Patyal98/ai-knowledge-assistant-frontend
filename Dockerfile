# =========================
# Stage 1: Build React app
# =========================
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first for better Docker layer caching
COPY package*.json ./

RUN npm ci

# Copy application source
COPY . .

# Build Vite application
RUN npm run build


# =========================
# Stage 2: Serve with Caddy
# =========================
FROM caddy:2-alpine

WORKDIR /app

# Caddy configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy React production build
COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]