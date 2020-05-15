# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR ./DOCKER

# Copy the file from your host to your current location.
COPY ./package.json .

# Run the command inside your image filesystem.
RUN npm install

# Run the specified command within the container.
CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY ../src/index.js .
COPY ../src/config.json .
