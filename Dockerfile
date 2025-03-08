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

# Expose the port that Docusaurus serve uses
EXPOSE 3000

# Use Docusaurus serve command
CMD ["pnpm", "run", "serve", "--", "--port", "3000", "--host", "0.0.0.0"] 