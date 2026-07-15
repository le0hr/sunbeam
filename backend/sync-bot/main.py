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
        "https://valko.ua/rolety/tkanynna-sribno-bila-perlamutrova-e-1",



        "https://valko.ua/plise/persykovorozeva-711",
        "https://valko.ua/plise/sira-kvity-708",
        "https://valko.ua/plise/bila-zhorzhyna-709",
        "https://valko.ua/plise/salatova-ovaly-205",
        "https://valko.ua/plise/bezheva-romb-dribnyj-704",
        "https://valko.ua/plise/teksturovana-synia-306",
        "https://valko.ua/plise/sira-romb-shovkovyi-702",
        "https://valko.ua/plise/rozheva-ovaly-201",
        "https://valko.ua/plise/bila-venzel-shovk-706",
        "https://valko.ua/plise/ajvori-smuga-504",
        "https://valko.ua/plise/blakytna-odnotonna",
        "https://valko.ua/plise/bilochorna-romb-dribnyj-705",
        "https://valko.ua/plise/blakytna-ovaly-202",



        "https://valko.ua/zhalyuzi/zhalyuzi-1",
        "https://valko.ua/zhalyuzi/korychneva",
        "https://valko.ua/zhalyuzi/sribni",
        "https://valko.ua/zhalyuzi/chorni",
        "https://valko.ua/zhalyuzi/slonova-kistka-ral-1013",
        "https://valko.ua/zhalyuzi/antratsyt-ral-7024",
        "https://valko.ua/zhalyuzi/svitlo-korychneva-ral-8003",


        "https://valko.ua/moskitna-sitka/dveri-plisovana-plise-elit-dvostulkova-kutova-bila",
        "https://valko.ua/moskitna-sitka/moskitna-sitka-plise-chorna",
        "https://valko.ua/moskitna-sitka/ekonom-bila",
        "https://valko.ua/moskitna-sitka/ekonom-bila-na-zavisakh",
        "https://valko.ua/moskitna-sitka/standart-bila",
        "https://valko.ua/moskitna-sitka/ekonom-korychneva",
        "https://valko.ua/moskitna-sitka/ekonom-korychneva-na-zavisakh",
        "https://valko.ua/moskitna-sitka/standart-korychneva",
        "https://valko.ua/moskitna-sitka/standart-antracyt",
        "https://valko.ua/moskitna-sitka/vikno-ramkova-eksklyuziv-antratsit",
        "https://valko.ua/moskitna-sitka/vikno-ramkova-eksklyuziv-bila",
        "https://valko.ua/moskitna-sitka/vikno-ramkova-eksklyuziv-korychneva",
        "https://valko.ua/moskitna-sitka/premium-antratsyt"



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

async def main():
    while True:
        try:
            await job()
        except Exception as e:
            print(e)

        # чекати 24 години
        await asyncio.sleep(24 * 60 * 60)


if __name__ == "__main__":
    asyncio.run(main())

