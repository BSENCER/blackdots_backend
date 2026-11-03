from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import require_admin
from ..database import get_db
from ..models import Message
from ..schemas import MessageIn, MessageUpdate

router = APIRouter(prefix="/messages", tags=["messages"])


@router.get("")
def list_messages(db: Session = Depends(get_db), _: str = Depends(require_admin)):
    return list(db.scalars(select(Message).order_by(Message.date.desc())).all())


@router.post("", status_code=status.HTTP_201_CREATED)
def create_message(payload: MessageIn, db: Session = Depends(get_db)):
    item = Message(id=uuid4().hex, date=datetime.utcnow(), **payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}")
def update_message(item_id: str, payload: MessageUpdate, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    item = db.get(Message, item_id)
    if item is None:
        raise HTTPException(404, "Message not found")
    item.read = payload.read
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=204)
def delete_message(item_id: str, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    item = db.get(Message, item_id)
    if item is None:
        raise HTTPException(404, "Message not found")
    db.delete(item)
    db.commit()
