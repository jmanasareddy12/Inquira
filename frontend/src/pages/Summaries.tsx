import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import {
  getAllDocuments,
  viewDocument,
  downloadDocument,
  type Document,
} from "../api/document";

import {
  getSummary,
  generateSummary,
} from "../api/summary";

export default function Summaries() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [summaries, setSummaries] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<number | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const docs = await getAllDocuments();

      setDocuments(docs);

      for (const doc of docs) {
        try {
          const summary = await getSummary(doc.id);

          setSummaries((prev) => ({
            ...prev,
            [doc.id]: summary.content,
          }));
        } catch {
          // No summary yet
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGenerate(documentId: number) {
    try {
      setLoading(documentId);

      const summary = await generateSummary(documentId);

      setSummaries((prev) => ({
        ...prev,
        [documentId]: summary.content,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setLoading(null);
    }
  }

  async function handleView(documentId: number) {
    const response = await viewDocument(documentId);
    window.open(response.url, "_blank");
  }

  async function handleDownload(documentId: number) {
    const response = await downloadDocument(documentId);
    window.open(response.url, "_blank");
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    alert("Summary copied");
  }

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-3xl font-bold">
        ⭐ AI Summaries
      </h1>

      <div className="space-y-8">

        {documents.map((doc) => (

          <div
            key={doc.id}
            className="rounded-xl border bg-white p-6 shadow"
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold">
                  📄 {doc.original_filename}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  📁 {doc.project_name}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => handleView(doc.id)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  View PDF
                </button>

                <button
                  onClick={() => handleDownload(doc.id)}
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Download
                </button>

              </div>

            </div>

            <div className="mt-6">

              {summaries[doc.id] ? (

                <>
                  <div className="prose max-w-none">

                    <ReactMarkdown>
                      {summaries[doc.id]}
                    </ReactMarkdown>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() =>
                        handleCopy(summaries[doc.id])
                      }
                      className="rounded bg-slate-700 px-4 py-2 text-white"
                    >
                      📋 Copy
                    </button>

                    <button
                      onClick={() =>
                        handleGenerate(doc.id)
                      }
                      className="rounded bg-purple-600 px-4 py-2 text-white"
                    >
                      🔄 Regenerate
                    </button>

                  </div>

                </>

              ) : (

                <button
                  onClick={() =>
                    handleGenerate(doc.id)
                  }
                  disabled={loading === doc.id}
                  className="rounded bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                >
                  {loading === doc.id
                    ? "Generating..."
                    : "✨ Generate Summary"}
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}