import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Scale,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import CaseLawPopUp from "./CaseLawPopUp";

function CaseLawSection({ caseLaws }) {
  if (!caseLaws || Object.keys(caseLaws).length === 0) return null;

  const entries = Object.entries(caseLaws);
  const triple = [...entries, ...entries, ...entries];

  const trackRef = useRef(null);
  const [index, setIndex] = useState(entries.length);
  const [showModal, setShowModal] = useState(false);

  const CARD_WIDTH = 380;
  const GAP = 24;
  const STEP = CARD_WIDTH + GAP;

  useEffect(() => {
    const track = trackRef.current;
    gsap.set(track, { x: -index * STEP });
  }, []);

  const slide = (dir) => {
    const track = trackRef.current;
    let nextIndex = dir === "right" ? index + 1 : index - 1;

    gsap.to(track, {
      x: -nextIndex * STEP,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        if (nextIndex >= entries.length * 2) {
          nextIndex = entries.length;
          gsap.set(track, { x: -nextIndex * STEP });
        }

        if (nextIndex < entries.length) {
          nextIndex = entries.length * 2 - 1;
          gsap.set(track, { x: -nextIndex * STEP });
        }

        setIndex(nextIndex);
      }
    });
  };

  return (
    <div className="mt-8 bg-[#FBF7EE] p-8 rounded-2xl relative">
      
      {/* HEADER + ARROWS SAME ROW */}
      <div className="flex justify-between items-center mb-6">

        {/* LEFT TEXT */}
        <div>
          <p className="subtext text-sm font-semibold tracking-wider text-gray-500">
            RELATED
          </p>

          <h2 className="heading text-3xl font-semibold">
            Case Precedents
          </h2>
        </div>

        {/* RIGHT ARROWS */}
        <div className="flex items-center gap-4">

          {/* LEFT BUTTON */}
          <button
            onClick={() => slide("left")}
            className="
              w-12 h-12 rounded-2xl
              border border-gray-300 
              bg-white 
              flex items-center justify-center
              shadow
              hover:border-amber-400
              hover:shadow-lg
              transition-all duration-300
            "
          >
            <ChevronLeft className="text-gray-700" size={22} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => slide("right")}
            className="
              w-12 h-12 
              rounded-2xl
              bg-amber-400 
              border-2 border-amber-400
              flex items-center justify-center
              shadow
              hover:bg-amber-500
              hover:border-amber-500
              hover:shadow-lg
              transition-all duration-300
            "
          >
            <ChevronRight className="text-white" size={22} />
          </button>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="overflow-hidden w-full relative" style={{ height: "350px" }}>
        <div ref={trackRef} className="flex gap-6 w-max">

          {triple.map(([keyword, law], idx) => (
            <div
              key={keyword + idx}
              className="
                group
                bg-white rounded-2xl p-6 
                shadow-sm border border-gray-200 
                hover:border-amber-400 hover:shadow-lg
                transition-all duration-300 ease-out
                flex flex-col
              "
              style={{
                width: CARD_WIDTH,
                minWidth: CARD_WIDTH
              }}
            >
              {/* META */}
              <div className="heading flex items-center text-sm text-gray-500 mb-1">
                <p className="capitalize">{law.case_category} Law</p>
              </div>

              {/* ICON + TITLE */}
              <div className="flex items-center gap-4 mt-2">
                <div
                  className="
                    bg-gray-100 p-3 rounded-xl
                    transition-all duration-300
                    group-hover:bg-amber-100
                  "
                >
                  <Scale
                    size={26}
                    className="
                      text-gray-700
                      group-hover:text-amber-500
                      transition-all duration-300
                    "
                  />
                </div>

                <h3
                  className="heading
                    font-semibold text-lg leading-snug
                    transition-colors duration-300
                    group-hover:text-amber-600
                  "
                >
                  {law.ipc_section}
                </h3>
              </div>

              {/* SUMMARY */}
              <p className="subtext mt-3 text-gray-700 leading-relaxed text-sm">
                {law.summary}
              </p>

              <div className="flex-grow" />

              {/* VIEW JUDGMENT */}
              {law.kanoon_link && (
                <a
                  href={law.kanoon_link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-4
                    text-sm text-amber-600 font-medium
                    flex items-center justify-between
                  "
                >
                  <span>View judgment</span>
                  <ArrowRight size={18} />
                </a>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* VIEW ALL CASES - BOTTOM RIGHT WITH SCALE EFFECT */}
      <button
        onClick={() => setShowModal(true)}
        className="subtext
          text-amber-600 
          text-base font-semibold
          flex items-center gap-1
          absolute bottom-6 right-8
          transition-all duration-300
          hover:scale-x-105
        "
      >
        View all cases <ArrowRight size={16} />
      </button>

      {/* POPUP */}
      <CaseLawPopUp
        open={showModal}
        onClose={() => setShowModal(false)}
        caseLaws={caseLaws}
      />
    </div>
  );
}

export default CaseLawSection;
