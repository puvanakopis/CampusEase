from datetime import datetime
from typing import List, Optional
from fastapi import UploadFile, HTTPException

from app.db.mongodb import vehicles_collection, owners_collection, users_collection
from app.utils.file_utils import save_file
from app.services.counter_service import get_next_sequence

from app.schemas.vehicle_schema import (
    VehicleCreateRequest,
    VehicleUpdateRequest,
    VehicleResponse,
    VehicleReview,
    OwnerResponse,
    UserResponse
)


async def get_owner_by_id(owner_id: str):
    owner_doc = await owners_collection.find_one({"_id": owner_id})
    if not owner_doc:
        return None
    return OwnerResponse(**owner_doc).dict(by_alias=True)


async def get_user_by_id(user_id: str):
    user_doc = await users_collection.find_one({"_id": user_id})
    if not user_doc:
        return None

    return UserResponse(
        id=user_doc["_id"],
        first_name=user_doc.get("first_name"),
        role=user_doc.get("role"),
        photo=user_doc.get("photo")
    )


async def create_vehicle(vehicle_request: VehicleCreateRequest, files: Optional[List[UploadFile]] = None):

    new_id = await get_next_sequence("vehicle")

    vehicle_data = vehicle_request.dict(exclude={"images"})

    vehicle_data.update({
        "_id": new_id,
        "verified": False,
        "highly_rated": False,
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow(),
        "images": []
    })

    if files:
        for idx, file in enumerate(files, start=1):
            filename_base = f"{new_id}_image_{idx}"
            saved = await save_file(file, filename_base, folder="uploads/vehicle")

            vehicle_data["images"].append({
                "filename": saved["filename"]
            })

    result = await vehicles_collection.insert_one(vehicle_data)

    if not result.acknowledged:
        raise HTTPException(status_code=500, detail="Vehicle creation failed")

    vehicle_obj = VehicleResponse(**vehicle_data, owner=None, reviews=[])

    return {
        "success": True,
        "status_code": 201,
        "message": "Vehicle created successfully",
        "data": vehicle_obj.dict(by_alias=True)
    }


async def get_all_vehicles():

    vehicles = []

    cursor = vehicles_collection.find()

    async for doc in cursor:

        owner = await get_owner_by_id(doc.get("owner_id"))

        reviews = []
        for rev in doc.get("reviews", []):
            user = await get_user_by_id(rev.get("user_id"))
            reviews.append(VehicleReview(user=user, **rev))

        doc_copy = doc.copy()
        doc_copy.pop("reviews", None)

        vehicle_obj = VehicleResponse(**doc_copy, owner=owner, reviews=reviews)

        vehicles.append(vehicle_obj.dict(by_alias=True))

    return {
        "success": True,
        "status_code": 200,
        "message": "Vehicles fetched successfully",
        "data": vehicles
    }


async def get_vehicle_by_owner(owner_id: str):

    vehicles = []

    cursor = vehicles_collection.find({"owner_id": owner_id})

    async for doc in cursor:

        owner = await get_owner_by_id(doc.get("owner_id"))

        reviews = []
        for rev in doc.get("reviews", []):
            user = await get_user_by_id(rev.get("user_id"))
            reviews.append(VehicleReview(user=user, **rev))

        doc_copy = doc.copy()
        doc_copy.pop("reviews", None)

        vehicle_obj = VehicleResponse(**doc_copy, owner=owner, reviews=reviews)

        vehicles.append(vehicle_obj.dict(by_alias=True))

    return {
        "success": True,
        "status_code": 200,
        "message": "Owner vehicles fetched successfully",
        "data": vehicles
    }


async def get_vehicle_by_id(vehicle_id: str):

    doc = await vehicles_collection.find_one({"_id": vehicle_id})

    if not doc:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    owner = await get_owner_by_id(doc.get("owner_id"))

    reviews = []
    for rev in doc.get("reviews", []):
        user = await get_user_by_id(rev.get("user_id"))
        reviews.append(VehicleReview(user=user, **rev))

    doc_copy = doc.copy()
    doc_copy.pop("reviews", None)

    vehicle_obj = VehicleResponse(**doc_copy, owner=owner, reviews=reviews)

    return {
        "success": True,
        "status_code": 200,
        "message": "Vehicle fetched successfully",
        "data": vehicle_obj.dict(by_alias=True)
    }


async def update_vehicle(vehicle_id: str, update_request: VehicleUpdateRequest, files: Optional[List[UploadFile]] = None):

    doc = await vehicles_collection.find_one({"_id": vehicle_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    update_data = update_request.dict(exclude_unset=True)
    update_data["last_updated"] = datetime.utcnow()

    existing_images = doc.get("images", [])

    if update_request.remove_images:
        existing_images = [img for img in existing_images if img["filename"] not in update_request.remove_images]

    if files:
        for idx, file in enumerate(files, start=1):
            filename_base = f"{vehicle_id}_image_{len(existing_images)+idx}"
            saved = await save_file(file, filename_base, folder="uploads/vehicle")
            existing_images.append({"filename": saved["filename"]})

    update_data["images"] = existing_images

    result = await vehicles_collection.update_one(
        {"_id": vehicle_id},
        {"$set": update_data}
    )

    if result.modified_count == 0 and not files and not update_request.remove_images:
        raise HTTPException(status_code=400, detail="No changes applied")

    return await get_vehicle_by_id(vehicle_id)


async def delete_vehicle(vehicle_id: str):

    result = await vehicles_collection.delete_one({"_id": vehicle_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    return {
        "success": True,
        "status_code": 200,
        "message": "Vehicle deleted successfully"
    }
