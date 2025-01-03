FROM node:20-alpine AS builder
WORKDIR /app

# Copy all configuration files first
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install ALL dependencies
RUN npm install

# Copy source code
COPY src/ ./src/

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy package files and built files
COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/nest-cli.json ./

# Install only production dependencies
RUN npm ci --omit=dev

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main"]