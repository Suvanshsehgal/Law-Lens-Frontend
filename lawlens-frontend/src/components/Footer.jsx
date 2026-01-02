import React from "react";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#0f1b34] to-[#1b294d] mt-6 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
            <img src={logo} alt="LawLens Logo" className="w-full h-full object-contain" />
          </div>

          <span className="text-white text-lg font-bold">
            Law<span className="text-amber-400">Lens</span>
          </span>
        </div>

        {/* Center - Copyright */}
        <p className="text-gray-300 text-sm text-center">
          © 2026 LawLens. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
