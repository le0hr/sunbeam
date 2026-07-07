import json
import time
from playwright.sync_api import sync_playwright


def calculate_price_per_m2(page, context_info=""):

    try:
        width_val = page.locator("#tov_width").input_value()
        height_val = page.locator("#tov_height").input_value()
        price_text = page.locator("#tov_price").inner_text()

        # Захист від порожніх значень або некоректних символів
        if not width_val or not height_val or not price_text:
            return None

        current_width = int(width_val) / 1000
        current_height = int(height_val) / 1000
        raw_price = float(price_text.replace(" ", "").strip())

        if current_width == 0 or current_height == 0:
            return "0.00"

        price_per_sq_m = round(raw_price / current_width / current_height, 2)
        return str(price_per_sq_m)
    except Exception as e:
        print(f" Помилка розрахунку ціни ({context_info}): {e}")
        return None


def parse_rolety(page):
    print("Категорія: РОЛЕТИ. Починаю збір...")
    product_list = []

    raw_title = page.locator("div.item-header-tovar-name").first.inner_text()
    if not raw_title:
        raw_title = "Ролета тканинна"

    page.wait_for_load_state("domcontentloaded")
    page.wait_for_timeout(1000)

    full_raw_text = page.locator("div.col-md-9").first.inner_text()

    # Знаходимо всі доступні типи систем (sys_type)
    sys_types_elements = page.locator("input[name='sys_type']").all()
    for s_type_el in sys_types_elements:
        s_type = s_type_el.get_attribute("value")

        s_type_name = page.locator(f"xpath=//input[@name='sys_type'][@value='{s_type}']/../div[@class='div_rb_text']").inner_text().strip()
        print(f"\n--- Працюю з типом системи: {s_type_name} ({s_type}) ---")

        s_type_el.check()
        page.wait_for_timeout(1000) # Даємо час JS оновити класи тканин
        
        class_selector = f"input[name='sys_class_{s_type}']"
        
        if page.locator(class_selector).count() > 0:
            # Знаходимо всі доступні класи тканини
            classes_elements = page.locator(class_selector).all()
            
            for s_class_el in classes_elements:
                s_class = s_class_el.get_attribute("value")
                if not s_class or s_class == "0": 
                    continue
                s_class_name = s_class_el.evaluate("el => el.parentElement.textContent").replace("\xa0", "").strip()
                s_class_description = s_class_el.evaluate(
                "el => { const label = el.closest('label'); const div = label ? label.querySelector('div[style*=\"text-align: justify\"]') : null; return div ? div.textContent : ''; }"
                ).strip()
                s_class_el.check()
                page.wait_for_timeout(1000)
                
                if page.locator("#div_sys_color").is_visible():
                    colors_elements = page.locator(f"input[name='sys_color__{s_class}']").all()
                    
                    for s_color_el in colors_elements:
                        s_color = s_color_el.get_attribute("value")
                        if not s_color: 
                            continue
                        s_color_name = s_color_el.evaluate("el => el.parentElement.textContent").replace("\xa0", "").strip()

                        s_color_el.check()
                        page.wait_for_timeout(1000)

                        price_per_m2 = calculate_price_per_m2(page, f"{s_type_name} -> {s_class_name} -> {s_color_name}")
                        '''
                        On donor site classes and types were several times confused among different products
                        In code above I named variables as they were at donor site
                        In code bellow I named it in right way\

                        Here I ad some definition:
                        sys_type is system open, close or neither
                        sys_class is "prestige" of the system, cheap or expensive materials
                        
                        
                        '''
                        if price_per_m2:
                            product_list.append({
                                "raw_title": raw_title,       # "Ролета Аврора"
                                "sys_type": s_class_name,  # "Відкрита система" 
                                "sys_class": s_type_name,  # "Престиж система"
                                "sys_class_description":s_class_description, #"Труба діаметром..."
                                "color": s_color_name,        # "Коричневий"
                                "price": str(price_per_m2)  # "650.00"
                            })
                            

                            
    return product_list, full_raw_text



def parse_plise(page):
    print("Категорія: ПЛІСЕ. Починаю збір...")
    
    product_list = []

    raw_title = page.locator("div.item-header-tovar-name").first.inner_text()
    if not raw_title:
        raw_title = "Плісе тканинна"
        
    # Початкове завантаження сторінки
    page.wait_for_load_state("domcontentloaded")
    page.wait_for_timeout(1000)
    
    # Збираємо унікальні інпути систем
    s_types_elements = page.locator("input[name=sys_type_radio]").all()

    for s_type_el in s_types_elements:
        s_type_name = s_type_el.evaluate("el => el.parentElement.textContent").replace("\xa0", "").strip()
        
        # Клікаємо по батьківському label поточного інпута системи через відносний XPath
        s_type_el.locator("xpath=..").click(force=True)
        # Даємо залізобетонний час (1.2 сек) на AJAX-перебудову DOM-дерева кольорів
        page.wait_for_timeout(1200) 
        
        s_type_description = page.locator("div.sys_type_info:visible").inner_text().strip()

        # Збираємо унікальні інпути кольорів, які згенерувалися для цієї системи
        s_colors_elements = page.locator("input[name=sys_color]").all()
        
        for s_color_el in s_colors_elements:
            if not s_color_el: 
                continue
            s_color_name = s_color_el.evaluate("el => el.parentElement.textContent").replace("\xa0", "").strip()
            
            # Клікаємо по батьківському label поточного інпута кольору
            s_color_el.locator("xpath=..").click(force=True)
            # 800 мс цілком достатньо для локального прорахунку ціни через JS
            page.wait_for_timeout(800) 
            
            price_per_m2 = calculate_price_per_m2(page, f"{s_type_name} -> {s_color_name}")
                            
            if price_per_m2:
                product_list.append({
                    "raw_title": raw_title,       # "Ролета Аврора"
                    "sys_class": s_type_name,     # "Преміум-Плюс"
                    "sys_class_description": s_type_description, #"Плісе кріпиться..."
                    "color": s_color_name,        # "Коричневий"
                    "price": str(price_per_m2)    # "650.00"
                })
            

    return product_list, None

