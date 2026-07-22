import requests, time, re, json
from parse_products import start_parse_products
from parse_catalog import start_parse_catalog
from woocommerce_interaction import update_products
from agent import agent_data
import httpx
import asyncio

import faulthandler
import signal
import sys

faulthandler.enable()

# щоб можна було отримати traceback по сигналу
faulthandler.register(signal.SIGUSR1)



async def main():
    

    print("1")
    urls = start_parse_catalog()

    print("2")
    products = await start_parse_products(urls)

    print("3")          

    print("4")
    enriched_products = agent_data(products)

    print("5")
    print(enriched_products)
    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.post(
                "http://fastapi_backend:8000/internal/products",
                json=enriched_products,
            )
            print(response.status_code)
        print(response.text)
        response.raise_for_status()
        print('sended')
    except Exception as e:
        print(f"Помилка при відправці запиту: {e}")
        print(type(e))
        print(repr(e))





if __name__ == "__main__":
    asyncio.run(main())

