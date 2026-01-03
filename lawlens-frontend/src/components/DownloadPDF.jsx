function DownloadPDF({ sessionId }) {
  if (!sessionId) return null;

  const handleDownload = () => {
    const base = import.meta.env.VITE_AI_API_URL || "http://127.0.0.1:8000";
    const url = `${base}/pdf/download/highlighted/${sessionId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-10 text-center">
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500"
      >
        📥 Download Highlighted PDF
      </button>
    </div>
  );
}

export default DownloadPDF;
