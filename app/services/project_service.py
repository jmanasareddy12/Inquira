from sqlalchemy.orm import Session

from app.models.project import Project
from app.repositories.project_repository import ProjectRepository


class ProjectService:

    @staticmethod
    def create_project(db: Session, owner_id: int, title: str, description: str | None):

        project = Project(
            owner_id=owner_id,
            title=title,
            description=description
        )

        return ProjectRepository.create(db, project)

    @staticmethod
    def get_projects(db: Session, owner_id: int):
        return ProjectRepository.get_all_by_user(db, owner_id)