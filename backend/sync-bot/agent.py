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

        try:
            print("D1. product keys", flush=True)
            print(product.keys(), flush=True)

            print("D2. matrix", flush=True)
            matrix = product["matrix"]
            print(type(matrix), flush=True)
            print(f"matrix len = {len(matrix)}", flush=True)

            print("D3. first matrix item", flush=True)
            first = matrix[0]
            print(type(first), flush=True)
            print(first.keys(), flush=True)

            print("D4. url", flush=True)
            url = product["url"]
            print(url, flush=True)

            print("D5. category", flush=True)
            category = product["category"]
            print(category, flush=True)

            print("D6. img", flush=True)
            img = first["img"]
            print(img, flush=True)

            print("D7. title", flush=True)
            title = ai_data["seo_title"]
            print(title, flush=True)

            print("D8. description", flush=True)
            description = ai_data["clean_description"]
            print(description[:100], flush=True)

            print("D9. min_width", flush=True)
            min_width = ai_data["min_width"]
            print(min_width, flush=True)

            print("D10. max_width", flush=True)
            max_width = ai_data["max_width"]
            print(max_width, flush=True)

            print("D11. min_height", flush=True)
            min_height = ai_data["min_height"]
            print(min_height, flush=True)

            print("D12. max_height", flush=True)
            max_height = ai_data["max_height"]
            print(max_height, flush=True)

            print("D13. min_area", flush=True)
            min_area = ai_data["min_area"]
            print(min_area, flush=True)

            print("D14. limits", flush=True)
            limits = {
                "min_width": min_width,
                "max_width": max_width,
                "min_height": min_height,
                "max_height": max_height,
                "min_area": min_area,
            }
            print(limits, flush=True)

            print("D15. creating dict", flush=True)

            enriched_item = {
                "url": url,
                "category": category,
                "img": img,
                "title": title,
                "description": description,
                "calculator_limits": limits,
                "matrix": matrix,
            }

            print("D16. dict created", flush=True)
            print(type(enriched_item), flush=True)

            print("D17. append()", flush=True)
            enriched_catalog.append(enriched_item)

            print("D18. appended", flush=True)
            print(f"Catalog size = {len(enriched_catalog)}", flush=True)

        except Exception as e:
            print("EXCEPTION while building enriched_item", flush=True)
            print(type(e), flush=True)
            print(repr(e), flush=True)
            import traceback
            traceback.print_exc()
            continue

    print("=" * 80, flush=True)
    print("END agent_data", flush=True)
    print(f"Final products: {len(enriched_catalog)}", flush=True)

    return enriched_catalog