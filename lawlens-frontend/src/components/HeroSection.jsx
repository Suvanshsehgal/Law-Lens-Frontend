import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";

function HeroSection() {
  return (
    <>
      <div className="h-screen relative z-10 w-full overflow-hidden bg-[#222E46] flex flex-col items-center justify-center rounded-lg">

        {/* Background Layer */}
        <div className="absolute inset-0 -z-10">
          <Boxes />
        </div>

        {/* Light Mask */}
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        {/* Badge */}
        <div className="relative z-30 mb-1 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm">
            <span className="text-amber-400 mr-2">⚖️</span>
            <span className="text-amber-100 text-base font-medium">
              AI-Powered Legal Document Analysis
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="relative z-30 flex justify-center">
          <h1
            className={cn(
              "md:text-7xl text-5xl font-bold text-white text-center max-w-4xl leading-tight playfair"
            )}
          >
            Unlock Legal Insights
            <br />
            with <span className="text-amber-400">Law Lens</span>
          </h1>
        </div>

        {/* Description */}
        <div className="relative z-30 mt-6 flex justify-center">
          <p className="inter text-center text-neutral-300 max-w-2xl text-xl leading-relaxed">
            Upload any legal document and instantly extract key terms, chat with an AI
            assistant, and discover related case law — all in one powerful platform.
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative z-30 mt-8 flex justify-center">
          <button className="playfair inline-flex items-center px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30">
            Upload Your Document
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
