from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime


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
    susl_main_gate: str = None
    pambahinna_junction: str = None


class VehicleImage(BaseModel):
    filename: str


class VehicleReview(BaseModel):
    user_id: str
    message: str
    rating: float = Field(..., ge=0, le=5)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class VehicleAmenity(BaseModel):
    name: str


class VehicleAddress(BaseModel):
    street: str = None
    city: str = None
    postal_code: str = None
    country: str = None


class VehicleLocation(BaseModel):
    latitude: float
    longitude: float


class Vehicle(BaseModel):
    id: str = Field(..., alias="_id")
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
    insurance_number: str = None
    insurance_expiry: datetime = None
    verified: Optional[bool] = False
    highly_rated: Optional[bool] = False
    description: str = None
    owner_id: str
    day_rent: float
    status: VehicleStatus = VehicleStatus.pending
    reject_reason: Optional[str] = None
    images: List[VehicleImage] = []
    amenities: List[VehicleAmenity] = []
    reviews: Optional[List[VehicleReview]] = []
    address: VehicleAddress = None
    location: VehicleLocation = None
    time_from_uni: VehicleDistance = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        orm_mode = True
        allow_population_by_field_name = True