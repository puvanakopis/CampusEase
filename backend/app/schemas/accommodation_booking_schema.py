from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

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

class AccommodationBookingCreateRequest(BaseModel):
    accommodation_id: str
    owner_id: str
    user_id: str
    total_user: int
    monthly_rent: float
    start_month: datetime
    end_month: datetime
    duration_months: int
    total_rent: float
    payment: Optional[BookingPayment] = None

class AccommodationBookingUpdateRequest(BaseModel):
    status: Optional[BookingStatus] = None
    payment: Optional[BookingPayment] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)

class AccommodationBookingResponse(BaseModel):
    id: str = Field(..., alias="_id")
    accommodation_id: str
    owner_id: str
    user_id: str
    total_user: int
    monthly_rent: float
    start_month: datetime
    end_month: datetime
    duration_months: int
    total_rent: float
    status: BookingStatus
    payment: Optional[BookingPayment] = None
    created_at: datetime
    last_updated: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True