import React from "react";
import logo from "../assets/Logo.png";

function Navbar() {
  return (
    <nav className="
      fixed top-0 w-full z-50
      bg-white/3    
      backdrop-blur-md
      border-b border-white/3
      text-white
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo + Brand */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="LawLens Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-xl font-playfair font-bold tracking-wide">
              LawLens
            </span>
          </div>

          {/* Right: Navigation + CTA */}
          <div className="hidden md:flex items-center space-x-10">

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a
                href="#features"
                className="
                  font-playfair
                  text-sm
                  tracking-wide
                  transition-colors duration-300
                  hover:text-amber-400
                "
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="
                  font-playfair
                  text-sm
                  tracking-wide
                  transition-colors duration-300
                  hover:text-amber-400
                "
              >
                How It Works
              </a>
            </div>

            {/* Combined Auth Button */}
            <button
              className="
                font-playfair
                text-sm
                px-5 py-2
                rounded-md
                bg-amber-500/90
                text-slate-900
                font-semibold
                transition-all duration-300 ease-out
                hover:bg-amber-400
                hover:shadow-lg
                hover:shadow-amber-500/30
                hover:scale-x-105
                origin-center
              "
            >
              Get Started
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
