from .crud import create_crud_router
from ..models import FAQ
from ..schemas import FAQIn

router = create_crud_router(path="faqs", model=FAQ, schema=FAQIn)
