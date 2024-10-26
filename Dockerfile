# Use ARM-compatible base image
FROM arm32v7/node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define build arguments
ARG NODE_ENV
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_NAME

# Set environment variables from build arguments
ENV NODE_ENV=$NODE_ENV
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_NAME=$DATABASE_NAME

# Start the application
CMD ["yarn", "run", "start:dev"]
