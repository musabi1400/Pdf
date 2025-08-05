# Build stage
FROM node:16-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source files
COPY public ./public
COPY src ./src

# Build the React app
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
