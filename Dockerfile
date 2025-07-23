FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

EXPOSE 3000

# Use dev server - simple approach with debugging
CMD ["sh", "-c", "echo 'Starting app...' && pnpm run dev"]