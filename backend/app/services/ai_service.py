from app.core.gemini import client
from app.services.search_service import SearchService


class AIService:

    @staticmethod
    def ask(
        project_id: int,
        question: str
    ):

        results = SearchService.search(
            project_id=project_id,
            query=question,
            limit=5
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

        return {
            "answer": response.text,
            "sources": results
        }