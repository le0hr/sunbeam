from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from clients import wc
from config import settings

# Посилання на вашу адмінку WooCommerce
TG_URL = "https://t.me/"

async def tg_request_service(order: dict) -> tuple[str, str | None, InlineKeyboardMarkup]:
    """
    Формує текст, знаходить URL фото та будує inline-клавіатуру для Telegram.
    Повертає: (text, photo_url, reply_markup)
    """
    billing = order.get("billing", {})
    customer_name = billing.get("first_name", "Не вказано")
    customer_phone = billing.get("phone", "Не вказано")

    # 1. Формуємо базовий текст
    text = (
        f"👤 <b>Клієнт:</b> {customer_name}\n"
        f"📞 <b>Телефон:</b> {customer_phone}\n"
        f"-----------------------------\n"
    )
    
    image_url = None
    line_items = order.get("line_items", [])

    #  Обробляємо товар та шукаємо фото
    if line_items:
        item = line_items[0]
        product_id = item.get("product_id")
        variation_id = item.get("variation_id")

        # Отримуємо варіацію та батьківськмй товар
        parent = await wc.get(f"/products/{product_id}")
        variation = await wc.get(f"/products/{product_id}/variations/{variation_id}")

        text += f"🛍 <b>Товар:</b> {parent.get('name', 'Без назви')}\n"

        # Атрибути
        for attr in variation.get("attributes", []):
            text += f"🎨 <b>{attr['name']}:</b> {attr['option']}\n"

        # Пошук ширини та висоти в meta_data
        meta_data = item.get("meta_data", [])
        width = next((m["value"] for m in meta_data if m.get("key") == "Ширина (мм)"), None)
        height = next((m["value"] for m in meta_data if m.get("key") == "Висота (мм)"), None)

        if width and height:
            text += f"📐 <b>Розміри:</b> {width} × {height} мм\n"

        price = item.get("price") or order.get("total")
        if price:
            text += f"\n💰 <b>Ціна:</b> {price} грн\n"

        image_data = variation.get("image")
        if image_data and isinstance(image_data, dict):
            image_url = image_data["src"].replace(settings.WC_URL, settings.SITE_URL)
    else:
        text += "ℹ️ <b>Лише консультація, товар не обрано</b>\n"

    # Inline-клавіатура
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🔗 Чат з клієнтом",
                    url=f"{TG_URL}{customer_phone}"
                )
            ]
        ]
    )

    return text, image_url, keyboard