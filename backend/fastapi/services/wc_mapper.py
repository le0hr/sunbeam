import json
from config import settings

def fix_urls(products):
    for product in products:
        for image in product.get("images", []):
            image["src"] = image["src"].replace(settings.WC_URL, settings.SITE_URL)
    print("....." + str(products), flush=True)
    return products

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
    category = product.category
    matrix = product.matrix
    
    attributes, meta_descriptions = extract_attributes_and_meta(matrix)

    query = {
        "name": product.title,
        "type": "variable",  # Якщо матриця порожня (як у жалюзі), робимо simple
        "description": product.description,
        "sku": sku,
        "manage_stock": False,
        "categories": [{"id": 1}],  # У WooCommerce категорії передаються як список об'єктів ID
        "attributes": attributes,
        "images": [{"src": product.img}]
    }

    # Додаємо ліміти калькулятора в мета-дані, якщо вони є
    meta_data = []
    limits = product.calculator_limits
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


def build_variation_query(product_id, matrix, parent_sku):
    """
    Нова функція: створює модифікатори (варіації) для згенерованої картки товару
    """
    print(f"Починаю генерацію варіацій для товару ID: {product_id}...")
    print(matrix, flush=True)
        
    variation_attributes = []
    variation_sku_parts = [parent_sku]

    # Зв'язуємо комбінацію з атрибутами картки
    if "sys_class" in matrix:
        variation_attributes.append({"name": "Класс системи", "option": matrix["sys_class"]})
        variation_sku_parts.append(matrix["sys_class"])
    if "color" in matrix:
        variation_attributes.append({"name": "Колір", "option": matrix["color"]})
        variation_sku_parts.append(matrix["color"])
    if "sys_type" in matrix:
        variation_attributes.append({"name": "Тип системи", "option": matrix["sys_type"]})
        variation_sku_parts.append(matrix["sys_type"])


    # Генеруємо унікальний SKU для варіації
    var_sku = "-".join(variation_sku_parts).replace(" ", "-").lower()

    variation_data = {
        "regular_price": str(matrix["price"]),
        "image": None, 
        "sku": var_sku,
        "manage_stock": False,
        "attributes": variation_attributes
    }

    return variation_data
