# Quick Deployment Guides

## 🚀 Option 1: Heroku (5 minutes)

```bash
# 1. Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Run deployment script
chmod +x deploy-heroku.sh
./deploy-heroku.sh

# 3. Follow prompts
# 4. Done! Your app is live
```

**Cost:** Free tier or $7+/month
**Difficulty:** ⭐ (Easiest)
**Best for:** Quick deployments, prototyping

---

## 🖥️ Option 2: AWS EC2 (15 minutes)

```bash
# 1. Create EC2 instance
# - AMI: Amazon Linux 2
# - Instance type: t3.medium or larger
# - Security group: Allow ports 80, 443, 22, 3000, 5000, 5001

# 2. SSH into instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 3. Clone and run deployment
git clone https://github.com/touhid365/Fraud_Detection.git
cd Fraud_Detection
chmod +x deploy-aws.sh
./deploy-aws.sh

# 4. Update .env with your configuration
nano .env

# 5. Restart containers
docker-compose -f docker-compose.prod.yml restart
```

**Cost:** $10-30/month
**Difficulty:** ⭐⭐ (Easy)
**Best for:** Production, full control

---

## 🐳 Option 3: Local Docker (2 minutes)

```bash
# 1. Make sure Docker is installed and running

# 2. Run production compose
docker-compose -f docker-compose.prod.yml up -d

# 3. Access your app
# Frontend: http://localhost:3000
# API: http://localhost:5000
# ML: http://localhost:5001
```

**Cost:** Free (on your machine)
**Difficulty:** ⭐ (Easiest)
**Best for:** Development, testing

---

## ☸️ Option 4: Kubernetes (30 minutes)

```bash
# 1. Have kubectl configured for your cluster

# 2. Create namespace and deploy
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/ml-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

# 3. Check status
kubectl get pods -n fraud-detection

# 4. Get your service URL
kubectl get svc -n fraud-detection
```

**Cost:** $20-100+/month
**Difficulty:** ⭐⭐⭐⭐ (Advanced)
**Best for:** Large scale, high availability

---

## 🌊 Option 5: DigitalOcean App Platform (10 minutes)

```bash
# 1. Sign up at https://www.digitalocean.com

# 2. Create App
# - Connect GitHub repo
# - Select main branch
# - Auto-deploy on push

# 3. Configure build settings
# - Dockerfile: backend/Dockerfile
# - Port: 5000

# 4. Add MongoDB
# - DigitalOcean Managed Database
# - Or use MongoDB Atlas

# 5. Deploy!
```

**Cost:** $12+/month
**Difficulty:** ⭐⭐ (Easy)
**Best for:** Simple deployment, GitHub integration

---

## 🐋 Option 6: Docker Hub + Any Server

```bash
# 1. Push to Docker Hub
docker login
docker build -t username/fraud-detection-backend ./backend
docker push username/fraud-detection-backend
# Repeat for frontend and ml-model

# 2. On your server, run docker-compose.prod.yml
# Update image names in docker-compose.prod.yml

docker-compose -f docker-compose.prod.yml up -d
```

**Cost:** Depends on server
**Difficulty:** ⭐⭐⭐ (Medium)
**Best for:** Maximum flexibility

---

## Comparison Table

| Platform | Cost | Ease | Scalability | Setup Time |
|----------|------|------|-------------|------------|
| Heroku | $7+ | ⭐ | Medium | 5 min |
| AWS EC2 | $10+ | ⭐⭐ | High | 15 min |
| Local Docker | Free | ⭐ | Low | 2 min |
| Kubernetes | $20+ | ⭐⭐⭐⭐ | Very High | 30 min |
| DigitalOcean | $12+ | ⭐⭐ | Medium | 10 min |
| Docker Hub | Varies | ⭐⭐⭐ | High | 20 min |

---

## Post-Deployment Steps

✅ Set up SSL certificate
✅ Configure custom domain
✅ Set up monitoring/alerts
✅ Configure backups
✅ Set up CI/CD pipeline
✅ Create admin user
✅ Test all endpoints
✅ Set up logging

---

## Environment Variables Needed

```bash
# MongoDB
MONGODB_URI=mongodb://admin:password@mongodb:27017/fraud-detection

# JWT
JWT_SECRET=generate-random-key

# Environment
NODE_ENV=production

# ML Model
ML_MODEL_URL=http://ml-model:5001

# Frontend
REACT_APP_API_URL=https://your-domain.com
```

---

## Health Check URLs

```bash
GET http://your-domain:3000         # Frontend
GET http://your-domain:5000/api/health  # Backend
GET http://your-domain:5001/health  # ML Model
```

---

## Getting Help

- Check logs: `docker logs container-name`
- Heroku support: `heroku logs --tail`
- AWS support: AWS Console > CloudWatch
- Kubernetes: `kubectl describe pod <pod-name>`
- GitHub Issues: Create an issue with logs

🎉 **Your deployment is live!**
