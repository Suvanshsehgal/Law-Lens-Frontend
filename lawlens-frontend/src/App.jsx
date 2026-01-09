import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Features from "./components/Features.jsx";
import Working from "./components/Working.jsx";
import Footer from "./components/Footer.jsx";
import Upload from "./components/Upload.jsx";
import AnalysisComp from "./components/AnalysisComp.jsx";

import KeywordsSection from "./components/KeywordsSection.jsx";
import CaseLawSection from "./components/CaseLawSection.jsx";
import ChatSection from "./components/ChatSection.jsx";
import DownloadPDF from "./components/DownloadPDF.jsx";

import PopUp from "./components/PopUp.jsx";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [docResult, setDocResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <HeroSection onUploadClick={() => setShowUploadModal(true)} />

      {/* POPUP MODAL */}
      {showUploadModal && (
        <PopUp
          onClose={() => setShowUploadModal(false)}
          onFileSelect={setSelectedFile}
        />
      )}

      {/* BACKEND PROCESSING */}
      {selectedFile && (
        <Upload
          file={selectedFile}
          setDocResult={setDocResult}
          setLoading={setLoading}
          setError={setError}
          onClose={() => setShowUploadModal(false)}
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
        <div className="max-w-7xl mx-auto px-4 mt-12 space-y-10">

          <AnalysisComp
          
          
          
          
          
          />
          {/* KEYWORDS + CHAT (SAME GRID) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <KeywordsSection meanings={docResult?.keyword_meanings} />
            <ChatSection sessionId={docResult?.session_id} />
          </div>

          <DownloadPDF sessionId={docResult?.session_id} />
          {/* CASE LAWS */}
          <CaseLawSection caseLaws={docResult?.case_laws} />

          {/* DOWNLOAD PDF */}
        </div>
      )}

      <Features />
      <Working />
      <Footer />
    </>
  );
}

export default App;
