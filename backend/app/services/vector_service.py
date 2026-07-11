from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
    PayloadSchemaType,
    Filter,
    FieldCondition,
    MatchValue,
)

from app.core.qdrant import client
from app.utils.embedding_utils import get_embedding

COLLECTION_NAME = "documents"


class VectorService:

    @staticmethod
    def create_collection():

        collections = client.get_collections()

        existing = [
            collection.name
            for collection in collections.collections
        ]

        if COLLECTION_NAME not in existing:

            print("Creating Qdrant collection...")

            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=384,
                    distance=Distance.COSINE,
                ),
            )

            client.create_payload_index(
                collection_name=COLLECTION_NAME,
                field_name="project_id",
                field_schema=PayloadSchemaType.INTEGER,
            )

            print("Collection created successfully.")

        else:

            try:
                client.create_payload_index(
                    collection_name=COLLECTION_NAME,
                    field_name="project_id",
                    field_schema=PayloadSchemaType.INTEGER,
                )
            except Exception:
                pass

    @staticmethod
    def index_chunk(chunk):

        VectorService.create_collection()

        embedding = get_embedding(chunk.content)

        client.upsert(
            collection_name=COLLECTION_NAME,
            points=[
                PointStruct(
                    id=chunk.id,
                    vector=embedding,
                    payload={
                        "project_id": chunk.document.project_id,
                        "document_id": chunk.document_id,
                        "chunk_index": chunk.chunk_index,
                        "page_number": chunk.page_number,
                        "content": chunk.content,
                    },
                )
            ],
        )


        @staticmethod
        def delete_document_vectors(document_id: int):

            client.delete(
                collection_name=COLLECTION_NAME,
                points_selector=Filter(
                    must=[
                        FieldCondition(
                            key="document_id",
                            match=MatchValue(value=document_id),
                        )
                    ]
                ),
            )

            print(f"Deleted vectors for document {document_id}")