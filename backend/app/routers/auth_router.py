from fastapi import APIRouter, Body
from app.services.auth_service import request_otp, verify_otp_and_signup, login
from app.db.mongodb import users_collection, admins_collection, owners_collection

router = APIRouter(prefix="/auth", tags=["Auth"])

# ------------------- USER -------------------
@router.post("/user/request-otp")
async def user_request_otp(first_name: str = Body(...), last_name: str = Body(...),
                           email: str = Body(...), password: str = Body(...)):
    return await request_otp(users_collection, first_name, last_name, email, password)

@router.post("/user/verify-otp")
async def user_verify_otp(email: str = Body(...), otp: str = Body(...)):
    return await verify_otp_and_signup(users_collection, email, otp)

@router.post("/user/login")
async def user_login(email: str = Body(...), password: str = Body(...)):
    return await login(users_collection, email, password)


# ------------------- OWNER -------------------
@router.post("/owner/request-otp")
async def owner_request_otp(first_name: str = Body(...), last_name: str = Body(...),
                            email: str = Body(...), password: str = Body(...)):
    return await request_otp(owners_collection, first_name, last_name, email, password)

@router.post("/owner/verify-otp")
async def owner_verify_otp(email: str = Body(...), otp: str = Body(...)):
    return await verify_otp_and_signup(owners_collection, email, otp)

@router.post("/owner/login")
async def owner_login(email: str = Body(...), password: str = Body(...)):
    return await login(owners_collection, email, password)


# ------------------- ADMIN -------------------
@router.post("/admin/login")
async def admin_login(email: str = Body(...), password: str = Body(...)):
    return await login(admins_collection, email, password)