from fastapi import APIRouter, Request
from services.intasend import create_checkout

router = APIRouter()

@router.post("/checkout")
async def checkout(amount: float, description: str, reference: str):
    session = await create_checkout("payment", amount, description, reference)
    return session

@router.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    # TODO: Verify IntaSend signature (HMAC)
    # Update user subscription in DB
    return {"status": "ok", "data": data}
