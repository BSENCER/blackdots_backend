from .crud import create_crud_router
from ..models import Blog
from ..schemas import BlogIn

router = create_crud_router(path="blogs", model=Blog, schema=BlogIn)
