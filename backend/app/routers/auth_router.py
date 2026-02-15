from fastapi import APIRouter, Body
from app.services.auth_service import request_otp
from app.db.mongodb import users_collection, admins_collection, owners_collection

router = APIRouter(prefix="/auth", tags=["Auth"])

# ------------------- USER -------------------
@router.post("/user/request-otp")
async def user_request_otp(first_name: str = Body(...), last_name: str = Body(...),
                           email: str = Body(...), password: str = Body(...)):
    return await request_otp(users_collection, first_name, last_name, email, password)


# ------------------- OWNER -------------------
@router.post("/owner/request-otp")
async def owner_request_otp(first_name: str = Body(...), last_name: str = Body(...),
                            email: str = Body(...), password: str = Body(...)):
    return await request_otp(owners_collection, first_name, last_name, email, password)