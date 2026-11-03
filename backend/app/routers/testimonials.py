from .crud import create_crud_router
from ..models import Testimonial
from ..schemas import TestimonialIn

router = create_crud_router(path="testimonials", model=Testimonial, schema=TestimonialIn)
