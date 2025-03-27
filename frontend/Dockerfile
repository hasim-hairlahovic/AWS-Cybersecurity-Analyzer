FROM node:18-alpine

WORKDIR /app

# Install wget for health checks
RUN apk add --no-cache wget

# Copy package files
COPY package*.json ./

# Install dependencies including TypeScript types
RUN npm install && \
    npm install --save-dev @types/node @types/react @types/react-dom @types/axios

# Copy source code
COPY . .

# Set environment for development
ENV NODE_ENV=development
ENV REACT_APP_API_URL=http://localhost:8000/api/v1
ENV WDS_SOCKET_PORT=0

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"] 