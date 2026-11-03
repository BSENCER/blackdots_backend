from collections.abc import Callable
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import require_admin
from ..database import get_db


def create_crud_router(
    *,
    path: str,
    model: Any,
    schema: Any,
    public_create: bool = False,
    update_schema: Any | None = None,
) -> APIRouter:
    router = APIRouter(prefix=f"/{path}", tags=[path])
    update_schema = update_schema or schema

    @router.get("", response_model=None)
    def list_items(db: Session = Depends(get_db)) -> list[Any]:
        query = select(model)
        if hasattr(model, "order"):
            query = query.order_by(model.order, model.id)
        elif hasattr(model, "date"):
            query = query.order_by(model.date.desc())
        return list(db.scalars(query).all())

    @router.get("/{item_id}", response_model=None)
    def get_item(item_id: str, db: Session = Depends(get_db)) -> Any:
        item = db.get(model, item_id)
        if item is None:
            raise HTTPException(status_code=404, detail=f"{path[:-1].capitalize()} not found")
        return item

    @router.post("", status_code=status.HTTP_201_CREATED, response_model=None)
    def create_item(
        payload: schema,
        db: Session = Depends(get_db),
        _: str = Depends(require_admin) if not public_create else None,
    ) -> Any:
        data = payload.model_dump(exclude_none=True)
        item = model(id=data.pop("id", None) or uuid4().hex, **data)
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    @router.put("/{item_id}", response_model=None)
    def update_item(
        item_id: str,
        payload: update_schema,
        db: Session = Depends(get_db),
        _: str = Depends(require_admin),
    ) -> Any:
        item = db.get(model, item_id)
        if item is None:
            raise HTTPException(status_code=404, detail=f"{path[:-1].capitalize()} not found")
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(item, key, value)
        db.commit()
        db.refresh(item)
        return item

    @router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_item(
        item_id: str,
        db: Session = Depends(get_db),
        _: str = Depends(require_admin),
    ) -> None:
        item = db.get(model, item_id)
        if item is None:
            raise HTTPException(status_code=404, detail=f"{path[:-1].capitalize()} not found")
        db.delete(item)
        db.commit()

    return router
