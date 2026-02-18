import bcrypt
import jwt
from app.core.config import settings

async def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode()

async def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode())

def create_jwt_token(data: dict) -> str:
    return jwt.encode(data, settings.JWT_SECRET, algorithm="HS256")
