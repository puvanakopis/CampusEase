from fastapi import HTTPException
from typing import Optional
from app.db.mongodb import users_collection, vehicles_collection, accommodations_collection
from app.schemas.vehicle_schema import VehicleResponse, VehicleReview
from app.schemas.accommodation_schema import AccommodationResponse, AccommodationReview
from app.schemas.user_schema import UserResponse


async def get_user_by_id(user_id: str) -> Optional[UserResponse]:
    user_doc = await users_collection.find_one({"_id": str(user_id)})
    if not user_doc:
        return None
    return UserResponse(
        id=user_doc["_id"],
        first_name=user_doc.get("first_name", ""),
        role=user_doc.get("role", ""),
        photo=user_doc.get("photo")
    )


async def get_saved_items(user_id: str):
    user_doc = await users_collection.find_one({"_id": user_id})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")

    accommodations = []
    for acc_id in user_doc.get("save_accommodations", []):
        acc_doc = await accommodations_collection.find_one({"_id": acc_id})
        if acc_doc:
            reviews = []
            for rev in acc_doc.get("reviews", []):
                user_obj = await get_user_by_id(rev.get("user_id"))
                reviews.append(AccommodationReview(
                    user=user_obj.dict() if user_obj else None, **rev))

            acc_doc_copy = acc_doc.copy()
            acc_doc_copy.pop("reviews", None)

            accommodations.append(AccommodationResponse(
                **acc_doc_copy, reviews=reviews, owner=None))

    vehicles = []
    for veh_id in user_doc.get("save_transports", []):
        veh_doc = await vehicles_collection.find_one({"_id": veh_id})
        if veh_doc:
            reviews = []
            for rev in veh_doc.get("reviews", []):
                user_obj = await get_user_by_id(rev.get("user_id"))
                reviews.append(VehicleReview(
                    user=user_obj.dict() if user_obj else None, **rev))

            veh_doc_copy = veh_doc.copy()
            veh_doc_copy.pop("reviews", None)

            vehicles.append(VehicleResponse(
                **veh_doc_copy, reviews=reviews, owner=None))

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


async def add_saved_transport(user_id: str, vehicle_id: str):
    user_doc = await users_collection.find_one({"_id": user_id})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")

    if vehicle_id not in user_doc.get("save_transports", []):
        await users_collection.update_one(
            {"_id": user_id},
            {"$push": {"save_transports": vehicle_id}}
        )

    return await get_saved_items(user_id)


async def remove_saved_transport(user_id: str, vehicle_id: str):
    await users_collection.update_one(
        {"_id": user_id},
        {"$pull": {"save_transports": vehicle_id}}
    )
    return await get_saved_items(user_id)
