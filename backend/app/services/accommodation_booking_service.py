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

