from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings
from app.db.mongodb import users_collection, owners_collection, admins_collection
from app.models.user_model import User
from app.models.owner_model import Owner
from app.models.admin_model import Admin
import jwt

security = HTTPBearer() 

collections_map = {
    "user": users_collection,
    "owner": owners_collection,
    "admin": admins_collection
}

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user_id = payload.get("id")
        email = payload.get("email")
        if not user_id or not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    for role, collection in collections_map.items():
        user = await collection.find_one({"_id": user_id, "email": email})
        if user:
            if role == "user":
                return User(**user)
            elif role == "owner":
                return Owner(**user)
            elif role == "admin":
                return Admin(**user)
    
    raise HTTPException(status_code=404, detail="User not found")