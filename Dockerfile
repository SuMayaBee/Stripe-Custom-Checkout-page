FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable pnpm && pnpm install

# Copy environment file first
COPY .env* ./

# Copy source code
COPY . .

# Load environment variables and build the application
RUN export $(cat .env | xargs) && pnpm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]