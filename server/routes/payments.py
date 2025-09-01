from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.intasend import create_checkout

router = APIRouter()

class CheckoutRequest(BaseModel):
    amount: float
    description: str
    reference: str

@router.post("/checkout")
async def checkout(body: CheckoutRequest):
    session = await create_checkout(
        mode="payment",
        amount=body.amount,
        description=body.description,
        reference=body.reference,
    )
    return session

@router.post("/webhook")
async def webhook(request: Request):
    data = await request.json()
    # TODO: Verify IntaSend signature (HMAC with INTASEND_API_KEY)
    # TODO: Mark user subscription as active in DB
    return {"status": "ok", "data": data}
