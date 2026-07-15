from fastapi import APIRouter
from schemas import ProductResponse, SupplierProduct
from services import import_products
from api import internal_router


@internal_router.post("/products")
async def get_products(products: list[SupplierProduct]):
    await import_products(products)