from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from app.models.owner_model import OwnerStatus, OwnerPhoto
from app.schemas.accommodation_schema import AccommodationResponse
from app.schemas.vehicle_schema import VehicleResponse


class OwnerResponse(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    address: Optional[str] = None
    phone: Optional[str] = None
    role: str = "owner"
    photo: Optional[OwnerPhoto] = None
    status: Optional[str] = None
    verified: Optional[bool] = None
    decline_reason: Optional[str] = None
    description: Optional[str] = None
    accommodations: Optional[List["AccommodationResponse"]] = []
    vehicles: Optional[List["VehicleResponse"]] = []
    created_at: datetime
    last_updated: datetime

    model_config = {
        "from_attributes": True,
        "validate_by_name": True
    }


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
