from .crud import create_crud_router
from ..models import Phase
from ..schemas import PhaseIn

router = create_crud_router(path="phases", model=Phase, schema=PhaseIn)
