from fastapi import APIRouter, Response
from schemas import ProductResponse
from services import fetch_products
from api import api_router


@api_router.get("/products", response_model=list[ProductResponse])
async def get_products(response: Response, categorySlug: str, page: int, per_page: int =12):
    
    products, pages_data =  await fetch_products(categorySlug, page, per_page)
    response.headers["X-Total"] = str(pages_data["total"])
    response.headers["X-Total-Pages"] = str(pages_data["total_pages"])

    return products