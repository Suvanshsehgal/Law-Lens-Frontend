import React, { useState } from "react";
import logo from "../assets/Logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-0 w-full z-50
        bg-white/5
        backdrop-blur-md
        border-b border-white/10
        text-white
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="LawLens Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-2xl heading font-bold tracking-wide">
              Law
            </span>
            <span className=" text-2xl heading font-bold tracking-wide -translate-x-3 text9-amber">
              Lens
            </span>

    
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">

            <div className="flex items-center space-x-8">
              <a
                href="#features"
                className=" heading text-base tracking-wide hover:text-amber-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="heading text-base tracking-wide hover:text-amber-400 transition-colors"
              >
                How It Works
              </a>
            </div>

            <button
              className="
                heading text-base
                px-5 py-2 rounded-md
                bg-amber-500/90 text-slate-900 font-semibold
                transition-all duration-300 ease-out
                hover:bg-amber-400
                hover:shadow-lg hover:shadow-amber-500/30
                hover:scale-x-105
              "
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition"
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="
            md:hidden
            bg-slate-900/90
            backdrop-blur-lg
            border-t border-white/10
          "
        >
          <div className="px-6 py-4 space-y-4">

            <a
              href="#features"
              className="block font-heading text-base tracking-wide hover:text-amber-400"
              onClick={() => setOpen(false)}
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="block font-heading text-base tracking-wide hover:text-amber-400"
              onClick={() => setOpen(false)}
            >
              How It Works
            </a>

            <button
              className="
                w-full
                font-heading text-base
                px-5 py-2 rounded-md
                bg-amber-500/90 text-slate-900 font-semibold
                transition-all duration-300
                hover:bg-amber-400
              "
            >
              Get Started
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
