from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from ..auth import require_admin
from ..schemas import UploadResponse

router = APIRouter(tags=["upload"])
UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".mp4", ".webm"}


@router.post("/upload", response_model=UploadResponse)
async def upload(file: UploadFile = File(...), _: str = Depends(require_admin)):
    extension = Path(file.filename or "").suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "Unsupported file type")
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid4().hex}{extension}"
    target = UPLOAD_DIR / filename
    target.write_bytes(await file.read())
    return UploadResponse(url=f"/uploads/{filename}")
