import json
import time
from playwright.sync_api import sync_playwright

def parse_rolety(page):
    print("Категорія: РОЛЕТИ. Починаю збір...")
    matrix = {}
    # Знаходимо всі доступні типи систем (sys_type)
    sys_types = page.locator("input[name='sys_type']").evaluate_all(
        "elements => elements.map(e => e.value)"
    )
    
    for s_type in sys_types:
        print(f"\n--- Працюю з типом системи: {s_type} ---")
        page.check(f"input[name='sys_type'][value='{s_type}']")
        page.wait_for_timeout(300) # Даємо час JS оновити класи тканин
        
        class_selector = f"input[name='sys_class_{s_type}']"
        
        if page.locator(class_selector).count() > 0:
            # Знаходимо всі доступні класи тканини
            classes = page.locator(class_selector).evaluate_all(
                "elements => elements.map(e => e.value)"
            )
            
            for s_class in classes:
                if not s_class or s_class == "0": 
                    continue
                
                page.check(f"input[name='sys_class_{s_type}'][value='{s_class}']")
                page.wait_for_timeout(300)
                
                if page.locator("#div_sys_color").is_visible():
                    colors = page.locator(f"input[name='sys_color__{s_class}']").evaluate_all(
                        "elements => elements.map(e => e.value)"
                    )
                    
                    for s_color in colors:
                        if not s_color: 
                            continue

                        page.check(f"input[name='sys_color__{s_class}'][value='{s_color}']")
                        page.wait_for_timeout(300)

                        page.wait_for_timeout(150) # Чекаємо на відпрацювання recalculate_price_v2()
                        
                        current_width = int(page.locator("#tov_width").input_value())/1000
                        current_hight = int(page.locator("#tov_height").input_value())/1000
                                    
                        price_text = int(page.locator("#tov_price").inner_text())/current_width/current_hight
                        print(f"  -> Комбінація: тип_{s_type} | клас_{s_class} | колір_{s_color} -> Ціна: {price_text}")
                        
                        key = f"type_{s_type}:class_{s_class}:color_{s_color}"
                        matrix[key] = float(price_text)
        return matrix

def parse_plise(page):
    print("Категорія: ПЛІСЕ. Починаю збір...")
    
    matrix = {}    
    types = page.locator("input[name=sys_type_radio]").evaluate_all(
            "elements => elements.map(e => e.id)"
        )
    for type in types:
        page.check(f"#{type}", force =True)
        page.wait_for_timeout(250) # Даємо час на recalculate_price()

        colors = page.locator("input[name = sys_color]").evaluate_all(
            "elements => elements.map(e => e.value)"
        )
        for s_color in colors:
            if not s_color: 
                continue
                
            page.check(f"input[name='sys_color'][value='{s_color}']")
            page.wait_for_timeout(250) # Даємо час на recalculate_price()
            
            current_width = int(page.locator("#tov_width").input_value())/1000
            current_hight = int(page.locator("#tov_height").input_value())/1000
                        
            price_text = int(page.locator("#tov_price").inner_text())/current_width/current_hight
            print(f"  -> Колір: {s_color} -> Ціна: {price_text}")
            
            key = f"color_{s_color}"
            matrix[key] = float(price_text)
    return matrix

def parse_zhalyuzi(page):
    print("Категорія: ЖАЛЮЗІ. Починаю збір...")
    matrix = {}    

    types = page.locator("input[name=sys_type_radio]").evaluate_all(
            "elements => elements.map(e => e.id)"
        )
    for type in types:
        page.check(f"#{type}", force =True)
        page.wait_for_timeout(250) # Даємо час на recalculate_price()

        zatemn = page.locator("input[name = sys_zatemn]").evaluate_all(
            "elements => elements.map(e => e.value)"
        )
        for s_z in zatemn:
            if not s_z: 
                continue
                
            page.check(f"input[name='sys_zatemn'][value='{s_z}']")
            page.wait_for_timeout(250) # Даємо час на recalculate_price()
            
            current_width = int(page.locator("#tov_width").input_value())/1000
            current_hight = int(page.locator("#tov_height").input_value())/1000
                
            price_text = int(page.locator("#tov_price").inner_text())/current_width/current_hight
            print(f"  -> Тип: {type}-> Затемнюючі: {s_z} -> Ціна: {price_text}")
            
            key = f"zatemn_{s_z}"
            matrix[key] = float(price_text)
    return matrix

def parse_moskitna(page):
    print("Категорія: МОСКІТНА СІТКА. Починаю збір...")
    matrix = {}    

    current_width = int(page.locator("#tov_width").input_value())/1000
    current_hight = int(page.locator("#tov_height").input_value())/1000
                
    price_text = int(page.locator("#tov_price").inner_text())/current_width/current_hight
    print(f" -> Ціна: {price_text}")
    
    key = f"0"
    matrix[key] = float(price_text)
    return matrix

def parse_valko_product(url):
    with sync_playwright() as p:
        # headless=False дозволяє бачити, як робот клікає на сторінці
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        print(f"Відкриваю сторінку: {url}")
        page.goto(url, wait_until="domcontentloaded")
        
        page.fill("#tov_count", "1")
        page.fill("#tov_width", "1000")
        page.fill("#tov_height", "1000")
        page.evaluate("jQuery('#tov_width').change(); jQuery('#tov_height').change();")
        page.wait_for_timeout(300)
        
        result_data = {
            "url": url,
            "category": "unknown",
            "matrix": {}
        }
        
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 1: РОЛЕТИ 
        # ---------------------------------------------------------------------
        if url.startswith("https://valko.ua/rolety"):
            result_data["category"] = "rolety"
            result_data["matrix"] = parse_rolety(page)
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 2: ПЛІСЕ 
        # ---------------------------------------------------------------------
        elif url.startswith("https://valko.ua/plise") :
            result_data["category"] = "plise"
            result_data["matrix"] = parse_plise(page)
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 3: ЖАЛЮЗІ 
        # ---------------------------------------------------------------------
        elif url.startswith("https://valko.ua/zhalyuzi"):
            result_data["category"] = "zhalyuzi"
            result_data["matrix"] = parse_zhalyuzi(page)
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 4: МОСКІТНА СІТКА 
        # ---------------------------------------------------------------------
        elif url.startswith("https://valko.ua/moskitna-sitka"):
            result_data["category"] = "moskitna-sitka"
            result_data["matrix"] = parse_moskitna(page)
                
        else:
            print("Не вдалося визначити категорію або на сторінці немає динамічного калькулятора.")
            
        browser.close()
        return result_data


# =====================================================================
# ТЕСТОВИЙ ЗАПУСК
# =====================================================================
def start(urls):
    
    for url in urls:
        product_matrix = parse_valko_product(url)
        print("\nФІНАЛЬНИЙ МАТРИЧНИЙ JSON:")
        print(json.dumps(product_matrix, indent=4, ensure_ascii=False))
        print("=" * 60)