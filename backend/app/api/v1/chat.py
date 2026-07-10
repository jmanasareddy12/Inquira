from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import AIService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    return AIService.ask(
    project_id=request.project_id,
    question=request.question
)