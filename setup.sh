#!/bin/bash
# ── Student Record System Setup Script for Linux/macOS ──

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  Student Record Management System - Setup Script      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Change to backend directory
cd backend

# Check if Node.js is installed
echo "Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed! Please install Node.js first."
    echo "  Download from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "✗ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed successfully"

# Display next steps
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║  Setup Complete!                                      ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo ""
echo "1. Make sure you're in the 'backend' directory:"
echo "   cd backend"
echo ""
echo "2. Start the server:"
echo "   npm start          (for production)"
echo "   npm run dev        (for development with auto-reload)"
echo ""
echo "3. Open your browser and navigate to:"
echo "   http://localhost:5000"
echo ""
echo "4. That's it! Start managing student records."
echo ""
echo "✓ The app comes pre-seeded with sample data."
echo ""
