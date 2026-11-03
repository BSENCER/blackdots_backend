from .crud import create_crud_router
from ..models import TeamMember
from ..schemas import TeamIn

router = create_crud_router(path="team", model=TeamMember, schema=TeamIn)
