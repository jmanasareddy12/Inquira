from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    project_id: int
    filename: str
    original_filename: str
    file_type: str
    file_size: int
    status: str
    raw_text: str | None = None

    model_config = {
        "from_attributes": True
    }