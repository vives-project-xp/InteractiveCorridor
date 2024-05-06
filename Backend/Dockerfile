# Use the official Node.js image as the base image
FROM node:21-alpine3.18
# If you're using M1, M2 Mac, try this: 
# FROM  --platform=linux/amd64 node:16.14.0-alpine

# Set the working directory
WORKDIR /usr/local/Backend

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start"]