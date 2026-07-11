from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    WC_URL: str
    WC_CK_API: str
    WC_CS_API: str

    model_config = SettingsConfigDict(
        env_file="../../.env",
        extra="ignore",
    )


settings = Settings()