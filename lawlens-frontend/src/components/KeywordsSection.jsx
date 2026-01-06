import { useState } from "react";
import { ChevronRight, FileText } from "lucide-react";

export default function KeywordsSection({ meanings }) {
  const [openIndex, setOpenIndex] = useState(null);

  // Capitalize each word
  const capitalizeWords = (text) =>
    text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Filter valid keywords
  const entries = Object.entries(meanings || {}).filter(
    ([keyword, meaning]) =>
      meaning &&
      meaning !== "No explanation needed" &&
      keyword.replace(/[_\s]/g, "").length > 2
  );

  if (entries.length === 0) return null;

  return (
    <div className=" bg-[#FBF7F2] p-6 rounded-2xl border border-gray-200 h-full flex flex-col">
      
      {/* ===== Header (Fixed) ===== */}
      <div className="mb-6 flex items-start gap-4 shrink-0">
        <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-orange-100">
          <FileText className="h-9 w-9 text-amber-500" />
        </div>

        <div>
          <p className="heading text-xs tracking-widest text-gray-500 mb-1">
            EXTRACTED
          </p>
          <h2 className="heading text-3xl font-semibold text-gray-900 font-serif">
            Key Legal Terms
          </h2>
          <p className="subtext text-sm text-gray-500 mt-1">
            {entries.length} key terms identified in your document
          </p>
        </div>
      </div>

      {/* ===== Scrollable Keyword List ===== */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3 overflow-y-auto pr-2">
          {entries.map(([keyword, meaning], index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group rounded-xl bg-white border border-gray-300 transition ${
                  isOpen ? "border-orange-400" : ""
                }`}
              >
                {/* Row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <span className="heading font-medium text-gray-900">
                    {capitalizeWords(keyword)}
                  </span>

                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-all duration-300
                      group-hover:translate-x-1 group-hover:text-orange-500
                      ${isOpen ? "rotate-90 text-orange-500" : ""}
                    `}
                  />
                </button>

                {/* Meaning */}
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {meaning}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
