import requests, time, re
from bs4 import BeautifulSoup, Comment

urls = [
    # "https://valko.ua/rolety",
        #  "https://valko.ua/plise",
            "https://valko.ua/zhalyuzi",
            #  "https://valko.ua/moskitna-sitka",
             ]
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
product_urls = []

ignored_urls = {
    'https://valko.ua/rolety',
    'https://valko.ua/plise',
    'https://valko.ua/zhalyuzi',
    'https://valko.ua/moskitna-sitka',
    'https://valko.ua/moskitna-sitka/na-vikno',
    'https://valko.ua/moskitna-sitka/na-dveri',
    'https://valko.ua/moskitna-sitka/roletna',
    'https://valko.ua/moskitna-sitka/antykishka',
    'https://valko.ua/moskitna-sitka/rozsuvna',
    'https://valko.ua/moskitna-sitka/plise',
    'https://valko.ua/rolety/den-nich',
    'https://valko.ua/rolety/tkanynna',
    'https://valko.ua/rolety/blackout',
}

def process_page(url):
    try:
        time.sleep(1)
        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            return None

        soup = BeautifulSoup(response.text, "html.parser")

        start_comment = soup.find(string=lambda text: isinstance(text, Comment) and text.strip() == "підписатися на розсилку")

        result_html = ""

        if start_comment:
            for sibling in start_comment.next_siblings:
                if isinstance(sibling, Comment) and sibling.strip() == "карусель брендів":
                    break
                result_html += str(sibling)
        
        if not result_html.strip():
            return None
        time.sleep(1)
        
        soup = BeautifulSoup(result_html, 'html.parser')
        return soup

    except Exception as e:
        print(f"Помилка на сторінці {url}: {e}")


def collect_links(soup):   
    if not soup:
        return
     
    links = soup.find_all('a') 
    for link in links:
        href = link.get('href')
        if href:
            full_url = href if href.startswith('http') else f"https://valko.ua{href}"

            if "/page-" in full_url:
                continue
                
            # 2. Ігноруємо посилання на самі категорії
            if full_url in ignored_urls:
                continue

            if full_url not in product_urls:
                product_urls.append(full_url)

def start_parse_catalog():
    for url in urls:
        c=1
        while True:
            soup = process_page(url+"/page-"+str(c))
            if soup == None:
                break
            old_num = len(product_urls)
            collect_links(soup)
            new_num = len(product_urls)
            if new_num == old_num:
                print(".")
                break
            c+=1
            print(len(product_urls))
        
    print(f"\nУсього знайдено посилань: {len(product_urls)}\n")
    return product_urls