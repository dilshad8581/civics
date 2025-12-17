import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, AtSign, Mail, Phone, Lock, Users, Eye, EyeOff, ArrowRight, CheckCircle, Shield } from "lucide-react";

// Components
import Toast from "../components/Toast";
import { AuthLayout, AuthFormCard, SocialLogin } from "../components/features/auth";

// Assets
import bgImage from "../assets/bg-signin.jpg";

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
    <>
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <AuthLayout
        backgroundImage={bgImage}
        badge="Join 5,000+ active citizens"
        title={
          <>
            Be Part of the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              Solution
            </span>
          </>
        }
        subtitle="Report issues, track progress, and help build a cleaner, safer community together. Your voice matters!"
        benefits={benefits}
      >
        <AuthFormCard
          badge="Create an Account"
          badgeIcon={Shield}
          title="Join CleanStreet"
          subtitle="Start reporting issues and make a difference in your community"
        >
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

          {/* Social Login */}
          <SocialLogin action="Sign up" />

          {/* Login Link */}
          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign In
            </Link>
          </p>
        </AuthFormCard>
      </AuthLayout>
    </>
  );
};

export default SignupPage;
