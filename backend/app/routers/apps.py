from .crud import create_crud_router
from ..models import AppItem
from ..schemas import AppIn

router = create_crud_router(path="apps", model=AppItem, schema=AppIn)
