import { useState, useEffect } from "react";

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
import Preloader from "./components/Preloader.jsx";

import { useLocation, useNavigate } from "react-router-dom";


function App() {
  const location = useLocation();
  const navigate = useNavigate();

useEffect(() => {
  if (location.state?.scrollTo) {
    const el = document.getElementById(location.state.scrollTo);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}, [location]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [docResult, setDocResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  // Handle upload button click
  const handleUploadClick = () => {
    if (!isLoggedIn()) {
      setShowLoginPrompt(true);
    } else {
      setShowUploadModal(true);
    }
  };

  return (
    <>
      <Navbar />
      <Preloader show={loading} />
      {/* HERO SECTION */}
      <HeroSection onUploadClick={handleUploadClick} />

      {/* LOGIN PROMPT MODAL */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLoginPrompt(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-[400px] p-6">
            <h2 className="text-2xl font-bold text-gray-800 heading mb-4">
              Login Required
            </h2>
            <p className="text-gray-600 subtext mb-6">
              Please login to upload and analyze documents.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 px-4 py-3 rounded border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex-1 px-4 py-3 rounded bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL */}
      {showUploadModal && (
        <PopUp
          onClose={() => setShowUploadModal(false)}
          onFileSelect={(file) => {
            // Clear previous results when selecting a new file
            setDocResult(null);
            setError(null);
            setSelectedFile(file);
          }}
        />
      )}

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
        <div className="max-w-7xl mx-auto px-4 mt-12 space-y-10 animate-fadeIn">

          <AnalysisComp />
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

      <section id="features">
        <Features />
      </section>

      <section id="how-it-works">
        <Working />
      </section>
      <Footer />
    </>
  );
}

export default App;
