import urllib.request
import json
import os
import sys

API_KEY = "napi_chj2fdi9zkdf266y9908hwywsys7bzdx83b4pvyycgev7u6cqf7m9qxyn0bt0yj0"

def log(msg):
    print(msg)

log("CREATING NEON PROJECT: Hospital_Manageant")

# Check if we already have it first maybe?
# Let's just create it directly
payload = json.dumps({
    "project": {
        "name": "Hospital_Manageant",
        "pg_version": 16,
        "region_id": "aws-us-east-1"
    }
}).encode("utf-8")

req = urllib.request.Request(
    "https://console.neon.tech/api/v2/projects",
    data=payload,
    method="POST"
)
req.add_header("Authorization", f"Bearer {API_KEY}")
req.add_header("Content-Type", "application/json")
req.add_header("Accept", "application/json")


try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        proj = data.get("project", {})
        conn_uris = data.get("connection_uris", [])
        
        log(f"STATUS: SUCCESS")
        log(f"Project ID: {proj.get('id')}")
        
        # In Neon v2 API, creating a project returns connection_uris
        conn_string = conn_uris[0].get("connection_uri") if conn_uris else "NOT_FOUND"
        log(f"Connection String: {conn_string}")

        with open("C:/Users/Administrator/Desktop/Hospital Managemant/db_conn.txt", "w") as f:
            f.write(conn_string)
except urllib.error.HTTPError as e:
    body = e.read().decode()[:500]
    log(f"STATUS: FAIL")
    log(f"HTTP {e.code}: {body}")
except Exception as e:
    log(f"STATUS: FAIL - {e}")
