from datetime import datetime
from fastapi import HTTPException
from app.db.mongodb import users_collection, admins_collection, owners_collection, otps_collection
from app.utils.otp_utils import generate_otp, get_expiry
from app.utils.email_utils import send_email
from app.core.config import settings
from app.services.counter_service import get_next_sequence

import bcrypt
import jwt

from app.models.user_model import User
from app.models.admin_model import Admin
from app.models.owner_model import Owner

# -------------------- COLLECTION MAP --------------------
collections_map = {
    "user": users_collection,
    "owner": owners_collection,
    "admin": admins_collection
}


# -------------------- COMMON UTILITIES --------------------

async def send_otp_email(email: str, first_name: str, otp_code: str, template: str = "signup_otp.html"):
    with open(f"app/templates/{template}", "r") as f:
        html = f.read()
    html = html.replace("{{ first_name }}", first_name).replace("{{ otp_code }}", otp_code)
    send_email(email, "Your OTP Code", html)


async def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode()


async def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode())


def create_jwt_token(data: dict):
    return jwt.encode(data, settings.JWT_SECRET, algorithm="HS256")


# -------------------- ROLE RESOLVER --------------------

def resolve_collection(role: str):
    if role not in collections_map:
        raise HTTPException(status_code=400, detail="Invalid role")
    return collections_map[role]


# -------------------- REQUEST OTP --------------------

async def request_signup_otp(role: str, first_name: str, last_name: str, email: str, password: str):
    collection = resolve_collection(role)
    if role == "admin":
        raise HTTPException(status_code=400, detail="Admin cannot request signup OTP")

    email_lower = email.lower()

    # Check if email exists in any collection
    for col in collections_map.values():
        if await col.find_one({"email": email_lower}):
            return {"error": "Email already in use."}

    otp_code = generate_otp()
    hashed_password = await hash_password(password)

    otp_data = {
        "email": email_lower,
        "otp": otp_code,
        "temp_password": hashed_password,
        "first_name": first_name,
        "last_name": last_name,
        "expires_at": get_expiry(),
        "type": "signup"
    }

    await otps_collection.update_one(
        {"email": email_lower, "type": "signup"},
        {"$set": otp_data},
        upsert=True
    )

    await send_otp_email(email_lower, first_name, otp_code, template="signup_otp.html")
    return {"message": "OTP sent", "email": email_lower}


async def verify_signup_otp(role: str, email: str, otp: str):
    collection = resolve_collection(role)
    if role == "admin":
        raise HTTPException(status_code=400, detail="Admin cannot verify signup OTP")

    email_lower = email.lower()
    otp_record = await otps_collection.find_one({"email": email_lower, "type": "signup"})

    if not otp_record:
        return {"error": "OTP not found"}
    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email_lower, "type": "signup"})
        return {"error": "OTP expired"}
    if otp_record["otp"] != otp:
        return {"error": "Invalid OTP"}

    # Generate ID
    if collection == users_collection:
        new_id = await get_next_sequence("user")
    else:
        new_id = await get_next_sequence("owner")

    user_data = {
        "_id": new_id,
        "first_name": otp_record["first_name"],
        "last_name": otp_record.get("last_name"),
        "email": otp_record["email"],
        "password": otp_record["temp_password"],
        "created_at": datetime.utcnow(),
        "last_updated": datetime.utcnow(),
    }

    await collection.insert_one(user_data)
    await otps_collection.delete_one({"email": email_lower, "type": "signup"})

    # Convert to Pydantic model
    user_obj = User(**user_data) if role == "user" else Owner(**user_data)
    token = create_jwt_token({"id": new_id, "email": email_lower})

    return {"message": "Signup successful", "token": token, "user": user_obj.dict(by_alias=True)}


# -------------------- LOGIN --------------------

async def login_with_role(role: str, email: str, password: str):
    collection = resolve_collection(role)
    email_lower = email.lower()
    user = await collection.find_one({"email": email_lower})

    if not user or not await verify_password(password, user["password"]):
        return {"error": "Invalid email or password"}

    # Convert to Pydantic model
    if role == "user":
        user_obj = User(**user)
    elif role == "admin":
        user_obj = Admin(**user)
    else:
        user_obj = Owner(**user)

    token = create_jwt_token({"id": user["_id"], "email": email_lower})
    return {"message": "Login successful", "token": token, "user": user_obj.dict(by_alias=True)}


# -------------------- PASSWORD RESET --------------------

async def request_password_reset(role: str, email: str):
    collection = resolve_collection(role)
    email_lower = email.lower()
    user = await collection.find_one({"email": email_lower})
    if not user:
        return {"error": "Email not found"}

    otp_code = generate_otp()
    otp_data = {
        "email": email_lower,
        "otp": otp_code,
        "expires_at": get_expiry(),
        "type": "password_reset"
    }

    await otps_collection.update_one(
        {"email": email_lower, "type": "password_reset"},
        {"$set": otp_data},
        upsert=True
    )

    await send_otp_email(email_lower, user["first_name"], otp_code, template="password_reset_otp.html")
    return {"message": "Password reset OTP sent", "email": email_lower}


async def verify_password_reset(role: str, email: str, otp: str, new_password: str):
    collection = resolve_collection(role)
    email_lower = email.lower()
    otp_record = await otps_collection.find_one({"email": email_lower, "type": "password_reset"})

    if not otp_record:
        return {"error": "OTP not found"}
    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email_lower, "type": "password_reset"})
        return {"error": "OTP expired"}
    if otp_record["otp"] != otp:
        return {"error": "Invalid OTP"}

    hashed_password = await hash_password(new_password)
    await collection.update_one({"email": email_lower}, {"$set": {"password": hashed_password}})
    await otps_collection.delete_one({"email": email_lower, "type": "password_reset"})

    return {"message": "Password reset successful"}
