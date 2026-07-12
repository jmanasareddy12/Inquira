from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user

from app.models.user import User

from app.repositories.project_repository import ProjectRepository
from app.repositories.document_repository import DocumentRepository

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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectRepository.get_by_id(db, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return DocumentService.upload_document(
        db=db,
        project_id=project_id,
        file=file
    )
@router.get("/", response_model=list[DocumentResponse])
def get_user_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return DocumentService.get_user_documents(
        db=db,
        owner_id=current_user.id,
    )

@router.get("/project/{project_id}", response_model=list[DocumentResponse])
def get_documents(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectRepository.get_by_id(db, project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return DocumentService.get_documents(
        db=db,
        project_id=project_id
    )


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = DocumentRepository.get_by_id(
        db,
        document_id
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    project = ProjectRepository.get_by_id(
        db,
        document.project_id
    )

    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return DocumentService.delete_document(
        db=db,
        document_id=document_id
    )

@router.get("/{document_id}/view")
def view_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = DocumentRepository.get_by_id(
        db,
        document_id
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    project = ProjectRepository.get_by_id(
        db,
        document.project_id
    )

    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return DocumentService.get_document_url(
        db=db,
        document_id=document_id,
    )


@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    document = DocumentRepository.get_by_id(
        db,
        document_id
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    project = ProjectRepository.get_by_id(
        db,
        document.project_id
    )

    if project.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return DocumentService.get_document_download_url(
        db=db,
        document_id=document_id,
    )