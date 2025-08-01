from pydantic import BaseModel, ConfigDict
from datetime import datetime, date
from typing import Optional


class StudentCreate(BaseModel):
    name: str
    dob: date
    gender: str
    current_grade: str
    parent_id: int


class StudentResponse(BaseModel):
    id: int
    name: str
    dob: date
    gender: str
    current_grade: str
    parent_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class StudentWithParent(BaseModel):
    id: int
    name: str
    dob: date
    gender: str
    current_grade: str
    parent_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    parent: dict

    model_config = ConfigDict(from_attributes=True) 