# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Production stage
FROM nginx:alpine
# Install wget for health checks
RUN apk add --no-cache wget

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config and entrypoint script
COPY nginx.conf /etc/nginx/nginx.conf.template 
COPY docker-entrypoint.sh /

# Make entrypoint script executable
RUN chmod +x /docker-entrypoint.sh

# Add health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

# Expose port
EXPOSE 80

# Set entrypoint and command
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]