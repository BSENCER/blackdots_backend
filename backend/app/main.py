import logging
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect, text

from .config import get_settings
from .database import Base, engine
from .routers import (
    applications,
    apps,
    auth,
    blogs,
    faqs,
    industries,
    messages,
    partners,
    phases,
    services,
    team,
    testimonials,
    upload,
    vacancies,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
settings = get_settings()

app = FastAPI(title="BlackDots API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router_module in (
    phases,
    partners,
    services,
    team,
    industries,
    apps,
    testimonials,
    blogs,
    faqs,
    messages,
    vacancies,
    applications,
    auth,
    upload,
):
    app.include_router(router_module.router, prefix="/api")

app.mount(
    "/uploads",
    StaticFiles(directory=Path(__file__).resolve().parents[1] / "uploads", check_dir=False),
    name="uploads",
)


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)
    if "icon" not in {column["name"] for column in inspect(engine).get_columns("blogs")}:
        with engine.begin() as connection:
            connection.execute(text("ALTER TABLE blogs ADD COLUMN icon VARCHAR(20) DEFAULT '📰'"))


@app.get("/api/health", tags=["health"])
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled exception while processing %s %s", request.method, request.url.path)
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})
