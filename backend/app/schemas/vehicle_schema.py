from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import datetime

class OwnerStatus(str, Enum):
    pending = "Pending Approval"
    active = "Active"
    inactive = "Inactive"
    declined = "Declined Approval"

class VehicleStatus(str, Enum):
    pending = "pending"
    available = "available"
    booked = "booked"
    rejected = "rejected"
    unavailable = "unavailable"


class VehicleType(str, Enum):
    car = "car"
    van = "van"
    bike = "bike"
    three_wheel = "three_wheel"
    bus = "bus"
    other = "other"


class FuelType(str, Enum):
    petrol = "petrol"
    diesel = "diesel"
    electric = "electric"
    hybrid = "hybrid"
    other = "other"


class TransmissionType(str, Enum):
    manual = "manual"
    automatic = "automatic"
    semi_automatic = "semi_automatic"


class VehicleDistance(BaseModel):
    susl_main_gate: Optional[str] = None
    pambahinna_junction: Optional[str] = None


class VehicleImageSchema(BaseModel):
    filename: str


class VehicleAddressSchema(BaseModel):
    street: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None


class VehicleLocationSchema(BaseModel):
    latitude: float
    longitude: float


class UserPhoto(BaseModel):
    filename: str
    content_type: str
    size: int


class UserResponse(BaseModel):
    id: str
    first_name: str
    role: str
    photo: Optional[UserPhoto] = None


class VehicleReview(BaseModel):
    user: UserResponse
    message: str
    rating: float = Field(..., ge=0, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class VehicleReviewCreateRequest(BaseModel):
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
    created_at: datetime
    last_updated: datetime


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
    images: List[VehicleImageSchema] = []
    amenities: Optional[List[str]] = []
    address: Optional[VehicleAddressSchema] = None
    location: Optional[VehicleLocationSchema] = None
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
    reject_reason: Optional[str]  = None
    images: List[VehicleImageSchema] = []
    amenities: Optional[List[str]] = []
    reviews: List[VehicleReview] = []
    address: Optional[VehicleAddressSchema]
    location: Optional[VehicleLocationSchema]
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
    images: Optional[List[VehicleImageSchema]] = None
    amenities: Optional[List[str]] = None
    address: Optional[VehicleAddressSchema] = None
    location: Optional[VehicleLocationSchema] = None
    time_from_uni: Optional[VehicleDistance] = None
    remove_images: Optional[List[str]] = None  # NEW
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    