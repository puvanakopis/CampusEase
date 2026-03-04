import json
from fastapi import APIRouter, Depends, UploadFile, File
from typing import List, Optional
from fastapi import Form
from app.schemas.accommodation_schema import AccommodationCreateRequest ,AccommodationUpdateRequest
from app.services.accommodation_service import(
    get_accommodation_by_id,
    update_accommodation,
    delete_accommodation,
    create_accommodation,
    get_all_accommodations
)
from app.middlewares.auth_middleware import get_current_user, role_required


router = APIRouter(prefix="/accommodation", tags=["Accommodation"])


@router.post("/", dependencies=[Depends(role_required(["owner", "admin"]))])
async def create_accommodation_endpoint(
    accom_request: str = Form(...), 
    files: Optional[List[UploadFile]] = File(None),
    current_user=Depends(get_current_user)
):
    accom_data = AccommodationCreateRequest(**json.loads(accom_request))
    accom_data.owner_id = current_user.id

    return await create_accommodation(accom_data, files)

@router.get("/")
async def list_accommodations():
    return await get_all_accommodations()

@router.get("/{accommodation_id}")
async def get_accommodation_endpoint(accommodation_id: str):
    return await get_accommodation_by_id(accommodation_id)

@router.patch("/{accommodation_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def update_accommodation_endpoint(
    accommodation_id: str,
    update_request: str = Form(...), 
    files: Optional[List[UploadFile]] = File(None),
):
    update_data = AccommodationUpdateRequest(**json.loads(update_request))
    return await update_accommodation(accommodation_id, update_data, files)

@router.delete("/{accommodation_id}", dependencies=[Depends(role_required(["owner", "admin"]))])
async def delete_accommodation_endpoint(accommodation_id: str):
    return await delete_accommodation(accommodation_id)
