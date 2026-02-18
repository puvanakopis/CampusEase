from fastapi import APIRouter, Body, Depends , File, Form, UploadFile
from typing import Optional
from app.services.auth_service import (
    request_signup_otp, verify_signup_otp, login_user,
    request_password_reset, reset_password , update_current_user, update_password
)
from app.dependencies.auth_dependencies import get_current_user


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup-request-otp")
async def request_otp_endpoint(
    role: str = Body(..., description="Role: student, staff, or owner"),
    first_name: str = Body(...),
    last_name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...)
):
    return await request_signup_otp(role, first_name, last_name, email, password)


@router.post("/signup-verify-otp")
async def verify_otp_endpoint(
    role: str = Body(..., description="Role: student, staff, or owner"),
    email: str = Body(...),
    otp: str = Body(...)
):
    return await verify_signup_otp(role, email, otp)


@router.post("/login")
async def login_endpoint(
    email: str = Body(...),
    password: str = Body(...)
):
    return await login_user(email, password)


@router.post("/forgot-password")
async def forgot_password_endpoint(
    email: str = Body(..., embed=True)
):
    return await request_password_reset(email)


@router.post("/reset-password")
async def reset_password_endpoint(
    email: str = Body(...),
    otp: str = Body(...),
    new_password: str = Body(...)
):
    return await reset_password(email, otp, new_password)


@router.get("/me")
async def get_current_user_endpoint(current_user=Depends(get_current_user)):
    return {"user": current_user.dict(by_alias=True)}


@router.patch("/update-profile")
async def update_profile_endpoint(
    first_name: Optional[str] = Form(None),
    last_name: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    phone: Optional[str] = Form(None),
    id_number: Optional[str] = Form(None),

    photo: Optional[UploadFile] = File(None),
    id_photo: Optional[UploadFile] = File(None),

    current_user=Depends(get_current_user)
):
    update_data = {
        "first_name": first_name,
        "last_name": last_name,
        "address": address,
        "phone": phone,
        "id_number": id_number,
    }

    return await update_current_user(
        current_user=current_user,
        update_data=update_data,
        photo=photo,
        id_photo=id_photo
    )


@router.patch("/update-password")
async def update_password_endpoint(
    current_password: str = Body(..., description="Your current password"),
    new_password: str = Body(..., description="New password to update"),
    current_user=Depends(get_current_user)
):
    return await update_password(current_user, current_password, new_password)
