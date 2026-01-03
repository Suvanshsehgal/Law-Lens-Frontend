import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Footer from "./components/Footer.jsx";
import Upload from "./components/Upload.jsx";

import KeywordsSection from "./components/KeywordsSection.jsx";
import CaseLawSection from "./components/CaseLawSection.jsx";
import ChatSection from "./components/ChatSection.jsx";
import DownloadPDF from "./components/DownloadPDF.jsx";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [docResult, setDocResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <HeroSection onFileSelect={setSelectedFile} />

      {/* BACKEND PROCESSING */}
      {selectedFile && (
        <Upload
          file={selectedFile}
          setDocResult={setDocResult}
          setLoading={setLoading}
          setError={setError}
        />
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center mt-10 text-lg text-gray-700">
          ⏳ Processing your document...
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="text-center mt-10 text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* AI RESPONSE SECTIONS */}
      {docResult && !loading && (
        <div className="max-w-6xl mx-auto px-4">

          {/* KEYWORD MEANINGS */}
          <KeywordsSection meanings={docResult?.keyword_meanings} />

          {/* CASE LAWS */}
          <CaseLawSection caseLaws={docResult?.case_laws} />

          {/* DOWNLOAD HIGHLIGHTED PDF */}
          <DownloadPDF sessionId={docResult?.session_id} />

          {/* CHAT */}
          <ChatSection sessionId={docResult?.session_id} />
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
