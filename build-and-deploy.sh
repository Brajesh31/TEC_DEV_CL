#!/bin/bash

# Build and Deploy Script for Tech Dev Club
# This script builds the React frontend and Spring Boot backend into a single deployable JAR

echo "🚀 Starting Tech Dev Club build process..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf backend/src/main/resources/static/*
rm -rf backend/target/

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build React frontend
echo "⚛️ Building React frontend..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: Frontend build failed"
    exit 1
fi

# Copy frontend build to Spring Boot static resources
echo "📁 Copying frontend build to Spring Boot..."
mkdir -p backend/src/main/resources/static
cp -r dist/* backend/src/main/resources/static/

# Build Spring Boot application
echo "☕ Building Spring Boot application..."
cd backend
mvn clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📦 Deployable JAR: backend/target/backend-0.0.1-SNAPSHOT.jar"
    echo ""
    echo "🚀 To run the application:"
    echo "   java -jar backend/target/backend-0.0.1-SNAPSHOT.jar"
    echo ""
    echo "🌐 The application will be available at: http://localhost:8080"
    echo "   - Frontend: http://localhost:8080/"
    echo "   - API: http://localhost:8080/api/"
    echo "   - Health: http://localhost:8080/api/health"
else
    echo "❌ Error: Spring Boot build failed"
    exit 1
fi