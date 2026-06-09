FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite port (5173, not 3000)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]