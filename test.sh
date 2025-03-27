#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for Docker
if ! command_exists docker; then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check for Docker Compose
if ! command_exists docker-compose; then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file with default values..."
    cp .env.example .env
    echo "Please update the .env file with your actual credentials."
    exit 1
fi

# Function to check if a service is healthy
check_service_health() {
    local service=$1
    local max_attempts=30
    local attempt=1

    echo "Waiting for $service to be healthy..."
    while [ $attempt -le $max_attempts ]; do
        if docker-compose ps $service | grep -q "healthy"; then
            echo "$service is healthy!"
            return 0
        fi
        echo "Attempt $attempt/$max_attempts: Waiting for $service..."
        sleep 2
        attempt=$((attempt + 1))
    done
    echo "$service failed to become healthy"
    return 1
}

# Stop any running containers
echo "Stopping any running containers..."
docker-compose down

# Build and start the services
echo "Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
check_service_health "db" || exit 1
check_service_health "backend" || exit 1
check_service_health "frontend" || exit 1

# Run backend tests
echo "Running backend tests..."
docker-compose exec backend pytest

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "All tests passed successfully!"
    echo "Application is running at:"
    echo "Frontend: http://localhost:3000"
    echo "Backend API: http://localhost:8000"
    echo "API Documentation: http://localhost:8000/docs"
else
    echo "Tests failed. Please check the logs for more details."
    docker-compose logs backend
    exit 1
fi 