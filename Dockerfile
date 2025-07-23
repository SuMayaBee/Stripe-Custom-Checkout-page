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

# Use dev server with port and hostname via environment variables
CMD ["sh", "-c", "echo 'Starting app on port 3000...' && PORT=3000 pnpm run dev -- --hostname 0.0.0.0"]