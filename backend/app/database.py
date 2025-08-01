from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Database URL from environment variable or default
# For Docker: postgresql://user:password@db:5432/student_management
# For Local:  postgresql://postgres:password@localhost:5432/student_management  
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/student_management")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 