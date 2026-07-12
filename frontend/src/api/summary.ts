import api from "./axios";

export interface Summary {
  id: number;
  document_id: number;
  content: string;
}

export async function getSummary(documentId: number) {
  const response = await api.get<Summary>(
    `/summaries/${documentId}`
  );

  return response.data;
}

export async function generateSummary(documentId: number) {
  const response = await api.post<Summary>(
    `/summaries/${documentId}`
  );

  return response.data;
}