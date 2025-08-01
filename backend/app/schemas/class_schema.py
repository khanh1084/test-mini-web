from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List


class ClassCreate(BaseModel):
    name: str
    subject: str
    day_of_week: str
    time_slot: str
    teacher_name: str
    max_students: int


class ClassResponse(BaseModel):
    id: int
    name: str
    subject: str
    day_of_week: str
    time_slot: str
    teacher_name: str
    max_students: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class ClassWithRegistrations(BaseModel):
    id: int
    name: str
    subject: str
    day_of_week: str
    time_slot: str
    teacher_name: str
    max_students: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    registrations: List[dict]

    model_config = ConfigDict(from_attributes=True) 