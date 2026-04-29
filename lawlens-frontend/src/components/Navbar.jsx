import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Navigate to home and scroll to section
  const goToSection = (id) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/", {
        state: { scrollTo: id },
      });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    setOpen(false);
    navigate("/");
  };

  return (
    <nav
      className="
       fixed top-0 w-full z-50
    bg-[#1E293B]/95
    backdrop-blur-md
    border-b border-white/10
    text-white
    transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img
              src={logo}
              alt="LawLens Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-2xl heading font-bold tracking-wide">
              Law
            </span>
            <span className="text-2xl heading font-bold tracking-wide -translate-x-3 text-amber-400">
              Lens
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => goToSection("features")}
                className="heading text-base tracking-wide hover:text-amber-400 transition-colors"
              >
                Features
              </button>

              <button
                onClick={() => goToSection("how-it-works")}
                className="heading text-base tracking-wide hover:text-amber-400 transition-colors"
              >
                How It Works
              </button>
            </div>

            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="
                    heading text-base
                    px-5 py-2 rounded-md
                    bg-amber-500/90 text-slate-900 font-semibold
                    transition-all duration-300 ease-out
                    hover:bg-amber-400
                    hover:shadow-lg hover:shadow-amber-500/30
                    flex items-center gap-2
                  "
                >
                  Hi, {user.name}
                  <span className="text-xs">▼</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 transition"
          >
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
        <div className="md:hidden bg-slate-900/90 backdrop-blur-lg border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => goToSection("features")}
              className="block w-full text-left heading text-base hover:text-amber-400"
            >
              Features
            </button>

            <button
              onClick={() => goToSection("how-it-works")}
              className="block w-full text-left heading text-base hover:text-amber-400"
            >
              How It Works
            </button>

            {user ? (
              <div className="space-y-2">
                <div className="heading text-base text-amber-400 px-5 py-2">
                  Hi, {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    heading text-base
                    px-5 py-2 rounded-md
                    bg-red-500/90 text-white font-semibold
                    hover:bg-red-600
                  "
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="
                  w-full
                  heading text-base
                  px-5 py-2 rounded-md
                  bg-amber-500/90 text-slate-900 font-semibold
                  hover:bg-amber-400
                "
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
