from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from datetime import datetime

class AdminRole(str, Enum):
    admin = "admin"

class Admin(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    password: str
    role: AdminRole = AdminRole.admin
    phone: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
