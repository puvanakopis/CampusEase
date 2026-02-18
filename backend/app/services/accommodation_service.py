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
