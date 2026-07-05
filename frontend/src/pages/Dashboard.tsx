import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProjectCard from "../components/dashboard/ProjectCard";

export default function Dashboard() {

    return (

        <DashboardLayout>

            <div className="flex justify-between mb-10">

                <h1 className="text-4xl font-bold">

                    Welcome 👋

                </h1>

                <button
                    className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
                >
                    + New Project
                </button>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                <ProjectCard
                    title="AI Research"
                    description="12 research papers"
                />

                <ProjectCard
                    title="Computer Vision"
                    description="8 research papers"
                />

            </div>

        </DashboardLayout>

    );

}