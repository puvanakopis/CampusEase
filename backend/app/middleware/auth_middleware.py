from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings
from app.db.mongodb import users_collection, admins_collection, owners_collection
from app.models.user_model import User
from app.models.admin_model import Admin
from app.models.owner_model import Owner
import jwt
from typing import List

security = HTTPBearer() 


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    collection=None
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = payload.get("id")
        email = payload.get("email")
        if not user_id or not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    if not collection:
        user = (
            await users_collection.find_one({"_id": user_id})
            or await admins_collection.find_one({"_id": user_id})
            or await owners_collection.find_one({"_id": user_id})
        )
    else:
        user = await collection.find_one({"_id": user_id})

    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    if collection == users_collection:
        return User(**user)
    elif collection == admins_collection:
        return Admin(**user)
    elif collection == owners_collection:
        return Owner(**user)
    else:
        return user


def authorize(*roles: List[str]):
    async def role_checker(current_user = Depends(get_current_user)):
        if not hasattr(current_user, "role") or current_user.role not in roles:
            raise HTTPException(status_code=403, detail="Forbidden: You do not have access")
        return current_user
    return role_checker
