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

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadDocument(projectId, file);

      alert("Upload Successful!");

      setFile(null);

      onUploadSuccess();
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="mb-8">

      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={handleUpload}
        className="ml-4 rounded bg-indigo-600 px-4 py-2 text-white"
      >
        Upload
      </button>

    </div>
  );
}