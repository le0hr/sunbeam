from config import settings
from .wc_client import WooCommerceClient
from .tg_client import TGClient


# Створюємо готовий клієнт
tg_client = TGClient(token=settings.TG_BOT_TOKEN, chat_id=settings.TG_CHAT_ID)
wc = WooCommerceClient(
    base_url=settings.WC_URL,
    consumer_key=settings.WC_CK_API,
    consumer_secret=settings.WC_CS_API,
)