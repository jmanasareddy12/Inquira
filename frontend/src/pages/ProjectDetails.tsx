import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProject, type Project } from "../api/project";
export default function ProjectDetails() {
  const { id } = useParams();
const [project, setProject] = useState<Project | null>(null);
useEffect(() => {

  async function loadProject() {

    if (!id) return;

    try {

      const data = await getProject(Number(id));

      setProject(data);

    } catch (error) {

      console.error(error);

    }

  }

  loadProject();

}, [id]);
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-4">
  {project?.title}
</h1>

     <p className="text-gray-600 mb-8">
  {project?.description}
</p>

      <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg">
        Upload PDF
      </button>

      <div className="mt-10 border rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">
          Documents
        </h2>

        <p className="text-gray-500">
          No documents uploaded yet.
        </p>
      </div>
    </DashboardLayout>
  );
}