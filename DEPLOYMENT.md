# How to Deploy to Vercel (100% Free)

This project is fully prepared for zero-cost deployment on Vercel. Follow these simple steps to deploy:

---

## Step 1: Upload Project to GitHub

1. Open a terminal in this project directory:
   ```bash
   cd /Users/augustinekodom/.gemini/antigravity/scratch/redbook-tm-assistant
   ```
2. Initialize git and commit the project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Red Book Traffic Management AI Assistant"
   ```
3. Create a new repository on [GitHub](https://github.com/new).
4. Link and push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/redbook-tm-assistant.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Connect to Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** -> **"Project"**.
3. Import your `redbook-tm-assistant` repository from GitHub.
4. **Project Settings**:
   - **Framework Preset**: `Vite` (automatically detected via `vercel.json`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. *(Optional)* Under **Environment Variables**, add:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your free API key from [Google AI Studio](https://aistudio.google.com)
6. Click **"Deploy"**!

Within ~1 minute, your site will be live at `https://redbook-tm-assistant.vercel.app` (or similar custom `.vercel.app` domain)!
