# 🗄️ Database — Neon PostgreSQL

This folder contains all database-related files for the Hospital Management System.

## Platform
- **Provider**: [Neon](https://neon.tech) — Serverless PostgreSQL
- **Engine**: PostgreSQL 16+

## Structure (planned)
```
db/
├── README.md
├── schema/          # SQL table definitions
│   └── 001_initial.sql
├── migrations/      # Incremental migration scripts
├── seeds/           # Sample/test data
└── neon_config.md   # Connection & setup notes
```

## Setup
1. Create a Neon project at https://console.neon.tech
2. Copy the connection string
3. Store it in backend `.env` as `DATABASE_URL`
