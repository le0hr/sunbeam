from fastapi import APIRouter
from schemas import ProductResponse, SupplierProduct
from services import import_products


internal_router = APIRouter(prefix="/internal")

@internal_router.post("/products")
async def get_products(products: list[SupplierProduct]):
    print(products)
    await import_products(products)