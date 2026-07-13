from typing import Any
from pydantic import BaseModel


class Meta(BaseModel):
    id: int | None = None 
    key: str
    value: Any

class AttributeResponse(BaseModel):
    id: int
    name: str
    slug: str
    option: str

class VariationResponse(BaseModel):
    id: int
    price: str
    attributes: list[AttributeResponse]

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    type: str
    price: str
    images: list[dict] = []
    variations: list[VariationResponse]
    meta_data: list[Meta] = []
    categories: list[dict] = []


class SupplierProduct(BaseModel):
    url: str
    category: str
    title: str
    img: str
    description: str
    calculator_limits: dict
    matrix: list[dict]
