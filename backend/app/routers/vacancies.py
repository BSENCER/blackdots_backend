from .crud import create_crud_router
from ..models import Vacancy
from ..schemas import VacancyIn

router = create_crud_router(path="vacancies", model=Vacancy, schema=VacancyIn)
