from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.search import SearchRequest
from app.services.search_service import SearchService

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.post("")
def search(
    request: SearchRequest,
    db: Session = Depends(get_db),
):

    return SearchService.search(
        db=db,
        project_id=request.project_id,
        query=request.query,
        limit=5,
    )