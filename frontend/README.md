# 🖥️ Frontend — Next.js on Vercel

This folder contains the Next.js frontend for the Hospital Management System.

## Platform
- **Framework**: [Next.js](https://nextjs.org)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: HTML/CSS first (minimal JavaScript where possible)

## Structure (planned)
```
frontend/
├── README.md
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable UI components
│   └── styles/         # CSS files (vanilla CSS)
├── next.config.js
├── package.json
└── vercel.json         # Vercel deployment config
```

## Quick Start
```bash
cd frontend
npm install
npm run dev
```

## Design Principles
- Use **vanilla CSS** over CSS-in-JS or Tailwind
- Keep components as simple HTML/CSS with minimal client-side JS
- Use Next.js SSR/SSG for data fetching where possible
