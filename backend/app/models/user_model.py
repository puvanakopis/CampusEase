from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from datetime import datetime


class UserStatus(str, Enum):
    draft = "draft"
    pending = "pending"
    available = "available"
    unavailable = "unavailable"
    rejected = "rejected"


class UserRole(str, Enum):
    student = "student"
    staff = "staff"


class Photo(BaseModel):
    filename: str
    content_type: str
    size: int


class User(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    password: str
    address: Optional[str] = ""
    phone: Optional[str] = ""
    role: UserRole = UserRole.student
    photo: Optional[Photo] = None
    status: UserStatus = UserStatus.pending
    id_number: Optional[str] = None
    id_photo: Optional[Photo] = None
    verified: bool = False
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    save_accommodations: List[str] = []
    save_transports: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "from_attributes": True,
        "validate_by_name": True
    }
