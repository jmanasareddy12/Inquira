export default function Features() {
  const features = [
    {
      title: "AI Chat",
      description: "Ask questions across your research papers."
    },
    {
      title: "Smart Summaries",
      description: "Generate concise summaries instantly."
    },
    {
      title: "Semantic Search",
      description: "Find relevant information using vector search."
    }
  ];

  return (
    <section
      id="features"
      className="mx-auto max-w-6xl py-20"
    >
      <h2 className="mb-12 text-center text-4xl font-bold">
        Features
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border p-8 shadow-sm"
          >
            <h3 className="text-2xl font-semibold">
              {feature.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}