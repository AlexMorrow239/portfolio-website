# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
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
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]