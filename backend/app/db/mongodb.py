from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client["CampusEase"]

users_collection = db["users"]
admins_collection = db["admins"]
owners_collection = db["owners"]
otps_collection = db["otps"]
accommodations_collection = db["accommodations"]
vehicles_collection = db["vehicles"]
booking_collection = db["booking"]
temp_booking_collection = db["temp_booking"]
