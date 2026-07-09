from sqlalchemy.orm import Session
from app.models.document import Document
from app.models.project import Project

class DocumentRepository:

    @staticmethod
    def create(db: Session, document: Document):
        db.add(document)
        db.commit()
        db.refresh(document)
        return document

    @staticmethod
    def get_by_project(db: Session, project_id: int):
        return (
            db.query(Document)
            .filter(Document.project_id == project_id)
            .all()
        )

    @staticmethod
    def get_by_id(db: Session, document_id: int):
        return (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )
    
    @staticmethod
    def get_all_by_user(db: Session, owner_id: int):
        return (
            db.query(Document)
            .join(Project)
            .filter(Project.owner_id == owner_id)
            .all()
        )

    @staticmethod
    def delete(db: Session, document: Document):
        db.delete(document)
        db.commit()