import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import UploadDocument from "../components/document/UploadDocument";
import ChatBox from "../components/chat/ChatBox";

import {
  getDocuments,
  deleteDocument,
  viewDocument,
  downloadDocument,
  type Document,
} from "../api/document";

import {
  getProject,
  deleteProject,
  type Project,
} from "../api/project";

export default function ProjectDetails() {
  const { id } = useParams();

  const projectId = Number(id);

  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  // Load Project Details
  const loadProject = async () => {
    try {
      const data = await getProject(projectId);
      setProject(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Load Documents
  const loadDocuments = async () => {
    try {
      const data = await getDocuments(projectId);

      console.log("Documents:", data);

      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!projectId) return;

    loadProject();
    loadDocuments();
  }, [projectId]);

  // Delete Document
  const handleDelete = async (documentId: number) => {
    try {
      await deleteDocument(documentId);
      loadDocuments();
    } catch (error) {
      console.error(error);
      alert("Failed to delete document");
    }
  };

  // View Document
  const handleView = async (documentId: number) => {
    try {
      const response = await viewDocument(documentId);
      window.open(response.url, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to open PDF");
    }
  };

  // Download Document
  const handleDownload = async (documentId: number) => {
    try {
      const data = await downloadDocument(documentId);
      window.open(data.url, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to download document");
    }
  };

  // Delete Project
  const handleDeleteProject = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?\n\nThis will permanently delete the project and all uploaded documents."
    );

    if (!confirmed) return;

    try {
      await deleteProject(projectId);

      alert("Project deleted successfully.");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to delete project");
    }
  };

  return (
    <DashboardLayout>
      {/* Project Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{project?.title}</h1>

        <p className="mt-3 text-gray-600">
          {project?.description}
        </p>
      </div>

      {/* Upload */}
      <UploadDocument
        projectId={projectId}
        onUploadSuccess={loadDocuments}
      />

      {/* Documents */}
      <div className="mt-10 rounded-xl border p-8">
        <h2 className="mb-6 text-2xl font-semibold">
          Documents
        </h2>

        {documents.length === 0 ? (
          <p className="text-gray-500">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    📄 {doc.original_filename}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Status: {doc.status}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(doc.file_size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(doc.id)}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    ⬇ Download
                  </button>

                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Chat */}
      <ChatBox projectId={projectId} />

      {/* Delete Project */}
      <div className="mt-10 border-t pt-8">
        <h2 className="mb-3 text-xl font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="mb-5 text-gray-600">
          Deleting this project will permanently remove the project and all of
          its uploaded documents.
        </p>

        <button
          onClick={handleDeleteProject}
          className="rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
        >
          🗑 Delete Project
        </button>
      </div>
    </DashboardLayout>
  );
}