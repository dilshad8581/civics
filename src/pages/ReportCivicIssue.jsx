import { Upload, MapPin, Camera, AlertCircle, Plus, Eye, BarChart3, LogOut } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useRef } from "react";
import logo from "../assets/logo-leaf.png";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function ReportCivicIssue() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [position, setPosition] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFileClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files).slice(0, 4));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      issueTitle: e.target.issueTitle.value,
      issueType: e.target.issueType.value,
      priorityLevel: e.target.priorityLevel.value,
      address: e.target.address.value,
      landmark: e.target.landmark.value,
      description: e.target.description.value,
      location: position,
      images: selectedFiles.map((file) => URL.createObjectURL(file)),
      submittedAt: new Date().toISOString(),
    };
    const existingReports = JSON.parse(localStorage.getItem("civicReports")) || [];
    existingReports.push(formData);
    localStorage.setItem("civicReports", JSON.stringify(existingReports));
    console.log("Submitted Report:", formData);
    setSuccessMessage("Report submitted successfully!");
    e.target.reset();
    setSelectedFiles([]);
    setPosition(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/20 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src={logo} className="w-10 md:w-11 transition-transform group-hover:scale-110" alt="logo" />
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">CleanStreet</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-white/50 rounded-full p-1 shadow-sm">
            {[
              { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
              { to: "/report-issue", label: "Report Issue", icon: Plus, active: true },
              { to: "/complaints", label: "View Complaints", icon: Eye }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  item.active
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-200"
                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full pl-1 pr-3 py-1 shadow-sm hover:shadow-md transition-all">
                  <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
                    {getInitials(user?.name)}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-gray-700">{user?.name || "User"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg shadow-red-200 transition-all btn-press"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-200 transition-all btn-press"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Report an Issue
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Report a <span className="gradient-text">Civic Issue</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Help us improve your community by reporting local issues
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg shadow-green-200 flex items-center gap-3 animate-fade-in-up">
            <div className="p-2 bg-white/20 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200/80 space-y-8 animate-fade-in-up delay-100">
          {/* Upload Photos */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Upload Photos</h3>
            </div>
            <div
              onClick={handleFileClick}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all group"
            >
              <div className="p-4 bg-gray-100 group-hover:bg-green-100 rounded-2xl inline-block mb-3 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
              <p className="text-gray-700 font-semibold">Click to add photos</p>
              <p className="text-sm text-gray-500 mt-1">
                Upload up to 4 photos showing the issue clearly
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap justify-center">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview ${index}`}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Issue Details */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Issue Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="issueTitle" className="mb-2 font-semibold text-gray-700 text-sm">Issue Title *</label>
                <input
                  id="issueTitle"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50/50 hover:bg-white"
                  placeholder="Ex: Large Garbage Dump"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="issueType" className="mb-2 font-semibold text-gray-700 text-sm">Issue Type *</label>
                <select
                  id="issueType"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50/50 hover:bg-white cursor-pointer"
                  required
                >
                  <option value="">Select Issue Type</option>
                  <option>Garbage</option>
                  <option>Road Damage</option>
                  <option>Water Leakage</option>
                  <option>Streetlight Issue</option>
                  <option>Drainage Problem</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="priorityLevel" className="mb-2 font-semibold text-gray-700 text-sm">Priority Level *</label>
                <select
                  id="priorityLevel"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50/50 hover:bg-white cursor-pointer"
                  required
                >
                  <option value="">Select Priority Level</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="mb-2 font-semibold text-gray-700 text-sm">Address</label>
                <input
                  id="address"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50/50 hover:bg-white"
                  placeholder="Enter Street Address"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="landmark" className="mb-2 font-semibold text-gray-700 text-sm">Nearby Landmark (Optional)</label>
              <input
                id="landmark"
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50/50 hover:bg-white"
                placeholder="Ex: Near City Hall, Behind Shopping Center"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold text-gray-700 text-sm">Description</label>
              <textarea
                id="description"
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-gray-50/50 hover:bg-white resize-none"
                placeholder="Describe the issue in detail - what is the problem, how long has it been there, etc."
              />
            </div>
          </section>

          {/* Map */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Location on Map</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Click on the map to mark the exact location of the issue</p>
            <div className="h-64 sm:h-72 md:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
            {position && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                Location selected: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
              </p>
            )}
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all btn-press"
          >
            Submit Report
          </button>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💡</span>
              <h4 className="font-bold text-gray-800">Tips for better reporting</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Include clear photos from multiple angles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Provide accurate location details and landmarks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Describe the severity and impact of the issue
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                Mention how long the issue has been present
              </li>
            </ul>
          </div>

          <p className="text-sm text-center text-gray-400">
            Your privacy is protected. All reports are reviewed by our moderation team.
          </p>
        </form>
      </main>
    </div>
  );
}

// Map Marker Component
function MapMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position}></Marker> : null;
}
