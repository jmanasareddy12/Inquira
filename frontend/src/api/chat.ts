import api from "./axios";

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: {
    document_id: number;
    chunk_index: number;
    page_number: number | null;
    content: string;
  }[];
}

export async function askQuestion(
    projectId: number,
    question: string
) {

    const response = await api.post("/chat", {
        project_id: projectId,
        question,
    });

    return response.data;
}