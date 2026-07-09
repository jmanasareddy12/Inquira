from pydantic import BaseModel


class SearchRequest(BaseModel):
    query: str


class SearchResponse(BaseModel):
    document_id: int
    chunk_index: int
    page_number: int | None = None
    content: str