
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/bg-signin.jpg";
import logo from "../assets/logo-leaf.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed ❌");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful 🎉");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Server error ❌ Try again later.");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Layer */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-[#004625]/75" />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-stretch">

        {/* LEFT SIDE (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1">
          <div className="flex flex-col px-6 lg:px-10 xl:px-7 py-6 text-white w-full">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="CleanStreet logo" className="h-14 w-14 rounded-full object-contain p-1" />
              <div className="leading-tight">
                <p className="text-3xl font-semibold tracking-tight">CleanStreet</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                  Smart Civic Engagement
                </p>
              </div>
            </div>

            {/* Headline */}
            <div className="max-w-xl mt-20 xl:mt-32">
              <h1
                className="text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Welcome Back to Your <span className="block">Community</span>
              </h1>
              <p className="mt-4 text-sm xl:text-[15px] text-emerald-100 max-w-md">
                Continue making your neighborhood a better place. Track your reports and see the impact you're creating.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 xl:mt-14 flex gap-16 xl:gap-32 text-sm">
              <div>
                <p className="text-3xl font-semibold">15K+</p>
                <p className="text-emerald-100 text-sm mt-1">Issues Reported</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">8.2K+</p>
                <p className="text-emerald-100 text-sm mt-1">Issues Resolved</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">5K+</p>
                <p className="text-emerald-100 text-sm mt-1">Active Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex w-full lg:w-[420px] xl:w-[540px] flex-col items-center justify-center px-4 py-7">

          <div className="w-full max-w-sm sm:max-w-md rounded-[32px] bg-white shadow-2xl border border-blue-500/70 px-6 py-6 md:px-9 md:py-7">

            {/* Badge */}
            <div className="mb-3">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-medium text-emerald-700">
                ✓ Secure Civic Portal
              </span>
            </div>

            {/* Title */}
            <div className="mb-5 text-left">
              <h2 className="text-2xl font-semibold text-slate-900">Welcome!</h2>
              <p className="mt-1 text-sm text-slate-500">
                Sign in to continue reporting and tracking community issues
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="text-slate-400 mr-2 text-lg">@</span>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="text-slate-400 mr-2 text-lg">🔒</span>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-xs mt-1">
                <label className="inline-flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  <span>Remember me</span>
                </label>
                <button className="font-medium text-emerald-600 hover:text-emerald-700">Forgot Password?</button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition"
              >
                Sign In →
              </button>
            </form>

            {/* Signup Link */}
            <p className="mt-5 text-center text-xs text-slate-500">
              New to CleanStreet?{" "}
              <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] sm:text-[13px] text-emerald-100 text-center z-20 w-full px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mb-2 w-full">
            <button className="hover:text-white text-xs sm:text-sm">About</button>
            <button className="hover:text-white text-xs sm:text-sm">How it Works</button>
            <button className="hover:text-white text-xs sm:text-sm">Privacy</button>
            <button className="hover:text-white text-xs sm:text-sm">Contact</button>
          </div>

          <p className="text-[11px] sm:text-[13px] text-emerald-200">
            © 2025 CleanStreet. Making communities cleaner, one report at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
