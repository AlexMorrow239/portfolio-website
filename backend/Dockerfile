FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ docker-cli

WORKDIR /app

# Copy package files and configs first
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY webpack.config.js ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy the entire source code
COPY . .

# Remove postinstall script temporarily to avoid recursive builds
RUN npm pkg delete scripts.postinstall

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Install Docker CLI and required dependencies
RUN apk add --no-cache docker-cli python3 make g++

# Copy production files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Create directory for Docker socket
RUN mkdir -p /var/run

# Set environment and expose port
ENV NODE_ENV=production
ENV DOCKER_HOST=unix:///var/run/docker.sock
EXPOSE 3000

CMD ["node", "dist/main.js"]