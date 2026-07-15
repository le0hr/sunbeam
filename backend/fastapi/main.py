from fastapi import FastAPI
from api import api_router
from api import internal_router

app = FastAPI()

app.include_router(api_router)
app.include_router(internal_router)
for route in app.router.routes:
    print(type(route), route)