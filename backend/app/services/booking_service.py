from datetime import datetime
from fastapi import HTTPException
from app.db.mongodb import (
    booking_collection,
    vehicles_collection,
    accommodations_collection,
    owners_collection
)
from app.services.counter_service import get_next_sequence
from app.schemas.booking_schema import (
    BookingCreateRequest,
    BookingUpdateRequest,
    BookingResponse
)
from app.schemas.vehicle_schema import VehicleResponse
from app.schemas.accommodation_schema import AccommodationResponse
from app.schemas.owner_schema import OwnerResponse


async def get_owner_by_id(owner_id: str) -> OwnerResponse | None:
    owner_doc = await owners_collection.find_one({"_id": str(owner_id)})
    if not owner_doc:
        return None
    return OwnerResponse(**owner_doc)


async def enrich_booking_response(booking_data: dict) -> BookingResponse:
    vehicle_obj = None
    accom_obj = None
    owner_obj = None

    owner_obj = await get_owner_by_id(booking_data["owner_id"])

    if booking_data["booking_type"] == "vehicle":
        doc = await vehicles_collection.find_one({"_id": booking_data["resource_id"]})
        if doc:
            # Enrich reviews
            reviews = []
            for review in doc.get("reviews", []):
                user_doc = await owners_collection.find_one({"_id": review["user_id"]})  # or users_collection
                user_obj = None
                if user_doc:
                    user_obj = {
                        "id": user_doc["_id"],
                        "first_name": user_doc["first_name"],
                        "role": user_doc["role"],
                        "photo": user_doc.get("photo")
                    }
                reviews.append({
                    "user": user_obj,
                    "message": review["message"],
                    "rating": review["rating"],
                    "created_at": review.get("created_at")
                })
            doc["reviews"] = reviews

            vehicle_obj = VehicleResponse(**doc)

    elif booking_data["booking_type"] == "accommodation":
        doc = await accommodations_collection.find_one({"_id": booking_data["resource_id"]})
        if doc:
            accom_obj = AccommodationResponse(**doc)

    return BookingResponse(
        **booking_data,
        vehicle=vehicle_obj,
        accommodation=accom_obj,
        owner=owner_obj
    )

async def create_booking(booking_request: BookingCreateRequest) -> dict:
    new_id = await get_next_sequence("booking")
    booking_data = booking_request.dict()
    booking_data.update({
        "_id": new_id,
        "status": "pending",
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow()
    })

    result = await booking_collection.insert_one(booking_data)
    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Failed to create booking")

    booking_obj = await enrich_booking_response(booking_data)
    return {
        "success": True,
        "status_code": 201,
        "message": "Booking created successfully",
        "data": booking_obj.dict(by_alias=True)
    }


async def get_all_bookings() -> dict:
    bookings = []
    cursor = booking_collection.find({})
    async for doc in cursor:
        booking_obj = await enrich_booking_response(doc)
        bookings.append(booking_obj.dict(by_alias=True))
    return {
        "success": True,
        "status_code": 200,
        "message": "All bookings fetched successfully",
        "data": bookings
    }


async def get_booking_by_id(booking_id: str) -> dict:
    doc = await booking_collection.find_one({"_id": booking_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking_obj = await enrich_booking_response(doc)
    return {
        "success": True,
        "status_code": 200,
        "message": "Booking fetched successfully",
        "data": booking_obj.dict(by_alias=True)
    }


async def get_bookings_by_user(user_id: str) -> dict:
    bookings = []
    cursor = booking_collection.find({"user_id": user_id})
    async for doc in cursor:
        booking_obj = await enrich_booking_response(doc)
        bookings.append(booking_obj.dict(by_alias=True))
    return {
        "success": True,
        "status_code": 200,
        "message": f"Bookings for user {user_id} fetched successfully",
        "data": bookings
    }


async def get_bookings_by_owner(owner_id: str) -> dict:
    bookings = []
    cursor = booking_collection.find({"owner_id": owner_id})
    async for doc in cursor:
        booking_obj = await enrich_booking_response(doc)
        bookings.append(booking_obj.dict(by_alias=True))
    return {
        "success": True,
        "status_code": 200,
        "message": f"Bookings for owner {owner_id} fetched successfully",
        "data": bookings
    }


async def update_booking(booking_id: str, update_request: BookingUpdateRequest) -> dict:
    update_data = update_request.dict(exclude_unset=True)
    update_data["last_updated"] = datetime.utcnow()

    result = await booking_collection.update_one({"_id": booking_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")

    updated_doc = await booking_collection.find_one({"_id": booking_id})
    booking_obj = await enrich_booking_response(updated_doc)
    return {
        "success": True,
        "status_code": 200,
        "message": "Booking updated successfully",
        "data": booking_obj.dict(by_alias=True)
    }


async def delete_booking(booking_id: str) -> dict:
    result = await booking_collection.delete_one({"_id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {
        "success": True,
        "status_code": 200,
        "message": "Booking deleted successfully"
    }