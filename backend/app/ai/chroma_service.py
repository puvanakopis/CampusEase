from app.db.chroma import accommodation_vectors, vehicle_vectors, owner_vectors, knowledge_vectors
from app.ai.embedding_model import create_embedding
from app.utils.text_builder import accommodation_text, vehicle_text, owner_text
from app.core.config import settings
from pathlib import Path

CHUNK_SIZE = settings.CHUNK_SIZE
BASE_DIR = Path(__file__).resolve().parent.parent

async def add_accommodation_vector(data: dict):
    text = accommodation_text(data)
    embedding = create_embedding(text)

    accommodation_vectors.add(
        ids=[str(data["_id"])],
        documents=[text],
        embeddings=[embedding]
    )

    print(f"[Chroma Sync] Accommodation added. ID: {data['_id']}")


async def update_accommodation_vector(data: dict):
    text = accommodation_text(data)
    embedding = create_embedding(text)

    accommodation_vectors.update(
        ids=[str(data["_id"])],
        documents=[text],
        embeddings=[embedding]
    )

    print(f"[Chroma Sync] Accommodation updated. ID: {data['_id']}")


async def delete_accommodation_vector(id: str):
    accommodation_vectors.delete(ids=[id])

    print(f"[Chroma Sync] Accommodation deleted. ID: {id}")


async def get_all_accommodation_vectors():
    results = accommodation_vectors.get()

    ids = results.get("ids", [])
    documents = results.get("documents", [])
    embeddings = results.get("embeddings", [])

    print("[Chroma Sync] Retrieved all accommodation vectors.")

    return {
        "ids": ids,
        "documents": documents,
        "embeddings": embeddings
    }


async def search_accommodation_vectors(query: str, top_k: int = 5):

    embedding = create_embedding(query)

    results = accommodation_vectors.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    print(f"[Chroma Sync] Accommodation search completed. Query: '{query[:50]}...'")

    return results


async def add_vehicle_vector(data: dict):
    text = vehicle_text(data)
    embedding = create_embedding(text)

    vehicle_vectors.add(
        ids=[str(data["_id"])],
        documents=[text],
        embeddings=[embedding]
    )

    print(f"[Chroma Sync] Vehicle added. ID: {data['_id']}")


async def update_vehicle_vector(data: dict):
    text = vehicle_text(data)
    embedding = create_embedding(text)

    vehicle_vectors.update(
        ids=[str(data["_id"])],
        documents=[text],
        embeddings=[embedding]
    )

    print(f"[Chroma Sync] Vehicle updated. ID: {data['_id']}")


async def delete_vehicle_vector(id: str):
    vehicle_vectors.delete(ids=[id])

    print(f"[Chroma Sync] Vehicle deleted. ID: {id}")


async def get_all_vehicle_vectors():
    results = vehicle_vectors.get()

    ids = results.get("ids", [])
    documents = results.get("documents", [])
    embeddings = results.get("embeddings", [])

    print("[Chroma Sync] Retrieved all vehicle vectors.")

    return {
        "ids": ids,
        "documents": documents,
        "embeddings": embeddings
    }


async def search_vehicle_vectors(query: str, top_k: int = 5):

    embedding = create_embedding(query)

    results = vehicle_vectors.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    print(f"[Chroma Sync] Vehicle search completed. Query: '{query[:50]}...'")

    return results


async def add_owner_vector(data: dict):
    text = owner_text(data)
    embedding = create_embedding(text)

    owner_vectors.add(
        ids=[str(data["_id"])],
        documents=[text],
        embeddings=[embedding]
    )

    print(f"[Chroma Sync] Owner added. ID: {data['_id']}")


async def update_owner_vector(data: dict):
    text = owner_text(data)
    embedding = create_embedding(text)

    owner_vectors.update(
        ids=[str(data["_id"])],
        documents=[text],
        embeddings=[embedding]
    )

    print(f"[Chroma Sync] Owner updated. ID: {data['_id']}")


async def delete_owner_vector(id: str):
    owner_vectors.delete(ids=[id])

    print(f"[Chroma Sync] Owner deleted. ID: {id}")


async def get_all_owner_vectors():
    results = owner_vectors.get()

    ids = results.get("ids", [])
    documents = results.get("documents", [])
    embeddings = results.get("embeddings", [])

    print("[Chroma Sync] Retrieved all owner vectors.")

    return {
        "ids": ids,
        "documents": documents,
        "embeddings": embeddings
    }


async def search_owner_vectors(query: str, top_k: int = 5):

    embedding = create_embedding(query)

    results = owner_vectors.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    print(f"[Chroma Sync] Owner search completed. Query: '{query[:50]}...'")

    return results


async def load_static_knowledge():
    file_path = BASE_DIR / "data" / "campusease_static_info.txt"
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
    except FileNotFoundError:
        text = ""

    chunks = [text[i:i+CHUNK_SIZE] for i in range(0, len(text), CHUNK_SIZE)]
    for i, chunk in enumerate(chunks):
        embedding = create_embedding(chunk)
        knowledge_vectors.add(
            ids=[f"kb_{i}"],
            documents=[chunk],
            embeddings=[embedding]
        )
    print("[Chroma Sync] Static knowledge loaded.")
    