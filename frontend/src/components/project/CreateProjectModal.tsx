import { useState } from "react";
import { createProject } from "../../api/project";

type Props = {
  open: boolean;
  onClose: () => void;
  onProjectCreated: () => void;
};

export default function CreateProjectModal({
  open,
  onClose,
  onProjectCreated,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleCreate = async () => {
    try {
      await createProject({
        title,
        description,
      });

      setTitle("");
      setDescription("");

      onProjectCreated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[500px] p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create Project
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full border rounded-lg p-3"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}