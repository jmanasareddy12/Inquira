import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-indigo-600">
          Inquira
        </h1>

        <div className="flex items-center gap-8">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>

          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}