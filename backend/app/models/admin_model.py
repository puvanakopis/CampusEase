from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from datetime import datetime

class AdminStatus(str, Enum):
    active = "Active"

class AdminRole(str, Enum):
    admin = "admin"

class AdminPhoto(BaseModel):
    filename: str
    content_type: str
    size: int

class Admin(BaseModel):
    id: str = Field(..., alias="_id")
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    password: str
    address: Optional[str] = ""
    phone: Optional[str] = ""
    role: AdminRole = AdminRole.admin
    photo: Optional[AdminPhoto] = None
    status: AdminStatus = AdminStatus.active
    id_number: Optional[str] = None
    id_photo: Optional[AdminPhoto] = None
    verified: bool = False
    decline_reason: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "from_attributes": True,  
        "validate_by_name": True 
    }