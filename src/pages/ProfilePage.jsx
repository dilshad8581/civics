
import React, { useState, useEffect } from "react";
import { Camera, Mail, Phone, User, MapPin, Shield, Lock, Clock } from "lucide-react";

export default function ProfilePage() {
  const [username, setUsername] = useState("demouser");
  const [email, setEmail] = useState("demo@cleanstreet.com");
  const [fullname, setFullname] = useState("Demo User");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("San Francisco, CA");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // BACKEND CONNECT 
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUsername(data.username);
      setEmail(data.email);
      setFullname(data.name);
      setPhone(data.phone);
      setLocation(data.location || "");
    };

    fetchProfile();
  }, []);

  const handleSave = () => {
    alert("Changes saved successfully!");
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

  return (
    <div className="min-h-screen bg-[#E9F4FF]">
      {/* TOP NAVBAR */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🍃</span>
          <h1 className="text-3xl font-bold text-black">CleanStreet</h1>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-gray-700 font-medium">
          <a href="/dashboard" className="hover:text-[#0077b6]">Dashboard</a>
          <a href="/report-issue" className="hover:text-[#0077b6]">Report Issue</a>
          <a href="/complaints" className="hover:text-[#0077b6]">View Complaints</a>
          <a href="/profile" className="text-[#0077b6] font-semibold underline">Profile</a>
        </nav>

        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90">
          Logout
        </button>
      </header>

      {/* PAGE CONTENT */}
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Edit Profile</h1>
        <p className="text-gray-600 mb-6">Manage your account information and preferences</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- LEFT COLUMN --- */}
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-teal-500 text-white rounded-full flex items-center justify-center text-3xl font-semibold">
                    DU
                  </div>
                  <Camera className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow w-7 h-7" />
                </div>

                <h2 className="mt-4 text-xl font-semibold">Demo User</h2>
                <p className="text-gray-500">@demouser</p>

                <div className="grid grid-cols-3 gap-4 mt-4 text-center w-full">
                  <div>
                    <p className="text-xl font-bold">12</p>
                    <p className="text-gray-500 text-sm">Reports</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">8</p>
                    <p className="text-gray-500 text-sm">Resolved</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">24</p>
                    <p className="text-gray-500 text-sm">Votes</p>
                  </div>
                </div>

                <textarea
                  className="w-full mt-6 border rounded-md p-2 h-32"
                  placeholder="Tell us about yourself..."
                />

                <p className="text-xs text-gray-500 mt-2">Member since December 2024</p>
              </div>
            </div>
          </div>

          {/* --- MIDDLE COLUMN --- */}
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6 text-gray-700" /> Account Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" /> Username
                  </label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" /> Email
                  </label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm">Full Name</label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-400" /> Phone
                  </label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" /> Location
                  </label>
                  <input
                    className="w-full border rounded-md p-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  className="bg-teal-500 text-white px-4 py-2 rounded-md hover:opacity-90 mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* PRIVACY SETTINGS */}
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" /> Privacy Settings
              </h2>

              {["Show my reports publicly", "Email notifications", "Show my voting activity"].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <p>{item}</p>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={idx !== 2} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-500 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-all"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" /> Recent Activity
              </h2>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <p>Reports this month</p>
                  <span className="text-teal-600 font-bold">3</span>
                </div>

                <div className="flex justify-between">
                  <p>Comments posted</p>
                  <span className="text-purple-600 font-bold">15</span>
                </div>

                <div className="flex justify-between">
                  <p>Votes cast</p>
                  <span className="text-blue-600 font-bold">8</span>
                </div>
              </div>
            </div>

            {/* SECURITY SETTINGS */}
            <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-600" /> Security Settings
              </h2>

              <div>
                <label className="text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full border p-2 rounded-md"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border p-2 rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border p-2 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}

              <button
                onClick={handleChangePassword}
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-2"
              >
                Change Password
              </button>

              <p className="text-gray-500 text-sm">
                Password must include uppercase, lowercase, number, symbol & 8+ characters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
