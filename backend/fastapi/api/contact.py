from fastapi import APIRouter
from schemas import ContactRequest, PurchaseRequest
from api import api_router
from services import request_consultation_service, purchase_request_service

@api_router.post("/contact/consultation")
async def request_consultation(data:ContactRequest):
    return await request_consultation_service(data)


@api_router.post("/contact/purchase")
async def request_purchase(data:PurchaseRequest):
    return await purchase_request_service(data)
