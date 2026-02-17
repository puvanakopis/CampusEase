from datetime import datetime
from fastapi import HTTPException, UploadFile
from app.db.mongodb import users_collection, admins_collection, owners_collection, otps_collection
from app.utils.otp_utils import generate_otp, get_expiry
from app.utils.email_utils import send_otp_email
from app.utils.auth_utils import hash_password, verify_password, create_jwt_token
from app.utils.file_utils import save_file
from app.services.counter_service import get_next_sequence
from app.models.user_model import User
from app.models.owner_model import Owner
from app.models.admin_model import Admin


collections_map = {
    "admin": (admins_collection, Admin),
    "owner": (owners_collection, Owner),
    "student": (users_collection, User),
    "staff": (users_collection, User)
}


def response(success: bool, status_code: int, message: str, data=None):
    return {
        "success": success,
        "status_code": status_code,
        "message": message,
        "data": data
    }


async def find_user_by_email(email: str):
    email_lower = email.lower()
    for _, (collection, model_cls) in collections_map.items():
        user = await collection.find_one({"email": email_lower})
        if user:
            return user, collection, model_cls
    return None, None, None



# -------------------- Signup OTP Request --------------------
async def request_signup_otp(role: str, first_name: str, last_name: str, email: str, password: str):

    if role == "admin":
        raise HTTPException(400, "Admin cannot request signup OTP")

    collection, _ = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(400, "Invalid role")

    email_lower = email.lower()

    # Check if email already exists in ANY role
    for col, _ in collections_map.values():
        if await col.find_one({"email": email_lower}):
            return response(False, 409, "Email already in use")

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

    return response(True, 200, "Signup OTP sent", {"email": email_lower})


# -------------------- Signup OTP Verify --------------------

async def verify_signup_otp(role: str, email: str, otp: str):

    if role == "admin":
        raise HTTPException(400, "Admin cannot verify signup OTP")

    collection, model_cls = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(400, "Invalid role")

    email_lower = email.lower()
    otp_record = await otps_collection.find_one({"email": email_lower, "type": "signup"})

    if not otp_record:
        return response(False, 404, "OTP not found")

    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email_lower, "type": "signup"})
        return response(False, 410, "OTP expired")

    if otp_record["otp"] != otp:
        return response(False, 400, "Invalid OTP")

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

    return response(
        True,
        201,
        "Signup successful",
        {"token": token, "user": user_obj.dict(by_alias=True)}
    )


# -------------------- Login --------------------

async def login_user(email: str, password: str):

    user, collection, model_cls = await find_user_by_email(email)

    if not user or not await verify_password(password, user["password"]):
        return response(False, 401, "Invalid email or password")

    user_obj = model_cls(**user)
    token = create_jwt_token({"id": user["_id"], "email": email.lower()})

    return response(
        True,
        200,
        "Login successful",
        {"token": token, "user": user_obj.dict(by_alias=True)}
    )


# -------------------- Password Reset Request --------------------

async def request_password_reset(email: str):

    user, collection, model_cls = await find_user_by_email(email)
    if not user:
        return response(False, 404, "Email not found")

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

    return response(True, 200, "Password reset OTP sent", {"email": email.lower()})


# -------------------- Password Reset --------------------

async def reset_password(email: str, otp: str, new_password: str):

    user, collection, _ = await find_user_by_email(email)
    if not user:
        return response(False, 404, "Email not found")

    otp_record = await otps_collection.find_one({"email": email.lower(), "type": "password_reset"})
    if not otp_record:
        return response(False, 404, "OTP not found")

    if otp_record["expires_at"] < datetime.utcnow():
        await otps_collection.delete_one({"email": email.lower(), "type": "password_reset"})
        return response(False, 410, "OTP expired")

    if otp_record["otp"] != otp:
        return response(False, 400, "Invalid OTP")

    hashed_password = await hash_password(new_password)
    await collection.update_one({"email": email.lower()}, {"$set": {"password": hashed_password}})
    await otps_collection.delete_one({"email": email.lower(), "type": "password_reset"})

    return response(True, 200, "Password reset successful")


# -------------------- Update Current User --------------------

async def update_current_user(current_user, update_data=None, photo: UploadFile = None, id_photo: UploadFile = None):

    role = current_user.role
    user_id = current_user.id

    collection, model_cls = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(400, "Role not supported")

    update_payload = {}

    if update_data:
        for key, val in update_data.items():
            if val is not None:
                update_payload[key] = val

    if photo:
        filename = f"{user_id}_photo"
        photo_meta = await save_file(photo, filename, "uploads/user_photo")
        update_payload["photo"] = photo_meta

    if id_photo:
        filename = f"{user_id}_id_photo"
        id_meta = await save_file(id_photo, filename, "uploads/user_id")
        update_payload["id_photo"] = id_meta

    if not update_payload:
        raise HTTPException(400, "No fields provided for update")

    update_payload["last_updated"] = datetime.utcnow()

    await collection.update_one({"_id": user_id}, {"$set": update_payload})

    updated_user = await collection.find_one({"_id": user_id})
    user_obj = model_cls(**updated_user)

    return response(True, 200, "Profile updated successfully", user_obj.dict(by_alias=True))


# -------------------- Update Password --------------------

async def update_password(current_user, current_password: str, new_password: str):

    role = current_user.role
    user_id = current_user.id

    collection, model_cls = collections_map.get(role, (None, None))
    if collection is None:
        raise HTTPException(400, "Role not supported")

    user = await collection.find_one({"_id": user_id})
    if not user:
        raise HTTPException(404, "User not found")

    if not await verify_password(current_password, user["password"]):
        raise HTTPException(400, "Current password is incorrect")

    hashed_new_password = await hash_password(new_password)

    await collection.update_one(
        {"_id": user_id},
        {"$set": {"password": hashed_new_password, "last_updated": datetime.utcnow()}}
    )

    return response(True, 200, "Password updated successfully")
