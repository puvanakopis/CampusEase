from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import datetime
from app.models.owner_model import OwnerStatus, OwnerPhoto
from app.models.user_model import Photo
from app.models.vehicle_model import VehicleStatus, VehicleType, FuelType, TransmissionType, VehicleDistance, VehicleImage, VehicleAddress, VehicleLocation


class UserResponse(BaseModel):
    id: str
    first_name: str
    role: str
    photo: Optional[Photo] = None


class VehicleReview(BaseModel):
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


class VehicleReviewCreateRequest(BaseModel):
    message: str
    rating: float = Field(..., ge=0, le=5)


class VehicleCreateRequest(BaseModel):
    name: str
    brand: str
    model: str
    year: int
    vehicle_type: VehicleType
    no_of_seats: int
    fuel_type: FuelType
    transmission: TransmissionType
    air_conditioning: bool = False
    registration_number: str
    insurance_number: Optional[str] = None
    insurance_expiry: Optional[datetime] = None
    description: Optional[str] = None
    owner_id: Optional[str] = None
    day_rent: float
    status: VehicleStatus = VehicleStatus.pending
    images: List[VehicleImage] = []
    amenities: Optional[List[str]] = []
    address: Optional[VehicleAddress] = None
    location: Optional[VehicleLocation] = None
    time_from_uni: Optional[VehicleDistance] = None


class VehicleResponse(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    brand: str
    model: str
    year: int
    vehicle_type: VehicleType
    no_of_seats: int
    fuel_type: FuelType
    transmission: TransmissionType
    air_conditioning: bool
    registration_number: str
    insurance_number: Optional[str]
    insurance_expiry: Optional[datetime]
    verified: bool
    highly_rated: bool
    description: Optional[str]
    owner: Optional[OwnerResponse] = None
    day_rent: float
    status: VehicleStatus
    reject_reason: Optional[str] = None
    images: List[VehicleImage] = []
    amenities: Optional[List[str]] = []
    reviews: Optional[List[VehicleReview]] = []
    address: Optional[VehicleAddress]
    location: Optional[VehicleLocation]
    time_from_uni: Optional[VehicleDistance]
    created_at: datetime
    last_updated: datetime


class VehicleUpdateRequest(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    vehicle_type: Optional[VehicleType] = None
    no_of_seats: Optional[int] = None
    fuel_type: Optional[FuelType] = None
    transmission: Optional[TransmissionType] = None
    air_conditioning: Optional[bool] = None
    registration_number: Optional[str] = None
    insurance_number: Optional[str] = None
    insurance_expiry: Optional[datetime] = None
    verified: Optional[bool] = None
    highly_rated: Optional[bool] = None
    description: Optional[str] = None
    owner_id: Optional[str] = None
    day_rent: Optional[float] = None
    status: Optional[VehicleStatus] = None
    reject_reason: Optional[str] = None
    images: Optional[List[VehicleImage]] = None
    amenities: Optional[List[str]] = None
    address: Optional[VehicleAddress] = None
    location: Optional[VehicleLocation] = None
    time_from_uni: Optional[VehicleDistance] = None
    remove_images: Optional[List[str]] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)
