#!/bin/sh
set -e

# Define default value for RAILWAY_BACKEND_URL if not set
: ${RAILWAY_BACKEND_URL:=http://localhost:3000}

# Replace environment variables in nginx config
envsubst '$RAILWAY_BACKEND_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec "$@"