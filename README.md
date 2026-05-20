# Garden Care App

Standalone React/Vite version of your gardening app prototype.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Deploy

You can deploy this folder to Vercel or Netlify as a Vite React app.

## Important note about AI

The current prototype includes AI features that call Anthropic/Claude directly from the browser. That is not safe for production and may fail without a backend proxy/API key.

Recommended next step: move the AI calls into a backend route or serverless function, then have the frontend call your own `/api/plant-profile` and `/api/diagnose` endpoints.
