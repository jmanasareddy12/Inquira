from sqlalchemy.orm import Session
from app.models.project import Project


class ProjectRepository:

    @staticmethod
    def create(db: Session, project: Project):
        db.add(project)
        db.commit()
        db.refresh(project)
        return project

    @staticmethod
    def get_all_by_user(db: Session, owner_id: int):
        return db.query(Project).filter(Project.owner_id == owner_id).all()