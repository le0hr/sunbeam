import json
import os
from google import genai
from google.genai import types
from pydantic import BaseModel
from config import settings
# 1. Ініціалізація клієнта (ключ береться з системних змінних)
client = genai.Client(api_key=settings.GOOGLE_API)

for model in client.models.list():
    print(model.name)

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
def enrich_product(product):
    prompt = f"""
    Проаналізуй цей товар:
    Категорія: {product['category']}
    Опис від донора: {product['description']}
    Назва модифікації: {product['matrix'][0].get('raw_title', '') if product['matrix'] else ''}
    
    Згенеруй новий опис (без плагіату, привабливий для покупця), витягни ліміти розмірів.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type="application/json",
                response_schema=ProductEnrichment,
                temperature=0.2 # Низька температура для точності цифр
            ),
        )
        # Перетворюємо текстову відповідь ШІ назад у Python-словник
        return json.loads(response.text)
    except Exception as e:
        print(f"Помилка обробки товару {product['url']}: {e}")
        return None

def agent_data(raw_data):
    enriched_catalog = []
    for product in raw_data:
        print(f"Обробка: {product['url']}...")
        ai_data = enrich_product(product)
        
        
        if ai_data:
            # Склеюємо старі дані (ціни, категорію) з новими даними від ШІ
            enriched_item = {
                "url": product["url"],
                "category": product["category"],
                "title": ai_data["seo_title"],
                "description": ai_data["clean_description"],
                "calculator_limits": {
                    "min_width": ai_data["min_width"],
                    "max_width": ai_data["max_width"],
                    "min_height": ai_data["min_height"],
                    "max_height": ai_data["max_height"],
                    "min_area": ai_data["min_area"]
                },
                "matrix": product["matrix"]
            }
            enriched_catalog.append(enriched_item)
    return enriched_catalog 
