from datetime import datetime
from typing import List, Optional
from fastapi import HTTPException, UploadFile
from app.db.mongodb import accommodations_collection, owners_collection
from app.utils.file_utils import save_file
from app.services.counter_service import get_next_sequence
from app.models.accommodation_model import Accommodation
from app.schemas.accommodation_schema import AccommodationCreateRequest, AccommodationResponse, OwnerResponse


async def get_owner_by_id(owner_id: str) -> dict:
    owner_doc = await owners_collection.find_one({"_id": str(owner_id)})
    if not owner_doc:
        return None
    return OwnerResponse(**owner_doc).dict(by_alias=True)


async def create_accommodation(accom_request: AccommodationCreateRequest, files: Optional[List[UploadFile]] = None) -> dict:
    new_id = await get_next_sequence("accommodation")

    accom_data = accom_request.dict(exclude={"images"})
    accom_data.update({
        "_id": new_id,
        "status": "Pending",
        "verified": False,
        "highly_rated": False,
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow()
    })

    image_meta_list = []
    if files:
        for idx, file in enumerate(files, start=1):
            filename = f"{new_id}_image_{idx}"
            meta = await save_file(file, filename, "uploads/accommodation")
            image_meta_list.append(meta)
    accom_data["images"] = image_meta_list

    await accommodations_collection.insert_one(accom_data)
    accom_obj = Accommodation(**accom_data)

    return {
        "success": True,
        "status_code": 201,
        "message": "Accommodation created successfully",
        "data": accom_obj.dict(by_alias=True)
    }


async def get_all_accommodations() -> dict:
    accom_list = []
    cursor = accommodations_collection.find()
    async for doc in cursor:
        accom_obj = Accommodation(**doc)
        owner_data = await get_owner_by_id(accom_obj.owner_id)
        accom_dict = accom_obj.dict(by_alias=True)
        accom_dict["owner"] = owner_data
        accom_list.append(accom_dict)

    return {
        "success": True,
        "status_code": 200,
        "message": "Accommodations fetched successfully",
        "data": accom_list
    }


async def get_accommodation_by_id(accommodation_id: str) -> dict:
    accom_doc = await accommodations_collection.find_one({"_id": str(accommodation_id)})
    if not accom_doc:
        raise HTTPException(status_code=404, detail="Accommodation not found")

    accom_obj = Accommodation(**accom_doc)
    owner_data = await get_owner_by_id(accom_obj.owner_id)
    accom_dict = accom_obj.dict(by_alias=True)
    accom_dict["owner"] = owner_data

    return {
        "success": True,
        "status_code": 200,
        "message": "Accommodation fetched successfully",
        "data": accom_dict
    }


async def update_accommodation(accommodation_id: str, update_data: dict, files: Optional[List[UploadFile]] = None) -> dict:
    update_data["last_updated"] = datetime.utcnow()

    image_meta_list = []
    if files:
        for idx, file in enumerate(files, start=1):
            filename = f"{accommodation_id}_image_{idx}"
            meta = await save_file(file, filename, "uploads/accommodation")
            image_meta_list.append(meta)
        update_data["images"] = image_meta_list

    update_data = {k: v for k, v in update_data.items() if v is not None}

    result = await accommodations_collection.update_one(
        {"_id": str(accommodation_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        return {
            "success": False,
            "status": 404,
            "message": "Accommodation not found"
        }

    updated = await accommodations_collection.find_one({"_id": str(accommodation_id)})
    updated_obj = Accommodation(**updated)

    return {
        "success": True,
        "status": 200,
        "message": "Accommodation updated successfully",
        "data": updated_obj.dict(by_alias=True)
    }


async def delete_accommodation(accommodation_id: str) -> dict:
    result = await accommodations_collection.delete_one({"_id": str(accommodation_id)})

    if result.deleted_count == 0:
        return {
            "success": False,
            "status": 404,
            "message": "Accommodation not found"
        }

    return {
        "success": True,
        "status": 200,
        "message": "Accommodation deleted successfully"
    }
