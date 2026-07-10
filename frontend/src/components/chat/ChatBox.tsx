import {
  useState,
  useRef,
  useEffect,
} from "react";

import ReactMarkdown from "react-markdown";

import { askQuestion } from "../../api/chat";

type Props = {
  projectId: number;
};

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatBox({
  projectId,
}: Props) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<any[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleAsk() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: currentQuestion,
      },
    ]);

    setQuestion("");

    setLoading(true);

    try {
      const response = await askQuestion(
        projectId,
        currentQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.answer,
        },
      ]);

      setSources(response.sources);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Failed to get an answer.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        🤖 AI Research Assistant
      </h2>

      {/* Conversation */}

      <div className="mb-6 max-h-[500px] space-y-4 overflow-y-auto">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-xl p-4 ${
                message.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
            >

              <ReactMarkdown>
                {message.text}
              </ReactMarkdown>

            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="rounded-xl bg-gray-100 p-4">

              🤖 Thinking...

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* Input */}

      <textarea
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAsk();
          }
        }}
        className="w-full rounded-lg border p-4"
        placeholder="Ask anything about your uploaded documents..."
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-4 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 disabled:bg-gray-400"
      >
        Ask AI
      </button>

      {/* Sources */}

      {sources.length > 0 && (

        <div className="mt-8 rounded-lg border bg-gray-50 p-5">

          <h3 className="mb-4 text-lg font-semibold">

            📚 Sources

          </h3>

          {sources.map((source, index) => (

            <div
              key={index}
              className="mb-3 rounded-lg border bg-white p-3"
            >

              <p>

                <strong>Document ID:</strong>{" "}

                {source.document_id}

              </p>

              <p>

                <strong>Chunk:</strong>{" "}

                {source.chunk_index}

              </p>

              {source.page_number && (

                <p>

                  <strong>Page:</strong>{" "}

                  {source.page_number}

                </p>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}