from datetime import datetime
import bcrypt
import jwt

from app.db.mongodb import users_collection, admins_collection, owners_collection, otps_collection
from app.utils.otp_utils import generate_otp, get_expiry
from app.utils.email_utils import send_email
from app.core.config import settings


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
