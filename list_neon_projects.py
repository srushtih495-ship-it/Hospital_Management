import urllib.request
import json
import os

API_KEY = "napi_chj2fdi9zkdf266y9908hwywsys7bzdx83b4pvyycgev7u6cqf7m9qxyn0bt0yj0"

req = urllib.request.Request("https://console.neon.tech/api/v2/projects", method="GET")
req.add_header("Authorization", f"Bearer {API_KEY}")
req.add_header("Accept", "application/json")

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        projects = data.get("projects", [])
        print(f"Projects found: {len(projects)}")
        for p in projects:
            print(f"ID: {p['id']}, Name: {p['name']}")
except Exception as e:
    print(f"Error: {e}")
