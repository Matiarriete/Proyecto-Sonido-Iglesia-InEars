from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# 1. URL de la Base de Datos
# El nombre del archivo de la base de datos es './app.db'
DATABASE_URL = "sqlite:///./app.db" 

# 2. Crear el Motor
# 'check_same_thread': False es necesario para SQLite en FastAPI 
# ya que múltiples hilos podrían acceder a la base de datos
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# 3. Crear la Sesión Local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        # Pasa la sesión al endpoint
        yield db
    finally:
        # Cierra la sesión después de que la respuesta ha sido enviada
        db.close()