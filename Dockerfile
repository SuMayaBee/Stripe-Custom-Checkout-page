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

# Use dev server with Render's PORT or default to 3000, disable turbopack
CMD ["sh", "-c", "next dev --port ${PORT:-3000} --hostname 0.0.0.0"]