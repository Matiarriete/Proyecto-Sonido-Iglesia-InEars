from pydantic_settings import BaseSettings

class Settings:
    MIXER_IP: str = "0.0.0.0"
    MIXER_PORT: int = 10023
    DATABASE_URL: str = "sqlite:///./app.db"

# Instanciamos un objeto único (Singleton) que será compartido
settings = Settings()