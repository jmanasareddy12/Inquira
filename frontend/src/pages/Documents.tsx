import { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import {
  getAllDocuments,
  deleteDocument,
  viewDocument,
  downloadDocument,
  type Document,
} from "../api/document";

export default function Documents() {

  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const data = await getAllDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteDocument(id);
      loadDocuments();
    } catch (error) {
      console.error(error);
      alert("Failed to delete document");
    }
  }

  async function handleView(id: number) {
    try {
      const data = await viewDocument(id);
      window.open(data.url, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to open document");
    }
  }

  async function handleDownload(id: number) {
    try {
      const data = await downloadDocument(id);
      window.open(data.url, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to download document");
    }
  }

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-3xl font-bold">
        📄 Documents
      </h1>

      {documents.length === 0 ? (

        <p>No documents uploaded.</p>

      ) : (

        <div className="space-y-4">

          {documents.map((doc) => (

            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg border bg-white p-5 shadow"
            >

              <div>

                <h2 className="text-lg font-semibold">
                  {doc.original_filename}
                </h2>

                <p className="text-sm text-gray-500">
  📁 {doc.project_name}
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

    </DashboardLayout>
  );
}