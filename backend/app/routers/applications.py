from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import require_admin
from ..database import get_db
from ..models import Application
from ..schemas import ApplicationIn, ApplicationUpdate

router = APIRouter(prefix="/applications", tags=["applications"])


@router.get("")
def list_applications(db: Session = Depends(get_db), _: str = Depends(require_admin)):
    return list(db.scalars(select(Application).order_by(Application.date.desc())).all())


@router.post("", status_code=status.HTTP_201_CREATED)
def create_application(payload: ApplicationIn, db: Session = Depends(get_db)):
    item = Application(id=uuid4().hex, date=datetime.utcnow(), **payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}")
def update_application(
    item_id: str,
    payload: ApplicationUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(require_admin),
):
    if payload.status not in {"pending", "reviewed", "rejected"}:
        raise HTTPException(422, "Invalid application status")
    item = db.get(Application, item_id)
    if item is None:
        raise HTTPException(404, "Application not found")
    item.status = payload.status
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=204)
def delete_application(item_id: str, db: Session = Depends(get_db), _: str = Depends(require_admin)):
    item = db.get(Application, item_id)
    if item is None:
        raise HTTPException(404, "Application not found")
    db.delete(item)
    db.commit()
