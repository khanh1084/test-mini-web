from pydantic import BaseModel, ConfigDict
from datetime import datetime, date
from typing import Optional


class SubscriptionCreate(BaseModel):
    student_id: int
    package_name: str
    start_date: date
    end_date: date
    total_sessions: int


class SubscriptionResponse(BaseModel):
    id: int
    student_id: int
    package_name: str
    start_date: date
    end_date: date
    total_sessions: int
    used_sessions: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class SubscriptionUse(BaseModel):
    used_sessions: int 