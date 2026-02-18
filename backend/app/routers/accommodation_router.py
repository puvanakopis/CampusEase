from fastapi import APIRouter, Depends
from typing import List
from app.schemas.accommodation_schema import AccommodationCreateRequest
from app.services.accommodation_service import create_accommodation
from app.middlewares.auth_middleware import get_current_user, role_required

router = APIRouter(prefix="/accommodation", tags=["Accommodation"])


@router.post("/", dependencies=[Depends(role_required(["owner", "admin"]))])
async def create_accommodation_endpoint(accom_request: AccommodationCreateRequest, current_user=Depends(get_current_user)):
    accom_request.owner_id = current_user.id
    return await create_accommodation(accom_request)
