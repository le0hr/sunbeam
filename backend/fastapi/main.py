from fastapi import FastAPI
from api import api_router
from api import internal_router

app = FastAPI()

app.include_router(api_router)
app.include_router(internal_router)


import time

@app.middleware("http")
async def timing(request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    print(f"{request.url.path}: {time.perf_counter() - start:.3f}s")
    return response