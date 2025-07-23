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

# Use dev server with Render's PORT or default to 3000
CMD ["sh", "-c", "PORT=${PORT:-3000} pnpm run dev -- --hostname 0.0.0.0 --port $PORT"]