def parse_zhalyuzi(page):
    print("Категорія: ЖАЛЮЗІ. Починаю збір...")
    
    raw_title = page.locator("div.item-header-tovar-name").first.inner_text()
    if not raw_title:
        raw_title = "Жалюзі"
    
    product_list = []

    page.wait_for_load_state("domcontentloaded")
    page.wait_for_timeout(1000)

    s_types_elements = page.locator("input[name=sys_type_radio]").all()
    for s_type_el in s_types_elements:
        s_type_name = s_type_el.evaluate("el => el.parentElement.textContent").replace("\xa0", "").strip()
        s_type_description = page.locator("div.sys_type_info:visible").inner_text().strip()
        s_type_el.check(force =True)

        page.wait_for_timeout(1000) # Даємо час на recalculate_price()

        s_zatemn_elements = page.locator("input[name = sys_zatemn]").all()
        for s_zatemn_el in s_zatemn_elements:
            if not s_zatemn_el: 
                continue
            s_zatemn_name = s_zatemn_el.evaluate("el => el.parentElement.textContent").replace("\xa0", "").strip()
            s_zatemn_el.check()
            page.wait_for_timeout(1000) # Даємо час на recalculate_price()
            
            price_per_m2 = calculate_price_per_m2(page, f"  -> {raw_title} | {s_type_name} | {s_type_description} | -> Затемнення: {s_zatemn_name} ")
            '''
            Zhalyuzi exists in two versions
            With or without holes
            So, I call this thing type of zhalyuzi
            '''
            if price_per_m2:
                product_list.append({
                    "raw_title": raw_title,       # "Біла"
                    "sys_class": s_type_name,     # "Преміум-Плюс"
                    "sys_class_description":s_type_description, #"Жалюзі кріпиться..."
                    "sys_type": s_zatemn_name,        # "Коричневий"
                    "price": str(price_per_m2)  # "650.00"
                })

    return product_list, None

def parse_moskitna(page):
    print("Категорія: МОСКІТНА СІТКА. Починаю збір...")
    raw_title = page.locator("div.item-header-tovar-name").first.inner_text()

    if not raw_title:
        raw_title = "Москітна"
    full_raw_text = page.locator("//div[contains(text(), 'Призначення:')]").inner_text()
    page.wait_for_load_state("domcontentloaded")
    page.wait_for_timeout(1000)
    product_list = []    
    price_per_m2 = calculate_price_per_m2(page, f"  -> {raw_title} | {full_raw_text} | ")
        
    if price_per_m2:        
        product_list.append({
            "raw_title": raw_title,       # "Ролета Аврора"
            "price": str(price_per_m2)  # "650.00"
        })
        
        
    return product_list, full_raw_text

def parse_valko_product(url):
    with sync_playwright() as p:
        # headless=False дозволяє бачити, як робот клікає на сторінці
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print(f"Відкриваю сторінку: {url}")
        page.goto(url, wait_until="domcontentloaded")
        
        page.fill("#tov_count", "1")
        page.fill("#tov_width", "1000")
        page.fill("#tov_height", "1000")
        page.evaluate("jQuery('#tov_width').change(); jQuery('#tov_height').change();")
        page.wait_for_timeout(1000)
        
        result_data = {
            "url": url,
            "category": "unknown",
            "description":"unknown",
            "matrix": {}
        }
        
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 1: РОЛЕТИ 
        # ---------------------------------------------------------------------
        if url.startswith("https://valko.ua/rolety"):
            result_data["category"] = "rolety"
            result_data["matrix"], result_data["description"] = parse_rolety(page)
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 2: ПЛІСЕ 
        # ---------------------------------------------------------------------
        elif url.startswith("https://valko.ua/plise") :
            result_data["category"] = "plise"
            result_data["matrix"], result_data["description"] = parse_plise(page)
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 3: ЖАЛЮЗІ 
        # ---------------------------------------------------------------------
        elif url.startswith("https://valko.ua/zhalyuzi"):
            result_data["category"] = "zhalyuzi"
            result_data["matrix"], result_data["description"] = parse_zhalyuzi(page)
        # ---------------------------------------------------------------------
        # СЦЕНАРІЙ 4: МОСКІТНА СІТКА 
        # ---------------------------------------------------------------------
        elif url.startswith("https://valko.ua/moskitna-sitka"):
            result_data["category"] = "moskitna-sitka"
            result_data["matrix"], result_data["description"] = parse_moskitna(page)
                
        else:
            print("Не вдалося визначити категорію або на сторінці немає динамічного калькулятора.")
            
        browser.close()
        return result_data


def start_parse_products(urls):
    all_products = []
    for url in urls:
        product_matrix = parse_valko_product(url)
        print("\nФІНАЛЬНИЙ МАТРИЧНИЙ JSON:")
        print(json.dumps(product_matrix, indent=4, ensure_ascii=False))
        print("=" * 60)
        all_products.append(product_matrix)
    return all_products

