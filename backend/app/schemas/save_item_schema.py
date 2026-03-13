from typing import List
from pydantic import BaseModel, Field
from app.schemas.vehicle_schema import VehicleResponse
from app.schemas.accommodation_schema import AccommodationResponse

class SaveItemResponse(BaseModel):
    saved_accommodations: List[AccommodationResponse] = []
    saved_transports: List[VehicleResponse] = []

class SaveItemRequest(BaseModel):
    item_id: str