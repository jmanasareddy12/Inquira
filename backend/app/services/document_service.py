import os
import shutil
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.document import Document
from app.repositories.document_repository import DocumentRepository


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

        document = Document(
            project_id=project_id,
            filename=filename,
            original_filename=file.filename,
            file_type=file.content_type,
            file_size=os.path.getsize(filepath),
            storage_path=filepath,
            status="uploaded"
        )

        return DocumentRepository.create(db, document)