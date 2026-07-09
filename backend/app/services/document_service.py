import os
import shutil
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.document import Document
from app.repositories.document_repository import DocumentRepository
from app.utils.pdf_utils import extract_text
from app.services.document_chunk_service import DocumentChunkService
UPLOAD_FOLDER = "uploads"


class DocumentService:

    @staticmethod
    def upload_document(
        db: Session,
        project_id: int,
        file: UploadFile
    ):

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        filename = f"{uuid4()}_{file.filename}"

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        raw_text = extract_text(filepath)

        document = Document(
            project_id=project_id,
            filename=filename,
            original_filename=file.filename,
            file_type=file.content_type,
            file_size=os.path.getsize(filepath),
            storage_path=filepath,
            status="uploaded",
            raw_text=raw_text
        )

        saved_document = DocumentRepository.create(
    db,
    document
)

        DocumentChunkService.create_chunks(
            db=db,
            document_id=saved_document.id,
            raw_text=raw_text
        )

        return saved_document
    @staticmethod
    def get_documents(db: Session, project_id: int):
        return DocumentRepository.get_by_project(
            db,
            project_id
        )

    @staticmethod
    def get_user_documents(db: Session, owner_id: int):
        return DocumentRepository.get_all_by_user(
            db,
            owner_id
        )

    @staticmethod
    def delete_document(db: Session, document_id: int):

        document = DocumentRepository.get_by_id(
            db,
            document_id
        )

        if not document:
            raise ValueError("Document not found")

        DocumentRepository.delete(db, document)

        return {
            "message": "Document deleted successfully"
        }