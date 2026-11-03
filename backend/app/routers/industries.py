from .crud import create_crud_router
from ..models import Industry
from ..schemas import IndustryIn

router = create_crud_router(path="industries", model=Industry, schema=IndustryIn)
