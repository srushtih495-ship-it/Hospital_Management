---
name: frontend_nextjs
description: How to set up and develop the Next.js frontend for the Hospital Management System, deployed on Vercel
---

# Frontend — Next.js on Vercel

## Overview
The Hospital Management System frontend uses **Next.js** deployed on **Vercel**. The design philosophy prioritizes **HTML/CSS** with minimal client-side JavaScript. All frontend files live under the `frontend/` folder.

## Setup Steps

### 1. Initialize Project
```bash
cd frontend
npx -y create-next-app@latest ./ --ts --eslint --app --src-dir --no-tailwind --import-alias "@/*"
```

### 2. Project Structure
```
frontend/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout (HTML shell)
│   │   ├── page.tsx     # Home page
│   │   ├── globals.css  # Global styles
│   │   └── [routes]/    # Feature pages
│   ├── components/      # Reusable UI components
│   └── styles/          # CSS modules / vanilla CSS
├── next.config.js
├── package.json
└── vercel.json
```

### 3. Styling Approach (HTML/CSS First)
- Use **vanilla CSS** or **CSS Modules** (`.module.css`)
- Avoid Tailwind and CSS-in-JS
- Use CSS custom properties for theming:
```css
:root {
  --primary: #2563eb;
  --bg: #f8fafc;
  --text: #1e293b;
  --radius: 8px;
}
```
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, etc.)

### 4. Run Locally
```bash
npm run dev
```

### 5. Vercel Deployment
- Connect GitHub repo to Vercel
- Set root directory to `frontend/`
- Framework preset: Next.js (auto-detected)

## Key Conventions
- Use Server Components by default (less JS shipped)
- Use `'use client'` only when interactivity is needed
- Keep API calls in server-side `fetch()` or Route Handlers
- Set `NEXT_PUBLIC_API_URL` env var for backend URL
- Use `<Image>` from `next/image` for optimized images
