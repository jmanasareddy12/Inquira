import os
import shutil
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session
from app.services.vector_service import VectorService
from app.models.document import Document
from app.repositories.document_repository import DocumentRepository
from app.utils.pdf_utils import extract_text
from app.services.document_chunk_service import DocumentChunkService
from app.services.s3_service import S3Service

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

        # Read uploaded file into memory
        file_bytes = file.file.read()

        # Upload to S3
        s3_key = f"projects/{project_id}/{filename}"

        S3Service.upload_file(
            file_bytes=file_bytes,
            key=s3_key,
            content_type=file.content_type,
        )

        # Save temporarily for text extraction
        with open(filepath, "wb") as buffer:
            buffer.write(file_bytes)

        pages = extract_text(filepath)

        raw_text = "\n".join(
            page["text"] for page in pages
        )

        document = Document(
            project_id=project_id,
            filename=filename,
            original_filename=file.filename,
            file_type=file.content_type,
            file_size=os.path.getsize(filepath),
            storage_path=s3_key,
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
            pages=pages
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

        # Try deleting vectors from Qdrant
        try:
            S3Service.delete_file(
                document.storage_path
            )
            VectorService.delete_document_vectors(document_id)
        except Exception as e:
            print("Qdrant delete skipped:", e)

        # Always delete from PostgreSQL
        DocumentRepository.delete(db, document)

        return {
            "message": "Document deleted successfully"
        }
    
    @staticmethod
    def get_document_url(
        db: Session,
        document_id: int,
    ):

        document = DocumentRepository.get_by_id(
            db,
            document_id
        )

        if not document:
            raise ValueError("Document not found")

        url = S3Service.generate_view_url(
            document.storage_path
        )

        return {
            "url": url
        }
    
    @staticmethod
    def get_document_download_url(
        db: Session,
        document_id: int,
    ):

        document = DocumentRepository.get_by_id(
            db,
            document_id
        )

        if not document:
            raise ValueError("Document not found")

        url = S3Service.generate_download_url(
            document.storage_path
        )

        return {
            "url": url
        }