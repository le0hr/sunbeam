from config import settings
from .wc_client import WooCommerceClient

wc = WooCommerceClient(
    base_url=settings.WC_URL,
    consumer_key=settings.WC_CK_API,
    consumer_secret=settings.WC_CS_API,
)