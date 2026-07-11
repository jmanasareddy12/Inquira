from pydantic import BaseModel


class SearchRequest(BaseModel):
    project_id: int
    query: str


class SearchResponse(BaseModel):
    document_id: int
    filename: str
    chunk_index: int
    page_number: int | None = None
    content: str
    score: float