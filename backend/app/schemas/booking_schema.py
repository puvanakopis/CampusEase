from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from app.schemas.vehicle_schema import VehicleResponse
from app.schemas.accommodation_schema import AccommodationResponse
from app.schemas.owner_schema import OwnerResponse
from app.models.booking_model import BookingType, BookingStatus, BookingPayment


class BookingCreateRequest(BaseModel):
    booking_type: BookingType
    resource_id: str
    owner_id: str
    user_id: str
    unit_price: float
    start_date: datetime
    end_date: datetime
    duration: int
    total_price: float
    status: Optional[BookingStatus] = None
    payment: Optional[BookingPayment] = None


class BookingUpdateRequest(BaseModel):
    status: Optional[BookingStatus] = None
    payment: Optional[BookingPayment] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)


class BookingResponse(BaseModel):
    id: str = Field(..., alias="_id")
    booking_type: BookingType
    resource_id: str
    owner_id: str
    user_id: str
    unit_price: float
    start_date: datetime
    end_date: datetime
    duration: int
    total_price: float
    status: BookingStatus
    payment: Optional[BookingPayment] = None
    created_at: datetime
    last_updated: datetime
    vehicle: Optional[VehicleResponse] = None
    accommodation: Optional[AccommodationResponse] = None
    owner: Optional[OwnerResponse] = None

    model_config = {
        "from_attributes": True,
        "validate_by_name": True
    }
