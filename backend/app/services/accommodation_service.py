from datetime import datetime
from typing import List, Optional
from fastapi import UploadFile, HTTPException
from app.db.mongodb import accommodations_collection, owners_collection, users_collection
from app.schemas.accommodation_schema import AccommodationCreateRequest, AccommodationUpdateRequest, AccommodationResponse, OwnerResponse, AccommodationReview
from app.schemas.user_schema import UserResponse
from app.utils.file_utils import save_file
from app.services.counter_service import get_next_sequence
from app.ai.chroma_service import add_accommodation_vector, update_accommodation_vector, delete_accommodation_vector


async def get_owner_by_id(owner_id: str) -> Optional[dict]:
    owner_doc = await owners_collection.find_one({"_id": str(owner_id)})
    if not owner_doc:
        return None
    return OwnerResponse(**owner_doc).dict(by_alias=True)


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


async def create_accommodation(accom_request: AccommodationCreateRequest, files: Optional[List[UploadFile]] = None) -> dict:
    new_id = await get_next_sequence("accommodation")
    accom_data = accom_request.dict(exclude={"images"})
    accom_data["gender"] = accom_data.get(
        "gender").value if accom_data.get("gender") else None

    accom_data.update({
        "_id": new_id,
        "status": accom_data.get("status", "pending"),
        "verified": False,
        "highly_rated": False,
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow(),
        "images": []
    })

    if files:
        for idx, file in enumerate(files, start=1):
            filename_base = f"{new_id}_image_{idx}"
            saved_meta = await save_file(file, filename_base, folder="uploads/accommodation")
            accom_data["images"].append({"filename": saved_meta["filename"]})

    result = await accommodations_collection.insert_one(accom_data)
    if not result.acknowledged:
        raise HTTPException(
            status_code=500, detail="Failed to create accommodation")

    await add_accommodation_vector(accom_data)

    accom_obj = AccommodationResponse(**accom_data, owner=None, reviews=[])
    return {
        "success": True,
        "status_code": 201,
        "message": "Accommodation created successfully",
        "data": accom_obj.dict(by_alias=True)
    }


async def get_accommodation_by_id(accom_id: str) -> dict:
    doc = await accommodations_collection.find_one({"_id": accom_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Accommodation not found")

    owner_data = await get_owner_by_id(doc.get("owner_id"))

    reviews = []
    for rev in doc.get("reviews", []):
        user_id = rev.get("user_id") or (rev.get("user") or {}).get("id")
        user_obj = await get_user_by_id(user_id)
        reviews.append(AccommodationReview(user=user_obj, **rev))

    doc_copy = doc.copy()
    doc_copy.pop("reviews", None)

    accom_obj = AccommodationResponse(
        **doc_copy, owner=owner_data, reviews=reviews)
    return {
        "success": True,
        "status_code": 200,
        "message": "Accommodation fetched successfully",
        "data": accom_obj.dict(by_alias=True)
    }


async def get_all_accommodations() -> dict:
    accom_list = []
    cursor = accommodations_collection.find()
    async for doc in cursor:
        owner_data = await get_owner_by_id(doc.get("owner_id"))

        reviews = []
        for rev in doc.get("reviews", []):
            user_id = rev.get("user_id") or (rev.get("user") or {}).get("id")
            user_obj = await get_user_by_id(user_id)
            reviews.append(AccommodationReview(user=user_obj, **rev))

        doc_copy = doc.copy()
        doc_copy.pop("reviews", None)

        accom_obj = AccommodationResponse(
            **doc_copy, owner=owner_data, reviews=reviews)
        accom_list.append(accom_obj.dict(by_alias=True))

    return {
        "success": True,
        "status_code": 200,
        "message": "Accommodations fetched successfully",
        "data": accom_list
    }


async def get_accommodations_by_owner(owner_id: str) -> dict:
    accom_list = []

    cursor = accommodations_collection.find({"owner_id": owner_id})

    async for doc in cursor:
        owner_data = await get_owner_by_id(doc.get("owner_id"))

        reviews = []
        for rev in doc.get("reviews", []):
            user_id = rev.get("user_id") or (rev.get("user") or {}).get("id")
            user_obj = await get_user_by_id(user_id)
            reviews.append(AccommodationReview(user=user_obj, **rev))

        doc_copy = doc.copy()
        doc_copy.pop("reviews", None)

        accom_obj = AccommodationResponse(
            **doc_copy,
            owner=owner_data,
            reviews=reviews
        )

        accom_list.append(accom_obj.dict(by_alias=True))

    return {
        "success": True,
        "status_code": 200,
        "message": "Owner accommodations fetched successfully",
        "data": accom_list
    }


async def add_accommodation_review(
    accom_id: str,
    review_request,
    current_user
) -> dict:

    accom = await accommodations_collection.find_one({"_id": accom_id})
    if not accom:
        raise HTTPException(status_code=404, detail="Accommodation not found")

    review_data = {
        "user_id": current_user.id,
        "message": review_request.message,
        "rating": review_request.rating,
        "created_at": datetime.utcnow()
    }

    await accommodations_collection.update_one(
        {"_id": accom_id},
        {"$push": {"reviews": review_data}}
    )

    user_obj = await get_user_by_id(current_user.id)

    review_obj = AccommodationReview(
        user=user_obj,
        message=review_request.message,
        rating=review_request.rating,
        created_at=review_data["created_at"]
    )

    return {
        "success": True,
        "status_code": 201,
        "message": "Review added successfully",
        "data": review_obj.dict()
    }


async def update_accommodation(accom_id: str, update_request: AccommodationUpdateRequest, files: Optional[List[UploadFile]] = None) -> dict:
    doc = await accommodations_collection.find_one({"_id": accom_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Accommodation not found")

    update_data = update_request.dict(exclude_unset=True)
    if "gender" in update_data and update_data["gender"]:
        update_data["gender"] = update_data["gender"].value
    update_data["last_updated"] = datetime.utcnow()

    if files:
        existing_images = doc.get("images", [])
        for idx, file in enumerate(files, start=1):
            filename_base = f"{accom_id}_image_{len(existing_images) + idx}"
            saved_meta = await save_file(file, filename_base, folder="uploads/accommodation")
            existing_images.append({"filename": saved_meta["filename"]})
        update_data["images"] = existing_images

    result = await accommodations_collection.update_one(
        {"_id": accom_id},
        {"$set": update_data}
    )

    if result.modified_count == 0 and not files:
        raise HTTPException(status_code=400, detail="No changes were applied")

    updated_doc = await accommodations_collection.find_one({"_id": accom_id})

    await update_accommodation_vector(updated_doc)

    owner_data = await get_owner_by_id(updated_doc.get("owner_id"))

    reviews = []
    for rev in updated_doc.get("reviews", []):
        user_id = rev.get("user_id") or (rev.get("user") or {}).get("id")
        user_obj = await get_user_by_id(user_id)
        reviews.append(AccommodationReview(user=user_obj, **rev))

    updated_doc_copy = updated_doc.copy()
    updated_doc_copy.pop("reviews", None)

    accom_obj = AccommodationResponse(
        **updated_doc_copy, owner=owner_data, reviews=reviews)
    return {
        "success": True,
        "status_code": 200,
        "message": "Accommodation updated successfully",
        "data": accom_obj.dict(by_alias=True)
    }


async def delete_accommodation(accom_id: str) -> dict:
    result = await accommodations_collection.delete_one({"_id": accom_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Accommodation not found")

    await delete_accommodation_vector(accom_id)

    return {
        "success": True,
        "status_code": 200,
        "message": "Accommodation deleted successfully"
    }
