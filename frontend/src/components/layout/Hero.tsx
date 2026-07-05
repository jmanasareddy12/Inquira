import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <span className="rounded-full border bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow">
          AI Powered Research Assistant
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight">
          Chat with
          <span className="text-indigo-600"> Research Papers</span>
        </h1>

        <p className="mt-6 max-w-3xl text-xl text-gray-600">
          Upload PDFs, generate summaries, search intelligently,
          and get cited answers using Retrieval-Augmented Generation.
        </p>

        <div className="mt-10 flex gap-5">

          <Link
            to="/register"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-white transition hover:bg-indigo-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <a
            href="https://github.com/jmanasareddy12/Inquira"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border px-7 py-3 hover:bg-gray-100"
          >
            GitHub
          </a>

        </div>

      </div>
    </section>
  );
}