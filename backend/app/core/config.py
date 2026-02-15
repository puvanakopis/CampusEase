from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MONGODB_URI: str = os.getenv("MONGODB_URI")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    EMAIL_USER: str = os.getenv("EMAIL_USER")
    EMAIL_PASS: str = os.getenv("EMAIL_PASS")

settings = Settings()