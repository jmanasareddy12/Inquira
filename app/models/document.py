from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False
    )

    filename = Column(String(255), nullable=False)

    original_filename = Column(String(255), nullable=False)

    file_type = Column(String(50), nullable=False)

    file_size = Column(Integer)

    storage_path = Column(String(500))

    processed = Column(Boolean, default=False)

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    project = relationship(
        "Project",
        back_populates="documents"
    )