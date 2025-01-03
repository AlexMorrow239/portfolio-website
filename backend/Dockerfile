FROM node:20-alpine AS builder
WORKDIR /app

# First copy everything except node_modules
COPY . .

# Install dependencies
RUN npm ci

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

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]