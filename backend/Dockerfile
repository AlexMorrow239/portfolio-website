FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
# Install ALL dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY tsconfig*.json ./
COPY src/ ./src/

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy package files first
COPY package*.json ./
# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]