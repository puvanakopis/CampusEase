from datetime import datetime
from typing import List, Optional
from fastapi import UploadFile, HTTPException

from app.db.mongodb import vehicles_collection, owners_collection, users_collection
from app.utils.file_utils import save_file
from app.services.counter_service import get_next_sequence

from app.schemas.vehicle_schema import (
    VehicleCreateRequest,
    VehicleResponse,
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
