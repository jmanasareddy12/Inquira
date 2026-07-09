from app.core.qdrant import client
from app.services.vector_service import COLLECTION_NAME
from app.utils.embedding_utils import get_embedding


class SearchService:

    @staticmethod
    def search(query: str, limit: int = 5):

        embedding = get_embedding(query)

        results = client.query_points(
            collection_name=COLLECTION_NAME,
            query=embedding,
            limit=limit,
        )

        return [
            point.payload
            for point in results.points
        ]