from app.core.gemini import client
from app.services.search_service import SearchService
from sqlalchemy.orm import Session

class AIService:

    @staticmethod
    

    def ask(
        db: Session,
        project_id: int,
        question: str,
    ):

        results = SearchService.search(
            db=db,
            project_id=project_id,
            query=question,
            limit=5,
        )

        context = "\n\n".join(
            chunk["content"]
            for chunk in results
        )

        prompt = f"""
You are Inquira, an AI Research Assistant.

Answer ONLY using the context below.

If the answer is not present, say:
"I couldn't find that information in the uploaded documents."

Context:
{context}

Question:
{question}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        print("=" * 80)
        print(results)
        print("=" * 80)
        return {
            "answer": response.text,
            "sources": results
        }