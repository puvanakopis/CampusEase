from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import datetime

class UserPhoto(BaseModel):
    filename: str
    content_type: str
    size: int

class OwnerStatus(str, Enum):
    pending = "Pending Approval"
    active = "Active"
    inactive = "Inactive"
    declined = "Declined Approval"

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
    susl_main_gate: Optional[str] = None
    pambahinna_junction: Optional[str] = None

class AccommodationImageSchema(BaseModel):
    filename: str

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


class UserResponse(BaseModel):
    id: str = Field(..., alias="id")
    first_name: str
    role: str
    photo: Optional[UserPhoto] = None

class AccommodationReview(BaseModel):
    user : UserResponse
    message: str
    rating: float = Field(..., ge=0, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AccommodationReviewCreateRequest(BaseModel):
    message: str
    rating: float = Field(..., ge=0, le=5)

class OwnerResponse(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    address: str
    phone: str
    photo: Optional[UserPhoto] = None
    verified: bool = False
    description: Optional[str] = None
    status: Optional[OwnerStatus] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)





class AccommodationCreateRequest(BaseModel):
    name: str
    accommodation_type: AccommodationType
    no_of_rooms: int
    no_of_beds: int
    no_of_bathrooms: int
    description: Optional[str] = None
    owner_id: Optional[str] = None
    month_rent: float
    status: AccommodationStatus = AccommodationStatus.pending
    images: List[AccommodationImageSchema] = []
    amenities: List[AccommodationAmenitySchema] = []
    available_users: int = 0
    total_users: int = 0
    address: Optional[AccommodationAddressSchema] = None
    location: Optional[AccommodationLocationSchema] = None
    time_from_uni: Optional[AccommodationDistance] = None
    gender: AccommodationGender = AccommodationGender.male




class AccommodationResponse(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    accommodation_type: AccommodationType
    no_of_rooms: int
    no_of_beds: int
    no_of_bathrooms: int
    verified: bool
    highly_rated: bool
    description: Optional[str] = None
    owner: Optional[OwnerResponse] = None
    month_rent: float
    status: AccommodationStatus
    reject_reason: Optional[str] = None
    images: List[AccommodationImageSchema] = []
    reviews: List[AccommodationReview] = []
    amenities: List[AccommodationAmenitySchema] = []
    available_users: int
    total_users: int 
    address: Optional[AccommodationAddressSchema] = None
    location: Optional[AccommodationLocationSchema] = None
    time_from_uni: Optional[AccommodationDistance] = None
    gender: Optional[AccommodationGender]=None
    created_at: datetime
    last_updated: datetime



class AccommodationUpdateRequest(BaseModel):
    name: Optional[str] = None
    accommodation_type: Optional[AccommodationType] = None
    no_of_rooms: Optional[int] = None
    no_of_beds: Optional[int] = None
    no_of_bathrooms: Optional[int] = None
    verified: Optional[bool] = None
    highly_rated: Optional[bool] = None
    description: Optional[str] = None
    owner_id: Optional[str] = None
    month_rent: Optional[float] = None
    status: Optional[AccommodationStatus] = None
    reject_reason: Optional[str] = None
    images: Optional[List[AccommodationImageSchema]] = None
    amenities: Optional[List[AccommodationAmenitySchema]] = None
    available_users: Optional[int] = None
    total_users: Optional[int] = None
    address: Optional[AccommodationAddressSchema] = None
    location: Optional[AccommodationLocationSchema] = None
    time_from_uni: Optional[AccommodationDistance] = None
    gender: Optional[AccommodationGender]=None
    last_updated: datetime = Field(default_factory=datetime.utcnow)
