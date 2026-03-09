from fastapi import APIRouter, Depends
from app.services.owner_service import (
    get_all_owners,
    get_owner_by_id,
    update_owner,
    delete_owner
)
from app.schemas.owner_schema import OwnerUpdateRequest
from app.middlewares.auth_middleware import role_required

router = APIRouter(prefix="/owner", tags=["Owner"])


@router.get("/", dependencies=[Depends(role_required(["admin"]))])
async def list_owners():
    return await get_all_owners()


@router.get("/{owner_id}")
async def get_owner(owner_id: str):
    return await get_owner_by_id(owner_id)


@router.patch("/{owner_id}", dependencies=[Depends(role_required(["admin"]))])
async def update_owner_endpoint(owner_id: str, update_request: OwnerUpdateRequest):
    return await update_owner(owner_id, update_request)


@router.delete("/{owner_id}", dependencies=[Depends(role_required(["admin"]))])
async def delete_owner_endpoint(owner_id: str):
    return await delete_owner(owner_id)
