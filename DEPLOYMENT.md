# 🚀 Game Deployment Guide

## Option 1: GitHub Pages (Recommended - FREE)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign up
2. Click "New repository"
3. Name it: `idle-economy-game`
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

### Step 2: Upload Your Game
1. **Download GitHub Desktop** or use web interface
2. **Upload all files** from your game folder:
   - `index.html`
   - `styles/` folder
   - `js/` folder
   - `README.md`
3. **Commit and push** to GitHub

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Source", select **"Deploy from a branch"**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

### Step 4: Get Your Live URL
- Your game will be live at: `https://yourusername.github.io/idle-economy-game`
- It may take 5-10 minutes to deploy

---

## Option 2: Netlify (Drag & Drop - Easiest)

### Step 1: Prepare Your Files
1. **Zip your entire game folder**
2. Make sure `index.html` is in the root

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub/Google
3. **Drag and drop** your zip file
4. Get instant URL like `https://amazing-name-123456.netlify.app`

### Step 3: Custom Domain (Optional)
1. In Netlify dashboard, go to **Domain settings**
2. Add your custom domain
3. Update DNS settings as instructed

---

## Option 3: Vercel (Professional)

### Step 1: Connect GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"New Project"**

### Step 2: Import Repository
1. **Import** your GitHub repository
2. Vercel auto-detects it's a static site
3. Click **Deploy**

### Step 3: Get URL
- Get URL like `https://idle-economy-game-abc123.vercel.app`
- **Auto-deploys** when you push changes to GitHub

---

## 🔧 **Pre-Deployment Checklist**

### ✅ **Files to Include:**
- [ ] `index.html` (main file)
- [ ] `styles/main.css`
- [ ] `js/` folder (all JavaScript files)
- [ ] `README.md`
- [ ] `ADSENSE_SETUP.md`

### ✅ **Test Locally:**
1. **Open `index.html`** in browser
2. **Test all game features**:
   - [ ] Resource production
   - [ ] Building construction
   - [ ] Market trading
   - [ ] Tab switching
   - [ ] Save/load functionality

### ✅ **AdSense Setup:**
1. **Add your domain** to AdSense account
2. **Enable Auto Ads** in AdSense dashboard
3. **Test ads** on live site (won't show locally)

---

## 🌐 **After Deployment**

### **1. Test Your Live Game**
- Open your live URL
- Test all functionality
- Check mobile responsiveness

### **2. Set Up AdSense**
- Add your live domain to AdSense
- Enable Auto Ads
- Wait 24-48 hours for ads to appear

### **3. Share Your Game**
- Share the live URL
- Add to game directories
- Promote on social media

---

## 🆘 **Troubleshooting**

### **Game Not Loading:**
- Check file paths (case-sensitive)
- Ensure `index.html` is in root folder
- Check browser console for errors

### **Ads Not Showing:**
- Wait 24-48 hours after adding domain to AdSense
- Check AdSense dashboard for approval status
- Ensure site is live and accessible

### **Mobile Issues:**
- Test on actual mobile devices
- Check responsive CSS
- Verify touch controls work

---

## 📊 **Recommended: GitHub Pages**

**Why GitHub Pages is best:**
- ✅ **Completely FREE**
- ✅ **Easy to update** (just push changes)
- ✅ **Custom domain** support
- ✅ **HTTPS** by default
- ✅ **Fast global CDN**
- ✅ **Version control** with Git

**Your game will be live at:**
`https://yourusername.github.io/idle-economy-game`

Ready to deploy? Start with GitHub Pages! 🚀
