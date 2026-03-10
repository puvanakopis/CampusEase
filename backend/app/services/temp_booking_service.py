from datetime import datetime
from fastapi import HTTPException
from app.db.mongodb import temp_booking_collection


def fix_objectid(doc: dict) -> dict:
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    return doc


async def create_or_update_temp_booking(data: dict):
    user_id = data["user_id"]

    data["_id"] = user_id

    existing = await temp_booking_collection.find_one({"_id": user_id})

    if existing:
        if existing["resource_id"] != data["resource_id"]:
            await temp_booking_collection.delete_one({"_id": user_id})
        else:
            update_data = {**data, "last_updated": datetime.utcnow()}
            await temp_booking_collection.update_one({"_id": user_id}, {"$set": update_data})
            updated_doc = await temp_booking_collection.find_one({"_id": user_id})
            return fix_objectid(updated_doc)

    data["created_at"] = datetime.utcnow()
    data["last_updated"] = datetime.utcnow()
    await temp_booking_collection.replace_one({"_id": user_id}, data, upsert=True)
    new_doc = await temp_booking_collection.find_one({"_id": user_id})
    return fix_objectid(new_doc)

