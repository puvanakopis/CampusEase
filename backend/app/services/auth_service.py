from datetime import datetime
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


# -------------------- COMMON --------------------

async def send_otp_email(email: str, first_name: str, otp_code: str):
    with open("app/templates/signup_otp.html", "r") as f:
        html = f.read()
    html = html.replace("{{ first_name }}", first_name).replace("{{ otp_code }}", otp_code)
    send_email(email, "Your OTP Code", html)

async def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode()

async def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode())

def create_jwt_token(data: dict):
    return jwt.encode(data, settings.JWT_SECRET, algorithm="HS256")


# -------------------- REQUEST OTP --------------------

async def request_otp(collection, first_name: str, last_name: str, email: str, password: str):
    email_lower = email.lower()

    if (
        await users_collection.find_one({"email": email_lower}) or
        await admins_collection.find_one({"email": email_lower}) or
        await owners_collection.find_one({"email": email_lower})
    ):
        return {"error": "Email already in use."}

    otp_code = generate_otp()
    hashed_password = await hash_password(password)

    otp_data = {
        "email": email_lower,
        "otp": otp_code,
        "temp_password": hashed_password,
        "first_name": first_name,
        "last_name": last_name,
        "expires_at": get_expiry()
    }

    await otps_collection.update_one({"email": email_lower}, {"$set": otp_data}, upsert=True)
    await send_otp_email(email, first_name, otp_code)

    return {"message": "OTP sent", "email": email_lower}



# -------------------- VERIFY OTP & SIGNUP --------------------

async def verify_otp_and_signup(collection, email: str, otp: str):
    email_lower = email.lower()
    otp_record = await otps_collection.find_one({"email": email_lower})

    if not otp_record:
        return {"error": "OTP not found"}

    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email_lower})
        return {"error": "OTP expired"}

    if otp_record["otp"] != otp:
        return {"error": "Invalid OTP"}

    if collection == users_collection:
        new_id = await get_next_sequence("user")
    elif collection == admins_collection:
        new_id = await get_next_sequence("admin")
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
    await otps_collection.delete_one({"email": email_lower})

    if collection == users_collection:
        user_obj = User(**user_data)
    elif collection == admins_collection:
        user_obj = Admin(**user_data)
    else:
        user_obj = Owner(**user_data)

    token = create_jwt_token({"id": new_id, "email": email_lower})

    return {"message": "Signup successful", "token": token, "user": user_obj.dict(by_alias=True)}
