import os

# --- Configuración de la Consola X32/X18 ---
# Si la variable de entorno X32_IP no existe, la aplicación fallará al inicio (None)
MIXER_IP: str

DATABASE_URL = "sqlite:///./app.db" 