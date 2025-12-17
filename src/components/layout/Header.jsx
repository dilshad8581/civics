import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, BarChart3, Plus, Eye, Camera, User } from "lucide-react";
import logo from "../../assets/logo-leaf.png";
import Avatar from "../common/Avatar";

const Header = ({
  activeNav = "",
  showNotifications = false,
  onNotificationClick,
  notifications = [],
  showNotificationDropdown = false,
}) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/report-issue", label: "Report Issue", icon: Plus },
    { to: "/complaints", label: "View Complaints", icon: Eye },
  ];

  // Add Profile to nav for profile page
  const navItemsWithProfile = [
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/report-issue", label: "Report Issue", icon: Camera },
    { to: "/complaints", label: "Complaints", icon: Eye },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const currentNavItems = activeNav === "/profile" ? navItemsWithProfile : navItems;

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/20 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img src={logo} className="w-10 md:w-11 transition-transform group-hover:scale-110" alt="logo" />
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold gradient-text">CleanStreet</h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/50 rounded-full p-1 shadow-sm">
          {currentNavItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeNav === item.to
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-200"
                  : "text-gray-600 hover:bg-white hover:shadow-sm"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {isLoggedIn ? (
            <>
              {/* Notification Bell */}
              {showNotifications && (
                <div className="relative">
                  <button
                    onClick={onNotificationClick}
                    className="relative p-2.5 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all group"
                  >
                    <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ring-2 ring-white"></span>
                  </button>

                  {/* Notification Dropdown */}
                  {showNotificationDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-down z-50">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-3 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${notif.unread ? 'bg-green-50/50' : ''}`}
                          >
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
              )}

              {/* Profile Link */}
              <Link to="/profile" className="flex items-center gap-2 bg-white/80 hover:bg-white rounded-full pl-1 pr-3 py-1 shadow-sm hover:shadow-md transition-all">
                <Avatar name={user?.name} size="md" />
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
  );
};

export default Header;
