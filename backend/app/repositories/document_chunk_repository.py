from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk


class DocumentChunkRepository:

    @staticmethod
    def create(db: Session, chunk: DocumentChunk):

        db.add(chunk)
        db.commit()
        db.refresh(chunk)

        return chunk

    @staticmethod
    def create_many(
        db: Session,
        chunks: list[DocumentChunk]
    ):

        db.add_all(chunks)

        db.commit()

        for chunk in chunks:
            db.refresh(chunk)