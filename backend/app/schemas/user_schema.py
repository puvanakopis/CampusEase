from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from enum import Enum
from app.models.user_model import UserStatus, UserRole, Photo


class UserResponse(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    address: Optional[str] = None
    phone: Optional[str] = None
    role: UserRole
    photo: Optional[Photo] = None
    status: Optional[UserStatus] = None
    id_number: Optional[str] = None
    id_photo: Optional[Photo] = None
    verified: Optional[bool] = None
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    save_accommodations: List[str] = []
    save_transports: List[str] = []
    created_at: datetime
    last_updated: datetime

    model_config = {
        "from_attributes": True,
        "validate_by_name": True
    }


class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    photo: Optional[Photo] = None
    id_number: Optional[str] = None
    id_photo: Optional[Photo] = None
    status: Optional[UserStatus] = None
    verified: Optional[bool] = None
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    save_accommodations: Optional[List[str]] = None
    save_transports: Optional[List[str]] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)
