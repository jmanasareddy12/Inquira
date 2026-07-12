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
            className="rounded-lg border bg-white p-5 shadow"
          >

            <pre className="whitespace-pre-wrap text-sm">

              {JSON.stringify(result, null, 2)}

            </pre>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );

}