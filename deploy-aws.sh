#!/bin/bash

# Fraud Detection - AWS EC2 Deployment Script
# Automatically sets up an EC2 instance with Docker and your application

set -e

echo "🚀 Fraud Detection - AWS EC2 Deployment"
echo "========================================"

# Update system
sudo yum update -y
sudo yum install -y git curl wget

# Install Docker
echo "🐳 Installing Docker..."
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
echo "📦 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Node.js and npm (for backend dependencies)
echo "📝 Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Python (for ML model)
echo "🐍 Installing Python..."
sudo yum install -y python3 python3-pip

# Clone repository
echo "📥 Cloning repository..."
cd /home/ec2-user
sudo git clone https://github.com/touhid365/Fraud_Detection.git
cd Fraud_Detection
sudo chown -R ec2-user:ec2-user .

# Create .env file
echo "🔑 Setting up environment variables..."
cat > .env << 'EOF'
MONGODB_URI=mongodb://admin:password@mongodb:27017/fraud-detection
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
PORT=5000
ML_MODEL_URL=http://localhost:5001
REACT_APP_API_URL=http://your-domain.com
DOCKER_USERNAME=your-docker-username
EOF

echo "✏️  Edit .env file with your configuration"
echo "   nano .env"

# Create directories for data persistence
echo "📁 Creating data directories..."
sudo mkdir -p /data/mongodb
sudo mkdir -p /data/logs
sudo chown -R 999:999 /data/mongodb  # MongoDB user ID

# Start Docker Compose
echo "🚀 Starting Docker Compose..."
sudo docker-compose -f docker-compose.prod.yml up -d

# Check status
echo "🔍 Checking container status..."
sleep 10
sudo docker-compose ps

# Setup Nginx (Optional)
echo "🔧 Setting up Nginx..."
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📊 Application URLs:"
echo "   Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "   Backend API: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5000"
echo "   ML Model: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5001"
echo ""
echo "📋 Next steps:"
echo "   1. SSH into instance and edit .env file"
echo "   2. Set up SSL certificate (certbot with Nginx)"
echo "   3. Configure DNS records"
echo "   4. Monitor logs: docker-compose logs -f"
echo ""
echo "🛡️  Security tips:"
echo "   1. Use Security Groups to limit access"
echo "   2. Enable 2FA on AWS account"
echo "   3. Use IAM roles for EC2 access"
echo "   4. Keep Docker images updated"
