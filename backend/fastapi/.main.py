# import traceback
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import httpx
# import asyncio
# from pydantic import BaseModel
# from typing import Any
# import os
# import hmac
# import hashlib
# import base64
# import time
# import urllib.parse
# from backend.fastapi.utils.oauth import OAuth
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "https://your-frontend-domain.com"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # wcapi = API(
# #     url=os.getenv("WC_URL"),
# #     consumer_key=os.getenv("WC_CK_API"),
# #     consumer_secret=os.getenv("WC_CS_API"),
# #     version="wc/v3",
# #     wp_api=True,
# #     timeout=30
# # )

# class Meta(BaseModel):
#     id: int | None = None 
#     key: str
#     value: Any

# class VariationResponse(BaseModel):
#     id: int
#     price: float
#     attributes: list[str]

# class ProductResponse(BaseModel):
#     id: int
#     name: str
#     description: str
#     type: str
#     price: str
#     images: list[dict] = []
#     variations: list[VariationResponse]
#     meta_data: list[Meta] = []


# async def get_variations(client: httpx.AsyncClient, product_id: int) -> list:
#     full_url = (
#         f"{os.getenv('WC_URL')}"
#         f"/wp-json/wc/v3/products/{product_id}/variations"
#     )

#     oauth = OAuth(
#         url=full_url,
#         consumer_key=os.getenv("WC_CK_API"),
#         consumer_secret=os.getenv("WC_CS_API"),
#         version="wc/v3",
#         method="GET",
#     )

#     signed_url = oauth.get_oauth_url()
#     print("SIGNED variation:", signed_url)
#     try:
#         response = await client.get(signed_url)
        
#         if response.status_code != 200:
#             print(f"WOO SDK VARIATIONS ERROR: {response.status_code} - {response.text}", flush=True)
#             raise HTTPException(status_code=response.status_code, detail="WooCommerce SDK Error")
            
#         return response.json()
#     except Exception as e:
#         traceback.print_exc()
#         raise HTTPException(status_code=500, detail=str(e))
        
# @app.get("/api/products", response_model=list[ProductResponse])
# async def get_products(page: int = 1, per_page: int = 12):

#     print(f"DEBUG: SDK sending request for slug: {page}", flush=True)
#     params = {
#         "page": page,
#         "per_page": per_page,
#     }

#     encoded = urllib.parse.urlencode(params)

#     full_url = (
#         f"{os.getenv('WC_URL')}"
#         f"/wp-json/wc/v3/products?{encoded}"
#     )

#     oauth = OAuth(
#         url=full_url,
#         consumer_key=os.getenv("WC_CK_API"),
#         consumer_secret=os.getenv("WC_CS_API"),
#         version="wc/v3",
#         method="GET",
#     )

#     signed_url = oauth.get_oauth_url()
#     print("SIGNED:", signed_url)
#     async with httpx.AsyncClient(base_url=os.getenv("WC_URL"), timeout=30.0) as client:
#         print(f"DEBUG: SDK sending request for slug: {page}", flush=True)
#         try:
#             products_res = await client.get(signed_url)
            
#             if products_res.status_code != 200:
#                 raise HTTPException(
#                     status_code=products_res.status_code,
#                     detail=products_res.text
#                 )
                
#             products = products_res.json()


#             async with asyncio.TaskGroup() as tg:
#                 # Список тасків для асинхронного клієнта 
#                 tasks = []
                
#                 for product in products:
#                     if product.get("type") == "variable":
#                         task = tg.create_task(get_variations(client, product["id"]))
#                         tasks.append(task)

#             for task_index, task in enumerate(tasks):
#                 products[task_index]["variations"] = task.result()

#             return products
#         except HTTPException as http_err:
#             raise http_err
#         except Exception as e:
#             print("\n!!! CRITICAL ERROR INSIDE WOOCOMMERCE SDK !!!", flush=True)
#             traceback.print_exc()
#             raise HTTPException(status_code=500, detail=str(e))