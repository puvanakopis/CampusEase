from fastapi import APIRouter, Depends
from typing import List
from app.schemas.accommodation_schema import AccommodationCreateRequest, AccommodationUpdateRequest
from app.services.accommodation_service import (
    create_accommodation,
    get_all_accommodations,
    get_accommodation_by_id,
    update_accommodation,
    delete_accommodation
)
from app.middlewares.auth_middleware import get_current_user, role_required


router = APIRouter(prefix="/accommodation", tags=["Accommodation"])


@router.post("/", dependencies=[Depends(role_required(["owner", "admin"]))])
async def create_accommodation_endpoint(accom_request: AccommodationCreateRequest, current_user=Depends(get_current_user)):
    accom_request.owner_id = current_user.id
    return await create_accommodation(accom_request)

@router.get("/")
async def list_accommodations():
    return await get_all_accommodations()

@router.get("/{accommodation_id}")
async def get_accommodation(accommodation_id: str):
    return await get_accommodation_by_id(accommodation_id)

@router.patch("/{accommodation_id}")
async def update_accommodation_endpoint(
    accommodation_id: str,
    accom_update: AccommodationUpdateRequest,
    
):
    update_payload = accom_update.dict(exclude_unset=True)
    return await update_accommodation(accommodation_id, update_payload)

@router.delete("/{accommodation_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def delete_accommodation_endpoint(accommodation_id: str):
    return await delete_accommodation(accommodation_id)
