---
name: backend_fastapi
description: How to set up and develop the FastAPI backend for the Hospital Management System, deployed on Render
---

# Backend — FastAPI on Render

## Overview
The Hospital Management System backend uses **FastAPI** (Python) deployed on **Render**. All backend files live under the `backend/` folder.

## Setup Steps

### 1. Initialize Project
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install fastapi uvicorn sqlalchemy asyncpg python-dotenv pydantic
pip freeze > requirements.txt
```

### 2. Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI entry point
│   ├── config.py        # Settings (reads .env)
│   ├── database.py      # Async DB connection
│   ├── models/          # SQLAlchemy ORM models
│   ├── schemas/         # Pydantic request/response schemas
│   ├── routers/         # API route modules
│   └── services/        # Business logic layer
├── requirements.txt
├── render.yaml
└── .env.example
```

### 3. Entry Point Pattern (`app/main.py`)
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Hospital Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

### 4. Run Locally
```bash
uvicorn app.main:app --reload --port 8000
```

### 5. Render Deployment
Create `render.yaml` at `backend/render.yaml`:
```yaml
services:
  - type: web
    name: hospital-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        sync: false
```

## Key Conventions
- Use `async` endpoints with `asyncpg` for database queries
- Separate concerns: routers → services → models
- Use Pydantic `BaseModel` for all request/response validation
- Add docstrings to endpoints (auto-generates Swagger docs)
- Use `/api/v1/` prefix for versioning
