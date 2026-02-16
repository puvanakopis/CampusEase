from datetime import datetime
from fastapi import HTTPException, UploadFile
from app.db.mongodb import users_collection, admins_collection, owners_collection, otps_collection
from app.utils.otp_utils import generate_otp, get_expiry
from app.utils.email_utils import send_email
from app.core.config import settings
from app.services.counter_service import get_next_sequence
from app.models.user_model import User
from app.models.owner_model import Owner
from app.models.admin_model import Admin
import bcrypt
import jwt
import os

UPLOAD_DIR = "uploads/user_photos"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# -------------------- COLLECTION MAP --------------------

collections_map = {
    "admin": (admins_collection, Admin),
    "owner": (owners_collection, Owner),
    "student": (users_collection, User),
    "staff": (users_collection, User)
}

# -------------------- UTILITIES --------------------

async def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode()

async def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode())

def create_jwt_token(data: dict):
    return jwt.encode(data, settings.JWT_SECRET, algorithm="HS256")

async def send_otp_email(email: str, first_name: str, otp_code: str, template: str = "signup_otp.html"):
    with open(f"app/templates/{template}", "r") as f:
        html = f.read()
    html = html.replace("{{ first_name }}", first_name).replace("{{ otp_code }}", otp_code)
    send_email(email, "Your OTP Code", html)

# -------------------- FIND USER UTILITY --------------------

async def find_user_by_email(email: str):
    email_lower = email.lower()
    for role_name, (collection, model_cls) in collections_map.items():
        user = await collection.find_one({"email": email_lower})
        if user:
            return user, collection, model_cls
    return None, None, None



# -------------------- SIGNUP / OTP --------------------

async def request_signup_otp(role: str, first_name: str, last_name: str, email: str, password: str):
    if role == "admin":
        raise HTTPException(status_code=400, detail="Admin cannot request signup OTP")

    collection, _ = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(status_code=400, detail="Invalid role")

    email_lower = email.lower()

    for col, _ in collections_map.values():
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
    if role == "admin":
        raise HTTPException(status_code=400, detail="Admin cannot verify signup OTP")

    collection, model_cls = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(status_code=400, detail="Invalid role")

    email_lower = email.lower()
    otp_record = await otps_collection.find_one({"email": email_lower, "type": "signup"})
    if not otp_record:
        return {"error": "OTP not found"}
    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email_lower, "type": "signup"})
        return {"error": "OTP expired"}
    if otp_record["otp"] != otp:
        return {"error": "Invalid OTP"}

    if role in ["student", "staff"]:
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

    user_obj = model_cls(**user_data)
    token = create_jwt_token({"id": new_id, "email": email_lower})
    return {"message": "Signup successful", "token": token, "user": user_obj.dict(by_alias=True)}



# -------------------- LOGIN --------------------

async def login_user(email: str, password: str):
    user, collection, model_cls = await find_user_by_email(email)
    if not user or not await verify_password(password, user["password"]):
        return {"error": "Invalid email or password"}

    user_obj = model_cls(**user)
    token = create_jwt_token({"id": user["_id"], "email": email.lower()})
    return {"message": "Login successful", "token": token, "user": user_obj.dict(by_alias=True)}

# -------------------- PASSWORD RESET --------------------

async def request_password_reset(email: str):
    user, collection, model_cls = await find_user_by_email(email)
    if not user:
        return {"error": "Email not found"}

    otp_code = generate_otp()
    otp_data = {
        "email": email.lower(),
        "otp": otp_code,
        "expires_at": get_expiry(),
        "type": "password_reset"
    }

    await otps_collection.update_one(
        {"email": email.lower(), "type": "password_reset"},
        {"$set": otp_data},
        upsert=True
    )

    await send_otp_email(email.lower(), user["first_name"], otp_code, template="password_reset_otp.html")
    return {"message": "Password reset OTP sent", "email": email.lower()}


async def reset_password(email: str, otp: str, new_password: str):
    user, collection, model_cls = await find_user_by_email(email)
    if not user:
        return {"error": "Email not found"}

    otp_record = await otps_collection.find_one({"email": email.lower(), "type": "password_reset"})
    if not otp_record:
        return {"error": "OTP not found"}
    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email.lower(), "type": "password_reset"})
        return {"error": "OTP expired"}
    if otp_record["otp"] != otp:
        return {"error": "Invalid OTP"}

    hashed_password = await hash_password(new_password)
    await collection.update_one({"email": email.lower()}, {"$set": {"password": hashed_password}})
    await otps_collection.delete_one({"email": email.lower(), "type": "password_reset"})

    return {"message": "Password reset successful"}





async def save_file(file: UploadFile, filename: str, folder: str):
    ext = file.filename.split(".")[-1]
    file_path = os.path.join(folder, f"{filename}.{ext}")

    with open(file_path, "wb") as f:
        f.write(await file.read())

    return {
        "filename": f"{filename}.{ext}",
        "content_type": file.content_type,
        "size": file.spool_max_size if hasattr(file, "spool_max_size") else 0,
        "path": file_path
    }


async def update_current_user(
    current_user, 
    update_data: dict = None,
    photo: UploadFile = None,
    id_photo: UploadFile = None
):
    role = current_user.role
    user_id = current_user.id  

    if role not in ["student", "staff", "owner"]:
        raise HTTPException(status_code=403, detail="Only student, staff, and owner can update profile")

    collection, model_cls = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(status_code=400, detail="Role not supported")


    update_payload = {}

    if update_data:
        for key, val in update_data.items():
            if val is not None: 
                update_payload[key] = val

    if photo:
        filename = f"{user_id}_photo"
        photo_meta = await save_file(photo, filename, UPLOAD_DIR)
        update_payload["photo"] = photo_meta

    if id_photo:
        filename = f"{user_id}_id_photo"
        id_photo_meta = await save_file(id_photo, filename, UPLOAD_DIR)
        update_payload["id_photo"] = id_photo_meta

    if not update_payload:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    update_payload["last_updated"] = datetime.utcnow()

    await collection.update_one({"_id": user_id}, {"$set": update_payload})

    updated_user = await collection.find_one({"_id": user_id})
    user_obj = model_cls(**updated_user)

    return {
        "message": "Profile updated successfully",
        "user": user_obj.dict(by_alias=True)
    }
