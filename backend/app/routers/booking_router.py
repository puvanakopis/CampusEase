from fastapi import APIRouter, Depends
from app.schemas.booking_schema import BookingCreateRequest, BookingUpdateRequest
from app.services.booking_service import (
    get_all_bookings,
    create_booking,
    get_booking_by_id,
    get_bookings_by_user,
    get_bookings_by_owner,
    update_booking,
    delete_booking
)
from app.middlewares.auth_middleware import role_required

router = APIRouter(prefix="/booking", tags=["Booking"])


@router.post("/")
async def create_booking_endpoint(
    booking_request: BookingCreateRequest,
    current_user=Depends(role_required(["user", "owner", "admin"]))
):
    booking_request.user_id = current_user.id
    return await create_booking(booking_request)


@router.get("/")
async def get_all_bookings_endpoint():
    return await get_all_bookings()


@router.get("/{booking_id}")
async def get_booking_endpoint(booking_id: str):
    return await get_booking_by_id(booking_id)


@router.get("/user/{user_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def get_bookings_by_user_endpoint(user_id: str):
    return await get_bookings_by_user(user_id)


@router.get("/owner/{owner_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def get_bookings_by_owner_endpoint(owner_id: str):
    return await get_bookings_by_owner(owner_id)


@router.patch("/{booking_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def update_booking_endpoint(
    booking_id: str,
    update_request: BookingUpdateRequest
):
    return await update_booking(booking_id, update_request)


@router.delete("/{booking_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def delete_booking_endpoint(booking_id: str):
    return await delete_booking(booking_id)