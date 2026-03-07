from app.db.mongodb import users_collection, vehicles_collection, accommodations_collection
from app.schemas.vehicle_schema import VehicleResponse
from app.schemas.accommodation_schema import AccommodationResponse
from fastapi import HTTPException
from typing import List


async def get_saved_items(user_id: str):
    user_doc = await users_collection.find_one({"_id": user_id})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")

    accommodations = []
    for acc_id in user_doc.get("save_accommodations", []):
        acc_doc = await accommodations_collection.find_one({"_id": acc_id})
        if acc_doc:
            accommodations.append(AccommodationResponse(**acc_doc))

    vehicles = []
    for veh_id in user_doc.get("save_transports", []):
        veh_doc = await vehicles_collection.find_one({"_id": veh_id})
        if veh_doc:
            vehicles.append(VehicleResponse(**veh_doc, owner=None, reviews=[])) 

    return {
        "success": True,
        "status_code": 200,
        "message": "Saved items fetched successfully",
        "data": {
            "saved_accommodations": accommodations,
            "saved_transports": vehicles
        }
    }

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
