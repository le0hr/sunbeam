import json
import os
from google import genai
from google.genai import types
from pydantic import BaseModel
from config import settings
import time
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeoutError

# 1. Ініціалізація клієнта (ключ береться з системних змінних)
client = genai.Client(api_key=settings.GOOGLE_API)

# 2. Створюємо суворий системний промпт для ШІ
system_instruction = """
Ти — контент-менеджер інтернет-магазину сонцезахисних систем та москітних сіток. 
Твоє завдання — проаналізувати вхідний JSON товару, витягнути технічні ліміти , особливості товару та згенерувати унікальний SEO-опис українською мовою.
Ліміти шукай як й в description, так й в system description.
Повертай відповідь СУВОРO у форматі JSON згідно з визначеною структурою. Якщо лімітів немає в описі, став null
Назва немає бути довгою, лише те що характеризує товар.

"""

# Описуємо структуру, яку хочемо отримати на виході (Structured Outputs)
class ProductEnrichment(BaseModel):
    seo_title: str       # Красива назва для WooCommerce
    clean_description: str # Унікальний текст для клієнта (3-4 речення)
    min_width: int | None
    max_width: int | None
    min_height: int | None
    max_height: int | None
    min_area: float | None

# 3. Функція обробки одного товару

_executor = ThreadPoolExecutor(max_workers=1)

def enrich_product(product):
    prompt = f"""
    Проаналізуй цей товар:
    Категорія: {product['category']}
    Опис від донора: {product['description']}
    Назва модифікації: {product['matrix'][0].get('raw_title', '') if product['matrix'] else ''}

    Згенеруй новий опис (без плагіату, привабливий для покупця), витягни ліміти розмірів.
    """

    try:
        print("=" * 80, flush=True)
        print(f"START enrich_product: {product['url']}", flush=True)

        start = time.monotonic()

        print("1. submit()", flush=True)

        future = _executor.submit(
            client.models.generate_content,
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=ProductEnrichment,
                temperature=0.2,
            ),
        )

        print("2. submitted", flush=True)

        response = future.result(timeout=60)

        print(f"3. response received ({time.monotonic() - start:.2f}s)", flush=True)

        print(f"4. response type: {type(response)}", flush=True)

        print("5. response.text access", flush=True)
        text = response.text

        print("6. response.text ok", flush=True)
        print(f"7. response length: {len(text)}", flush=True)
        print(f"8. response preview: {text[:300]}", flush=True)

        print("9. json.loads()", flush=True)
        data = json.loads(text)

        print("10. json ok", flush=True)
        print(f"11. keys: {list(data.keys())}", flush=True)

        print(f"END enrich_product ({time.monotonic() - start:.2f}s)", flush=True)

        return data

    except FutureTimeoutError:
        print(f"GEMINI TIMEOUT: {product['url']}", flush=True)
        return None

    except Exception as e:
        print(f"EXCEPTION enrich_product: {product['url']}", flush=True)
        print(type(e), flush=True)
        print(repr(e), flush=True)
        return None


def agent_data(raw_data):
    enriched_catalog = []

    print("=" * 80, flush=True)
    print(f"START agent_data. Products: {len(raw_data)}", flush=True)

    for index, product in enumerate(raw_data, start=1):
        print("=" * 80, flush=True)
        print(f"[{index}/{len(raw_data)}]", flush=True)
        print(f"URL: {product['url']}", flush=True)

        print("A. before enrich_product()", flush=True)

        ai_data = enrich_product(product)

        print("B. after enrich_product()", flush=True)

        if ai_data is None:
            print("C. ai_data is None", flush=True)
            continue

        print("D. building enriched_item", flush=True)

        enriched_item = {
            "url": product["url"],
            "category": product["category"],
            "img": product["matrix"][0]["img"],
            "title": ai_data["seo_title"],
            "description": ai_data["clean_description"],
            "calculator_limits": {
                "min_width": ai_data["min_width"],
                "max_width": ai_data["max_width"],
                "min_height": ai_data["min_height"],
                "max_height": ai_data["max_height"],
                "min_area": ai_data["min_area"],
            },
            "matrix": product["matrix"],
        }

        print("E. enriched_item built", flush=True)

        enriched_catalog.append(enriched_item)

        print("F. appended", flush=True)
        print(f"G. catalog size = {len(enriched_catalog)}", flush=True)

    print("=" * 80, flush=True)
    print("END agent_data", flush=True)
    print(f"Final products: {len(enriched_catalog)}", flush=True)

    return enriched_catalog