from fastapi.middleware.cors import CORSMiddleware
from db import engine, Base
from fastapi import FastAPI
from endpoints.tickets import router as ticket_router
from endpoints.instruments import router as instrument_router
from endpoints.users import router as user_router

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(instrument_router)
app.include_router(ticket_router)
app.include_router(user_router)



