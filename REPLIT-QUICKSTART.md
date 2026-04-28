# Replit Deployment - Step by Step Guide

## 🚀 Deploy Your Fraud Detection App on Replit (2 Minutes)

### What You'll Need
- GitHub account ✅ (you have this)
- Replit account (free, takes 30 seconds)
- That's it! No credit card needed

---

## 📋 Step 1: Create Replit Account

1. Go to **https://replit.com**
2. Click **"Sign Up"**
3. Choose **"Sign up with GitHub"**
4. Authorize Replit
5. ✅ Done!

---

## 📍 Step 2: Import Your GitHub Repo

1. Go to **https://replit.com/new**
2. Click **"Import from GitHub"**
3. Paste this URL:
   ```
   https://github.com/touhid365/Fraud_Detection
   ```
4. Click **"Import"**
5. ⏳ Wait 30 seconds for import...

---

## ⚙️ Step 3: Configure the Repl

### Option A: Auto-Detect (Recommended)
1. Replit will ask which service to run
2. Choose **"backend"** first
3. Click **"Run"**
4. ⏳ First run takes 2-3 minutes (npm install)

### Option B: Manual Configuration
If auto-detect doesn't work:

1. Click **".replit"** file (left sidebar)
2. Change the run command to:
   ```bash
   cd backend && npm install && npm start
   ```
3. Click **"Run"**

---

## 🌍 Step 4: Get Your Live URL

Once it says **"Server is listening on port 5000"**:

1. Look at the **top right** of the screen
2. You'll see a URL like:
   ```
   https://frauddetection.replit.dev
   ```
3. ✅ **That's your live app!**

---

## 📱 Step 5: Test Your Backend

Click your Replit URL and add `/api/health`:

```
https://your-replit-url.replit.dev/api/health
```

You should see:
```json
{"status": "Backend is running"}
```

✅ **Backend is working!**

---

## 🎨 Step 6: Deploy Frontend (Optional)

If you want to see the web interface:

1. Create **NEW Replit** (same process)
2. Import same repo
3. Change run command to:
   ```bash
   cd frontend && npm install && npm start
   ```
4. This will run frontend on port 3000
5. Update your `.env` to point to backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-replit.replit.dev
   ```

---

## 🤖 Step 7: Deploy ML Model (Optional)

1. Create **NEW Replit** (same process)
2. Import same repo
3. Choose **Python** as language
4. Change run command to:
   ```bash
   cd ml-model && pip install -r requirements.txt && python app.py
   ```
5. Click **"Run"**
6. Update backend `.env`:
   ```
   ML_MODEL_URL=https://your-ml-replit.replit.dev
   ```

---

## 🗄️ Step 8: Connect Database (MongoDB Atlas)

### Create Free MongoDB

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Sign up (free)
3. Create cluster (free tier)
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fraud-detection
   ```

### Add to Replit

1. In your Replit, click **"Secrets"** (lock icon)
2. Add new secret:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fraud-detection
   ```
3. Add another:
   ```
   JWT_SECRET = your-random-secret-key
   ```
4. Click **"Run"** again

✅ **Database connected!**

---

## 🔐 Step 9: Environment Variables in Replit

All secrets you need to add:

```bash
# Backend
MONGODB_URI = mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/fraud-detection
JWT_SECRET = my-super-secret-key-12345
NODE_ENV = production
PORT = 5000

# ML Model (if running separately)
FLASK_ENV = production

# Frontend
REACT_APP_API_URL = https://your-backend-replit.replit.dev
ML_MODEL_URL = https://your-ml-replit.replit.dev
```

---

## ✅ Verify Everything Works

### Test Backend API:
```bash
curl https://your-replit-url.replit.dev/api/health
```

### Test Database:
1. In Replit console:
   ```bash
   npm test
   ```
2. Check MongoDB Atlas dashboard

### Test Frontend:
1. Go to frontend Replit URL
2. Try to register/login
3. Check if data saves to MongoDB

---

## 🌐 Share Your Live App

Your URLs:
- **Frontend:** https://fraud-detection-frontend.replit.dev
- **Backend:** https://fraud-detection-backend.replit.dev
- **ML Model:** https://fraud-detection-ml.replit.dev

Share these links with anyone!

---

## ⚠️ Important Notes

### Free Plan Limitations:
- **Sleeps after 1 hour** of inactivity
- When someone visits, it wakes up (takes 10 seconds)
- Perfect for demo/learning
- Not for 24/7 production

### To Keep Always Running:
- Upgrade to Replit Hacker ($20/month)
- OR use keep-alive bot (free trick)

### Keep-Alive Bot (Free):
```javascript
// Add to backend/server.js
setInterval(() => {
  // Keep warm
}, 25 * 60 * 1000); // Every 25 minutes
```

---

## 🎯 Quick Checklist

- [ ] GitHub account ready
- [ ] Replit account created
- [ ] Repo imported to Replit
- [ ] Backend running (see green "Run" button)
- [ ] MongoDB Atlas database created
- [ ] Environment variables added
- [ ] Backend URL copied
- [ ] Frontend deployed (optional)
- [ ] ML Model deployed (optional)
- [ ] Tested `/api/health` endpoint
- [ ] Tested login/register
- [ ] Shared with friends!

---

## 🆘 Troubleshooting

### "npm install fails"
```bash
Solution: Click "Run" again, it retries
```

### "MongoDB connection error"
```bash
Check:
1. Connection string copied correctly
2. IP whitelist on MongoDB Atlas
3. Secrets added in Replit
```

### "Can't connect to backend from frontend"
```bash
Update frontend .env:
REACT_APP_API_URL=https://your-backend-url.replit.dev
```

### "Port already in use"
```bash
Change port in backend/server.js:
const PORT = process.env.PORT || 5000;
```

---

## 📚 Useful Links

- **Replit Docs:** https://docs.replit.com
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Replit Community:** https://ask.replit.com
- **GitHub:** https://github.com/touhid365/Fraud_Detection

---

## 🎉 You Did It!

Your Fraud Detection app is now **LIVE** on the internet! 🚀

**Next steps:**
1. Invite friends to test
2. Add more features
3. Upgrade to paid plan (optional)
4. Share on social media

---

## 📞 Need Help?

Common issues in Replit dashboard:
- **Chat:** Click "?" icon → "Ask for Help"
- **Community:** https://ask.replit.com
- **Docs:** https://docs.replit.com

---

**Congratulations! Your app is LIVE! 🎊**

Go to **https://replit.com** and see your running app right now!
