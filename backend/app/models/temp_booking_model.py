from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional


class BookingType(str, Enum):
    vehicle = "vehicle"
    accommodation = "accommodation"


class TempBooking(BaseModel):
    user_id: str
    booking_type: BookingType
    resource_id: str
    owner_id: str
    unit_price: float
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    duration: Optional[int] = None
    total_price: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    