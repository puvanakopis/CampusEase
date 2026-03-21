from datetime import datetime
from fastapi import HTTPException
from app.db.mongodb import owners_collection, accommodations_collection, vehicles_collection
from app.schemas.owner_schema import OwnerResponse, OwnerUpdateRequest
from app.schemas.accommodation_schema import AccommodationResponse
from app.schemas.vehicle_schema import VehicleResponse
from app.ai.chroma_service import update_owner_vector, delete_owner_vector


async def get_all_owners():

    owners = []

    cursor = owners_collection.find()

    async for doc in cursor:

        owner_id = doc["_id"]

        accommodations = []
        accom_cursor = accommodations_collection.find({"owner_id": owner_id})

        async for accom in accom_cursor:
            accom_obj = AccommodationResponse(**accom, owner=None, reviews=[])
            accommodations.append(accom_obj.dict(by_alias=True))

        vehicles = []
        vehicle_cursor = vehicles_collection.find({"owner_id": owner_id})

        async for vehicle in vehicle_cursor:
            vehicle_obj = VehicleResponse(**vehicle, owner=None, reviews=[])
            vehicles.append(vehicle_obj.dict(by_alias=True))

        owner_obj = OwnerResponse(
            **doc,
            accommodations=accommodations,
            vehicles=vehicles
        )

        owners.append(owner_obj.dict(by_alias=True))

    return {
        "success": True,
        "status_code": 200,
        "message": "Owners fetched successfully",
        "data": owners
    }


async def get_owner_by_id(owner_id: str):

    doc = await owners_collection.find_one({"_id": owner_id})

    if not doc:
        raise HTTPException(status_code=404, detail="Owner not found")

    accommodations = []
    accom_cursor = accommodations_collection.find({"owner_id": owner_id})

    async for accom in accom_cursor:
        accom_obj = AccommodationResponse(**accom, owner=None, reviews=[])
        accommodations.append(accom_obj.dict(by_alias=True))

    vehicles = []
    vehicle_cursor = vehicles_collection.find({"owner_id": owner_id})

    async for vehicle in vehicle_cursor:
        vehicle_obj = VehicleResponse(**vehicle, owner=None, reviews=[])
        vehicles.append(vehicle_obj.dict(by_alias=True))

    owner_obj = OwnerResponse(
        **doc,
        accommodations=accommodations,
        vehicles=vehicles
    )

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

    await update_owner_vector({"_id": owner_id, **update_data})

    return await get_owner_by_id(owner_id)


async def delete_owner(owner_id: str):

    result = await owners_collection.delete_one({"_id": owner_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Owner not found")

    await delete_owner_vector(owner_id)

    return {
        "success": True,
        "status_code": 200,
        "message": "Owner deleted successfully"
    }
