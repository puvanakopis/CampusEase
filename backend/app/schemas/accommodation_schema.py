from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from app.models.accommodation_model import AccommodationStatus, AccommodationType,    AccommodationDistance,    AccommodationGender,    AccommodationImage,    AccommodationAddress,    AccommodationLocation
from app.models.owner_model import OwnerPhoto,    OwnerStatus
from app.models.user_model import Photo


class UserResponse(BaseModel):
    id: str
    first_name: str
    role: str
    photo: Optional[Photo] = None


class AccommodationReview(BaseModel):
    user: Optional[UserResponse]
    message: str
    rating: float = Field(..., ge=0, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class OwnerResponse(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    address: str
    phone: str
    photo: Optional[OwnerPhoto] = None
    verified: bool = False
    description: Optional[str] = None
    status: Optional[OwnerStatus] = None
    created_at: datetime
    last_updated: datetime


class AccommodationReviewCreateRequest(BaseModel):
    message: str
    rating: float = Field(..., ge=0, le=5)


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
    images: List[AccommodationImage] = []
    amenities: List[str] = []
    available_users: int = 0
    total_users: int = 0
    address: Optional[AccommodationAddress] = None
    location: Optional[AccommodationLocation] = None
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
    images: List[AccommodationImage] = []
    reviews: Optional[List[AccommodationReview]] = []
    amenities: List[str] = []
    available_users: int
    total_users: int
    address: Optional[AccommodationAddress] = None
    location: Optional[AccommodationLocation] = None
    time_from_uni: Optional[AccommodationDistance] = None
    gender: Optional[AccommodationGender] = None
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
    images: Optional[List[AccommodationImage]] = None
    amenities: Optional[List[str]] = None
    available_users: Optional[int] = None
    total_users: Optional[int] = None
    address: Optional[AccommodationAddress] = None
    location: Optional[AccommodationLocation] = None
    time_from_uni: Optional[AccommodationDistance] = None
    gender: Optional[AccommodationGender] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)
