from datetime import datetime
from fastapi import HTTPException
from app.db.mongodb import accommodations_booking_collection  
from app.services.counter_service import get_next_sequence
from app.schemas.accommodation_booking_schema import (
    AccommodationBookingCreateRequest,
    AccommodationBookingUpdateRequest,
    AccommodationBookingResponse
)


async def create_booking(booking_request: AccommodationBookingCreateRequest) -> dict:
    new_id = await get_next_sequence("acc_booking")
    booking_data = booking_request.dict()
    booking_data.update({
        "_id": new_id,
        "status": booking_data.get("status", "pending"),
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow()
    })
    result = await accommodations_booking_collection.insert_one(booking_data)
    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to create booking")
    
    booking_obj = AccommodationBookingResponse(**booking_data)
    return {
        "success": True,
        "status_code": 201,
        "message": "Booking created successfully",
        "data": booking_obj.dict(by_alias=True)
    }


async def get_all_bookings() -> dict:
    bookings = []
    cursor = accommodations_booking_collection.find({})
    async for doc in cursor:
        bookings.append(AccommodationBookingResponse(**doc).dict(by_alias=True))
    
    return {
        "success": True,
        "status_code": 200,
        "message": "All bookings fetched successfully",
        "data": bookings
    }


async def get_booking_by_id(acc_booking_id: str) -> dict:
    doc = await accommodations_booking_collection.find_one({"_id": acc_booking_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking_obj = AccommodationBookingResponse(**doc)
    return {
        "success": True,
        "status_code": 200,
        "message": "Booking fetched successfully",
        "data": booking_obj.dict(by_alias=True)
    }


async def get_bookings_by_user(user_id: str) -> dict:
    bookings = []
    cursor = accommodations_booking_collection.find({"user_id": user_id})
    async for doc in cursor:
        bookings.append(AccommodationBookingResponse(**doc).dict(by_alias=True))
    return {
        "success": True,
        "status_code": 200,
        "message": f"Bookings for user {user_id} fetched successfully",
        "data": bookings
    }


async def get_bookings_by_owner(owner_id: str) -> dict:
    bookings = []
    cursor = accommodations_booking_collection.find({"owner_id": owner_id})
    async for doc in cursor:
        bookings.append(AccommodationBookingResponse(**doc).dict(by_alias=True))
    return {
        "success": True,
        "status_code": 200,
        "message": f"Bookings for owner {owner_id} fetched successfully",
        "data": bookings
    }


async def update_booking(acc_booking_id: str, update_request: AccommodationBookingUpdateRequest) -> dict:
    update_data = update_request.dict(exclude_unset=True)
    update_data["last_updated"] = datetime.utcnow()

    result = await accommodations_booking_collection.update_one({"_id": acc_booking_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")

    updated_doc = await accommodations_booking_collection.find_one({"_id": acc_booking_id})
    booking_obj = AccommodationBookingResponse(**updated_doc)
    return {
        "success": True,
        "status_code": 200,
        "message": "Booking updated successfully",
        "data": booking_obj.dict(by_alias=True)
    }


async def delete_booking(acc_booking_id: str) -> dict:
    result = await accommodations_booking_collection.delete_one({"_id": acc_booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {
        "success": True,
        "status_code": 200,
        "message": "Booking deleted successfully"
    }