from aiogram import Bot
from aiogram.types import InlineKeyboardMarkup

class TGClient:
    def __init__(self, token: str, chat_id: str):
        self.bot = Bot(token=token)
        self.chat_id = chat_id

    async def send_message(
        self, 
        text: str, 
        reply_markup: InlineKeyboardMarkup | None = None
    ):
        await self.bot.send_message(
            chat_id=self.chat_id,
            text=text,
            parse_mode="HTML",
            reply_markup=reply_markup
        )

    async def send_photo(
        self, 
        photo_url: str, 
        caption: str, 
        reply_markup: InlineKeyboardMarkup | None = None
    ):
        try:
            await self.bot.send_photo(
                chat_id=self.chat_id,
                photo=photo_url,
                caption=caption,
                parse_mode="HTML",
                reply_markup=reply_markup
            )
        except Exception as e:
            print(f"Помилка відправки фото у Telegram: {e}. Відправляю текстом.")
            await self.send_message(text=caption, reply_markup=reply_markup)