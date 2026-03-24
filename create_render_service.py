import urllib.request
import json
import os

API_KEY = "rnd_xOXLuva610nlOZwXGBR2yMI1JwjY"
GITHUB_REPO = "https://github.com/srushtih495-ship-it/Hospital_Management"

payload = json.dumps({
    "type": "web_service",
    "name": "hospital-api",
    "ownerId": "tea-d6t43u24d50c73c2jos0",
    "repo": GITHUB_REPO,
    "branch": "main",
    "envVars": [
        {
            "key": "DATABASE_URL",
            "value": "postgresql://neondb_owner:npg_vGY2bagywA3c@ep-damp-paper-ajt8kth1-pooler.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
            "generateValue": False
        }
    ],
    "serviceDetails": {
        "env": "python",
        "envSpecificDetails": {
            "buildCommand": "cd backend && pip install -r requirements.txt",
            "startCommand": "cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT"
        }
    }
}).encode("utf-8")

req = urllib.request.Request(
    "https://api.render.com/v1/services",
    data=payload,
    method="POST"
)
req.add_header("Authorization", f"Bearer {API_KEY}")
req.add_header("Accept", "application/json")
req.add_header("Content-Type", "application/json")

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        print(f"STATUS: SUCCESS")
        print(f"Service Name: {data.get('name')}")
        print(f"Service URL: {data.get('service', {}).get('url')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"STATUS: FAIL")
    print(f"HTTP {e.code}: {body}")
except Exception as e:
    print(f"STATUS: FAIL - {e}")
