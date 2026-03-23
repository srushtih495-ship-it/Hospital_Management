---
name: database_neon
description: How to set up and manage the Neon PostgreSQL database for the Hospital Management System
---

# Database — Neon PostgreSQL

## Overview
The Hospital Management System uses **Neon** as a serverless PostgreSQL provider. All database files live under the `db/` folder.

## Setup Steps

### 1. Create a Neon Project
1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project (e.g., `hospital-management`)
3. Select PostgreSQL 16+
4. Copy the connection string

### 2. Connection String Format
```
postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
```

### 3. File Organization
- `db/schema/` — SQL `CREATE TABLE` statements, ordered numerically (e.g., `001_initial.sql`)
- `db/migrations/` — Incremental migration scripts
- `db/seeds/` — Sample data for development/testing

### 4. Running Migrations
```bash
# Using psql with Neon connection string
psql $DATABASE_URL -f db/schema/001_initial.sql
```

### 5. Key Conventions
- Always use `UUID` or `SERIAL` for primary keys
- Use `TIMESTAMPTZ` for all timestamps
- Name tables in `snake_case` (e.g., `patient_records`)
- Add `created_at` and `updated_at` to every table
- Use foreign keys with `ON DELETE` clauses

## Common Tasks

### View tables
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

### Reset database
```bash
psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
psql $DATABASE_URL -f db/schema/001_initial.sql
```
