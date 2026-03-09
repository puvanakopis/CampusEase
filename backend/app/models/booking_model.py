from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime


class BookingType(str, Enum):
    vehicle = "vehicle"
    accommodation = "accommodation"


class BookingStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    canceled = "canceled"
    completed = "completed"


class PaymentMethod(str, Enum):
    credit_card = "credit_card"
    pay_on_hand = "pay_on_hand"


class BookingPayment(BaseModel):
    method: PaymentMethod
    amount: float
    cardholder_name: Optional[str] = None
    card_number_masked: Optional[str] = None
    expiry_date: Optional[str] = None
    cvv_masked: Optional[str] = None
    paid: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Booking(BaseModel):
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
    status: BookingStatus = BookingStatus.pending
    payment: Optional[BookingPayment] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
        allow_population_by_field_name = True