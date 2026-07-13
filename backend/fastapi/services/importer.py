from clients import wc
from .wc_mapper import build_product_query, build_variation_query
import traceback

async def import_products(products):
    print("IMPORT START", flush=True)
    for product in products:
        # print(product.url, flush=True)

        sku = product.url.split("/")[-1]

        print("before wc.get", flush=True)

        exists = await wc.get("/products", params={"sku": sku})

        print("after wc.get", flush=True)
        print(exists, flush=True)
        try:
            if not exists:
                print(2.1, flush=True)
                product_query = await build_product_query(product, sku)
                print(product_query, flush=True)
                created = await wc.post("/products", product_query)
                print(created, flush=True)
                print(created["meta_data"], flush=True)
                print(type(created["meta_data"]), flush=True)
                product_data = created

            else:
                print(2.2, flush=True)
                print(exists)
                product_data = exists[0]
                # print(product_data, flush =True)

            for variation in product.matrix:
                # print(3, flush=True)
                variation_query = build_variation_query(product_data['id'], variation, sku)
                # print(variation_query, flush = True)
                await wc.post(f"/products/{product_data['id']}/variations", variation_query)
        except Exception as e:
            print(type(e))
            print(repr(e))
            traceback.print_exc()