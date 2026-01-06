import { ArrowRight, X, Scale } from "lucide-react";

export default function CaseLawPopUp({ open, onClose, caseLaws }) {
  if (!open) return null;

  const entries = Object.entries(caseLaws);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 md:w-3/4 max-h-[85vh] overflow-y-auto p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="heading text-xl font-semibold">All Case Laws</h3>

          <button
            onClick={onClose}
            className="text-red-500 font-semibold flex items-center gap-1"
          >
             <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map(([keyword, law], i) => (
            <div
              key={keyword + i}
              className="
                group
                bg-white 
                border border-gray-200 
                rounded-2xl 
                p-5 
                shadow-sm
                hover:border-amber-400 
                hover:shadow-lg
                transition-all duration-300 ease-out
                flex flex-col
              "
            >
              {/* ICON + TITLE */}
              <div className="flex items-center gap-4">
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

                <div>
                  <p className="heading text-sm text-gray-500 capitalize">
                    {law.case_category} Law
                  </p>

                  <h3
                    className=" heading
                      font-semibold mt-1
                      transition-colors duration-300
                      group-hover:text-amber-600
                    "
                  >
                    {law.ipc_section}
                  </h3>
                </div>
              </div>

              {/* SUMMARY */}
              <p className="subtext text-gray-700 mt-3 leading-relaxed">
                {law.summary}
              </p>

              {/* PUSH BUTTON TO BOTTOM */}
              <div className="flex-grow" />

              {/* VIEW JUDGMENT */}
              {law.kanoon_link && (
                <a
                  href={law.kanoon_link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-4 subtext 
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
    </div>
  );
}
