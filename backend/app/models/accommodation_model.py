from typing import List, Optional, Dict
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime

class AccommodationGender(str, Enum):
    male = "male"
    female = "female"

class AccommodationStatus(str, Enum):
    pending = "pending"
    available = "available"
    rejected = "rejected"
    booked = "booked"
    unavailable = "unavailable"

class AccommodationType(str, Enum):
    apartment = "apartment"
    house = "house"
    villa = "villa"
    hostel = "hostel"
    other = "other"

class AccommodationDistance(BaseModel):
    susl_main_gate: str = None
    pambahinna_junction: str = None

class AccommodationImage(BaseModel):
    filename: str

class AccommodationReview(BaseModel):
    user_id: str
    message: str
    rating: float = Field(..., ge=0, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AccommodationAmenity(BaseModel):
    name: str

class AccommodationAddress(BaseModel):
    street: str = None
    city: str = None
    postal_code: str = None
    country: str = None

class AccommodationLocation(BaseModel):
    latitude: float
    longitude: float

class Accommodation(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    accommodation_type: AccommodationType                
    no_of_rooms: int
    no_of_beds: int
    no_of_bathrooms: int
    verified:Optional[bool] = False
    highly_rated: Optional[bool] = False
    description: str = None
    owner_id: str
    month_rent: float
    status: AccommodationStatus = AccommodationStatus.pending
    reject_reason:Optional[str] = None
    images: List[AccommodationImage] = []
    reviews: Optional[List[AccommodationReview]] = []
    amenities: List[AccommodationAmenity] = []
    available_users: int = 0
    total_users: int = 0
    address: AccommodationAddress = None
    location: AccommodationLocation = None
    time_from_uni: AccommodationDistance = None  
    gender: AccommodationGender.male
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True
        allow_population_by_field_name = True
