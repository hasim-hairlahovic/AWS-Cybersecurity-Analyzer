#!/bin/bash

# Create necessary directories
mkdir -p frontend/src/{components,pages,lib,api}
mkdir -p backend/app/{api,core,db,models,schemas,services}

# Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

# Copy environment file
cd ..
cp .env.example .env

echo "Setup completed successfully!"
echo "Please update the .env file with your credentials."
echo "To start the application, run: docker-compose up -d" 