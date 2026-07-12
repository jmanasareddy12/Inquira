from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user

from app.models.user import User

from app.repositories.document_repository import DocumentRepository
from app.schemas.summary import SummaryResponse
from app.services.summary_service import SummaryService

router = APIRouter(
    prefix="/summaries",
    tags=["Summaries"],
)


@router.post("/{document_id}", response_model=SummaryResponse)
def generate_summary(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = DocumentRepository.get_by_id(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return SummaryService.generate_summary(
        db=db,
        document=document,
    )


@router.get("/{document_id}", response_model=SummaryResponse)
def get_summary(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    summary = SummaryService.get_summary(
        db,
        document_id,
    )

    if summary is None:
        raise HTTPException(
            status_code=404,
            detail="Summary not found",
        )

    return summary