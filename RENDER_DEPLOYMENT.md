# 🚀 Deploy SKAIZ Backend to Render

## Step-by-Step Deployment Guide

### 1. **Prepare Your Repository**

```bash
cd /Users/franccescopetta/Desktop/Projects/Kaiya-Website/Capstone-2-Backend

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SKAIZ backend"

# Create GitHub repo and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

---

### 2. **Deploy on Render**

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure the service:**
   - **Name:** `skaiz-backend` (or whatever you prefer)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid if you need)

5. **Add Environment Variables:**

   Click "Advanced" → "Add Environment Variable"

   Add these variables:
   ```
   NODE_ENV=production
   PORT=8080
   FRONTEND_URL=http://localhost:3000
   ADMIN_API_KEY=your-secret-key-here
   FORCE_REVEAL=false
   ```

   **Important:** You'll update `FRONTEND_URL` after deploying your frontend!

6. **Click "Create Web Service"**

7. **Wait for deployment** (usually 2-5 minutes)

8. **Copy your backend URL** - It will be something like:
   ```
   https://skaiz-backend.onrender.com
   ```

---

### 3. **Update Frontend Configuration**

Once your backend is deployed, update your frontend:

#### **Option A: For Development**

Keep `localhost:8080` for local backend testing

#### **Option B: For Production Frontend**

Update `skaiz/src/App.jsx`:

```javascript
const apiUrl = import.meta.env.DEV 
  ? 'http://localhost:8080/api/countdown'
  : 'https://your-backend-url.onrender.com/api/countdown'
```

Or create `skaiz/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

### 4. **Update Backend CORS**

After deploying your frontend (e.g., to Vercel/Netlify), update the `FRONTEND_URL` environment variable in Render:

1. Go to your Render service
2. Click "Environment"
3. Update `FRONTEND_URL` to your frontend URL:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
4. Service will auto-redeploy

---

### 5. **Test Your Deployment**

Test the API endpoints:

```bash
# Check health
curl https://your-backend-url.onrender.com/api/health

# Check countdown
curl https://your-backend-url.onrender.com/api/countdown
```

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Render assigns this) | `8080` |
| `FRONTEND_URL` | Your frontend URL for CORS | `https://skaiz.vercel.app` |
| `ADMIN_API_KEY` | Secret key for admin endpoints | `your-super-secret-key` |
| `FORCE_REVEAL` | Bypass countdown (testing) | `false` |

---

## 🔄 Updating Your Deployment

When you make changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Render will automatically detect changes and redeploy!

---

## 🐛 Troubleshooting

### Service won't start
- Check logs in Render dashboard
- Verify `npm start` command works locally
- Check all environment variables are set

### CORS errors
- Update `FRONTEND_URL` environment variable
- Make sure it matches your actual frontend URL
- No trailing slash in URL

### 404 errors
- Check your API routes are correct
- Verify base URL includes `/api`

### Countdown not working
- Check countdown date in `api/countdown.js`
- Verify `FORCE_REVEAL` is set correctly

---

## 💰 Render Free Tier Notes

- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- Consider upgrading for production use
- Free tier includes 750 hours/month

---

## 🔒 Security Checklist

Before going live:

- [ ] Change `ADMIN_API_KEY` to a strong random value
- [ ] Set `FRONTEND_URL` to your actual frontend domain
- [ ] Verify `NODE_ENV=production`
- [ ] Test all API endpoints
- [ ] Check CORS is working correctly

---

## 📊 Monitoring

In Render dashboard you can:
- View real-time logs
- Check service health
- Monitor resource usage
- See deployment history

---

## 🆘 Need Help?

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- Check logs in Render dashboard

---

**Your backend is ready for deployment! 🎉**
