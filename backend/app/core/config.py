from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MONGODB_URI: str = os.getenv("MONGODB_URI")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    EMAIL_USER: str = os.getenv("EMAIL_USER")
    EMAIL_PASS: str = os.getenv("EMAIL_PASS")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
    CHUNK_SIZE: int = int(os.getenv("CHUNK_SIZE", 800))

settings = Settings()