#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t notes-frontend .

# Run the container
echo "Running container on port 3000..."
docker run -d -p 3000:80 --name notes-app notes-frontend

echo "Notes app is now running at http://localhost:3000" 