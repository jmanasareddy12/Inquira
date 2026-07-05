from pydantic import BaseModel
from typing import Optional


class ProjectCreate(BaseModel):
    title: str
    description: Optional[str] = None


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    visibility: Optional[str] = None


class ProjectResponse(BaseModel):
    id: int
    owner_id: int
    title: str
    description: Optional[str]
    visibility: str

    model_config = {
        "from_attributes": True
    }