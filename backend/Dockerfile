FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and TypeScript configs
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy production files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]