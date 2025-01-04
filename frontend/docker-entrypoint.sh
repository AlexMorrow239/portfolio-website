#!/bin/sh
set -e
set -x  # Enable debug mode for all commands

echo "Starting docker-entrypoint.sh..."

# Debug Environment Variable
if [ -z "$RAILWAY_BACKEND_URL" ]; then
    echo "RAILWAY_BACKEND_URL not set, using default value"
    export RAILWAY_BACKEND_URL="http://localhost:3000"
else
    echo "RAILWAY_BACKEND_URL is set to $RAILWAY_BACKEND_URL"
fi

# Substitute variables
echo "Generating nginx config..."
envsubst '$RAILWAY_BACKEND_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Display generated config
echo "Generated nginx.conf:"
cat /etc/nginx/nginx.conf

# Verify config
nginx -t

# Start nginx
echo "Starting Nginx..."
exec "$@"