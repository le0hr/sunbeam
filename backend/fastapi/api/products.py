from fastapi import APIRouter
from schemas import ProductResponse
from services import fetch_products


api_router = APIRouter(prefix="/api")

@api_router.get("/products", response_model=list[ProductResponse])
async def get_products(page: int, per_page: int =12):
    return await fetch_products(page, per_page)