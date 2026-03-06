from datetime import datetime
from fastapi import HTTPException
from typing import List
from app.db.mongodb import users_collection
from app.schemas.user_schema import UserResponse, UserUpdateRequest


async def get_all_users() -> List[UserResponse]:
    users = []
    cursor = users_collection.find()

    async for doc in cursor:
        user_obj = UserResponse(**doc)
        users.append(user_obj.dict(by_alias=True))

    return {
        "success": True,
        "status_code": 200,
        "message": "Users fetched successfully",
        "data": users
    }


async def get_user_by_id(user_id: str) -> UserResponse:
    doc = await users_collection.find_one({"_id": user_id})

    if not doc:
        raise HTTPException(status_code=404, detail="User not found")

    user_obj = UserResponse(**doc)

    return {
        "success": True,
        "status_code": 200,
        "message": "User fetched successfully",
        "data": user_obj.dict(by_alias=True)
    }


async def update_user(user_id: str, update_request: UserUpdateRequest):
    doc = await users_collection.find_one({"_id": user_id})

    if not doc:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = update_request.dict(exclude_unset=True)
    update_data["last_updated"] = datetime.utcnow()

    result = await users_collection.update_one(
        {"_id": user_id},
        {"$set": update_data}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=400, detail="No changes applied")

    return await get_user_by_id(user_id)


async def delete_user(user_id: str):
    result = await users_collection.delete_one({"_id": user_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "success": True,
        "status_code": 200,
        "message": "User deleted successfully"
    }
