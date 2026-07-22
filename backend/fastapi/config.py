from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SITE_URL: str
    WC_URL: str
    WC_CK_API: str
    WC_CS_API: str

    TG_BOT_TOKEN: str
    TG_CHAT_ID: str

    model_config = SettingsConfigDict(
        env_file="../../.env",
        extra="ignore",
    )


settings = Settings()