import { useNavigate } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  description: string;
};

export default function ProjectCard({
  id,
  title,
  description,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${id}`)}
      className="border rounded-xl p-6 shadow cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>
    </div>
  );
}