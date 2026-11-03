from .crud import create_crud_router
from ..models import Partner
from ..schemas import PartnerIn

router = create_crud_router(path="partners", model=Partner, schema=PartnerIn)
