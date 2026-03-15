import os
import chromadb
from chromadb.config import Settings

db_dir = "chroma_db"
os.makedirs(db_dir, exist_ok=True)

chroma_client = chromadb.Client(
    Settings(
        is_persistent=True,
        persist_directory="chroma_db",
        anonymized_telemetry=False
    )
)

accommodation_vectors = chroma_client.get_or_create_collection(
    name="accommodations"
)

vehicle_vectors = chroma_client.get_or_create_collection(
    name="vehicles"
)

owner_vectors = chroma_client.get_or_create_collection(
    name="owners"
)

knowledge_vectors = chroma_client.get_or_create_collection(
    name="knowledge_base"
)
