from fastapi import APIRouter, Query, HTTPException, Depends
from app.ai.rag_client import query_gemini
from app.middlewares.auth_middleware import login_required
from app.models.user_model import User

router = APIRouter(prefix="/rag", tags=["RAG"])


@router.get("/ask")
async def ask_gemini(
    prompt: str = Query(...,
                        description="The question you want to ask CampusEase AI"),
    current_user: User = Depends(login_required)
):
    try:
        user_id = current_user.id

        answer = query_gemini(user_id, prompt)

        return {
            "success": True,
            "user_id": user_id,
            "question": prompt,
            "response": answer
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"AI Service Error: {str(e)}")
