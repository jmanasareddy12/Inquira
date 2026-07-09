from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
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

            client.create_collection(
                collection_name=COLLECTION_NAME,
                vectors_config=VectorParams(
                    size=384,
                    distance=Distance.COSINE,
                ),
            )

    @staticmethod
    def index_chunk(chunk):

        embedding = get_embedding(chunk.content)

        client.upsert(
            collection_name=COLLECTION_NAME,
            points=[
                PointStruct(
                    id=chunk.id,
                    vector=embedding,
                    payload={
                        "document_id": chunk.document_id,
                        "chunk_index": chunk.chunk_index,
                        "page_number": chunk.page_number,
                        "content": chunk.content,
                    },
                )
            ],
        )