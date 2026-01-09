import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../lib/api";
import Navbar from "../components/Navbar";
import logo from "../assets/Logo.png";
import { Boxes } from "../components/ui/background-boxes";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      setSuccess("Login successful");

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
        })
      );

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <Boxes />
        </div>

        {/* MASK */}
        <div
          className="absolute inset-0 z-10 bg-slate-900
          [mask-image:radial-gradient(transparent,white)]
          pointer-events-none"
        />

        {/* CONTENT */}
        <div className="relative z-30 min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="w-full max-w-5xl">

            {/* MAIN CARD */}
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl -translate-y-8">

              {/* LEFT PANEL (DESKTOP ONLY) */}
              <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white">
                <div className="flex items-center gap-3 mb-8">
                  <img src={logo} alt="LawLens" className="w-12 h-12" />
                  <span className="heading text-2xl font-bold tracking-wide">
                    Law<span className="text-amber-400">Lens</span>
                  </span>
                </div>

                <h2 className="heading text-4xl font-semibold leading-snug mb-4">
                  Secure access to{" "}
                  <span className="text-amber-300">legal intelligence</span>
                </h2>

                <p className="subtext text-slate-300 text-lg leading-relaxed max-w-md">
                  Analyze legal documents with AI-powered precision, privacy,
                  and confidence.
                </p>
              </div>

              {/* RIGHT PANEL */}
              <div className="bg-white p-8 sm:p-10 md:p-12">

                {/* MOBILE LOGO (BLUE SQUARE) */}
                <div className="md:hidden flex justify-center mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-amber-300 bg-amber-50 ">
                    <img src={logo} alt="LawLens" className="w-8 h-8" />
                    <span className="heading text-lg font-bold tracking-wide">
                      Law<span className="text-amber-400">Lens</span>
                    </span>
                  </div>
                </div>

                <h3 className="heading text-3xl font-semibold mb-2 text-slate-800">
                  Welcome back
                </h3>

                <p className="subtext text-slate-500 mb-8">
                  Sign in to continue to your dashboard
                </p>

                {error && (
                  <div className="mb-4 text-red-700 bg-red-100 border px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 text-green-700 bg-green-100 border px-4 py-3 rounded-lg">
                    {success}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-400 hover:bg-amber-500 py-3 rounded-lg font-semibold text-slate-900 transition"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                <p className="subtext text-sm text-center mt-8 text-slate-600">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="text-amber-500 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
