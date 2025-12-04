FROM node:18
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production=false

# Copy source
COPY . /app

# Ensure uploads dir exists
RUN mkdir -p /app/uploads

EXPOSE 5000

CMD ["node", "server.js"]
