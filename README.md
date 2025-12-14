<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17zzKYKCTBHDfM4ongoDixBu-CNmnCE_I

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Add a new Vercel project pointing at this repo. Vercel will detect Vite automatically.
2. Set the `GEMINI_API_KEY` environment variable in the Vercel project (match `.env.local`).
3. Keep the defaults for build (`npm run build`) and output (`dist`). The included `vercel.json` encodes these.
4. Deploy — the app is a static Vite build, so no extra server configuration is required.
