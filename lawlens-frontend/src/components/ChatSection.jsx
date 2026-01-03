import { useState } from "react";
import { askQuestion } from "../lib/api";

function ChatSection({ sessionId }) {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    if (!sessionId) {
      setAnswer("Session not ready. Please upload and process a document first.");
      return;
    }

    setLoading(true);

    try {
      const res = await askQuestion({
        session_id: sessionId,
        query: query
      });

      setAnswer(res?.answer || "No response received.");
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching response from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">🤖 Ask AI Assistant</h2>

      <textarea
        className="w-full border p-3 rounded"
        rows={3}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a legal question related to your document..."
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatSection;
