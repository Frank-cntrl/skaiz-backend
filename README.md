# SKAIZ Backend - Countdown System

Backend API for SKAIZ website countdown timer and portfolio system.

## 🚀 Features

- ✅ Countdown timer API
- ✅ Admin endpoints for countdown management
- ✅ Database integration
- ✅ Socket.io support
- ✅ User authentication
- ✅ CORS configured

## 📦 Installation

```bash
npm install
```

## 🏃 Running Locally

### Development
```bash
npm run start-dev
```

### Production
```bash
npm start
```

Server runs on `http://localhost:8080`

## 🌐 API Endpoints

### Public Endpoints

- `GET /api/countdown` - Get countdown status
- `GET /api/health` - Health check (if implemented)

### Admin Endpoints (Require API Key)

- `PUT /api/countdown/reveal-date` - Update reveal date
- `PUT /api/countdown/force-reveal` - Toggle force reveal

**Authentication:** Include `X-API-Key` header with your admin API key

## ⚙️ Environment Variables

Create a `.env` file:

```bash
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_API_KEY=your-secret-key
FORCE_REVEAL=false
```

## 📅 Configure Countdown

Edit `api/countdown.js`:

```javascript
revealDate: new Date('2026-02-14T00:00:00'), // Your reveal date
```

## 🚀 Deployment

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Render

1. Push to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy!

## 📁 Project Structure

```
Capstone-2-Backend/
├── api/
│   ├── index.js           # API router
│   ├── countdown.js       # Countdown endpoints
│   └── test-db.js         # Database test
├── auth/
│   └── index.js           # Authentication
├── database/
│   ├── db.js              # Database connection
│   ├── seed.js            # Database seeding
│   └── user.js            # User model
├── public/
│   ├── skaiz-world.png    # Countdown image
│   ├── index.html
│   ├── style.css
│   └── script.js
├── app.js                 # Main application
├── socket-server.js       # Socket.io server
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Security

- API keys for admin endpoints
- CORS configured for frontend only
- Environment variables for sensitive data
- Production/development modes

## 📝 License

Private - All Rights Reserved

---

**Built for SKAIZ Portfolio Website 🎨**
