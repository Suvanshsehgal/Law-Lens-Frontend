import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  Highlighter,
  AlignLeft,
  AlertTriangle,
  Download,
} from "lucide-react";

function DownloadPDF({ sessionId, fileName }) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!sessionId) return null;

  const handleDownload = async () => {
    const startTime = Date.now(); // ⏱ start timer
    setIsDownloading(true);

    try {
      const base =
        import.meta.env.VITE_AI_API_URL || "http://127.0.0.1:8000";
      const url = `${base}/pdf/download/highlighted/${sessionId}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || "annotated-document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
    } finally {
      // ⏱ ensure minimum 1 second animation
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(1000 - elapsed, 0);

      setTimeout(() => {
        setIsDownloading(false);
      }, remaining);
    }
  };

  return (
    <div className="w-full bg-[#FBF7EE] py-10 rounded-xl mt-10 flex flex-col lg:flex-row justify-between gap-10 px-6 lg:px-12">
      {/* LEFT */}
      <div>
        <p className="heading text-sm font-semibold tracking-wide text-gray-500">
          DOWNLOAD
        </p>

        <h1 className="heading text-4xl font-bold mt-1">
          Annotated PDF
        </h1>

        <p className="subtext text-gray-600 mt-3 max-w-xl leading-relaxed">
          Get your document with all important terms highlighted, risk
          areas marked, and detailed annotations for easy reference.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Highlighter className="text-yellow-600" />
            <p className="text-gray-700 subtext text-sm">
              Highlighted key terms and definitions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AlignLeft className="text-yellow-600" />
            <p className="subtext text-gray-700 text-sm">
              Margin annotations with explanations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-600" />
            <p className="text-gray-700 subtext text-sm">
              Risk indicators and warnings
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-3 rounded-xl">
            <FileText className="text-yellow-700" />
          </div>

          <div>
            <p className="font-semibold text-gray-800 subtext">
              {fileName || "document.pdf"}
            </p>
          </div>
        </div>

        <div className="bg-green-100 px-4 py-3 rounded-xl flex items-center gap-2 mt-5">
          <CheckCircle2 className="text-green-600" />
          <span className="subtext text-green-700">
            Ready for download
          </span>
        </div>

        {/* 🔥 Animated Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`
            mt-6 w-full bg-[#0B0F19] hover:bg-gray-900
            text-white py-3 rounded-xl font-medium
            flex items-center justify-center gap-2
            transition-all duration-300 ease-out
            active:scale-95
            ${isDownloading ? "opacity-80 scale-95" : ""}
          `}
        >
          <Download className="w-5 h-5" />
          {isDownloading ? "Downloading..." : "Download Annotated PDF"}
        </button>
      </div>
    </div>
  );
}

export default DownloadPDF;
  