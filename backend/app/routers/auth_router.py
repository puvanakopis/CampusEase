from fastapi import APIRouter, Body, Depends
from app.services.auth_service import (
    request_signup_otp, verify_signup_otp, login_user,
    request_password_reset, reset_password
)
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

# ------------------- SIGNUP / OTP -------------------

@router.post("/request-otp")
async def request_otp_endpoint(
    role: str = Body(..., description="Role: student, staff, or owner"),
    first_name: str = Body(...),
    last_name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...)
):
    return await request_signup_otp(role, first_name, last_name, email, password)

@router.post("/verify-otp")
async def verify_otp_endpoint(
    role: str = Body(..., description="Role: student, staff, or owner"),
    email: str = Body(...),
    otp: str = Body(...)
):
    return await verify_signup_otp(role, email, otp)

# ------------------- LOGIN -------------------

@router.post("/login")
async def login_endpoint(
    email: str = Body(...),
    password: str = Body(...)
):
    return await login_user(email, password)

# ------------------- PASSWORD RESET -------------------

@router.post("/forgot-password")
async def forgot_password_endpoint(
    email: str = Body(...)
):
    return await request_password_reset(email)

@router.post("/reset-password")
async def reset_password_endpoint(
    email: str = Body(...),
    otp: str = Body(...),
    new_password: str = Body(...)
):
    return await reset_password(email, otp, new_password)

# ------------------- CURRENT USER -------------------

@router.get("/me")
async def get_current_user_endpoint(current_user=Depends(get_current_user)):
    return {"user": current_user.dict(by_alias=True)}