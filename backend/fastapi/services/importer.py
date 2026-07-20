from clients import wc
from .wc_mapper import build_product_query, build_variation_query
import traceback

async def import_products(products):
    print("IMPORT START", flush=True)
    for product in products:
        # print(product.url, flush=True)

        slug = product.url.rstrip("/").split("/")[-1]
        print("before wc.get", flush=True)

        product_exists = await wc.get("/products", params={"sku": slug})

        print("after wc.get", flush=True)
        print(product_exists, flush=True)
        try:
            product_query = await build_product_query(product, slug)
            print(product_query, flush=True)
            
            if not product_exists:
                print(f"Створюю продукт {slug}", flush = True)
                created = await wc.post("/products", product_query)
                product_id = created['id']

            else:
                print(f"Оновлюю продукт {slug}", flush = True)

                product_id = product_exists[0]['id']
                await wc.put(f"/products/{product_id}", product_query)

            existing_variations = await wc.get(f"/products/{product_id}/variations", params={"per_page": 100}
            )

            id_by_sku = {
                variation["sku"]: variation["id"]
                for variation in existing_variations
            }

            print("Створюю варіації", flush=True)
            for variation in product.matrix:
                print()
                variation_query, var_sku = build_variation_query(product_id, variation, slug)
                variation_id = id_by_sku.get(var_sku)
                if variation_id:
                    await wc.put(f"/products/{product_id}/variations/{variation_id}", variation_query)
                else:
                    await wc.post(f"/products/{product_id}/variations", variation_query)
                    
        except Exception as e:
            print(type(e))
            print(repr(e))
            traceback.print_exc()