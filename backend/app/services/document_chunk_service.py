from sqlalchemy.orm import Session

from app.models.document_chunk import DocumentChunk
from app.repositories.document_chunk_repository import (
    DocumentChunkRepository,
)
from app.services.vector_service import VectorService
from app.utils.chunk_utils import chunk_text


class DocumentChunkService:

    @staticmethod
    def create_chunks(
        db: Session,
        document_id: int,
        raw_text: str,
    ):

        # Create collection if it doesn't exist
        VectorService.create_collection()

        # Split text into chunks
        chunks = chunk_text(raw_text)

        print("=" * 60)
        print(f"Document ID      : {document_id}")
        print(f"Raw Text Length  : {len(raw_text)}")
        print(f"Chunks Generated : {len(chunks)}")

        objects = []

        for index, chunk in enumerate(chunks):

            objects.append(
                DocumentChunk(
                    document_id=document_id,
                    chunk_index=index,
                    page_number=None,
                    content=chunk,
                    token_count=len(chunk.split()),
                )
            )

        print("Saving chunks to PostgreSQL...")

        DocumentChunkRepository.create_many(
            db,
            objects
        )

        print(f"{len(objects)} chunks saved successfully.")

        print("Generating embeddings and indexing into Qdrant...")

        for chunk in objects:
            VectorService.index_chunk(chunk)

        print(f"{len(objects)} vectors indexed successfully.")

        print("=" * 60)