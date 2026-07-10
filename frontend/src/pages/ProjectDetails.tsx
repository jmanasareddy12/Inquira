import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import UploadDocument from "../components/document/UploadDocument";
import ChatBox from "../components/chat/ChatBox";

import {
  getDocuments,
  deleteDocument,
  type Document,
} from "../api/document";

import {
  getProject,
  type Project,
} from "../api/project";

export default function ProjectDetails() {
  const { id } = useParams();

  const projectId = Number(id);

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

  return (
  <DashboardLayout>

    {/* Project Info */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold">
        {project?.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {project?.description}
      </p>
    </div>

    {/* Upload Component */}
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

              <button
                onClick={() => handleDelete(doc.id)}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

    {/* AI Chat */}
    <ChatBox projectId={projectId} />

  </DashboardLayout>
);
}