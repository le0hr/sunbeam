import os
import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from woocommerce import API  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

wcapi = API(
    url=os.getenv("WC_URL"),
    consumer_key=os.getenv("WC_CK_API"),
    consumer_secret=os.getenv("WC_CS_API"),
    version="wc/v3",
    wp_api=True,
    timeout=30
)

@app.get("/products/{product_id}/variations")
def get_variations(product_id: int):
    try:
        response = wcapi.get(f"products/{product_id}/variations")
        
        if response.status_code != 200:
            print(f"WOO SDK VARIATIONS ERROR: {response.status_code} - {response.text}", flush=True)
            raise HTTPException(status_code=response.status_code, detail="WooCommerce SDK Error")
            
        return response.json()
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
        
@app.get("/products")
def get_products_by_slug(slug: str):
    print(f"DEBUG: SDK sending request for slug: {slug}", flush=True)
    try:
        response = wcapi.get("products", params={"slug": slug})
        
        if response.status_code != 200:
            print(f"WOO SDK PRODUCTS ERROR: {response.status_code} - {response.text}", flush=True)
            raise HTTPException(status_code=response.status_code, detail="WooCommerce SDK error")
            
        return response.json()
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        print("\n!!! CRITICAL ERROR INSIDE WOOCOMMERCE SDK !!!", flush=True)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))