from app.db.mongodb import db
from pymongo import ReturnDocument

counters_collection = db["counters"]

async def get_next_sequence(name: str) -> str:
    """
    Auto-increment sequence generator stored in MongoDB.
    """
    updated = await counters_collection.find_one_and_update(
        {"_id": name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    seq_number = updated["seq"]
    return f"{name}_{seq_number:02d}"
