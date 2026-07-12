import { NavLink } from "react-router-dom";
<nav className="mt-8 space-y-3">

  <NavLink
    to="/dashboard"
    className="block rounded-lg px-3 py-2 text-white hover:bg-slate-700"
  >
    🏠 Dashboard
  </NavLink>

  <NavLink
    to="/documents"
    className="block rounded-lg px-3 py-2 text-white hover:bg-slate-700"
  >
    📄 Documents
  </NavLink>

  <NavLink
    to="/chat"
    className="block rounded-lg px-3 py-2 text-white hover:bg-slate-700"
  >
    💬 AI Chat
  </NavLink>

  <NavLink
    to="/search"
    className="block rounded-lg px-3 py-2 text-white hover:bg-slate-700"
  >
    🔍 Search
  </NavLink>

  <NavLink
    to="/summaries"
    className="block rounded-lg px-3 py-2 text-white hover:bg-slate-700"
  >
    ⭐ Summaries
  </NavLink>

</nav>