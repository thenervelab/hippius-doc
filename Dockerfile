FROM node:20-alpine

WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Create a more robust startup script with error handling
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'set -e' >> /app/start.sh && \
    echo 'cd /app' >> /app/start.sh && \
    echo 'echo "Starting Docusaurus server on port 3000..."' >> /app/start.sh && \
    echo 'ls -la ./node_modules/.bin/' >> /app/start.sh && \
    echo 'exec ./node_modules/.bin/docusaurus serve --port 3000 --host 0.0.0.0' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expose the port that Docusaurus serve uses
EXPOSE 3000

# Use the startup script
CMD ["/app/start.sh"] 