# 1. Base build image
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app
COPY . .

# Build the Vite production files
RUN npm run build

# 2. Base production image
FROM node:20

# Set working directory
WORKDIR /app

# Install serve (simple production server)
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist /app/dist

# Expose port 3000 (for serve)
EXPOSE 3000

# Serve built app
CMD ["serve", "-s", "dist", "-l", "3000"]
