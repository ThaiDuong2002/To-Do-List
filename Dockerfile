# Use the official Node.js image
FROM node:22.14.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package files for dependency installation
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy only the build files to the container
COPY dist ./dist

# Include the .env file if needed (optional)
COPY .env .env

# Specify the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
