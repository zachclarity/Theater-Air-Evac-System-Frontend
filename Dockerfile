# This sets a build-time variable CI_REGISTRY, allowing the registry to be specified when building the image
ARG CI_REGISTRY

# We start from a base image that contains Node.js v22, pulled from the MDaaS managed images
FROM ${CI_REGISTRY}/mdaas/active/container-images/base-node:22

# Set environment variables:
# NODE_ENV sets the Node.js environment to 'production', optimizing the app for deployment
ENV NODE_ENV=production
# REACT_APP_DEPLOYMENT tells the React app that it's running inside a Docker container
ENV REACT_APP_DEPLOYMENT=docker

#This need to be in GITLAB Pipeline Vault Secrets
ENV TAES_KEY=change_to_value

# Set the working directory inside the Docker container where all the app files will reside
WORKDIR /usr/src/app

# Copy all files from your project directory to the working directory in the container (minus what's in .dockerignore)
COPY . .

# Run commands to set up the application:
# 1. `npm ci --omit=dev`: Installs dependencies based on package-lock.json, excluding development dependencies.
# 2. `npm run build`: Builds the production version of the React app.
# 3. `npm install -g serve`: Installs 'serve' globally to serve the built app.
# 4. `npm cache clean --force`: Cleans up npm cache to reduce image size.
# 5. `adduser --disabled-password --gecos "" wat-user`: Creates a new user "wat-user" without a password.
# 6. `chown -R wat-user /usr/src/app`: Changes ownership of the app directory to "wat-user".

RUN npm install -g serve

#RUN npm ci --omit=dev \
#    && npm run build \
#    && npm install -g serve \
#    && npm cache clean --force \
#    && adduser --disabled-password --gecos "" wat-user \
#    && chown -R wat-user /usr/src/app

RUN ls -lR
RUN adduser --disabled-password --gecos "" wat-user
RUN npm install
RUN npm run build
RUN chown -R wat-user /usr/src/app
RUN npm cache clean --force



# Install curl, a tool to test if the app is running by making HTTP requests
RUN apk add --no-cache curl --update

# HEALTHCHECK command periodically checks if the app is up and running by sending a request to the app's local endpoint
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 2

# Switch to the newly created user "wat-user" to avoid running the app as root (for security reasons)
USER wat-user

# Expose port 3000 to allow access to the app from outside the container
EXPOSE 3000

# Start the application using 'serve', which will serve the built React app on port 3000
CMD ["serve", "-s", "build"]
