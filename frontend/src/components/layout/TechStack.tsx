const tech = [
  "React",
  "FastAPI",
  "PostgreSQL",
  "LangChain",
  "Gemini",
  "pgvector",
  "Docker"
];

export default function TechStack() {
  return (
    <section className="bg-gray-50 py-16">

      <h2 className="mb-10 text-center text-3xl font-bold">
        Built With
      </h2>

      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">

        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full bg-white px-5 py-2 shadow"
          >
            {item}
          </span>
        ))}

      </div>

    </section>
  );
}