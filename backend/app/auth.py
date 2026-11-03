import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Depends, HTTPException, Request, status

from .config import get_settings

# Token lifetime: 7 days for admin convenience
TOKEN_LIFETIME_DAYS = 7


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 200_000)
    return f"{salt.hex()}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        salt, digest = stored.split("$", 1)
        candidate = hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt), 200_000)
        return hmac.compare_digest(candidate.hex(), digest)
    except ValueError:
        return hmac.compare_digest(password, stored)


def create_token(username: str) -> str:
    settings = get_settings()
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + timedelta(days=TOKEN_LIFETIME_DAYS),
    }
    return jwt.encode(payload, settings.secret_key, algorithm="HS256")


def require_admin(request: Request) -> str:
    authorization = request.headers.get("Authorization", "").strip()
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    token = authorization[7:].strip() if authorization.lower().startswith("bearer ") else authorization
    try:
        payload = jwt.decode(token, get_settings().secret_key, algorithms=["HS256"])
        username = payload.get("sub")
        if username != get_settings().admin_username:
            raise ValueError("Invalid user")
        return username
    except (jwt.InvalidTokenError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
