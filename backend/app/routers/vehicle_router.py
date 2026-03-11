import json
from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import List, Optional

from app.schemas.vehicle_schema import (
    VehicleCreateRequest,
    VehicleUpdateRequest,
    VehicleReviewCreateRequest
)
from app.services.vehicle_service import (
    create_vehicle,
    get_vehicle_by_id,
    get_all_vehicles,
    update_vehicle,
    delete_vehicle,
    get_vehicle_by_owner,
    add_vehicle_review
)
from app.middlewares.auth_middleware import get_current_user, role_required

router = APIRouter(prefix="/vehicle", tags=["Vehicle"])


@router.post("/", dependencies=[Depends(role_required(["owner", "admin"]))])
async def create_vehicle_endpoint(
    vehicle_request: str = Form(...),
    files: Optional[List[UploadFile]] = File(None),
    current_user=Depends(get_current_user)
):
    vehicle_data = VehicleCreateRequest(**json.loads(vehicle_request))
    vehicle_data.owner_id = current_user.id
    return await create_vehicle(vehicle_data, files)

@router.get("/")
async def list_vehicles():
    return await get_all_vehicles()

@router.get("/owner", dependencies=[Depends(role_required(["owner"]))])
async def get_my_vehicles(current_user=Depends(get_current_user)):
    return await get_vehicle_by_owner(current_user.id)

@router.get("/{vehicle_id}")
async def get_vehicle_endpoint(vehicle_id: str):
    return await get_vehicle_by_id(vehicle_id)

@router.post("/{vehicle_id}/review", dependencies=[Depends(role_required(["student","admin"]))])
async def add_vehicle_review_endpoint(
    vehicle_id: str,
    review_request: VehicleReviewCreateRequest,
    current_user=Depends(get_current_user)
):
    return await add_vehicle_review(vehicle_id, review_request, current_user)

@router.patch("/{vehicle_id}", dependencies=[Depends(role_required(["owner","admin"]))])
async def update_vehicle_endpoint(
    vehicle_id: str,
    update_request: str = Form(...),
    files: Optional[List[UploadFile]] = File(None)
):
    update_data = VehicleUpdateRequest(**json.loads(update_request))
    return await update_vehicle(vehicle_id, update_data, files)


@router.delete("/{vehicle_id}", dependencies=[Depends(role_required(["owner","admin"]))])
async def delete_vehicle_endpoint(vehicle_id: str):
    return await delete_vehicle(vehicle_id)
