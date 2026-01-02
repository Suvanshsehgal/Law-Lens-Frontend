import React from 'react'
import { Upload, Brain, MessageSquare, Download } from "lucide-react";
function Working() {
    const steps = [
        {
            id: 1,
            icon: Upload,
            title: "Upload",
            desc: "Drop your legal documents",
        },
        {
            id: 2,
            icon: Brain,
            title: "Analyze",
            desc: "AI extracts key insights",
        },
        {
            id: 3,
            icon: MessageSquare,
            title: "Explore",
            desc: "Chat and discover context",
        },
        {
            id: 4,
            icon: Download,
            title: "Export",
            desc: "Download your report",
        },
    ];
    return (
        <>
            <section className="w-full py-12 bg-[#f6f7fb]">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 playfair">
                        How LawLens <span className="text-amber-500">Works</span>
                    </h2>


                    {/* CIRCLES + LINE */}
                    <div className="relative flex items-center justify-between mb-10">

                        {/* line centered perfectly */}
                        <div className="absolute left-0 right-0 h-[2px] bg-gray-300 top-1/2 -translate-y-1/2" />

                        {steps.map(step => {
                            const Icon = step.icon;
                            return (
                                <div key={step.id} className="relative z-10 flex flex-col items-center w-1/4">
                                    <div className="relative w-16 h-16 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                                        <Icon size={28} className="text-gray-700" />

                                        {/* step number */}
                                        <span className="absolute -top-2 -right-2 bg-amber-400 text-white text-sm font-semibold w-7 h-7 rounded-full flex items-center justify-center">
                                            {step.id}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* TITLES + DESCRIPTIONS */}
                    <div className="grid grid-cols-4 text-center">
                        {steps.map(step => (
                            <div key={step.id}>
                                <h3 className="text-lg font-semibold playfair">{step.title}</h3>
                                <p className="text-gray-500 text-sm inter mt-1">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Working