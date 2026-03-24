import psycopg2
import sys
import os

DATABASE_URL = "postgresql://neondb_owner:npg_vGY2bagywA3c@ep-damp-paper-ajt8kth1.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require"

try:
    with open("c:/Users/Administrator/Desktop/Hospital Managemant/db/schema/001_initial.sql", "r") as f:
        sql = f.read()

    print("Connecting to Neon...")
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cur = conn.cursor()
    
    print("Executing schema setup...")
    cur.execute(sql)
    print("Schema executed successfully!")
    
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    tables = cur.fetchall()
    print("Tables in public schema:")
    for t in tables:
        print(f" - {t[0]}")
        
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
