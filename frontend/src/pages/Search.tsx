import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import { searchDocuments } from "../api/search";

export default function Search() {

  const [projectId, setProjectId] = useState(1);
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<any[]>([]);

  async function handleSearch() {

    if (!query.trim()) return;

    try {

      const data = await searchDocuments(
        projectId,
        query
      );

      setResults(data);

    } catch (error) {

      console.error(error);

      alert("Search failed");

    }

  }

  return (

    <DashboardLayout>

      <h1 className="mb-8 text-3xl font-bold">

        🔍 Search Documents

      </h1>

      <div className="mb-8 flex gap-4">

        <input
          type="number"
          value={projectId}
          onChange={(e) =>
            setProjectId(Number(e.target.value))
          }
          className="w-32 rounded-lg border p-3"
          placeholder="Project ID"
        />

        <input
          type="text"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="flex-1 rounded-lg border p-3"
          placeholder="Search your research papers..."
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700"
        >
          Search
        </button>

      </div>

      <div className="space-y-4">

       {results.map((result, index) => (

  <div
    key={index}
    className="rounded-xl border bg-white p-6 shadow-sm"
  >

    <div className="flex items-center justify-between">

      <div>

        <h2 className="text-lg font-semibold">
          📄 {result.filename}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Page {result.page_number}
        </p>

      </div>

      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        {(result.score * 100).toFixed(1)}%
      </span>

    </div>

    <p className="mt-5 leading-7 text-gray-700">

      {result.content}

    </p>

  </div>

))}
      </div>

    </DashboardLayout>

  );

}