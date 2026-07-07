import api from "./axios";

export interface Document {
  id: number;
  project_id: number;
  filename: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  status: string;
}

// Upload PDF
export async function uploadDocument(
  projectId: number,
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(
    `/documents/upload/${projectId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

// Get all documents
export async function getDocuments(projectId: number) {
  const response = await api.get<Document[]>(
    `/documents/project/${projectId}`
  );

  return response.data;
}

// Delete document
export async function deleteDocument(id: number) {
  await api.delete(`/documents/${id}`);
}