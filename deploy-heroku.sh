#!/bin/bash

# Fraud Detection - Heroku Deployment Script
# This script automates the entire deployment process to Heroku

set -e

echo "🚀 Fraud Detection - Heroku Deployment"
echo "========================================"

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI is not installed"
    echo "Install from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Login to Heroku
echo "🔐 Logging into Heroku..."
heroku login

# Get app name
read -p "📱 Enter Heroku app name (or press Enter to create new): " APP_NAME

if [ -z "$APP_NAME" ]; then
    echo "Creating new Heroku app..."
    heroku create
    APP_NAME=$(heroku apps:info | grep "=== " | cut -d' ' -f2)
fi

echo "📝 App name: $APP_NAME"

# Add MongoDB Atlas
echo "🗄️  Setting up MongoDB Atlas..."
read -p "Enter MongoDB Atlas URI (or press Enter to skip): " MONGODB_URI

if [ -n "$MONGODB_URI" ]; then
    heroku config:set MONGODB_URI="$MONGODB_URI" --app="$APP_NAME"
else
    echo "⚠️  MongoDB not configured. You'll need to set it manually."
fi

# Set environment variables
echo "🔑 Setting environment variables..."
heroku config:set JWT_SECRET="$(openssl rand -base64 32)" --app="$APP_NAME"
heroku config:set NODE_ENV=production --app="$APP_NAME"

# Create Procfile
echo "📄 Creating Procfile..."
cat > Procfile << 'EOF'
web: cd backend && npm start
worker: cd ml-model && python app.py
EOF

echo "📦 Procfile created"

# Create heroku.yml
echo "⚙️  Creating heroku.yml for multi-service deployment..."
cat > heroku.yml << 'EOF'
build:
  docker:
    web: backend/Dockerfile
    worker: ml-model/Dockerfile
run:
  web: npm start
  worker: python app.py
EOF

echo "🔧 heroku.yml created"

# Add Heroku git remote
echo "📡 Adding Heroku remote..."
heroku git:remote -a "$APP_NAME" || true

# Deploy
echo "🚀 Deploying to Heroku..."
git push heroku main

# Open the app
echo "✅ Deployment complete!"
echo "🌐 Opening your app..."
heroku open --app="$APP_NAME"

echo ""
echo "📊 Application URLs:"
echo "   Frontend: https://${APP_NAME}.herokuapp.com"
echo "   API: https://${APP_NAME}.herokuapp.com/api"
echo ""
echo "📋 Next steps:"
echo "   1. Update your DNS records (if using custom domain)"
echo "   2. Configure MongoDB Atlas IP whitelist"
echo "   3. Set up monitoring: heroku logs --tail"
echo "   4. View app: heroku open --app=${APP_NAME}"
