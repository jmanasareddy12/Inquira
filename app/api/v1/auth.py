from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_services import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    try:
        return AuthService.register(
            db=db,
            username=user.username,
            email=user.email,
            password=user.password
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))