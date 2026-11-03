from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./blackdots.db"
    secret_key: str = "change-me"
    admin_username: str = "admin"
    admin_password: str = "change-me"
    allowed_origins: str = (
        "https://blackdots.az,https://www.blackdots.az,"
        "http://localhost:5500,http://127.0.0.1:5500"
    )

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
