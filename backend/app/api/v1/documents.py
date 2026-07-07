from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/{project_id}", response_model=DocumentResponse)
def upload_document(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    return DocumentService.upload_document(
        db=db,
        project_id=project_id,
        file=file
    )

@router.get("/project/{project_id}", response_model=list[DocumentResponse])
def get_documents(
    project_id: int,
    db: Session = Depends(get_db)
):
    return DocumentService.get_documents(
        db=db,
        project_id=project_id
    )


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    try:
        return DocumentService.delete_document(
            db=db,
            document_id=document_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )