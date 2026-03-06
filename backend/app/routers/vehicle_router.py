import json
from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import List, Optional

from app.schemas.vehicle_schema import (
    VehicleCreateRequest
)

from app.services.vehicle_service import (
    create_vehicle,
    get_all_vehicles,    
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
