from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from datetime import datetime


class OwnerStatus(str, Enum):
    draft = "draft"
    pending = "pending"
    available = "available"
    unavailable = "unavailable"
    rejected = "rejected"


class OwnerRole(str, Enum):
    owner = "owner"


class OwnerPhoto(BaseModel):
    filename: str
    content_type: str
    size: int


class Owner(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    password: str
    address: Optional[str] = ""
    phone: Optional[str] = ""
    role: OwnerRole = OwnerRole.owner
    photo: Optional[OwnerPhoto] = None
    status: OwnerStatus = OwnerStatus.pending
    id_number: Optional[str] = None
    id_photo: Optional[OwnerPhoto] = None
    verified: bool = False
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "from_attributes": True,
        "validate_by_name": True
    }
