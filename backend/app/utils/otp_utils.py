import random
from datetime import datetime, timedelta

def generate_otp() -> str:
    return str(random.randint(100000, 999999))

def get_expiry(minutes: int = 5) -> datetime:
    return datetime.utcnow() + timedelta(minutes=minutes)
