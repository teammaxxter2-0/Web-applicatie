# Use the official Node.js image for building
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN yarn run build

# Use a lightweight web server to serve the Vite app
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Vite app to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80
EXPOSE 443 

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
