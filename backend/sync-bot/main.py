import requests, time, re, json
from parse_products import start_parse_products
from parse_catalog import start_parse_catalog
from woocommerce_interaction import update_products
from agent import agent_data
import httpx
import asyncio
async def main():
    # urls = start_parse_catalog()
    products = await start_parse_products(["https://valko.ua/rolety/roleta-a5"])
    enriched_products = agent_data(products)
    print(enriched_products)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://fastapi_backend:8000/internal/products",
                json=enriched_products,
            )
            print(response.status_code)
        print(response.text)
        response.raise_for_status()
        print('sended')
    except Exception as e:
        print(f"Помилка відправки товару: {e}")
        return
if __name__ == "__main__":
    asyncio.run(main())