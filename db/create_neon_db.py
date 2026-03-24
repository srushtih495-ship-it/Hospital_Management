import urllib.request
import json
import urllib.error
import urllib.parse

API_KEY = "napi_chj2fdi9zkdf266y9908hwywsys7bzdx83b4pvyycgev7u6cqf7m9qxyn0bt0yj0"
BASE = "https://console.neon.tech/api/v2"
HEADERS = {"Authorization": "Bearer " + API_KEY, "Content-Type": "application/json"}

# 1. First get org_id
req = urllib.request.Request(BASE + "/users/me/organizations")
for k, v in HEADERS.items():
    req.add_header(k, v)
    
org_id = None
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        org_id = data.get("organizations", [{}])[0].get("id")
except Exception as e:
    pass

print(f"Found org: {org_id}")

# 2. Create project
create_url = BASE + "/projects"
req = urllib.request.Request(create_url, method="POST")
for k, v in HEADERS.items():
    req.add_header(k, v)

payload = {
    "project": {
        "name": "Hospital_Managemant"
    }
}

if org_id:
    # Not sure if it goes inside project or outside, we'll try project.org_id or outside
    payload["project"]["org_id"] = org_id

req.data = json.dumps(payload).encode("utf-8")
print("Payload:", payload)

try:
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode())
        print("Success:", json.dumps(result, indent=2))
        
        # Save connection URI to .env or some place if found
        with open("C:/Users/Administrator/Desktop/Hospital Managemant/db/neon_connect.json", "w") as f:
            json.dump(result, f, indent=2)
except urllib.error.HTTPError as e:
    print(f"HTTP ERROR {e.code}: {e.read().decode()}")
except Exception as e:
    print(f"ERROR: {e}")
