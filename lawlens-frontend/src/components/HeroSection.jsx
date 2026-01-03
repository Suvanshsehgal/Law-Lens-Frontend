import React, { useRef } from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";

function HeroSection({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className="h-screen relative z-10 w-full overflow-hidden bg-[#222E46] flex flex-col items-center justify-center rounded-lg">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Boxes />
      </div>

      <div className="absolute inset-0 w-full h-full bg-slate-900 z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Badge */}
      <div className="relative z-30 mb-1">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
          <span className="text-amber-400 mr-2">⚖️</span>
          <span className="text-amber-100 text-base font-medium">
            AI-Powered Legal Document Analysis
          </span>
        </div>
      </div>

      {/* Heading */}
      <h1 className="relative z-30 md:text-7xl text-5xl font-bold text-white text-center max-w-4xl leading-tight playfair">
        Unlock Legal Insights <br />
        with <span className="text-amber-400">Law Lens</span>
      </h1>

      {/* Description */}
      <p className="relative z-30 mt-6 inter text-center text-neutral-300 max-w-2xl text-xl">
        Upload any legal document and instantly extract key terms, chat with an AI
        assistant, and discover related case law.
      </p>

      {/* CTA */}
      <div className="relative z-30 mt-8">
        <button
          onClick={handleClick}
          className="playfair inline-flex items-center px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-xl transition-all duration-300 hover:scale-105"
        >
          Upload Your Document
        </button>

        {/* Hidden file input */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default HeroSection;
