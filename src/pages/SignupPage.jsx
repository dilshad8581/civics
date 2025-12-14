import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/bg-signin.jpg";
import logo from "../assets/logo-leaf.png";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: fullName,
      username: userName,
      email,
      phone,
      password,
      role,
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed ❌");
        return;
      }

      alert("Signup successful 🎉");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Something went wrong, try again later ❌");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-[#004625]/75" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-stretch">

        {/* LEFT SIDE (Hidden on small screens) */}
        <div className="hidden lg:flex flex-1">
          <div className="flex flex-col px-6 lg:px-10 xl:px-7 py-6 text-white w-full">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="CleanStreet logo" className="h-12 w-12 rounded-full object-contain p-1" />
              <div className="leading-tight">
                <p className="text-2xl font-semibold tracking-tight">CleanStreet</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                  Smart Civic Engagement
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="max-w-xl mt-24 xl:mt-40">
              <h1
                className="text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Join Your Community
              </h1>

              <p className="mt-4 text-sm xl:text-[15px] text-emerald-100 max-w-md">
                Be part of the solution. Report issues, track progress, and help build a cleaner, safer community together.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE SIGNUP FORM */}
        <div className="flex w-full lg:w-[430px] xl:w-[520px] justify-center items-center px-4 py-10">

          <div className="w-full max-w-sm sm:max-w-md rounded-[32px] bg-white shadow-2xl border border-blue-500/70 px-6 py-8 md:px-9 md:py-9">

            {/* Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-medium text-emerald-700">
                ✓ Create an Account
              </span>
            </div>

            {/* Title */}
            <div className="mb-6 text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
                Sign Up for CleanStreet
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Start reporting issues and make a difference in your community
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="mr-2 text-lg text-slate-400">👤</span>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Username</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="mr-2 text-lg text-slate-400">@</span>
                  <input
                    type="text"
                    placeholder="Choose a Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="mr-2 text-lg text-slate-400">✉️</span>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Phone Number (optional)</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="mr-2 text-lg text-slate-400">📞</span>
                  <input
                    type="text"
                    placeholder="+91 xxxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="mr-2 text-lg text-slate-400">🔒</span>
                  <input
                    type="password"
                    placeholder="Enter a Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Select Role</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="mr-2 text-lg text-slate-400">👥</span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 w-full bg-transparent text-sm outline-none text-slate-700"
                  >
                    <option>User</option>
                    <option>Volunteer</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300" required />
                <span>
                  I agree to CleanStreet’s{" "}
                  <button className="font-semibold text-emerald-600 hover:text-emerald-700">Terms of Service</button>{" "}
                  and{" "}
                  <button className="font-semibold text-emerald-600 hover:text-emerald-700">Privacy Policy</button>.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition"
              >
                Sign Up →
              </button>

            </form>

            <p className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
                Sign In
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
