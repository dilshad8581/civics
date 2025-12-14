import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Users, TrendingUp, Sparkles } from "lucide-react";
import bgImage from "../assets/bg-signin.jpg";
import logo from "../assets/logo-leaf.png";
import Toast from "../components/Toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const loginData = { email, password };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        showToast(data.error || "Login failed. Please try again.", "error");
        setIsLoading(false);
        return;
      }

      // Store the token
      localStorage.setItem("token", data.token);

      // Fetch complete user data from database
      const profileRes = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
      });

      if (profileRes.ok) {
        const userData = await profileRes.json();
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        // Fallback to login response user data
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Show success toast before navigating
      showToast("Login successful! Redirecting to dashboard...", "success");

      // Navigate after a brief delay to show the toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("Server error. Please try again later.");
      showToast("Server error. Please try again later.", "error");
      setIsLoading(false);
    }
  };

  const stats = [
    { value: "15K+", label: "Issues Reported", icon: TrendingUp },
    { value: "8.2K+", label: "Issues Resolved", icon: CheckCircle },
    { value: "5K+", label: "Active Users", icon: Users },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Background Layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-green-800/85 to-teal-900/90" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-stretch">
        {/* LEFT SIDE (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 animate-fade-in-left">
          <div className="flex flex-col px-8 lg:px-12 xl:px-16 py-8 text-white w-full justify-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group mb-16">
              <div className="relative">
                <img src={logo} alt="CleanStreet logo" className="h-14 w-14 rounded-full object-contain p-1 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="leading-tight">
                <p className="text-3xl font-bold tracking-tight">CleanStreet</p>
                <p className="text-xs uppercase tracking-widest text-emerald-300">Smart Civic Engagement</p>
              </div>
            </Link>

            {/* Headline */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Welcome back to your community</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Continue Making Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                  Neighborhood
                </span>{" "}
                Better
              </h1>

              <p className="text-lg text-emerald-100/90 max-w-md leading-relaxed">
                Track your reports, see the impact you're creating, and connect with fellow citizens working towards cleaner communities.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
                  <stat.icon className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-emerald-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex w-full lg:w-[480px] xl:w-[540px] flex-col items-center justify-center px-4 py-8 animate-fade-in-right">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">CleanStreet</span>
            </div>

            {/* Form Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  <CheckCircle className="w-4 h-4" />
                  Secure Civic Portal
                </span>
              </div>

              {/* Title */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                <p className="mt-2 text-gray-500">
                  Sign in to continue reporting and tracking community issues
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-fade-in-down">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    Forgot Password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Login */}
              <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Signup Link */}
              <p className="mt-6 text-center text-sm text-gray-500">
                New to CleanStreet?{" "}
                <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-2">
            {["About", "How it Works", "Privacy", "Contact"].map((item) => (
              <button key={item} className="text-emerald-200 hover:text-white transition-colors text-sm">
                {item}
              </button>
            ))}
          </div>
          <p className="text-xs text-emerald-300/70">
            © 2025 CleanStreet. Making communities cleaner, one report at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
