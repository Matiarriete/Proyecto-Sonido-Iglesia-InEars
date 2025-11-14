from typing import List
from fastapi import HTTPException, Depends, APIRouter
from Models import UserBase, DBUser, User, UserBase
from sqlalchemy.orm import Session
from db import get_db
import Responses

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
def get_users(db=Depends(get_db)):
  # Query ORM objects, then convert to Pydantic User for the response
  items_orm = db.query(DBUser).order_by(DBUser.id.desc()).all()
  items = [User.model_validate(o) for o in items_orm]
  return Responses.set_response_items(items)

@router.get("/{user_id}")
async def get_user(user_id: str, db=Depends(get_db)):
  item_orm = db.query(DBUser).filter(DBUser.id == user_id).first()
  if item_orm:
      item = User.model_validate(item_orm)
      return Responses.set_response_unique(item)
  raise HTTPException(status_code=404, detail=f"Item con ID '{user_id}' no encontrado.")

@router.post("/")
async def create_user(user: UserBase, db=Depends(get_db)):
  # With autoincrement id, the client does not provide id. Just create the ORM instance.
  orm_inst = DBUser(**user.dict())
  db.add(orm_inst)
  db.commit()
  db.refresh(orm_inst)
  return Responses.set_response_unique(User .model_validate(orm_inst))

@router.put("/{user_id}")
async def update_user(user_id: str, user: UserBase, db=Depends(get_db)):
  item_orm = db.query(DBUser).filter(DBUser.id == user_id).first()
  if item_orm:
      for key, value in user.model_dump().items():
          setattr(item_orm, key, value)
      db.commit()
      db.refresh(item_orm)
      return Responses.set_response_unique(User.model_validate(item_orm))
  raise HTTPException(status_code=404, detail=f"Item con ID '{user_id}' no encontrado.")