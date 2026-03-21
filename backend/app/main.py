from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.routers import auth_router, accommodation_router, vehicle_router, owner_router, user_router, save_item_router, booking_router, temp_booking_router, rag_router
from app.ai.chroma_service import load_static_knowledge, sync_all_vectors

app = FastAPI(
    title="CampusEase API",
    description="CampusEase FastAPI project",
    version="1.0.0"
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await load_static_knowledge()
    await sync_all_vectors()

app.include_router(auth_router.router)
app.include_router(accommodation_router.router)
app.include_router(vehicle_router.router)
app.include_router(owner_router.router)
app.include_router(user_router.router)
app.include_router(save_item_router.router)
app.include_router(booking_router.router)
app.include_router(temp_booking_router.router)
app.include_router(rag_router.router)


@app.get("/")
async def root():
    return {"message": "CampusEase API is running"}
