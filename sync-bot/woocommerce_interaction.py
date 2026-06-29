from woocommerce import API
import json
from config import settings

# Настройка подключения к вашему сайту
wcapi = API(
    url=settings.WC_URL, # Ссылка на ваш сайт
    consumer_key=settings.WC_CK_API,
    consumer_secret=settings.WC_CS_API,
    version="wc/v3",
    timeout=60
)

def extract_attributes_and_meta(matrix):

    if not isinstance(matrix, list) or not matrix:
        return [], {}

    sys_types = set()
    sys_classes = set()
    sys_classes_description = {}
    colors = set()

    for item in matrix:
        sys_type = item.get("sys_type")
        sys_class = item.get("sys_class")
        sys_class_desc = item.get("sys_class_description")
        color = item.get("color")
        
        if sys_class:
            sys_classes.add(sys_class)
            if sys_class_desc:
                sys_classes_description[sys_class] = sys_class_desc
        if color:
            colors.add(color)
        if sys_type:
            sys_types.add(sys_type)

    attributes = []
    if sys_types:
        attributes.append({
            "name": "Тип системи",
            "visible": True,
            "variation": True, 
            "options": list(sys_types)
        })
    if sys_classes:
        attributes.append({
            "name": "Класс системи",
            "visible": True,
            "variation": True, 
            "options": list(sys_classes)
        })
    if colors:
        attributes.append({
            "name": "Колір",
            "visible": True,
            "variation": True,
            "options": list(colors)
        })

    # Формуємо структуру для мета-даних розширених описів
    meta_descriptions = {
        "Класс системи": {
            "value": sys_cl,
            "description": sys_cl_desc
        } for sys_cl, sys_cl_desc in sys_classes_description.items()
    }

    return attributes, meta_descriptions


def build_product_query(product, sku):
    """
    Фабрика запиту: формує структуру для WooCommerce на основі категорії та матриці.
    """
    category = product["category"]
    matrix = product.get("matrix", [])
    
    attributes, meta_descriptions = extract_attributes_and_meta(matrix)

    query = {
        "name": product["title"],
        "type": "variable",  # Якщо матриця порожня (як у жалюзі), робимо simple
        "description": product["description"],
        "sku": sku,
        "manage_stock": False,
        "categories": [{"id": 1}],  # У WooCommerce категорії передаються як список об'єктів ID
        "attributes": attributes
    }

    # Додаємо ліміти калькулятора в мета-дані, якщо вони є
    meta_data = []
    limits = product.get("calculator_limits", {})
    if any(limits.values()):  # Якщо хоча б одне поле не None
        meta_data.append({
            "key": "_calculator_limits",
            "value": json.dumps(limits, ensure_ascii=False)
        })

    # Додаємо описи систем у мета-дані
    if meta_descriptions:
        meta_data.append({
            "key": "_headless_attributes_descriptions",
            "value": json.dumps(meta_descriptions, ensure_ascii=False)
        })

    if meta_data:
        query["meta_data"] = meta_data

    return query


def create_product_variations(product_id, matrix, parent_sku):
    """
    Нова функція: створює модифікатори (варіації) для згенерованої картки товару
    """
    print(f"Починаю генерацію варіацій для товару ID: {product_id}...")
    
    for index, item in enumerate(matrix):
        # Пропускаємо, якщо це пустий рядок матриці
        if not item.get("price"):
            continue
            
        variation_attributes = []
        variation_sku_parts = [parent_sku]

        # Зв'язуємо комбінацію з атрибутами картки
        if "sys_class" in item:
            variation_attributes.append({"name": "Класс системи", "option": item["sys_class"]})
            variation_sku_parts.append(item["sys_class"])
        if "color" in item:
            variation_attributes.append({"name": "Колір", "option": item["color"]})
            variation_sku_parts.append(item["color"])
        if "sys_type" in item:
            variation_attributes.append({"name": "Тип системи", "option": item["sys_type"]})
            variation_sku_parts.append(item["sys_type"])

        # Якщо немає жодного динамічного атрибуту, варіації не потрібні (це Simple Product)
        if not variation_attributes:
            continue

        # Генеруємо унікальний SKU для варіації
        var_sku = "-".join(variation_sku_parts).replace(" ", "-").lower()

        variation_data = {
            "regular_price": str(item["price"]),
            "image": None, 
            "sku": var_sku,
            "manage_stock": False,
            "attributes": variation_attributes
        }

        try:
            v_res = wcapi.post(f"products/{product_id}/variations", variation_data)
            if v_res.status_code in [200, 201]:
                print(f"  -> Створено варіацію: {item.get('sys_class', '')} {item.get('color', '')} за {item['price']} грн/м²")
            else:
                print(f"  -> Помилка варіації {var_sku}: {v_res.text}")
        except Exception as e:
            print(f"  -> Критична помилка варіації {var_sku}: {e}")


def create_product(product):
    sku = product["url"].split("/")[-1]

    try:
        response = wcapi.get("products", params={"sku": sku})
        products = response.json()
    except Exception as e:
        print(f"Помилка перевірки SKU {sku}: {e}")
        return

    if products:
        print(f"Товар {sku} вже існує. Пропускаємо.")
        return

    query = build_product_query(product, sku)
    
    try:
        res = wcapi.post("products", query)
        if res.status_code in [200, 201]:
            created_product_data = res.json()
            product_id = created_product_data["id"]
            product_type = created_product_data["type"]
            print(f"Успішно створено картку товару: {sku} (ID: {product_id}, Тип: {product_type})")
            
            # 3. Якщо товар варіативний, запускаємо генерацію його модифікаторів
            if product_type == "variable" and isinstance(product.get("matrix"), list):
                create_product_variations(product_id, product["matrix"], sku)
        else:
            print(f"Помилка створення картки {sku}: {res.text}")
    except Exception as e:
        print(f"Критична помилка запиту для {sku}: {e}")



def update_products(products):
    for prod in products:
        create_product(prod)

# update_products(raw)