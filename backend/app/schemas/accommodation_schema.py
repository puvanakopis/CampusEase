from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum

class AccommodationStatus(str, Enum):
    pending = "Pending"
    available = "Available"
    rejected = "Rejected"
    booked = "Booked"
    unavailable = "Unavailable"

class AccommodationType(str, Enum):
    apartment = "Apartment"
    house = "House"
    villa = "Villa"
    hostel = "Hostel"
    other = "Other"

class AccommodationImageSchema(BaseModel):
    filename: str
    content_type: Optional[str] = None
    size: Optional[int] = None

class AccommodationAmenitySchema(BaseModel):
    name: str

class AccommodationAddressSchema(BaseModel):
    street: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None

class AccommodationLocationSchema(BaseModel):
    latitude: float
    longitude: float

class AccommodationCreateRequest(BaseModel):
    name: str
    accommodation_type: AccommodationType
    no_of_rooms: int
    no_of_beds: int
    no_of_bathrooms: int
    description: Optional[str] = None
    month_rent: float
    owner_id: str
    amenities: Optional[List[AccommodationAmenitySchema]] = []
    images: Optional[List[AccommodationImageSchema]] = []
    address: Optional[AccommodationAddressSchema] = None
    location: Optional[AccommodationLocationSchema] = None
    time_from_uni: Optional[Dict[str, str]] = None

class AccommodationResponse(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    accommodation_type: AccommodationType
    no_of_rooms: int
    no_of_beds: int
    no_of_bathrooms: int
    description: Optional[str] = None
    month_rent: float
    owner_id: str
    status: AccommodationStatus
    reject_reason: Optional[str] = None
    verified: bool
    highly_rated: bool
    amenities: List[AccommodationAmenitySchema] = []
    images: List[AccommodationImageSchema] = []
    address: Optional[AccommodationAddressSchema] = None
    location: Optional[AccommodationLocationSchema] = None
    time_from_uni: Optional[Dict[str, str]] = None
    created_at: str
    last_updated: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class AccommodationUpdateRequest(BaseModel):
    name: Optional[str] = None
    accommodation_type: Optional[AccommodationType] = None
    no_of_rooms: Optional[int] = None
    no_of_beds: Optional[int] = None
    no_of_bathrooms: Optional[int] = None
    status: AccommodationStatus
    description: Optional[str] = None
    month_rent: Optional[float] = None
    amenities: Optional[List[AccommodationAmenitySchema]] = None
    images: Optional[List[AccommodationImageSchema]] = None
    address: Optional[AccommodationAddressSchema] = None
    location: Optional[AccommodationLocationSchema] = None
    time_from_uni: Optional[Dict[str, str]] = None
