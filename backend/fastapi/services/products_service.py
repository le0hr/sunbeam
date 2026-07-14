from clients import wc
import asyncio
from .wc_mapper import fix_urls

async def fetch_products(categorySlug, page: int, per_page: int = 12):

    categories = await wc.get(
        "/products/categories",
        params={
            "slug": categorySlug
        }
    )
    print(categories, flush=True)
    products = await wc.get(
        "/products",
        params={
            "category": categories[0]['id'],
            "page": page,
            "per_page": per_page,
        },
    )

    async with asyncio.TaskGroup() as tg:
        # Список тасків для асинхронного клієнта 
        tasks = []
        
        for product in products:
            if product.get("type") == "variable":

                task = tg.create_task(
                    wc.get(f"/products/{product['id']}/variations", params={"per_page":80})
                )
                tasks.append(task)
    for task_index, task in enumerate(tasks):
        products[task_index]["variations"] = task.result()

    products = fix_urls(products)
    return products