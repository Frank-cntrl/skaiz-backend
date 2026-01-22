# 🚀 Deploy SKAIZ Backend to Vercel

## Step-by-Step Deployment Guide

### 1. **Prepare Your Repository**

Your backend is already set up! Just make sure you've committed everything:

```bash
cd /Users/franccescopetta/Desktop/Projects/Kaiya-Website/Capstone-2-Backend

# Check status
git status

# Add any changes
git add .

# Commit
git commit -m "Add Vercel configuration"

# Push to GitHub
git push origin main
```

---

### 2. **Deploy on Vercel**

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/new)**

2. **Import your GitHub repository**
   - Click "Add New..." → "Project"
   - Select your `skaiz-backend` repository

3. **Configure the project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** Leave empty or use `npm install`
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

4. **Add Environment Variables:**

   Click "Environment Variables" and add:
   
   ```
   NODE_ENV=production
   FRONTEND_URL=https://skaiz.word
   ADMIN_API_KEY=your-secret-api-key
   FORCE_REVEAL=false
   ```

   **Optional (if using database):**
   ```
   DATABASE_URL=your-database-connection-string
   ```

5. **Click "Deploy"**

6. **Copy your backend URL** after deployment completes:
   ```
   https://your-project-name.vercel.app
   ```

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/franccescopetta/Desktop/Projects/Kaiya-Website/Capstone-2-Backend
vercel

# Follow the prompts, then deploy to production
vercel --prod
```

---

### 3. **Update Frontend Configuration**

After deploying, update your frontend `.env.production`:

```bash
cd /Users/franccescopetta/Desktop/Projects/Kaiya-Website/skaiz
```

Edit `skaiz/.env.production`:

```env
VITE_API_URL=https://your-backend.vercel.app/api/countdown
```

Then commit and push:

```bash
git add .env.production
git commit -m "Update API URL to Vercel backend"
git push origin main
```

---

### 4. **Test Your Deployment**

Test the API endpoints:

```bash
# Check countdown endpoint
curl https://your-backend.vercel.app/api/countdown

# Check health (if you have it)
curl https://your-backend.vercel.app/api/health
```

Or open in browser:
```
https://your-backend.vercel.app/api/countdown
```

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | Your frontend URL for CORS | `https://skaiz.word` |
| `ADMIN_API_KEY` | Secret key for admin endpoints | `your-super-secret-key` |
| `FORCE_REVEAL` | Bypass countdown (testing) | `false` |
| `DATABASE_URL` | Database connection (if needed) | `postgresql://...` |

---

## 🔄 Updating Your Deployment

Vercel auto-deploys on every push to `main`:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically detect changes and redeploy!

---

## ⚡ Vercel vs Render Differences

| Feature | Vercel | Render |
|---------|--------|--------|
| **Type** | Serverless | Traditional server |
| **Cold Start** | ~100-500ms | ~30 seconds (free tier) |
| **Always On** | Yes | No (free tier sleeps) |
| **WebSockets** | Limited support | Full support |
| **Database** | External only | Can host on same platform |
| **Free Tier** | Generous limits | 750 hours/month |

---

## 🐛 Troubleshooting

### Deployment fails
- Check logs in Vercel dashboard
- Verify `app.js` exports the Express app correctly
- Check all dependencies are in `package.json`

### CORS errors
- Update `FRONTEND_URL` environment variable in Vercel
- Make sure it matches your exact frontend URL
- No trailing slash in URL

### 404 errors
- Check your API routes are correct
- Verify `vercel.json` routing configuration
- Make sure `/api` prefix is included in requests

### Database connection issues
- Vercel serverless functions are stateless
- Use connection pooling for databases
- Consider using Vercel Postgres or external DB

### WebSocket issues
- Vercel has limited WebSocket support
- Consider using Vercel's built-in solutions or external service
- For this project, Socket.io might not work fully on Vercel

---

## 💰 Vercel Free Tier Notes

- 100GB bandwidth/month
- Serverless function execution: 100 GB-hours
- Fast global CDN
- Automatic HTTPS
- No cold start delays (unlike Render)

---

## 🔒 Security Checklist

Before going live:

- [ ] Change `ADMIN_API_KEY` to a strong random value
- [ ] Set `FRONTEND_URL` to your actual frontend domain (`https://skaiz.word`)
- [ ] Verify `NODE_ENV=production`
- [ ] Test all API endpoints
- [ ] Check CORS is working correctly
- [ ] Verify environment variables are set in Vercel dashboard

---

## 📊 Monitoring

In Vercel dashboard you can:
- View real-time logs
- Check function invocations
- Monitor build and deployment history
- See performance analytics
- Set up custom domains

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Guide](https://vercel.com/docs/frameworks/express)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## ⚠️ Important Notes for This Project

1. **Socket.io**: May not work fully on Vercel's serverless architecture. If you need real-time features, consider:
   - Using Vercel's Edge Functions
   - Deploying Socket.io separately (e.g., Render, Railway)
   - Using a managed service (Pusher, Ably)

2. **Database Connection**: Make sure your database (if any) allows external connections and uses connection pooling.

3. **Static Files**: Files in `/public` folder are served automatically.

---

**Your backend is ready for Vercel! 🎉**
