function CaseLawSection({ caseLaws }) {
  if (!caseLaws || Object.keys(caseLaws).length === 0) return null;

  return (
    <div className="mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">⚖️ Relevant Case Laws</h2>

      {Object.entries(caseLaws).map(([keyword, law]) => (
        <div
          key={keyword}
          className="mb-6 border rounded p-4 bg-gray-50"
        >
          {/* Keyword */}
          <h3 className="font-semibold text-lg capitalize">
            {keyword}
          </h3>

          {/* Law Section */}
          <p className="mt-1 font-medium text-gray-800">
            {law.ipc_section}
          </p>

          {/* Category */}
          <p className="text-sm text-gray-600">
            Category: {law.case_category}
          </p>

          {/* Summary */}
          <p className="mt-2 text-gray-700">
            {law.summary}
          </p>

          {/* Kanoon Link */}
          {law.kanoon_link && (
            <a
              href={law.kanoon_link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-blue-600 underline text-sm"
            >
              View Related Judgments on Indian Kanoon
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default CaseLawSection;
