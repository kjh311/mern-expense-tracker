# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

RUN echo "Listing contents before copy:" && ls -al

# Copy package.json and package-lock.json
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY server/. .

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["node", "server/index.js"]
