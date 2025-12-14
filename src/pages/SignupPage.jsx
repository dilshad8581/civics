import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, AtSign, Mail, Phone, Lock, Users, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, Shield } from "lucide-react";
import bgImage from "../assets/bg-signin.jpg";
import logo from "../assets/logo-leaf.png";
import Toast from "../components/Toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      showToast("Please agree to the Terms of Service and Privacy Policy", "warning");
      return;
    }

    setIsLoading(true);
    setError("");

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
        setError(data.error || "Signup failed. Please try again.");
        showToast(data.error || "Signup failed. Please try again.", "error");
        setIsLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Show success toast before navigating
      showToast("Account created successfully! Redirecting to login...", "success");

      // Navigate after a brief delay to show the toast
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      showToast("Something went wrong. Please try again later.", "error");
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: CheckCircle, text: "Report issues in your neighborhood" },
    { icon: CheckCircle, text: "Track progress in real-time" },
    { icon: CheckCircle, text: "Connect with local authorities" },
    { icon: CheckCircle, text: "Earn points for contributions" },
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

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-green-800/85 to-teal-900/90" />
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-stretch">
        {/* LEFT SIDE (Hidden on small screens) */}
        <div className="hidden lg:flex flex-1 animate-fade-in-left">
          <div className="flex flex-col px-8 lg:px-12 xl:px-16 py-8 text-white w-full justify-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group mb-12">
              <div className="relative">
                <img src={logo} alt="CleanStreet logo" className="h-14 w-14 rounded-full object-contain p-1 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="leading-tight">
                <p className="text-3xl font-bold tracking-tight">CleanStreet</p>
                <p className="text-xs uppercase tracking-widest text-emerald-300">Smart Civic Engagement</p>
              </div>
            </Link>

            {/* Heading */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Join 5,000+ active citizens</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Be Part of the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                  Solution
                </span>
              </h1>

              <p className="text-lg text-emerald-100/90 max-w-md leading-relaxed mb-10">
                Report issues, track progress, and help build a cleaner, safer community together. Your voice matters!
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-emerald-100">
                    <div className="w-8 h-8 bg-emerald-500/30 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-emerald-300" />
                    </div>
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE SIGNUP FORM */}
        <div className="flex w-full lg:w-[500px] xl:w-[560px] justify-center items-center px-4 py-8 animate-fade-in-right">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">CleanStreet</span>
            </div>

            {/* Form Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50">
              {/* Badge */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  <Shield className="w-4 h-4" />
                  Create an Account
                </span>
              </div>

              {/* Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Join CleanStreet</h2>
                <p className="mt-2 text-gray-500 text-sm">
                  Start reporting issues and make a difference in your community
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm animate-fade-in-down">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Username</label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="johndoe"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Role Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Phone (optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="+91 xxxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Role</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option>User</option>
                        <option>Volunteer</option>
                        <option>Admin</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I agree to CleanStreet's{" "}
                    <button type="button" className="font-semibold text-emerald-600 hover:text-emerald-700">Terms of Service</button>{" "}
                    and{" "}
                    <button type="button" className="font-semibold text-emerald-600 hover:text-emerald-700">Privacy Policy</button>.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all btn-press disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Signup */}
              <button className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              {/* Login Link */}
              <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4">
          <p className="text-xs text-emerald-300/70">
            © 2025 CleanStreet. Making communities cleaner, one report at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
