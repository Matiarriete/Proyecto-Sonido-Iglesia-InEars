# routes/mixer.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from config import settings

router = APIRouter(prefix="/mixer",tags=["Mixer Control"])

class IPUpdate(BaseModel):
    new_ip: str

@router.get("/ip")
async def get_mixer_ip():
    """Retorna la IP configurada actualmente."""
    return {"mixer_ip": settings.MIXER_IP}

@router.patch("/ip")
async def update_mixer_ip(data: IPUpdate):
    if not data.new_ip:
        raise HTTPException(status_code=400, detail="La IP no puede estar vacía")
    
    settings.MIXER_IP = data.new_ip
    return {"message": "Configuración actualizada", "current_ip": settings.MIXER_IP}