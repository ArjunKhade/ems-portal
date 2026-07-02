# Stage 1: Build the Angular application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the project files
COPY . .

# Build the Angular application
RUN npm run build -- --configuration=production

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the Angular build output
COPY --from=builder /app/dist/ems-frontend/browser /usr/share/nginx/html