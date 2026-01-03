function CaseLawSection({ caseLaws }) {
  if (!caseLaws || Object.keys(caseLaws).length === 0) return null;

  return (
    <div className="mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">⚖️ Relevant Case Laws</h2>

      {Object.entries(caseLaws).map(([keyword, cases]) => (
        <div key={keyword} className="mb-6">
          <h3 className="font-medium text-lg mb-2">{keyword}</h3>

          <ul className="space-y-2">
            {cases.map((c, idx) => (
              <li key={idx} className="border p-3 rounded">
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-gray-600">
                  {c.court} • {c.year}
                </p>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    View Case
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CaseLawSection;
