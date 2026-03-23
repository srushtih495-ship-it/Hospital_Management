# ⚙️ Backend — FastAPI on Render

This folder contains the FastAPI backend for the Hospital Management System.

## Platform
- **Framework**: [FastAPI](https://fastapi.tiangolo.com)
- **Deployment**: [Render](https://render.com)
- **Language**: Python 3.11+

## Structure (planned)
```
backend/
├── README.md
├── app/
│   ├── main.py          # FastAPI app entry point
│   ├── config.py        # Settings & env vars
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── routers/         # API route handlers
│   ├── services/        # Business logic
│   └── database.py      # DB connection setup
├── requirements.txt
├── render.yaml          # Render deployment config
└── .env.example
```

## Quick Start
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
