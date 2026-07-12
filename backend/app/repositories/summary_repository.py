from sqlalchemy.orm import Session

from app.models.summary import Summary


class SummaryRepository:

    @staticmethod
    def create(
        db: Session,
        summary: Summary,
    ):
        db.add(summary)
        db.commit()
        db.refresh(summary)
        return summary

    @staticmethod
    def get_by_document(
        db: Session,
        document_id: int,
    ):
        return (
            db.query(Summary)
            .filter(Summary.document_id == document_id)
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        summary: Summary,
        content: str,
    ):
        summary.content = content
        db.commit()
        db.refresh(summary)
        return summary

    @staticmethod
    def delete(
        db: Session,
        summary: Summary,
    ):
        db.delete(summary)
        db.commit()