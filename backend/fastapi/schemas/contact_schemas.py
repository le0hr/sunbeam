from pydantic import BaseModel
class ContactRequest(BaseModel):
    name: str
    phone: str

class PurchaseRequest(BaseModel):
    id: int
    parent_id: int
    price: int
    width: int
    height: int
    name: str
    phone: str
