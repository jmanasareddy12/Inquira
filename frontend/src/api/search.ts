import api from "./axios";

export interface SearchRequest {
  project_id: number;
  query: string;
}

export async function searchDocuments(
  project_id: number,
  query: string
) {
  const response = await api.post("/search", {
    project_id,
    query,
  });

  return response.data;
}