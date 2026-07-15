from pydantic import BaseModel

class ContactRequest(BaseModel):
    name: str
    phone: str