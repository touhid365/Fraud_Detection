#!/bin/bash

# Replit Backend Configuration
# Run this in Replit console to set up everything

echo "🚀 Replit Backend Setup"
echo "======================"
echo ""
echo "Installing dependencies..."
cd backend
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "Next steps:"
echo "1. Add these Secrets (click lock icon on left):"
echo "   MONGODB_URI=your-mongodb-atlas-url"
echo "   JWT_SECRET=your-secret-key"
echo "   NODE_ENV=production"
echo ""
echo "2. Click 'Run' to start server"
echo ""
echo "3. Your app will be live at:"
echo "   https://YOUR-REPLIT-URL.replit.dev/api/health"
echo ""
echo "4. Share that URL with friends!"
