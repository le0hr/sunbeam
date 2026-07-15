from fastapi import APIRouter
from schemas import ContactRequest
from api import api_router
from services import create_contact_service

@api_router.post("/contact")
async def create_contact(data:ContactRequest):
    return await create_contact_service(data)
