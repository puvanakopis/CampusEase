from fastapi import APIRouter, Depends
from app.services.save_item_service import (
    add_saved_accommodation,
    remove_saved_accommodation,
    add_saved_transport,
    remove_saved_transport,
    get_saved_items
)
from app.schemas.save_item_schema import (
    SaveItemRequest
)
from app.middlewares.auth_middleware import get_current_user

router = APIRouter(prefix="/user/save", tags=["User Save"])

@router.get("/")
async def get_user_saved_items(current_user=Depends(get_current_user)):
    return await get_saved_items(current_user.id)

@router.post("/accommodation")
async def save_accommodation(item: SaveItemRequest, current_user=Depends(get_current_user)):
    return await add_saved_accommodation(current_user.id, item.item_id)

@router.delete("/accommodation")
async def unsave_accommodation(item: SaveItemRequest, current_user=Depends(get_current_user)):
    return await remove_saved_accommodation(current_user.id, item.item_id)

@router.post("/transport")
async def save_transport(item: SaveItemRequest, current_user=Depends(get_current_user)):
    return await add_saved_transport(current_user.id, item.item_id)

@router.delete("/transport")
async def unsave_transport(item: SaveItemRequest, current_user=Depends(get_current_user)):
    return await remove_saved_transport(current_user.id, item.item_id)