from qdrant_client.models import Filter, FieldCondition, MatchValue
from app.models.document import Document
from app.core.qdrant import client
from app.services.vector_service import COLLECTION_NAME
from app.utils.embedding_utils import get_embedding


class SearchService:

    @staticmethod
    def search(
    db,
    project_id: int,
    query: str,
    limit: int = 5
):

        embedding = get_embedding(query)
        print(client.get_collections())
        results = client.query_points(
            collection_name=COLLECTION_NAME,
            query=embedding,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="project_id",
                        match=MatchValue(value=project_id)
                    )
                ]
            ),
            limit=limit,
        )

        response = []

        for point in results.points:

            payload = point.payload

            document = (
                db.query(Document)
                .filter(Document.id == payload["document_id"])
                .first()
            )

            response.append(
                {
                    "document_id": payload["document_id"],
                    "filename": (
                        document.original_filename
                        if document
                        else "Unknown Document"
                    ),
                    "page_number": payload["page_number"],
                    "chunk_index": payload["chunk_index"],
                    "content": payload["content"],
                    "score": point.score,
                }
            )

        return response