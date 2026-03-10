from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum


class BookingType(str, Enum):
    vehicle = "vehicle"
    accommodation = "accommodation"


class TempBookingCreateRequest(BaseModel):
    user_id: str
    booking_type: BookingType
    resource_id: str
    owner_id: str
    unit_price: float
    start_date: datetime
    end_date: datetime
    duration: int
    total_price: float


class TempBookingResponse(BaseModel):
    id: str = Field(..., alias="_id")
    user_id: str
    booking_type: BookingType
    resource_id: str
    owner_id: str
    unit_price: float
    start_date: datetime
    end_date: datetime
    duration: int
    total_price: float
    created_at: datetime
    last_updated: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        