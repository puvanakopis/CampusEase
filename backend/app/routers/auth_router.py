from fastapi import APIRouter, Body
from app.services.auth_service import (
    request_signup_otp, verify_signup_otp, login_with_role,
    request_password_reset, verify_password_reset
)

router = APIRouter(prefix="/auth", tags=["Auth"])


# ------------------- SIGNUP / OTP -------------------

@router.post("/request-otp")
async def request_otp_endpoint(
    role: str = Body(..., description="Role: user or owner"),
    first_name: str = Body(...),
    last_name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...)
):
    return await request_signup_otp(role, first_name, last_name, email, password)


@router.post("/verify-otp")
async def verify_otp_endpoint(
    role: str = Body(..., description="Role: user or owner"),
    email: str = Body(...),
    otp: str = Body(...)
):
    return await verify_signup_otp(role, email, otp)


# ------------------- LOGIN -------------------

@router.post("/login")
async def login_endpoint(
    role: str = Body(..., description="Role: admin, owner, or user"),
    email: str = Body(...),
    password: str = Body(...)
):
    return await login_with_role(role, email, password)


# ------------------- PASSWORD RESET -------------------

@router.post("/forgot-password")
async def forgot_password_endpoint(
    role: str = Body(..., description="Role: admin, owner, or user"),
    email: str = Body(...)
):
    return await request_password_reset(role, email)


@router.post("/reset-password")
async def reset_password_endpoint(
    role: str = Body(..., description="Role: admin, owner, or user"),
    email: str = Body(...),
    otp: str = Body(...),
    new_password: str = Body(...)
):
    return await verify_password_reset(role, email, otp, new_password)
