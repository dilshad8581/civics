import { useState, useEffect, Profiler } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  Plus,
  Eye,
  MapPin,
  Award,
  Flame,
  MessageSquare,
  ThumbsUp,
  Bell,
  LogOut,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  Activity,
  Sparkles,
  Target,
  Zap,
  Star,
  ChevronRight,
  BarChart3,
  Users,
} from "lucide-react";
import logo from "../assets/logo-leaf.png";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showNotifications, setShowNotifications] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    totalIssues: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [progressWidths, setProgressWidths] = useState({
    reported: 0,
    resolved: 0,
    users: 0,
  });

  // Fetch user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          // Update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          // If API fails, fallback to localStorage
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // No valid user data, redirect to login
            navigate("/login");
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to localStorage on network error
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }

      setTimeout(() => setIsLoading(false), 800);
    };

    fetchUserData();
  }, [navigate]);

  // Animated counter effect
  useEffect(() => {
    if (isLoading) return;

    const targetStats = { totalIssues: 12, pending: 4, inProgress: 3, resolved: 5 };
    const duration = 1500;
    const steps = 30;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = easeOutQuart(step / steps);
      setAnimatedStats({
        totalIssues: Math.round(targetStats.totalIssues * progress),
        pending: Math.round(targetStats.pending * progress),
        inProgress: Math.round(targetStats.inProgress * progress),
        resolved: Math.round(targetStats.resolved * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    // Animate progress bars
    setTimeout(() => {
      setProgressWidths({ reported: 100, resolved: 56, users: 21 });
    }, 500);

    return () => clearInterval(timer);
  }, [isLoading]);

  // Easing function for smoother animation
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const notifications = [
    { id: 1, text: "Your report was resolved", time: "2m ago", unread: true },
    { id: 2, text: "New comment on your issue", time: "1h ago", unread: true },
    { id: 3, text: "Weekly summary available", time: "2h ago", unread: false },
  ];

  const recentActivity = [
    { id: 1, title: "Pothole on Main Street resolved", time: "2 hours ago", type: "resolved" },
    { id: 2, title: "New streetlight issue reported", time: "4 hours ago", type: "reported" },
    { id: 3, title: "Garbage dump complaint updated", time: "6 hours ago", type: "updated" },
    { id: 4, title: "Water leakage issue in progress", time: "1 day ago", type: "progress" },
  ];

  const myReports = [
    { id: 1, title: "Large pothole causing traffic delays", location: "Main Street & Oak Avenue", date: "2 days ago", status: "Resolved", votes: 24, comments: 8, priority: "high", image: "🕳️" },
    { id: 2, title: "Broken streetlight in residential area", location: "Pine Street & 2nd Avenue", date: "1 day ago", status: "In Progress", votes: 12, comments: 3, priority: "medium", image: "💡" },
    { id: 3, title: "Illegal garbage dump behind shopping center", location: "Westfield Shopping Center", date: "3 days ago", status: "Pending", votes: 32, comments: 12, priority: "high", image: "🗑️" },
  ];

  const trendingIssues = [
    { id: 1, title: "Street flooding near Downtown", location: "Downtown District", votes: 156, trend: "+12%", hot: true },
    { id: 2, title: "Multiple potholes on Highway 5", location: "Highway 5", votes: 142, trend: "+8%", hot: true },
    { id: 3, title: "Broken traffic lights at Main & 5th", location: "Main & 5th Ave", votes: 128, trend: "+5%", hot: false },
    { id: 4, title: "Park bench vandalism", location: "Central Park", votes: 89, trend: "+3%", hot: false },
  ];

  const topContributors = [
    { id: 1, name: "Sarah Johnson", reports: 28, points: 450, avatar: "SJ", badge: "gold", level: "Champion" },
    { id: 2, name: "Michael Chen", reports: 22, points: 380, avatar: "MC", badge: "silver", level: "Expert" },
    { id: 3, name: "Emily Davis", reports: 19, points: 320, avatar: "ED", badge: "bronze", level: "Rising Star" },
  ];

  const communityImpact = { issuesReported: 15200, resolved: 8500, activeUsers: 3200 };
  const userStats = { reports: 12, votes: 24, points: 36 };

  const getStatusStyles = (status) => {
    const styles = {
      "Resolved": "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-200",
      "In Progress": "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-amber-200",
      "Pending": "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-orange-200",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getPriorityIndicator = (priority) => {
    const indicators = {
      high: "border-l-4 border-l-red-500 bg-red-50/50",
      medium: "border-l-4 border-l-amber-500 bg-amber-50/50",
      low: "border-l-4 border-l-green-500 bg-green-50/50",
    };
    return indicators[priority] || "";
  };

  const getActivityIcon = (type) => {
    const icons = {
      resolved: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      reported: <FileText className="w-5 h-5 text-blue-500" />,
      updated: <RefreshCw className="w-5 h-5 text-amber-500" />,
      progress: <Clock className="w-5 h-5 text-purple-500" />,
    };
    return icons[type] || <Activity className="w-5 h-5 text-gray-500" />;
  };

  const getBadgeStyles = (badge) => {
    const styles = {
      gold: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-lg shadow-yellow-200",
      silver: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 shadow-lg shadow-gray-200",
      bronze: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 shadow-lg shadow-amber-200",
    };
    return styles[badge] || "bg-gray-400";
  };

  const displayName = user?.name || "User";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-green-300 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-cyan-50/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* TOP NAVBAR */}
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
              { to: "/dashboard", label: "Dashboard", icon: BarChart3, active: true },
              { to: "/report-issue", label: "Report Issue", icon: Plus },
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
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all group"
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ring-2 ring-white"></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-down z-50">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${notif.unread ? 'bg-green-50/50' : ''}`}>
                        <p className="text-sm text-gray-800">{notif.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/notifications" className="block p-3 text-center text-sm text-green-600 hover:bg-gray-50 font-medium">
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Profile */}
            <Link to="/profile" className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full pl-1 pr-3 py-1 shadow-sm hover:shadow-md transition-all">
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
                {getInitials(displayName)}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">{displayName}</span>
            </Link>

            {/* Logout */}
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
      <div className="relative px-4 md:px-6 py-4 md:py-5 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fade-in-up">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                {getGreeting()}, <span className="gradient-text">{displayName}</span>!
              </h1>
              <span className="text-3xl animate-bounce-subtle">👋</span>
            </div>
            <p className="text-gray-500 flex items-center gap-2 text-sm md:text-base">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link
            to="/report-issue"
            className="group flex items-center gap-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-6 py-3.5 rounded-2xl hover:shadow-xl hover:shadow-green-200 transition-all transform hover:-translate-y-1 btn-press animate-gradient"
            style={{ backgroundSize: '200% 200%' }}
          >
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-semibold">Report New Issue</span>
            <Sparkles className="w-4 h-4 opacity-70" />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            { label: "Total Issues", value: animatedStats.totalIssues, icon: FileText, gradient: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", iconBg: "bg-blue-500", delay: "delay-100" },
            { label: "Pending", value: animatedStats.pending, icon: Clock, gradient: "from-orange-500 to-amber-600", bgColor: "bg-orange-50", iconBg: "bg-orange-500", delay: "delay-200" },
            { label: "In Progress", value: animatedStats.inProgress, icon: TrendingUp, gradient: "from-purple-500 to-violet-600", bgColor: "bg-purple-50", iconBg: "bg-purple-500", delay: "delay-300" },
            { label: "Resolved", value: animatedStats.resolved, icon: CheckCircle, gradient: "from-emerald-500 to-green-600", bgColor: "bg-emerald-50", iconBg: "bg-emerald-500", delay: "delay-400" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden ${stat.bgColor} rounded-3xl p-5 md:p-6 card-hover border border-gray-200/80 shadow-sm animate-fade-in-up ${stat.delay}`}
            >
              {/* Decorative gradient blur */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.gradient} rounded-full opacity-20 blur-2xl`}></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium bg-emerald-100 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12%</span>
                  </div>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-200">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  Recent Activity
                </h2>
                <Link to="/activity" className="flex items-center gap-1 text-emerald-600 text-sm font-semibold hover:text-emerald-700 group">
                  View All
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-emerald-50/50 transition-all cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2.5 rounded-xl bg-gray-100 group-hover:bg-white group-hover:shadow-md transition-all">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-emerald-700 transition-colors">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* My Reports */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-300">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  My Reports
                </h2>
                <Link to="/my-reports" className="flex items-center gap-1 text-emerald-600 text-sm font-semibold hover:text-emerald-700 group">
                  View All
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {["all", "pending", "progress", "resolved"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {myReports.map((report, index) => (
                  <div
                    key={report.id}
                    className={`p-4 rounded-2xl transition-all cursor-pointer hover:shadow-md ${getPriorityIndicator(report.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{report.image}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-2">{report.title}</h3>
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${getStatusStyles(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{report.location}</span>
                          <span className="text-gray-300">•</span>
                          <span>{report.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-600 transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span className="font-semibold">{report.votes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span className="font-semibold">{report.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-300">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/report-issue"
                  className="flex items-center gap-4 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-4 rounded-2xl hover:shadow-lg hover:shadow-green-200 transition-all group btn-press"
                >
                  <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-base">Report New Issue</span>
                    <p className="text-white/70 text-xs">Help improve your community</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>

                <Link to="/complaints" className="flex items-center gap-4 w-full bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-2xl hover:shadow-md transition-all group border border-gray-100">
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-800">View All Complaints</span>
                    <p className="text-gray-500 text-xs">Browse community issues</p>
                  </div>
                </Link>

                <Link to="/map" className="flex items-center gap-4 w-full bg-gradient-to-r from-gray-50 to-red-50 p-4 rounded-2xl hover:shadow-md transition-all group border border-gray-100">
                  <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                    <MapPin className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-gray-800">Issue Map</span>
                    <p className="text-gray-500 text-xs">Explore nearby reports</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Community Impact */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-xl p-6 text-white animate-fade-in-up delay-400">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

              <div className="relative">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Target className="w-5 h-5" />
                  </div>
                  Community Impact
                </h2>
                <div className="space-y-5">
                  {[
                    { label: "Issues Reported", value: communityImpact.issuesReported, width: progressWidths.reported, color: "bg-white" },
                    { label: "Resolved", value: communityImpact.resolved, width: progressWidths.resolved, color: "bg-emerald-300" },
                    { label: "Active Users", value: communityImpact.activeUsers, width: progressWidths.users, color: "bg-teal-300" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80 font-medium">{item.label}</span>
                        <span className="font-bold">{item.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.width}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-white/70" />
                      <span className="text-sm text-white/70">Join the movement</span>
                    </div>
                    <span className="text-2xl font-bold">#CleanStreet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-500">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-3xl object-cover shadow-xl shadow-green-200 transform hover:rotate-3 transition-transform"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 text-white rounded-3xl flex items-center justify-center text-3xl font-bold shadow-xl shadow-green-200 transform hover:rotate-3 transition-transform">
                      {getInitials(displayName)}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                    <Star className="w-3 h-3 text-white" fill="white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-xl">{displayName}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-4">@{user?.username || "user"} • Level 5</p>

                <div className="grid grid-cols-3 gap-3 w-full mb-5 p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
                  {[
                    { label: "Reports", value: userStats.reports, icon: FileText, color: "text-blue-600" },
                    { label: "Votes", value: userStats.votes, icon: ThumbsUp, color: "text-emerald-600" },
                    { label: "Points", value: userStats.points, icon: Star, color: "text-amber-600" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="flex justify-center mb-1">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/profile"
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-green-200 transition-all btn-press"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Trending Issues */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Trending Issues</h2>
                <span className="ml-auto text-xs font-semibold text-orange-500 bg-orange-100 px-2 py-1 rounded-full animate-pulse">LIVE</span>
              </div>
              <div className="space-y-3">
                {trendingIssues.map((issue, index) => (
                  <div
                    key={issue.id}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all cursor-pointer group"
                  >
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-lg ${
                      index === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-500" :
                      index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                      index === 2 ? "bg-gradient-to-br from-amber-500 to-orange-600" :
                      "bg-gray-300"
                    }`}>
                      #{index + 1}
                      {issue.hot && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <Flame className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors truncate">{issue.title}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <ThumbsUp className="w-4 h-4" />
                        {issue.votes}
                      </div>
                      <span className="text-xs text-emerald-500 font-semibold">{issue.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-200/80 animate-fade-in-up delay-500">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Top Contributors</h2>
              </div>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 transition-all cursor-pointer group"
                  >
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${getBadgeStyles(contributor.badge)}`}>
                        {contributor.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-sm">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{contributor.name}</p>
                      <p className="text-xs text-gray-500">{contributor.reports} reports • {contributor.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-emerald-600">{contributor.points}</p>
                      <p className="text-xs text-gray-400">points</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/leaderboard" className="flex items-center justify-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                  View Full Leaderboard
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
