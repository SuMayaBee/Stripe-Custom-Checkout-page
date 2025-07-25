#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Build Docker image with environment variables
docker build \
  --build-arg STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
  --build-arg NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" \
  -t nextjs-stripe-app .