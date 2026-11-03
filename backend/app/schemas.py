from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class APIModel(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class PhaseIn(APIModel):
    id: str | None = None
    title: str
    subtitle: str = ""
    description: str
    description2: str = ""
    icon: str = ""
    points: list[str] = Field(default_factory=list)
    buttonText: str = ""
    order: int = 1


class PartnerIn(APIModel):
    name: str
    type: str
    logo: str = ""
    order: int = 1


class ServiceIn(APIModel):
    title: str
    icon: str = ""
    description: str
    order: int = 1


class TeamIn(APIModel):
    name: str
    position: str
    image: str = ""
    bio: str = ""
    order: int = 1


class IndustryIn(APIModel):
    name: str
    icon: str = ""
    description: str
    order: int = 1


class AppIn(APIModel):
    name: str
    category: str = ""
    icon: str = ""
    description: str
    features: list[str] = Field(default_factory=list)
    order: int = 1


class TestimonialIn(APIModel):
    author: str
    position: str = ""
    quote: str
    order: int = 1


class BlogIn(APIModel):
    title: str
    slug: str
    author: str = "Admin"
    date: datetime | None = None
    readTime: str = ""
    category: str = ""
    excerpt: str = ""
    content: str = ""
    image: str = ""
    icon: str = "📰"
    video: str = ""
    featured: bool = False
    order: int = 1


class FAQIn(APIModel):
    question: str
    answer: str
    order: int = 1


class MessageIn(APIModel):
    name: str
    email: EmailStr
    company: str = ""
    phone: str
    service: str = ""
    message: str


class MessageUpdate(APIModel):
    read: bool


class VacancyIn(APIModel):
    title: str
    type: str
    location: str
    salary: str = ""
    experience: str = ""
    description: str
    order: int = 1


class ApplicationIn(APIModel):
    vacancyId: str
    name: str
    email: EmailStr
    phone: str
    experience: int = Field(ge=0)
    coverLetter: str = ""


class ApplicationUpdate(APIModel):
    status: str


class LoginIn(BaseModel):
    username: str
    password: str


class PasswordChangeIn(BaseModel):
    currentPassword: str
    newPassword: str


class UploadResponse(BaseModel):
    url: str
