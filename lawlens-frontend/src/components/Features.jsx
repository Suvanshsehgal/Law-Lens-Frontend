import React from 'react'
import { Brain, Search, Scale, Bot, ShieldCheck, Flashlight } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      desc: "Advanced machine learning algorithms extract key legal terms, clauses, and implications from your documents instantly.",
    },
    {
      icon: Search,
      title: "Smart Keyword Extraction",
      desc: "Automatically identify and define complex legal terminology with contextual meanings tailored to your document.",
    },
    {
      icon: Scale,
      title: "Case Law Discovery",
      desc: "Find relevant precedents and related cases that could impact your legal strategy or understanding.",
    },
    {
      icon: Bot,
      title: "Legal RAG Chatbot",
      desc: "Ask questions about your document and receive accurate, context-aware answers powered by retrieval-augmented generation.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Confidential",
      desc: "Enterprise-grade security ensures your sensitive legal documents remain protected and private.",
    },
    {
      icon: Flashlight,
      title: "Instant Highlights",
      desc: "Download annotated PDFs with key sections highlighted for quick reference and review.",
    },
  ];

  return (
    <>
      <section className="w-full py-16 bg-[#f6f7fb]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Badge */}
          <div className="w-full flex justify-center mb-4">
            <span className="px-5 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium playfair">
              Powerful Capabilities
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-center playfair">
            Everything You Need for{" "}
            <span className="text-amber-500">Legal Analysis</span>
          </h2>

          {/* Subtitle */}
          <p className="inter text-center text-gray-500 mt-4 max-w-3xl mx-auto text-sm">
            LawLens combines cutting-edge AI with legal expertise to provide
            comprehensive document analysis tools.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 hover:border-amber-500 rounded-2xl p-6 shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300"
                >

                  {/* Icon + Title in One Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center">
                      <Icon size={28} strokeWidth={2.2} />
                    </div>

                    <h3 className="text-xl font-semibold playfair">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="inter text-gray-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
