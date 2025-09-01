import os
import httpx

INTASEND_SECRET_KEY = os.getenv("INTASEND_SECRET_KEY")  # use secret key
INTASEND_ENV = os.getenv("INTASEND_ENV", "sandbox")
APP_URL = os.getenv("APP_URL", "http://localhost:5173")

print("Using key:", INTASEND_SECRET_KEY[:8], "...")  # just first chars

BASE_URL = (
    "https://sandbox.intasend.com"
    if INTASEND_ENV == "sandbox"
    else "https://api.intasend.com"
)

async def create_checkout(mode: str, amount: float, description: str, reference: str):
    url = f"{BASE_URL}"
    headers = {
        "Authorization": f"Bearer {INTASEND_SECRET_KEY}",  # ✅ only this
        "Content-Type": "application/json",
    }
    payload = {
        "amount": amount,
        "currency": "KES",
        "api_ref": reference,
        "redirect_url": f"{APP_URL}/billing/success",
        "callback_url": f"{APP_URL}/api/payments/webhook",
        "mode": mode,
        "description": description,
    }

    async with httpx.AsyncClient() as client:
        resp = await client.post(url, headers=headers, json=payload)
        if resp.status_code != 200:
            print("IntaSend error:", resp.text)
        resp.raise_for_status()
        data = resp.json()
        return {
            "checkout_url": data.get("url"),
            "session_id": data.get("session_id"),
        }
