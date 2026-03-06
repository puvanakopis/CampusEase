from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from enum import Enum


class OwnerStatus(str, Enum):
    pending = "Pending Approval"
    active = "Active"
    inactive = "Inactive"
    declined = "Declined Approval"


class OwnerPhoto(BaseModel):
    filename: str
    content_type: str
    size: int


class OwnerResponse(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    address: Optional[str] = None
    phone: Optional[str] = None
    role: str = "owner"
    photo: Optional[OwnerPhoto] = None
    status: OwnerStatus
    verified: bool
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime
    last_updated: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class OwnerUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    photo: Optional[OwnerPhoto] = None
    status: Optional[OwnerStatus] = None
    verified: Optional[bool] = None
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    