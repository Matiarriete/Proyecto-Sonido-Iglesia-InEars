from typing import List
from fastapi import HTTPException, Depends, APIRouter
from Models import InstrumentBase, DBTicket, Ticket, TicketBase
from sqlalchemy.orm import Session
from db import get_db
import Responses

router = APIRouter(prefix="/tickets", tags=["tickets"])

@router.get("/")
def get_tickets(db=Depends(get_db)):
  # Query ORM objects, then convert to Pydantic Ticket for the response
  items_orm = db.query(DBTicket).order_by(DBTicket.id.desc()).all()
  items = [Ticket.model_validate(o) for o in items_orm]
  return Responses.set_response_items(items)

@router.get("/{ticket_id}")
async def get_ticket(ticket_id: str, db=Depends(get_db)):
  item_orm = db.query(DBTicket).filter(DBTicket.id == ticket_id).first()
  if item_orm:
      item = Ticket.model_validate(item_orm)
      return Responses.set_response_unique(item)
  raise HTTPException(status_code=404, detail=f"Item con ID '{ticket_id}' no encontrado.")

@router.post("/")
async def create_ticket(ticket: TicketBase, db=Depends(get_db)):
  # With autoincrement id, the client does not provide id. Just create the ORM instance.
  orm_inst = DBTicket(**ticket.dict())
  db.add(orm_inst)
  db.commit()
  db.refresh(orm_inst)
  return Responses.set_response_unique(Ticket.model_validate(orm_inst))

@router.put("/{ticket_id}")
async def update_ticket(ticket_id: str, ticket: TicketBase, db=Depends(get_db)):
  item_orm = db.query(DBTicket).filter(DBTicket.id == ticket_id).first()
  if item_orm:
      for key, value in ticket.model_dump().items():
          setattr(item_orm, key, value)
      db.commit()
      db.refresh(item_orm)
      return Responses.set_response_unique(Ticket.model_validate(item_orm))
  raise HTTPException(status_code=404, detail=f"Item con ID '{ticket_id}' no encontrado.")