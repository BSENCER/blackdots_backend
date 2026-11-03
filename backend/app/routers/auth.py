from fastapi import APIRouter, Depends, HTTPException

from ..auth import create_token, hash_password, require_admin, verify_password
from ..config import get_settings
from ..database import get_db
from ..models import AdminSettings
from ..schemas import LoginIn, PasswordChangeIn
from sqlalchemy.orm import Session

router = APIRouter(tags=["auth"])

_KEY_PASSWORD_HASH = "admin_password_hash"


def _get_password_hash(db: Session) -> str:
    """Return stored password hash from DB, falling back to .env value."""
    row = db.get(AdminSettings, _KEY_PASSWORD_HASH)
    if row:
        return row.value
    # First run: hash the .env password and persist it
    initial_hash = hash_password(get_settings().admin_password)
    db.add(AdminSettings(key=_KEY_PASSWORD_HASH, value=initial_hash))
    db.commit()
    return initial_hash


@router.post("/login")
def login(payload: LoginIn, db: Session = Depends(get_db)):
    stored_hash = _get_password_hash(db)
    if payload.username != get_settings().admin_username or not verify_password(
        payload.password, stored_hash
    ):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"token": create_token(payload.username)}


@router.post("/admin/change-password")
def change_password(
    payload: PasswordChangeIn,
    db: Session = Depends(get_db),
    _: str = Depends(require_admin),
):
    stored_hash = _get_password_hash(db)
    if not verify_password(payload.currentPassword, stored_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")

    new_hash = hash_password(payload.newPassword)
    row = db.get(AdminSettings, _KEY_PASSWORD_HASH)
    if row:
        row.value = new_hash
    else:
        db.add(AdminSettings(key=_KEY_PASSWORD_HASH, value=new_hash))
    db.commit()
    return {"detail": "Password changed successfully"}
