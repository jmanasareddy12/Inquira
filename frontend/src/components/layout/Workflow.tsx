const steps = [
  "Upload Research Papers",
  "Extract & Chunk Text",
  "Generate Embeddings",
  "Chat with AI"
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="mx-auto max-w-6xl py-24"
    >
      <h2 className="mb-12 text-center text-4xl font-bold">
        How It Works
      </h2>

      <div className="grid gap-8 md:grid-cols-4">

        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-xl border p-8 text-center shadow-sm"
          >
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
              {index + 1}
            </div>

            <p className="font-medium">
              {step}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}