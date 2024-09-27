# Build the react-vite app
FROM node:18-alpine AS builder

WORKDIR /app

# copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# copy the source code
COPY . .

# build the app
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port the app runs in
EXPOSE 80

# Serve the app
CMD ["nginx", "-g", "daemon off;"]