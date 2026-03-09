from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client["CampusEase"]

users_collection = db["users"]
admins_collection = db["admins"]
owners_collection = db["owners"]
otps_collection = db["otps"]
accommodations_collection = db["accommodations"]
accommodations_booking_collection = db["accommodations booking"]
vehicles_collection = db["vehicles"]
