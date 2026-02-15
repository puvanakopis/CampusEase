from pydantic import BaseModel, EmailStr
from typing import Optional

class SignupRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str