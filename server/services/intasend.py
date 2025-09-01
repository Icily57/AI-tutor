import os
import httpx

INTASEND_API_KEY = os.getenv("INTASEND_API_KEY")
INTASEND_ENV = os.getenv("INTASEND_ENV", "sandbox")
APP_URL = os.getenv("APP_URL", "http://localhost:5173")

BASE_URL = "https://sandbox.intasend.com" if INTASEND_ENV == "sandbox" else "https://api.intasend.com"


async def create_checkout(mode: str, amount: float, description: str, reference: str):
    """
    Creates a checkout session with IntaSend.
    mode: "payment" | "subscription"
    amount: float
    description: str
    reference: str (your internal order or user ID)
    """

    url = f"{BASE_URL}/api/v1/checkout/"

    headers = {
        "Authorization": f"Bearer {INTASEND_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "amount": amount,
        "currency": "KES",  # adjust if you need USD or others
        "api_ref": reference,
        "redirect_url": f"{APP_URL}/billing/success",
        "callback_url": f"{APP_URL}/api/payments/webhook",
        "mode": mode,
        "description": description,
    }

    async with httpx.AsyncClient() as client:
        resp = await client.post(url, headers=headers, json=payload)
        resp.raise_for_status()
        return resp.json()
