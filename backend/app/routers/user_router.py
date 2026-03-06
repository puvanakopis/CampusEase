from fastapi import APIRouter, Depends
from app.services.user_service import (
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user
)
from app.schemas.user_schema import UserUpdateRequest
from app.middlewares.auth_middleware import role_required

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/", dependencies=[Depends(role_required(["admin"]))])
async def list_users():
    return await get_all_users()


@router.get("/{user_id}", dependencies=[Depends(role_required(["admin"]))])
async def get_user(user_id: str):
    return await get_user_by_id(user_id)


@router.patch("/{user_id}", dependencies=[Depends(role_required(["admin"]))])
async def update_user_endpoint(user_id: str, update_request: UserUpdateRequest):
    return await update_user(user_id, update_request)


@router.delete("/{user_id}", dependencies=[Depends(role_required(["admin"]))])
async def delete_user_endpoint(user_id: str):
    return await delete_user(user_id)
