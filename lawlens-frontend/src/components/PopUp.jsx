import { useState } from "react";
import { Upload, FileText, Check, X } from "lucide-react";

function PopUp({ onClose, onFileSelect }) {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const uploaded = e.target.files[0]; 
    if (!uploaded) return;
    setFile(uploaded);
  };

  const handleAnalyze = () => {
    if (!file) return;
    onFileSelect(file);   
    onClose();            
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-[500px] p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 heading">
            Upload Legal Document
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl w-6 h-6 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Upload Box */}
        <label className="w-full h-48 rounded flex flex-col items-center justify-center cursor-pointer transition hover:border-gray-400 bg-gray-200">
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFile}
            accept=".pdf,.docx,.doc"
          />

          <div className="text-center">
            {file ? (
              
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FileText size={48} className="text-red-500" />
                </div>
                <p className="text-lg font-medium text-gray-700 truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              // Show upload instructions when no file is selected
              <>
                {/* Upload Icon */}
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Upload size={40} className="text-gray-400" />
                </div>

                {/* Text */}
                <p className="subtext text-b font-medium text-gray-700 mb-1">
                  Drop your document here
                </p>
                <p className="subtext text-gray-500 text-sm">
                  or click to browse (PDF, DOCX)
                </p>

                {/* File Status */}
                <div className="mt-4">
                  <div className="subtext inline-block px-3 py-1 bg-gray-800 text-white rounded text-sm ">
                    No file chosen
                  </div>
                </div>
              </>
            )}
          </div>
        </label>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="subtext flex-1 px-4 py-3 rounded border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!file}
            onClick={handleAnalyze}
            className={` subtext flex-1 px-4 py-3 rounded text-white font-medium flex items-center justify-center gap-2 transition-colors
              ${file
                ? "bg-slate-600 hover:bg-slate-700"
                : "bg-gray-400 cursor-not-allowed"}`}
          >
            <Check size={16} />
            Analyze Document
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
