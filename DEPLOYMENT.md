# Fraud Detection - Deployment Guide

## Overview

This guide provides comprehensive deployment instructions for the Fraud Detection system across different platforms.

## Deployment Options

### 1. **Local Docker Deployment** (Development)
```bash
docker-compose up -d
```

### 2. **Heroku** (Easy, Cloud-hosted)
```bash
./deploy-heroku.sh
```

### 3. **AWS EC2** (Full Control, Scalable)
```bash
./deploy-aws.sh
```

### 4. **Kubernetes** (Enterprise, Auto-scaling)
```bash
kubectl apply -f k8s/
```

### 5. **DigitalOcean** (Simple VPS)
Use docker-compose on a Droplet

### 6. **Docker Hub Registry**
Push to Docker Hub and deploy anywhere

---

## Prerequisites

### General
- Git
- Docker & Docker Compose (for Docker deployments)
- 2GB RAM minimum
- 10GB disk space

### Heroku
- Heroku CLI
- Heroku account

### AWS EC2
- AWS account
- EC2 key pair
- Security group configured

### Kubernetes
- kubectl
- Kubernetes cluster (EKS, GKE, or self-managed)
- Helm (optional)

---

## Environment Variables

### Required
```bash
MONGODB_URI=mongodb://user:pass@host:27017/db
JWT_SECRET=your-secret-key
NODE_ENV=production
```

### Optional
```bash
ML_MODEL_URL=http://ml-model:5001
REACT_APP_API_URL=https://api.example.com
DOCKER_USERNAME=your-docker-username
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d your-domain.com

# Update Nginx config
sudo nano /etc/nginx/conf.d/default.conf
```

### Self-signed (Testing only)
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/key.pem \
  -out /etc/nginx/ssl/cert.pem
```

---

## Health Checks

After deployment, verify:

```bash
# Frontend
curl http://your-domain:3000

# Backend API
curl http://your-domain:5000/api/health

# ML Model
curl http://your-domain:5001/health

# MongoDB
mongo mongodb://admin:password@localhost:27017/fraud-detection
```

---

## Monitoring

### Docker Logs
```bash
docker-compose logs -f backend
```

### Kubernetes Logs
```bash
kubectl logs -f deployment/backend -n fraud-detection
```

### Docker Stats
```bash
docker stats
```

---

## Backup & Recovery

### Backup MongoDB
```bash
docker exec fraud_detection_mongodb mongodump --uri="mongodb://admin:password@localhost:27017/fraud-detection" --out=/backup
```

### Restore MongoDB
```bash
docker exec fraud_detection_mongodb mongorestore --uri="mongodb://admin:password@localhost:27017" /backup
```

---

## Scaling

### Docker Compose (increase replicas)
```bash
docker-compose up -d --scale backend=3
```

### Kubernetes (auto-scaling configured)
HPA will automatically scale based on CPU usage

---

## Troubleshooting

### Containers not starting
```bash
docker-compose logs
docker-compose ps
```

### Database connection errors
- Check MONGODB_URI
- Verify MongoDB container is running
- Check network connectivity

### API not responding
- Check backend logs
- Verify port mappings
- Check security groups/firewall

### High CPU usage
- Scale up deployment
- Optimize queries
- Check for infinite loops

---

## Security Best Practices

✅ Always use HTTPS in production
✅ Keep Docker images updated
✅ Use strong passwords for MongoDB
✅ Implement rate limiting
✅ Use environment variables for secrets
✅ Enable security headers
✅ Regular backups
✅ Monitor logs for anomalies

---

## Support

For issues:
1. Check logs
2. Review .env configuration
3. Verify network connectivity
4. Check GitHub Issues
5. Contact team
