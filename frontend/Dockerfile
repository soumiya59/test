FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with optimizations
# --no-audit: skip security audit (faster)
# --progress=false: less verbose output
# --loglevel=error: only show errors
RUN npm install --no-audit --progress=false --loglevel=error

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable for React
ENV REACT_APP_API_URL=/api
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "start"]

