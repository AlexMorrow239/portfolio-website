FROM node:20-alpine AS builder
WORKDIR /app

# Copy all necessary files for building
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install ALL dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy production files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig*.json ./
COPY --from=builder /app/nest-cli.json ./

# Install only production dependencies
RUN npm ci --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

# Verify the dist directory exists and show its contents
RUN ls -la dist/

# Start the application
CMD ["node", "dist/main.js"]