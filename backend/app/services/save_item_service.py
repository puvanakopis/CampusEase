from app.db.mongodb import users_collection, vehicles_collection, accommodations_collection
from app.schemas.vehicle_schema import VehicleResponse
from app.schemas.accommodation_schema import AccommodationResponse
from fastapi import HTTPException
from typing import List

async def add_saved_accommodation(user_id: str, accommodation_id: str):
    user_doc = await users_collection.find_one({"_id": user_id})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")

    if accommodation_id not in user_doc.get("save_accommodations", []):
        await users_collection.update_one(
            {"_id": user_id},
            {"$push": {"save_accommodations": accommodation_id}}
        )

    return await get_saved_items(user_id)

async def remove_saved_accommodation(user_id: str, accommodation_id: str):
    await users_collection.update_one(
        {"_id": user_id},
        {"$pull": {"save_accommodations": accommodation_id}}
    )
    return await get_saved_items(user_id)
