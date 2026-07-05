import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        Inquira
      </h1>

      <nav className="space-y-4">

        <Link to="/dashboard">📁 Projects</Link>

        <br />

        <Link to="/documents">📄 Documents</Link>

        <br />

        <Link to="/chat">💬 AI Chat</Link>

        <br />

        <Link to="/search">🔍 Search</Link>

        <br />

        <Link to="/summary">⭐ Summaries</Link>

      </nav>

    </aside>
  );
}