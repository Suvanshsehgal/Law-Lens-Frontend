function KeywordsSection({ meanings }) {
  if (!meanings || Object.keys(meanings).length === 0) return null;

  return (
    <div className="mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📌 Key Legal Terms</h2>

      <ul className="space-y-3">
        {Object.entries(meanings).map(([keyword, meaning], i) => (
          <li key={i} className="border p-3 rounded">
            <p className="font-medium">{keyword}</p>
            <p className="text-sm text-gray-600 mt-1">
              {meaning}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordsSection;
