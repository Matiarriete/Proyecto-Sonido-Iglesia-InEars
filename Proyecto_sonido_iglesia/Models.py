from pydantic import BaseModel, ConfigDict
from db import Base
from sqlalchemy import Column, Integer, String, Boolean, JSON
from typing import Optional

# Base models
class InstrumentBase(BaseModel):
  id: str
  name: str
  isActive: bool

class TicketBase(BaseModel):
  id: str
  performerId: str
  performerName: str
  problem: str
  instrumentId: str
  instrumentName: str
  status: str
  createdAt: int
  updatedAt: int
  assignedTo: Optional[str] = None

class UserBase(BaseModel):
  id: str
  name:str
  isActive: bool
  instrumentId: Optional[str] = None
  role: str

class Response(BaseModel):
    data: object
    count: int


class Instrument(InstrumentBase):
  model_config = ConfigDict(from_attributes=True) 

class Ticket(TicketBase):
  model_config = ConfigDict(from_attributes=True)
  
class User(UserBase):
  model_config = ConfigDict(from_attributes=True)

# DB creation Base
class DBInstrument(Base):
  __tablename__ = "instruments"
  # Use an integer autoincrement primary key
  id = Column(String, primary_key=True, index=True)
  name = Column(String)
  isActive = Column(Boolean)

class DBTicket(Base):
  __tablename__ = "tickets"
  id = Column(String, primary_key=True, index=True)
  performerId = Column(String)
  performerName = Column(String)
  problem = Column(String)
  instrumentId = Column(String)
  instrumentName = Column(String)
  status = Column(String) 
  createdAt = Column(Integer)
  updatedAt = Column(Integer)
  assignedTo = Column(String, nullable=True)

class DBUser(Base):
  __tablename__ = "users"
  id = Column(String, primary_key=True, index=True)
  name = Column(String)
  isActive = Column(Boolean)
  instrumentId = Column(String, nullable=True)
  role = Column(String)