import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 p-6 text-white">

      <h1 className="mb-10 text-3xl font-bold">
        Inquira
      </h1>

      <nav className="space-y-2">

        <NavLink
          to="/dashboard"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/documents"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          📄 Documents
        </NavLink>

        <NavLink
          to="/chat"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          💬 AI Chat
        </NavLink>

        <NavLink
          to="/search"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          🔍 Search
        </NavLink>

        <NavLink
          to="/summaries"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          ⭐ Summaries
        </NavLink>

      </nav>

    </aside>
  );
}