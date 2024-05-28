# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /Users/sunil/docuchat/server/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define environment variables
ENV PG_HOST=postgres
ENV PG_PORT=5432
ENV PG_USERNAME=postgres
ENV PG_PASSWORD=mysecretpassword
ENV PG_DATABASE=postgres
ENV DB_DIALECT=postgres
ENV DB_LOGGING=false

# Set the command to run the app
CMD ["npm", "start"]
