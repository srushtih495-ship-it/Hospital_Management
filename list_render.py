import urllib.request
import json
import ssl

API_KEY = "rnd_xOXLuva610nlOZwXGBR2yMI1JwjY"

req = urllib.request.Request("https://api.render.com/v1/services?limit=20", method="GET")
req.add_header("Authorization", f"Bearer {API_KEY}")
req.add_header("Accept", "application/json")

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        if not data:
            print("No services found.")
        else:
            for s in data:
                svc = s.get("service", {})
                print(f"Name: {svc.get('name')} | URL: {svc.get('url')} | Type: {svc.get('type')}")
except Exception as e:
    print(f"Error fetching: {e}")
