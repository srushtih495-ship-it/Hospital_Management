# 🏥 Hospital Management System — Project Tracker

> **Stack**: Next.js (Vercel) · FastAPI (Render) · PostgreSQL (Neon)
> **Started**: 2026-03-23

---

## ✅ Finalized Steps

### Phase 1: Project Scaffolding
| # | Step | Date | Notes |
|---|------|------|-------|
| 1 | Created project folder structure (`db/`, `backend/`, `frontend/`) | 2026-03-23 | Three separate folders for each deployment target |
| 2 | Created PROJECT_TRACKER.md | 2026-03-23 | This document — tracks all finalized decisions |
| 3 | Created skill files for each section | 2026-03-23 | `.agents/skills/` — database, backend, frontend |
| 4 | Tested Neon API connection | 2026-03-23 | ✅ API key valid, user: `srushtih495`, org: `Srushti` (`org-aged-firefly-24219546`), 0 projects — ready to create |
| 5 | Tested Render API connection | 2026-03-23 | ✅ API key valid, owner: `My Workspace` (`tea-d6t43u24d50c73c2jos0`), email: `srushtih495@gmail.com`, 0 services |
| 6 | Tested Vercel API connection | 2026-03-23 | ✅ API key valid, user: `srushtih495-7258` (`srushtih495@gmail.com`), 0 projects — ready to deploy |
| 7 | Tested GitHub API connection | 2026-03-23 | ✅ API key valid, user: `srushtih495-ship-it`, 4 public repos |
| 8 | Created GitHub repo | 2026-03-23 | ✅ `srushtih495-ship-it/Hospital_Management` — public, branch: `main` |
| 9 | Initialized git & pushed to GitHub | 2026-03-23 | ✅ All project files pushed (secrets excluded via `.gitignore`) |

---

## 📋 Upcoming Phases

### Phase 2: Database (Neon PostgreSQL)
- [ ] Design database schema (tables, relationships)
- [ ] Set up Neon project & connection string
- [ ] Create SQL migration scripts

### Phase 3: Backend (FastAPI on Render)
- [ ] Initialize FastAPI project with dependencies
- [ ] Create database models (SQLAlchemy)
- [ ] Build API endpoints (CRUD)
- [ ] Configure Render deployment (`render.yaml`)

### Phase 4: Frontend (Next.js on Vercel)
- [ ] Initialize Next.js project
- [ ] Build pages with HTML/CSS focus
- [ ] Connect to FastAPI backend
- [ ] Configure Vercel deployment

---

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel     │────▶│   Render    │────▶│    Neon      │
│  (Next.js)   │ API │  (FastAPI)  │ SQL │ (PostgreSQL) │
│  Frontend    │◀────│   Backend   │◀────│  Database    │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 🔑 Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Frontend framework | Next.js | Vercel-native, SSR support |
| Styling approach | HTML/CSS first | User preference for minimal JS |
| Backend framework | FastAPI | Python, async, auto-docs |
| Database host | Neon | Serverless PostgreSQL |
| Backend host | Render | Easy Python deployment |
