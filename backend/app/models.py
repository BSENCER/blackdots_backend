from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import JSON

from .database import Base


class Phase(Base):
    __tablename__ = "phases"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    subtitle: Mapped[str] = mapped_column(String(255), default="")
    description: Mapped[str] = mapped_column(Text)
    description2: Mapped[str] = mapped_column(Text, default="")
    icon: Mapped[str] = mapped_column(String(100), default="")
    points: Mapped[list] = mapped_column(JSON, default=list)
    buttonText: Mapped[str] = mapped_column(String(255), default="")
    order: Mapped[int] = mapped_column(Integer, default=1)


class Partner(Base):
    __tablename__ = "partners"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(50))
    logo: Mapped[str] = mapped_column(String(500), default="")
    order: Mapped[int] = mapped_column(Integer, default=1)


class Service(Base):
    __tablename__ = "services"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    icon: Mapped[str] = mapped_column(String(100), default="")
    description: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer, default=1)


class TeamMember(Base):
    __tablename__ = "team"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    position: Mapped[str] = mapped_column(String(255))
    image: Mapped[str] = mapped_column(String(500), default="")
    bio: Mapped[str] = mapped_column(Text, default="")
    order: Mapped[int] = mapped_column(Integer, default=1)


class Industry(Base):
    __tablename__ = "industries"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    icon: Mapped[str] = mapped_column(String(100), default="")
    description: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer, default=1)


class AppItem(Base):
    __tablename__ = "apps"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    category: Mapped[str] = mapped_column(String(255), default="")
    icon: Mapped[str] = mapped_column(String(100), default="")
    description: Mapped[str] = mapped_column(Text)
    features: Mapped[list] = mapped_column(JSON, default=list)
    order: Mapped[int] = mapped_column(Integer, default=1)


class Testimonial(Base):
    __tablename__ = "testimonials"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    author: Mapped[str] = mapped_column(String(255))
    position: Mapped[str] = mapped_column(String(255), default="")
    quote: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer, default=1)


class Blog(Base):
    __tablename__ = "blogs"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    slug: Mapped[str] = mapped_column(String(255), unique=True)
    author: Mapped[str] = mapped_column(String(255), default="Admin")
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    readTime: Mapped[str] = mapped_column(String(100), default="")
    category: Mapped[str] = mapped_column(String(255), default="")
    excerpt: Mapped[str] = mapped_column(Text, default="")
    content: Mapped[str] = mapped_column(Text, default="")
    image: Mapped[str] = mapped_column(String(500), default="")
    icon: Mapped[str] = mapped_column(String(20), default="📰")
    video: Mapped[str] = mapped_column(String(500), default="")
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, default=1)


class FAQ(Base):
    __tablename__ = "faqs"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    question: Mapped[str] = mapped_column(Text)
    answer: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer, default=1)


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255))
    company: Mapped[str] = mapped_column(String(255), default="")
    phone: Mapped[str] = mapped_column(String(100))
    service: Mapped[str] = mapped_column(String(100), default="")
    message: Mapped[str] = mapped_column(Text)
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Vacancy(Base):
    __tablename__ = "vacancies"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    type: Mapped[str] = mapped_column(String(100))
    location: Mapped[str] = mapped_column(String(255))
    salary: Mapped[str] = mapped_column(String(255), default="")
    experience: Mapped[str] = mapped_column(String(255), default="")
    description: Mapped[str] = mapped_column(Text)
    order: Mapped[int] = mapped_column(Integer, default=1)


class Application(Base):
    __tablename__ = "applications"
    id: Mapped[str] = mapped_column(String(100), primary_key=True)
    vacancyId: Mapped[str] = mapped_column(String(100))
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255))
    phone: Mapped[str] = mapped_column(String(100))
    experience: Mapped[int] = mapped_column(Integer, default=0)
    coverLetter: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(50), default="pending")
    date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class AdminSettings(Base):
    """Persists mutable admin credentials across server restarts."""
    __tablename__ = "admin_settings"
    key: Mapped[str] = mapped_column(String(100), primary_key=True)
    value: Mapped[str] = mapped_column(Text)
