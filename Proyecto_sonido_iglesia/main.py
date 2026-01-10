from fastapi.middleware.cors import CORSMiddleware
from db import engine, Base
from fastapi import FastAPI
import config
import sys
from endpoints.tickets import router as ticket_router
from endpoints.instruments import router as instrument_router
from endpoints.users import router as user_router

if config.X32_IP is None:
    # Bloque de error que detiene el proyecto si falta la IP
    print("----------------------------------------------------------", file=sys.stderr)
    print("ERROR CRÍTICO: La variable de entorno 'X32_IP' no está definida.", file=sys.stderr)
    print("Ejecutelo de la siguiente manera: ", file=sys.stderr)
    print("MAC OS / LINUX - X32_IP=\"TU_IP_AQUI\" uvicorn main:app --reload", file=sys.stderr)
    print("WINDOWS - set X32_IP=\"TU_IP_AQUI\" uvicorn main:app --reload", file=sys.stderr)
    print("----------------------------------------------------------", file=sys.stderr)

    sys.exit(1)

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(instrument_router)
app.include_router(ticket_router)
app.include_router(user_router)



