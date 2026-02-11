# routes/mixer.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from config import settings
from typing import Optional

router = APIRouter(prefix="/mixer",tags=["Mixer Control"])

class IPUpdate(BaseModel):
    ip: Optional[str] = settings.MIXER_IP
    port: Optional[int] = settings.MIXER_PORT

@router.get("/")
async def get_mixer_config():
    return {"ip": settings.MIXER_IP, "port": settings.MIXER_PORT}

@router.patch("/")
async def update_mixer_ip(data: IPUpdate):
    settings.MIXER_IP = data.ip
    settings.MIXER_PORT = data.port
    return {"message": "Configuración actualizada", "current_ip": settings.MIXER_IP, "current_port": settings.MIXER_PORT}