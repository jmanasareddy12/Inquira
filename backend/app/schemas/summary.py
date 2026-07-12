from pydantic import BaseModel


class SummaryResponse(BaseModel):

    id: int

    document_id: int

    content: str

    model_config = {
        "from_attributes": True
    }