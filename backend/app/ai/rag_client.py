import google.generativeai as genai
from app.core.config import settings
from app.db.chroma import (
    knowledge_vectors,
    vehicle_vectors,
    accommodation_vectors,
    owner_vectors
)
from app.ai.embedding_model import create_embedding
from app.ai.conversation_memory import ConversationBufferMemory

genai.configure(api_key=settings.GEMINI_API_KEY)

memory = ConversationBufferMemory()


def query_collection(collection, embedding, top_k=3):
    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k,
        include=["documents"]
    )
    return results.get("documents", [[]])[0]


def build_history_text(history):
    if not history:
        return ""

    history_text = "\nConversation History:\n"

    for msg in history:
        if msg["role"] == "user":
            history_text += f"User: {msg['content']}\n"
        else:
            history_text += f"Assistant: {msg['content']}\n"

    return history_text


def query_gemini(user_id: str, question: str, top_k: int = 3):

    memory.add_user_message(user_id, question)

    history = memory.get_history(user_id)
    history_text = build_history_text(history)

    question_embedding = create_embedding(question)

    kb_docs = query_collection(knowledge_vectors, question_embedding, top_k)
    vehicle_docs = query_collection(vehicle_vectors, question_embedding, top_k)
    accommodation_docs = query_collection(
        accommodation_vectors, question_embedding, top_k)
    owner_docs = query_collection(owner_vectors, question_embedding, top_k)

    docs = kb_docs + vehicle_docs + accommodation_docs + owner_docs

    if not docs:
        return "I couldn't find this information in the CampusEase database."

    context = "\n".join(docs)

    prompt = f"""
    You are the official AI assistant for the CampusEase platform.
    
    Your job is to answer student questions using ONLY the information provided in the context below.
    
    The context may include:
    1. Accommodation listings
    2. Vehicle rental information
    3. Platform policies (such as booking, cancellation, and refunds)
    
    Instructions:
    - Use ONLY the provided context to answer.
    - If the answer is not present in the context, say:
      "I couldn't find this information in the CampusEase database."
    - If the question is about accommodation or vehicles, extract the relevant details and present them clearly.
    - If the context contains a policy or guideline, summarize it clearly and keep the structure readable.
    - If the context contains steps or rules, present them as bullet points or numbered steps.
    - Keep answers concise but informative.
    - Never invent information that is not in the context.
    
    SPECIFIC QUERY HANDLING:
    1. For FILTERING queries (e.g., "vehicles with rent less than 500", "accommodations in [city]"):
       - Scan all relevant items in the context
       - Filter based on the specified criteria (price, location, type, amenities, etc.)
       - Present matching items in a clear list format with key details
       - If no items match, state "No items found matching your criteria"
    
    2. For RELATIONAL queries (e.g., "who owns accommodation_01", "what vehicles does owner X have"):
       - Connect information across different data types
       - Use owner information to identify relationships
       - Present the relationship clearly (e.g., "Accommodation_01 is owned by [Owner Name], contact: [phone/email]")
    
    3. For SPECIFIC ATTRIBUTE queries (e.g., "tell me the rent of vehicle Y", "what's the phone number of owner Z"):
       - Extract and present only the requested specific attribute
       - Format: "The [attribute] of [item] is [value]"
    
    4. For COMPARISON queries (e.g., "which accommodation has more rooms", "compare prices of vehicles"):
       - Compare relevant attributes across items
       - Present comparison in a structured format (table or bullet points)
       - Highlight differences clearly
    
    5. For AVAILABILITY queries (e.g., "are there any vehicles with 5 seats", "accommodations with WiFi"):
       - Check against specified features/amenities
       - List all matching items with the requested features
       - If checking specific item, confirm if it has the feature
    
    Context:
    {context}
    
    {history_text}
    
    User Question:
    {question}
    
    Answer:
    """

    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)

    answer = response.text.strip()

    memory.add_ai_message(user_id, answer)
    print(f"User: {question}\nAI: {answer}\n---")
    return answer
