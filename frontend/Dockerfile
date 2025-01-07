# Build stage
FROM node:20-alpine AS builder
# Add build argument for environment
ARG BUILD_ENV=production

# Set working directory
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
# Use ci for more reliable builds
RUN npm ci

# Copy source files
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine-slim
# Use slim version for smaller image

# Add curl for healthchecks (smaller than wget)
RUN apk add --no-cache curl

# Copy only the built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config and entrypoint script
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /

# Configure permissions
RUN chmod +x /docker-entrypoint.sh && \
    # Create nginx user if it doesn't exist
    adduser -D -H -u 101 -s /sbin/nologin nginx || true && \
    # Set proper permissions for nginx directories
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    # Create nginx config directory with proper permissions
    mkdir -p /etc/nginx && \
    chown -R nginx:nginx /etc/nginx && \
    chmod -R 755 /etc/nginx

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:80/health || exit 1

# Expose port
EXPOSE 80

# Switch to non-root user
USER nginx

# Set entrypoint and command
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]