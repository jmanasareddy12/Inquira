import api from "./axios";

export interface Project {
  id: number;
  owner_id: number;
  title: string;
  description: string | null;
  visibility: string;
}

export async function getProjects() {
  const response = await api.get<Project[]>("/projects");
  return response.data;
}
export async function getProject(id: number) {
  const response = await api.get<Project>(`/projects/${id}`);
  return response.data;
}
export async function createProject(data: {
  title: string;
  description: string;
}) {
  const response = await api.post<Project>("/projects", data);
  return response.data;
}
export async function deleteProject(projectId: number) {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
}