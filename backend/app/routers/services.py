from .crud import create_crud_router
from ..models import Service
from ..schemas import ServiceIn

router = create_crud_router(path="services", model=Service, schema=ServiceIn)
