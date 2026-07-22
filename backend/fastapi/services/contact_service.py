from clients import wc
from schemas import ContactRequest, PurchaseRequest

async def request_consultation_service(data: ContactRequest):

    order = {
        "status": "processing",
        "billing": {
            "first_name": data.name,
            "phone": data.phone
        }
    }

    text, _, keyboard = await tg_request_service(order)

    await tg_client.send_message(text=text, reply_markup=keyboard)

    return await wc.post(
        "/orders",
        order
    )

async def purchase_request_service(data: PurchaseRequest):
    order = {
        "billing": {
            "phone": data.phone,
            "first_name": data.name
        },
        "line_items": [
            {
                "product_id": data.parent_id,     # ID батьківського товару
                "variation_id": data.id,
                "quantity": 1,
                "price": data.price,  # Передаємо кастомну ціну, якщо треба
                "meta_data": [
                    {
                    "key": "Ширина (мм)", 
                    "value": data.width
                    },
                    {
                    "key": "Висота (мм)",
                    "value": data.height
                    }
                ]
            }
        ]
    }

    text, photo_url, keyboard = await tg_request_service(created_order)

    if photo_url:
        await tg_client.send_photo(photo_url=photo_url, caption=text, reply_markup=keyboard)
    else:
        await tg_client.send_message(text=text, reply_markup=keyboard)
    try:
        return await wc.post(
            "/orders",
            order
        )
    except Exception as e:
        if hasattr(e, "response") and e.response is not None:
            err = e.response.json()
            print(f"Помилка [{err.get('code')}]: {err.get('message')}")
        else:
            print(f"Системна помилка: {e}")
