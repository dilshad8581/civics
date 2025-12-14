import { Link, useNavigate } from "react-router-dom";
import {
  Camera,
  MapPin,
  Bell,
  Vote,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Play,
  ChevronRight,
  Star,
  LogOut,
  BarChart3,
  Eye,
} from "lucide-react";
import landingcity from "../assets/landing-city.jpg";
import reportedMap from "../assets/reportedissues-map.jpeg.jpg";
import community1 from "../assets/community-gallery-1.jpeg.jpg";
import community2 from "../assets/community-gallery-2.jpeg.jpg";
import issueFixed from "../assets/issue-fix-photo.png";
import community from "../assets/Community-photo.jpg";
import logo from "../assets/logo-leaf.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const features = [
    { icon: Camera, title: "Photo Reports", description: "Capture and upload issue photos", color: "from-blue-500 to-indigo-600" },
    { icon: MapPin, title: "Location Tracking", description: "Precise GPS location tagging", color: "from-red-500 to-rose-600" },
    { icon: Bell, title: "Real-time Updates", description: "Instant status notifications", color: "from-amber-500 to-orange-600" },
    { icon: Vote, title: "Community Voting", description: "Prioritize important issues", color: "from-purple-500 to-violet-600" },
    { icon: AlertTriangle, title: "Emergency Issues", description: "Flag urgent problems", color: "from-red-600 to-pink-600" },
    { icon: TrendingUp, title: "Progress Tracking", description: "Monitor resolution status", color: "from-green-500 to-emerald-600" },
    { icon: ShieldCheck, title: "Verified Updates", description: "Official confirmations", color: "from-teal-500 to-cyan-600" },
    { icon: Users, title: "Community Action", description: "Collaborate with neighbors", color: "from-indigo-500 to-blue-600" },
  ];

  const stats = [
    { value: "15K+", label: "Issues Reported", icon: TrendingUp },
    { value: "8.2K+", label: "Issues Resolved", icon: CheckCircle },
    { value: "5K+", label: "Active Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-200/40 to-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-300/30 rounded-full blur-3xl"></div>
      </div>

      {/* HEADER */}
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
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {isLoggedIn ? (
              <>
                {/* Profile Button - Always visible when logged in */}
                <Link to="/profile" className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full pl-1 pr-3 py-1 shadow-sm hover:shadow-md transition-all">
                  <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
                    {getInitials(user?.name)}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-gray-700">{user?.name || "User"}</span>
                </Link>
                {/* Logout Button */}
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

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src={landingcity} alt="City" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 lg:pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6 border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Making communities cleaner together</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Making Our Cities{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                Cleaner
              </span>
              , One Report at a Time
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Report local issues like garbage dumps, potholes, water leakage, and broken streetlights.
              Track progress and make a real difference in your neighborhood.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/signup"
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all transform hover:-translate-y-1 btn-press"
              >
                Start Reporting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <stat.icon className="w-6 h-6 text-green-300 mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs md:text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* MAP + GALLERY SECTION */}
      <section className="relative py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Community Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              See What's Happening in Your Area
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track reported issues on our interactive map and see how communities are coming together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Card */}
            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl overflow-hidden border border-white/50 card-hover animate-fade-in-left">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Reported Issues Map</h3>
                    <p className="text-sm text-gray-500">Live tracking of community reports</p>
                  </div>
                </div>
              </div>
              <div className="h-[400px] md:h-[500px]">
                <img src={reportedMap} className="w-full h-full object-cover" alt="Issues Map" />
              </div>
            </div>

            {/* Gallery Card */}
            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl overflow-hidden border border-white/50 card-hover animate-fade-in-right">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Community Gallery</h3>
                    <p className="text-sm text-gray-500">Before & after transformations</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <img src={community1} className="rounded-2xl shadow-md w-full h-[200px] object-cover hover:scale-[1.02] transition-transform" alt="Community Cleanup" />
                <img src={community2} className="rounded-2xl shadow-md w-full h-[200px] object-cover hover:scale-[1.02] transition-transform" alt="Community Volunteers" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ISSUE FIXED SHOWCASE */}
      <section className="relative py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <img src={issueFixed} className="w-full object-cover" alt="Issue Fixed" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <CheckCircle className="w-4 h-4" />
                Success Story
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Community-Driven Change in Action
              </h3>
              <p className="text-white/80 max-w-xl">
                See how citizen reports led to real improvements in neighborhoods across the city
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features for Better Communities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to report, track, and resolve issues efficiently
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all card-hover border border-white/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMAGE */}
      <section className="relative py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
            <img src={community} className="w-full object-cover max-h-[500px]" alt="Community" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-8 md:p-16">
              <div className="max-w-lg">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Join a Growing Community of Active Citizens
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Engage with local authorities",
                    "Support community initiatives",
                    "Volunteer and make impact",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all btn-press"
                >
                  Join the Community
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-8 md:p-16 text-center overflow-hidden shadow-2xl animate-fade-in-up">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
                <span className="text-sm font-medium">Join 5,000+ active citizens</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto">
                Join thousands of citizens working together to create cleaner, safer communities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all btn-press"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gray-900 text-white py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} className="w-10" alt="logo" />
                <span className="text-xl font-bold">CleanStreet</span>
              </div>
              <p className="text-gray-400 text-sm">
                Making communities cleaner, one report at a time.
              </p>
            </div>

            {/* Links */}
            {[
              { title: "Product", links: ["Features", "How it Works", "Pricing", "FAQ"] },
              { title: "Support", links: ["Help Center", "Contact", "Community", "Status"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies", "License"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 CleanStreet. All rights reserved.</p>
            <div className="flex gap-4">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
