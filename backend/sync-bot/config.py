from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    WC_URL: str
    WC_CS_API: str 
    WC_CK_API: str
    GOOGLE_API: str

    model_config = SettingsConfigDict(env_file="../../.env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()