from typing import List
from fastapi import HTTPException, Depends, APIRouter
from Models import InstrumentBase, DBInstrument, Instrument
from sqlalchemy.orm import Session
from db import get_db
import Responses

router = APIRouter(prefix="/instruments", tags=["instruments"])

@router.get("/")
def get_instruments(db=Depends(get_db)):
  # Query ORM objects, then convert to Pydantic Instrument for the response
  items_orm = db.query(DBInstrument).all()
  items = [Instrument.model_validate(o) for o in items_orm]
  return Responses.set_response_items(items)

@router.get("/{instrument_id}")
async def get_instrument(instrument_id: str, db=Depends(get_db)):
  item_orm = db.query(DBInstrument).filter(DBInstrument.id == instrument_id).first()
  if item_orm:
      item = Instrument.model_validate(item_orm)
      return Responses.set_response_unique(item)
  raise HTTPException(status_code=404, detail=f"Item con ID '{instrument_id}' no encontrado.")

@router.post("/")
async def create_instrument(instrument: InstrumentBase, db=Depends(get_db)):
  # With autoincrement id, the client does not provide id. Just create the ORM instance.
  orm_inst = DBInstrument(**instrument.dict())
  db.add(orm_inst)
  db.commit()
  db.refresh(orm_inst)
  return Responses.set_response_unique(Instrument.model_validate(orm_inst))

@router.put("/{instrument_id}")
async def update_instrument(instrument_id: str, instrument: InstrumentBase, db=Depends(get_db)):
  item_orm = db.query(DBInstrument).filter(DBInstrument.id == instrument_id).first()
  if item_orm:
      for key, value in instrument.model_dump().items():
          setattr(item_orm, key, value)
      db.commit()
      db.refresh(item_orm)
      return Responses.set_response_unique(Instrument.model_validate(item_orm))
  raise HTTPException(status_code=404, detail=f"Item con ID '{instrument_id}' no encontrado.")