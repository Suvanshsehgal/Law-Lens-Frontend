import { useState, useRef, useEffect } from "react";
import { askQuestion } from "../lib/api";
import { Bot, Send, User } from "lucide-react";

function ChatSection({ sessionId }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleAsk = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setQuery("");

    if (!sessionId) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Session not ready. Please upload and process a document first.",
        },
      ]);
      return;
    }

    setLoading(true);
    const startTime = Date.now();

    try {
      const res = await askQuestion({
        session_id: sessionId,
        query: text,
      });

      const elapsed = Date.now() - startTime;
      const delay = Math.max(1000 - elapsed, 0);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res?.answer || "No response received.",
          },
        ]);
        setLoading(false);
      }, delay);
    } catch {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Error fetching response from server.",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  };

  const starterQuestions = [
    "What are my main obligations under this contract?",
    "What are the termination conditions?",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col h-[620px]">

      {/* ===== Header ===== */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="heading text-xs tracking-widest text-gray-500">
              Assistant
            </p>
            <h2 className="heading text-3xl font-semibold font-serif text-gray-900">
              AI Legal Advisor
            </h2>
          </div>
        </div>

        <span className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
          <span className="subtext h-2 w-2 bg-green-500 rounded-full"></span>
          Ready
        </span>
      </div>

      {/* ===== Messages Area ===== */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4"
      >
        {/* Intro */}
        {messages.length === 0 && (
          <>
            <div className="subtext bg-[#FBF7F2] rounded-xl p-4 text-xs text-gray-700">
              I've analyzed your document. Ask me anything about clauses, terms,
              or obligations. I can help you understand complex legal language.
            </div>

            {/* Starter Questions Box */}
            <div className="bg-white border border-gray-200 rounded p-4">
              <p className="subtext text-sm font-medium text-gray-700 mb-3">
                Try asking:
              </p>

              <div className="space-y-2">
                {starterQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleAsk(q)}
                    className="w-full text-left text-sm px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition"
                  >
                    <span className="text-orange-500 mr-2">•</span>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Chat Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-600" />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <User className="w-4 h-4 text-orange-500" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-gray-400 animate-pulse" />
            </div>
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
              Thinking…
            </div>
          </div>
        )}
      </div>

      {/* ===== Input ===== */}
      <div className="shrink-0 flex items-center gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk(query)}
          placeholder="Ask about your document..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          onClick={() => handleAsk(query)}
          disabled={loading}
          className="h-12 w-12 rounded-xl bg-orange-500 flex items-center justify-center text-white disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ChatSection;
