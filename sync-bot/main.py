import requests, time, re, json
from parse_products import start_parse_products
from parse_catalog import start_parse_catalog
def main():
    # urls = start_parse_catalog()
    products = start_parse_products(["https://valko.ua/zhalyuzi/zhalyuzi-1"])
    print(json.dumps(products, indent=4, ensure_ascii=False))

main()