import requests, time, re, json
from parse_products import start_parse_products
from parse_catalog import start_parse_catalog
from woocommerce_interaction import update_products
from agent import agent_data
import httpx
import asyncio
async def job():
    # urls = start_parse_catalog()
    # Тестові товари щоб економить токени
    urls = [
        "https://valko.ua/rolety/tkanynna-bila-z-tkanoiy-smuzhkoiy-i-4",
        "https://valko.ua/rolety/tkanynna-bila-z-chornoiy-smuzhkoiy-i-3",
        "https://valko.ua/rolety/tkanynna-prozora-zolotysta-i-2",
        "https://valko.ua/rolety/tkaninna-lon-skladki-f-1",
        "https://valko.ua/rolety/tkaninna-bila-skladki-f-2",
        "https://valko.ua/rolety/tkaninna-svitlo-zhowta-skladki-f-3",
        "https://valko.ua/rolety/dn-107",
        "https://valko.ua/rolety/tkanynna-bila-prozora-khvyli-h-1",
        "https://valko.ua/rolety/dn-802",
        "https://valko.ua/rolety/dn-110",
        "https://valko.ua/rolety/tkanynna-zhowta-prozora-khvyli-h-2",
        "https://valko.ua/rolety/tkanynna-sira-prozora-khvyli-h-3",
        "https://valko.ua/rolety/zebrano-4",
        "https://valko.ua/rolety/tkanynna-sribno-bila-perlamutrova-e-1"
    ]
    products = await start_parse_products(urls)
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

async def main():
    while True:
        try:
            await job()
        except Exception as e:
            print(e)

        # чекати 24 години
        await asyncio.sleep(24 * 60 * 60)
