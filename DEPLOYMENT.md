# 🚀 CodeOscan Deployment Guide

This guide covers deploying CodeOscan with the frontend on Vercel and backend on Render.

## 📋 Prerequisites

- GitHub repository with your code
- Vercel account (free tier available)
- Render account (free tier available)
- MongoDB Atlas account (for production database)
- Google AI API key

## 🔧 Backend Deployment on Render

### Step 1: Prepare Your Repository
Ensure your backend code is pushed to GitHub with the `render.yaml` configuration file.

### Step 2: Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `codeoscan-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

### Step 3: Set Environment Variables
Add these environment variables in Render:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeoscan?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-here
GOOGLE_AI_API_KEY=your-google-ai-api-key-here
```

### Step 4: Deploy
- Click "Create Web Service"
- Render will automatically build and deploy your backend
- Note the deployed URL (e.g., `https://codeoscan-backend.onrender.com`)

## ⚛️ Frontend Deployment on Vercel

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables
Add this environment variable in Vercel:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with your actual Render backend URL.

### Step 4: Deploy
- Click "Deploy"
- Vercel will build and deploy your frontend
- Your app will be available at `https://your-app-name.vercel.app`

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

## 🔐 Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeoscan?retryWrites=true&w=majority
JWT_SECRET=generate-a-strong-random-string-here
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🚀 Deployment Commands

### Deploy Backend to Render
```bash
# Render automatically deploys on git push to main branch
git add .
git commit -m "Deploy to production"
git push origin main
```

### Deploy Frontend to Vercel
```bash
# Option 1: Via Vercel CLI
cd frontend
vercel --prod

# Option 2: Via Git (if connected to Vercel)
git add .
git commit -m "Deploy frontend"
git push origin main
```

## 🔍 Health Checks

### Backend Health Check
```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{"status": "ok"}
```

### Frontend Health Check
Visit your Vercel URL and ensure the app loads correctly.

## 🐛 Troubleshooting

### Common Backend Issues
1. **Build Fails**: Check Node.js version compatibility
2. **Database Connection**: Verify MongoDB URI and network access
3. **Environment Variables**: Ensure all required vars are set
4. **API Key Issues**: Verify Google AI API key is valid

### Common Frontend Issues
1. **API Calls Fail**: Check VITE_API_URL environment variable
2. **Build Errors**: Ensure all dependencies are installed
3. **Routing Issues**: Verify vercel.json rewrites configuration
4. **CORS Errors**: Check backend CORS configuration

### Performance Tips
1. **Backend**: Consider upgrading to paid Render plan for better performance
2. **Frontend**: Enable Vercel Analytics for monitoring
3. **Database**: Use MongoDB Atlas connection pooling
4. **Caching**: Implement Redis for API response caching

## 📊 Monitoring

### Backend Monitoring
- Render provides built-in logs and metrics
- Monitor response times and error rates
- Set up alerts for downtime

### Frontend Monitoring
- Vercel Analytics for user insights
- Monitor Core Web Vitals
- Track deployment success rates

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
- **Vercel**: Deploys on every push to main branch
- **Render**: Deploys on every push to main branch
- Enable branch previews for testing

## 🔒 Security Checklist

- [ ] Environment variables are properly set
- [ ] Database access is restricted
- [ ] API keys are not exposed in frontend code
- [ ] HTTPS is enabled (automatic on both platforms)
- [ ] CORS is properly configured
- [ ] JWT secrets are strong and unique

## 📈 Scaling Considerations

### When to Scale
- High response times (>2 seconds)
- Memory usage consistently above 80%
- Database connection limits reached
- High error rates

### Scaling Options
- **Render**: Upgrade to paid plans for more resources
- **Vercel**: Pro plan for better performance and analytics
- **Database**: MongoDB Atlas cluster scaling
- **CDN**: Vercel Edge Network (included)

---

Your CodeOscan application is now ready for production deployment! 🎉
