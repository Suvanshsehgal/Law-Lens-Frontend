import React from "react";
import { Sparkles } from "lucide-react";

function AnalysisComp() {
  return (
    <div className="w-full py-2 md:py-4">
      <div className="max-w-5xl mx-auto text-center px-4">

        {/* Tag */}
        <div className="subtext inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles size={18} />
          <span>Analysis Complete</span>
        </div>

        {/* Heading */}
        <h1 className="heading font-display text-5xl md:text-6xl font-bold leading-tight text-gray-900">
          Your Document,
          <span className="heading text-amber-500"> Decoded</span>
        </h1>

        {/* Subtext */}
        <p className="subtext font-body text-gray-600 text-b mt-4 leading-relaxed">
          AI-powered legal insights extracted and analyzed in seconds.
          Understand every clause, term, and obligation.
        </p>

      </div>
    </div>
  );
}

export default AnalysisComp;
