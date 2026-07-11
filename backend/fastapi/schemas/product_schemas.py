from typing import Any
from pydantic import BaseModel


class Meta(BaseModel):
    id: int | None = None 
    key: str
    value: Any

class VariationResponse(BaseModel):
    id: int
    price: float
    attributes: list[str]

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    type: str
    price: str
    images: list[dict] = []
    variations: list[VariationResponse]
    meta_data: list[Meta] = []

