#!/usr/bin/env python3
"""
Reset the database schema for development.
- Makes a timestamped backup of ./app.db if it exists
- Drops the instruments table (if present)
- Calls Base.metadata.create_all(bind=engine) to recreate tables according to Models

Use only in development. Backups are created in the project root.
"""
import os
import sys
import shutil
import time
# Ensure the project root is on sys.path so imports like `from db import ...` work
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from db import engine, Base
from Models import DBInstrument, DBUser

ROOT_DB = os.path.join(os.path.dirname(__file__), '..', 'app.db')
ROOT_DB = os.path.abspath(ROOT_DB)

def backup_db(path: str):
    if os.path.exists(path):
        ts = time.strftime('%Y%m%d_%H%M%S')
        dst = f"{path}.bak.{ts}"
        shutil.copy(path, dst)
        print('Backup created:', dst)
    else:
        print('No existing app.db found at', path)

def reset():
    print('Using DB file:', ROOT_DB)
    backup_db(ROOT_DB)
    print('Dropping instruments table (if exists)')
    try:
        DBInstrument.__table__.drop(bind=engine, checkfirst=True)
        print('Dropped instruments table (if it existed)')
    except Exception as e:
        print('Error dropping table (ignored):', e)
    print('Creating all tables from metadata')
    Base.metadata.create_all(bind=engine)
    print('Done. Tables now:', list(Base.metadata.tables.keys()))

    # Insertar usuario admin por defecto
    from db import SessionLocal
    session = SessionLocal()
    try:
        admin = DBUser(id="Admin", name="Admin", isActive=True, role="TECNICO")
        session.add(admin)
        session.commit()
        print('Usuario Admin creado')
    except Exception as e:
        print('Error al crear usuario MatiasAdmin:', e)
        session.rollback()
    finally:
        session.close()

if __name__ == '__main__':
    reset()
