from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password


class AuthService:

    @staticmethod
    def register(db: Session, username: str, email: str, password: str):

        existing_user = UserRepository.get_by_email(db, email)

        if existing_user:
            raise ValueError("Email already exists")

        user = User(
            username=username,
            email=email,
            hashed_password=hash_password(password)
        )

        return UserRepository.create(db, user)