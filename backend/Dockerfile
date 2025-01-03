FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
# Install ALL dependencies for building
RUN npm ci

# Copy source code and config files
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies with more verbose output
RUN npm ci --omit=dev --no-audit --no-fund \
    && npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy necessary config files
COPY --from=builder /app/tsconfig*.json ./

# Set NODE_ENV
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "dist/main"]