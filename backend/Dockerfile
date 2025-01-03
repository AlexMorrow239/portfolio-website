FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Generate a fresh package-lock.json
RUN npm install

# Copy source code and config files
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy package files and lock file
COPY package*.json ./
COPY --from=builder /app/package-lock.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main"]