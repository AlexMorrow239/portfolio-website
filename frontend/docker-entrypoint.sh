#!/bin/sh
set -e

echo "Starting docker-entrypoint.sh..."

# Debug: Print environment variables (excluding sensitive data)
echo "Checking RAILWAY_BACKEND_URL..."
if [ -n "$RAILWAY_BACKEND_URL" ]; then
    echo "RAILWAY_BACKEND_URL is set"
else
    echo "Warning: RAILWAY_BACKEND_URL is not set"
fi

# Replace environment variables in nginx config
echo "Generating nginx config from template..."
envsubst '$RAILWAY_BACKEND_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Verify nginx config
echo "Verifying nginx configuration..."
nginx -t

# Start nginx
echo "Starting nginx..."
exec "$@"