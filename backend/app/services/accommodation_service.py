from datetime import datetime
from fastapi import HTTPException, UploadFile
from app.db.mongodb import accommodations_collection
from app.utils.file_utils import save_file
from app.services.counter_service import get_next_sequence
from app.models.accommodation_model import Accommodation
from app.schemas.accommodation_schema import AccommodationCreateRequest, AccommodationResponse


def response(success: bool, status_code: int, message: str, data=None):
    return {
        "success": success,
        "status_code": status_code,
        "message": message,
        "data": data
    }


async def create_accommodation(accom_request: AccommodationCreateRequest) -> dict:
    new_id = await get_next_sequence("accommodation")

    accom_data = accom_request.dict()
    accom_data.update({
        "_id": new_id,
        "status": "Pending",
        "verified": False,
        "highly_rated": False,
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow()
    })

    await accommodations_collection.insert_one(accom_data)
    accom_obj = Accommodation(**accom_data)

    return response(True, 201, "Accommodation created successfully", accom_obj.dict(by_alias=True))
# accommodation_service.py
from app.db.mongodb import accommodations_collection, owners_collection
from app.models.accommodation_model import Accommodation
from app.schemas.accommodation_schema import AccommodationCreateRequest, AccommodationResponse, OwnerResponse
from datetime import datetime
from fastapi import HTTPException


async def get_owner_by_id(owner_id: str) -> dict:
    owner_doc = await owners_collection.find_one({"_id": str(owner_id)})
    if not owner_doc:
        return None
    return OwnerResponse(**owner_doc).dict(by_alias=True)


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
async def update_accommodation(accommodation_id: str, update_data: dict) -> dict:
    update_data["last_updated"] = datetime.utcnow()

    for key, value in update_data.items():
        if hasattr(value, "dict"):
            update_data[key] = value.dict()

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
