from fastapi import APIRouter, Depends, HTTPException
from app.schemas.temp_booking_schema import TempBookingCreateRequest, TempBookingResponse
from app.services.temp_booking_service import (
    create_or_update_temp_booking,
    get_temp_booking_by_user,
    delete_temp_booking
)
from app.middlewares.auth_middleware import get_current_user, role_required

router = APIRouter(prefix="/temp-booking", tags=["Temp Booking"])


@router.post("/", response_model=TempBookingResponse)
async def save_temp_booking(
    data: TempBookingCreateRequest,
    current_user=Depends(role_required(["student"]))
):
    data.user_id = current_user.id
    temp_booking = await create_or_update_temp_booking(data.dict())
    return temp_booking

