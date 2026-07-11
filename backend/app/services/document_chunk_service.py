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
        pages: list,
    ):

        # Create collection if it doesn't exist
        VectorService.create_collection()


        objects = []

        chunk_index = 0

        for page in pages:
            print("=" * 50)
            print(page)
            print(type(page))
            print("page_number =", page.get("page_number"))
            page_chunks = chunk_text(page["text"])

            print(
                f"Page {page['page_number']} -> {len(page_chunks)} chunks"
            )

            for chunk in page_chunks:

                print(
                    f"Creating chunk {chunk_index} | Page = {page['page_number']}"
                )
                chunk_obj = DocumentChunk(
                    document_id=document_id,
                    chunk_index=chunk_index,
                    page_number=page["page_number"],
                    content=chunk,
                    token_count=len(chunk.split()),
                )

                print("Chunk object page_number:", chunk_obj.page_number)

                objects.append(chunk_obj)

                

                chunk_index += 1

        print("Saving chunks to PostgreSQL...")

        DocumentChunkRepository.create_many(
            db,
            objects
        )
        print("After save:")

        for chunk in objects[:5]:
            print(
                f"Chunk {chunk.chunk_index} -> page_number = {chunk.page_number}"
            )
        print(f"{len(objects)} chunks saved successfully.")

        print("Generating embeddings and indexing into Qdrant...")

        for chunk in objects:
            try:
                VectorService.index_chunk(chunk)
                print(f"Indexed chunk {chunk.chunk_index}")
            except Exception as e:
                print(f"ERROR indexing chunk {chunk.chunk_index}")
                print(type(e))
                print(e)
                raise

        print(f"{len(objects)} vectors indexed successfully.")

        print("=" * 60)