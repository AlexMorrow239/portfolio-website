# Use slim image for smaller size
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create scripts directory and copy Python package files
COPY scripts/ /app/scripts/

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Ensure scripts directory is a Python package
RUN touch /app/scripts/__init__.py

# Set up script permissions
RUN chmod +x /app/scripts/entrypoint.py && \
    chmod -R 755 /app/scripts

# Run as non-root user for security
RUN useradd -m -r solver && \
    chown -R solver:solver /app
USER solver

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD python -c "import sys; sys.exit(0)"

ENTRYPOINT ["python", "-m", "scripts.entrypoint"]