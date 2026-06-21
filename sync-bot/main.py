import requests, time, re
from bs4 import BeautifulSoup, Comment

urls = ["https://valko.ua/rolety", "https://valko.ua/plise", "https://valko.ua/zhalyuzi", "https://valko.ua/moskitna-sitka",]
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
product_urls = []


def process_page(url):
    try:
        time.sleep(1.5)
        response = requests.get(url, headers=headers)
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
            # Якщо посилання відносне (/item-1), робимо його абсолютним (https://valko.ua/item-1)
            full_url = href if href.startswith('http') else f"{"https://valko.ua"}{href}"
            if full_url not in product_urls:
                product_urls.append(full_url)

def main():
    for url in urls:
        soup = process_page(url)
        collect_links(soup)
        
    print(f"\nУсього знайдено посилань: {len(product_urls)}\n")
    print(product_urls)
    a = input()
    for product_url in product_urls:
        product_soup = process_page(product_url)
        if product_soup:
            print(f"Текст зі сторінки {product_url}:")
            print(product_soup.text.strip())


main()