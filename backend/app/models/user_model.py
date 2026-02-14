from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from enum import Enum
from datetime import datetime

class UserRole(str, Enum):
    student = "student"
    staff = "staff"

class UserStatus(str, Enum):
    available = "Available"
    blocked = "Blocked"

_user_counter = 0
def generate_user_id() -> str:
    global _user_counter
    _user_counter += 1
    return f"user_{_user_counter:02d}"  

class Photo(BaseModel):
    filename: str
    content_type: str
    size: int 

class User(BaseModel):
    id: str = Field(default_factory=generate_user_id)
    first_name: str
    last_name: Optional[str] = None
    email: EmailStr
    password: str
    phone: Optional[str] = ""
    address: Optional[str] = ""
    role: UserRole = UserRole.student
    photo: Optional[Photo] = None
    status: UserStatus = UserStatus.available
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    save_accommodations: List[str] = [] 
    save_transports: List[str] = []    

    class Config:
        orm_mode = True