from datetime import datetime
from fastapi import HTTPException
from typing import List, Optional
from app.db.mongodb import owners_collection
from app.schemas.owner_schema import OwnerResponse, OwnerUpdateRequest


async def get_all_owners() -> List[OwnerResponse]:
    owners = []
    cursor = owners_collection.find()
    async for doc in cursor:
        owner_obj = OwnerResponse(**doc)
        owners.append(owner_obj.dict(by_alias=True))
    return {
        "success": True,
        "status_code": 200,
        "message": "Owners fetched successfully",
        "data": owners
    }


async def get_owner_by_id(owner_id: str) -> OwnerResponse:
    doc = await owners_collection.find_one({"_id": owner_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Owner not found")
    owner_obj = OwnerResponse(**doc)
    return {
        "success": True,
        "status_code": 200,
        "message": "Owner fetched successfully",
        "data": owner_obj.dict(by_alias=True)
    }


async def update_owner(owner_id: str, update_request: OwnerUpdateRequest):
    doc = await owners_collection.find_one({"_id": owner_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Owner not found")

    update_data = update_request.dict(exclude_unset=True)
    update_data["last_updated"] = datetime.utcnow()

    result = await owners_collection.update_one(
        {"_id": owner_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes applied")

    return await get_owner_by_id(owner_id)


async def delete_owner(owner_id: str):
    result = await owners_collection.delete_one({"_id": owner_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Owner not found")
    return {
        "success": True,
        "status_code": 200,
        "message": "Owner deleted successfully"
    }
