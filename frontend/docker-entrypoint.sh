#!/bin/sh
set -e

if [ -z "$RAILWAY_BACKEND_URL" ]; then
    export RAILWAY_BACKEND_URL="http://localhost:3000"
fi

# Substitute variables
envsubst '$RAILWAY_BACKEND_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Verify config
nginx -t

# Start nginx
exec "$@"