import os
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2")


def create_embedding(text: str):
    return embeddings.embed_query(text)
