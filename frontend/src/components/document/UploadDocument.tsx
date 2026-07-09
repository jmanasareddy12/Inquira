import { useState } from "react";
import { uploadDocument } from "../../api/document";

type Props = {
  projectId: number;
  onUploadSuccess: () => void;
};

export default function UploadDocument({
  projectId,
  onUploadSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      await uploadDocument(projectId, file);

      alert("Document uploaded successfully!");

      setFile(null);

      onUploadSuccess();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.detail ?? "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 flex items-center gap-4">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files?.[0] ?? null)
        }
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}