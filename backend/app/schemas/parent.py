from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class ParentCreate(BaseModel):
    name: str
    phone: str
    email: str


class ParentResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True) 