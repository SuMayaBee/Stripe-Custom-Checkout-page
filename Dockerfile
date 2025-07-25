FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable pnpm && pnpm install

# Copy source code
COPY . .

# Accept build arguments for environment variables
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Set environment variables from build args
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Build the application with environment variables
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]