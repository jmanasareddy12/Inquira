import { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProjectCard from "../components/project/ProjectCard";
import CreateProjectModal from "../components/project/CreateProjectModal";

import { getProjects } from "../api/project";
import type { Project } from "../api/project";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal] = useState(false);

  // Load all projects
  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
        >
          + New Project
        </button>
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <div className="flex justify-center items-center h-60 border-2 border-dashed rounded-xl">
          <p className="text-gray-500 text-lg">
            No Projects Found
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
  key={project.id}
  id={project.id}
  title={project.title}
  description={project.description ?? ""}
/>
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onProjectCreated={loadProjects}
      />
    </DashboardLayout>
  );
}