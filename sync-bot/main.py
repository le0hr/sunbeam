import requests, time, re, json
from parse_products import start_parse_products
from parse_catalog import start_parse_catalog
from woocommerce_interaction import update_products
from agent import agent_data
def main():
    # urls = start_parse_catalog()
    products = start_parse_products(["https://valko.ua/rolety/tkaninna-bila-skladki-f-2", "https://valko.ua/plise/persykovorozeva-711", "https://valko.ua/zhalyuzi/zhalyuzi-1", "https://valko.ua/moskitna-sitka/dveri-plisovana-plise-elit-dvostulkova-kutova-bila"])
    enriched_products = agent_data(products)
    update_products(enriched_products)
main()