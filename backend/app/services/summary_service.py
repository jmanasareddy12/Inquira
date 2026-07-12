from sqlalchemy.orm import Session

from google import genai

from app.core.config import settings

from app.models.document import Document
from app.models.summary import Summary

from app.repositories.summary_repository import SummaryRepository


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


class SummaryService:

    @staticmethod
    def get_summary(
        db: Session,
        document_id: int,
    ):
        return SummaryRepository.get_by_document(
            db,
            document_id,
        )

    @staticmethod
    def create_summary(
        db: Session,
        document_id: int,
        content: str,
    ):

        existing = SummaryRepository.get_by_document(
            db,
            document_id,
        )

        if existing:

            return SummaryRepository.update(
                db,
                existing,
                content,
            )

        summary = Summary(
            document_id=document_id,
            content=content,
        )

        return SummaryRepository.create(
            db,
            summary,
        )

    @staticmethod
    def generate_summary(
        db: Session,
        document: Document,
    ):

        prompt = f"""
You are an expert research assistant.

Summarize the following document.

Return the summary in Markdown using these headings:

# Executive Summary

# Key Takeaways

# Methodology

# Results

# Limitations

# Keywords

Document:

{document.raw_text}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        return SummaryService.create_summary(
            db=db,
            document_id=document.id,
            content=response.text,
        )