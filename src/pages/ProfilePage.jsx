import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Camera,
  Mail,
  Phone,
  User,
  MapPin,
  Shield,
  Lock,
  Clock,
  Bell,
  LogOut,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  Award,
  FileText,
  ThumbsUp,
  Settings,
  ChevronRight,
  BarChart3,
  Star,
  Loader2,
} from "lucide-react";
import logo from "../assets/logo-leaf.png";

// ImageKit configuration
const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState("demouser");
  const [email, setEmail] = useState("demo@cleanstreet.com");
  const [fullname, setFullname] = useState("Demo User");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("San Francisco, CA");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [privacySettings, setPrivacySettings] = useState({
    showReports: true,
    emailNotifications: true,
    showVoting: false,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data) {
          setUsername(data.username || "demouser");
          setEmail(data.email || "demo@cleanstreet.com");
          setFullname(data.name || "Demo User");
          setPhone(data.phone || "+1 (555) 123-4567");
          setLocation(data.location || "San Francisco, CA");
          setBio(data.bio || "");
          setImageUrl(data.imageUrl || "");
        }
      } catch (error) {
        console.log("Using default values");
      }
      setTimeout(() => setIsLoading(false), 500);
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: fullname,
          username,
          phone,
          location,
          bio,
          imageUrl,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    setIsSaving(false);
  };

  // Handle image upload to ImageKit
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Get authentication parameters from backend
      const authRes = await fetch("http://localhost:5000/api/upload/auth");
      const authData = await authRes.json();

      // Create form data for ImageKit upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("publicKey", IMAGEKIT_PUBLIC_KEY);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);
      formData.append("fileName", `profile_${Date.now()}_${file.name}`);
      formData.append("folder", "/profile-images");

      // Upload to ImageKit
      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadData.url) {
        setImageUrl(uploadData.url);
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    }

    setIsUploading(false);
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/.{8,}/.test(password)) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("number");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) errors.push("symbol");
    return errors;
  };

  const handleChangePassword = () => {
    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
      setPasswordError("Password must contain: " + errors.join(", "));
      setPasswordSuccess("");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New Password and Confirm Password do not match!");
      setPasswordSuccess("");
      return;
    }
    setPasswordError("");
    setPasswordSuccess("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const userStats = { reports: 12, resolved: 8, votes: 24, points: 156 };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/20 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src={logo} className="w-10 md:w-11 transition-transform group-hover:scale-110" alt="logo" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">CleanStreet</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-white/50 rounded-full p-1 shadow-sm">
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link to="/report-issue" className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all">
              <Camera className="w-4 h-4" />
              Report Issue
            </Link>
            <Link to="/complaints" className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-gray-600 hover:bg-white hover:shadow-sm transition-all">
              <Eye className="w-4 h-4" />
              Complaints
            </Link>
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-200">
              <User className="w-4 h-4" />
              Profile
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Notification Bell */}
            <button className="relative p-2.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ring-2 ring-white"></span>
            </button>

            {/* Profile Button */}
            <Link to="/profile" className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full pl-1 pr-3 py-1 shadow-sm hover:shadow-md transition-all">
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
                {getInitials(fullname)}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">{fullname}</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg shadow-red-200 transition-all btn-press"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">
        {/* Page Header */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Settings className="w-6 h-6 text-white" />
            </div>
            Edit Profile
          </h1>
          <p className="text-gray-500 mt-2 ml-14">Manage your account information and preferences</p>
        </div>

        {/* Success Toast */}
        {saveSuccess && (
          <div className="fixed top-24 right-4 z-50 animate-fade-in-left">
            <div className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Changes saved successfully!</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Profile Card */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up">
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-28 h-28 rounded-3xl object-cover shadow-xl shadow-green-200"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 text-white rounded-3xl flex items-center justify-center text-4xl font-bold shadow-xl shadow-green-200">
                      {getInitials(fullname)}
                    </div>
                  )}
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {/* Upload button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                    ) : (
                      <Camera className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                    <Star className="w-4 h-4 text-white" fill="white" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800">{fullname}</h2>
                <p className="text-emerald-600 font-medium">@{username}</p>
                <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  <Award className="w-3 h-3" />
                  Level 5 Contributor
                </span>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 w-full mt-6 p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                  {[
                    { label: "Reports", value: userStats.reports, icon: FileText, color: "text-blue-600" },
                    { label: "Resolved", value: userStats.resolved, icon: CheckCircle, color: "text-green-600" },
                    { label: "Votes", value: userStats.votes, icon: ThumbsUp, color: "text-purple-600" },
                    { label: "Points", value: userStats.points, icon: Star, color: "text-amber-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2">
                      <div className="flex justify-center mb-1">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="w-full mt-6">
                  <label className="text-sm font-medium text-gray-700 block text-left mb-2">Bio</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none text-sm"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Member since December 2024
                </p>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="space-y-6">
            {/* Account Information */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <User className="w-5 h-5 text-white" />
                </div>
                Account Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Username
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Phone
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Location
                  </label>
                  <input
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all btn-press mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-200">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Privacy Settings
              </h2>

              <div className="space-y-4">
                {[
                  { key: "showReports", label: "Show my reports publicly", description: "Others can see your submitted reports" },
                  { key: "emailNotifications", label: "Email notifications", description: "Receive updates via email" },
                  { key: "showVoting", label: "Show my voting activity", description: "Display your votes on issues" },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-800">{setting.label}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={privacySettings[setting.key]}
                        onChange={() => setPrivacySettings({ ...privacySettings, [setting.key]: !privacySettings[setting.key] })}
                      />
                      <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500 transition-all"></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Recent Activity
              </h2>

              <div className="space-y-3">
                {[
                  { label: "Reports this month", value: 3, color: "text-emerald-600 bg-emerald-100" },
                  { label: "Comments posted", value: 15, color: "text-purple-600 bg-purple-100" },
                  { label: "Votes cast", value: 8, color: "text-blue-600 bg-blue-100" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">{item.label}</span>
                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/activity"
                className="flex items-center justify-center gap-2 mt-4 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
              >
                View Full Activity
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Security Settings */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-200">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                Security Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full border border-gray-200 rounded-xl p-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full border border-gray-200 rounded-xl p-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {passwordSuccess}
                  </div>
                )}

                <button
                  onClick={handleChangePassword}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-200 transition-all btn-press"
                >
                  <Lock className="w-5 h-5" />
                  Change Password
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Password must include uppercase, lowercase, number, symbol & 8+ characters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
