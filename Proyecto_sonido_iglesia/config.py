import os

# --- Configuración de la Consola X32/X18 ---
# Si la variable de entorno X32_IP no existe, la aplicación fallará al inicio (None)
X32_IP: str | None = os.environ.get("X32_IP") 
X32_PORT: int | None = 10023 # El puerto OSC es estándar

DATABASE_URL = "sqlite:///./app.db" 