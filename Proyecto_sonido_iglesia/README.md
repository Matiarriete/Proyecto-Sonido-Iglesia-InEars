# Proyecto Sonido Iglesia

Este proyecto es una pequeña API construida con FastAPI y SQLAlchemy para gestionar instrumentos y tickets.

Contenido
- `main.py` - punto de entrada y montaje de routers
- `Models.py` - modelos Pydantic y ORM
- `db.py` - configuración de la base de datos (SQLite `app.db`) y sesión
- `endpoints/` - rutas separadas para `instruments` y `tickets`
- `scripts/reset_db.py` - script de desarrollo para resetear la tabla `instruments` (hace backup)

Requisitos
- Python 3.10+ (recomendado) o 3.11/3.12/3.13
- Dependencias (instalar con pip):

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

Instalación rápida

```bash
cd /ruta/al/proyecto/Proyecto_sonido_iglesia
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt  # si creas requirements.txt, o instalar manualmente
```

Ejecutar la API

```bash
# Desde la raíz del proyecto
uvicorn main:app --reload
```

Resetear la base de datos (desarrollo)

```bash
# Crea un backup de app.db y recrea la tabla instruments según los modelos
python3 scripts/reset_db.py
```

Endpoints principales

- GET /instruments - lista instrumentos
- GET /instruments/{id} - obtener instrumento por id
- POST /instruments - crear instrumento
- PUT /instruments/{id} - actualizar instrumento

- GET /tickets - lista tickets (ahora ordenados desc por id)
- GET /tickets/{id} - obtener ticket
- POST /tickets - crear ticket
- PUT /tickets/{id} - actualizar ticket

Notas

- `app.db` está ignorado por `.gitignore` para evitar subir la base de datos a Git.
- Si necesitas mantener datos entre cambios de esquema, configura Alembic para migraciones en lugar de borrar la DB.

Contribuciones

Abre un issue con el comportamiento esperado o envía un PR.

Contacto

Puedes usar este repositorio como plantilla y adaptarlo a tus necesidades.
