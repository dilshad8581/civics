import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Clock,
  TrendingUp,
  CheckCircle,
  Plus,
  Eye,
  MapPin,
  Users,
  Award,
  Flame,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import logo from "../assets/logo-leaf.png";

export default function DashboardPage() {
  const [username, setUsername] = useState("Demo User");

  // Stats data
  const stats = {
    totalIssues: 12,
    pending: 4,
    inProgress: 3,
    resolved: 5,
  };

  // Recent activity data
  const recentActivity = [
    { id: 1, title: "Pothole on Main Street resolved", time: "2 hours ago", type: "resolved" },
    { id: 2, title: "New streetlight issue reported", time: "4 hours ago", type: "reported" },
    { id: 3, title: "Garbage dump complaint updated", time: "6 hours ago", type: "updated" },
    { id: 4, title: "Water leakage issue in progress", time: "1 day ago", type: "progress" },
  ];

  // My reports data
  const myReports = [
    {
      id: 1,
      title: "Large pothole causing traffic delays",
      location: "Main Street & Oak Avenue",
      date: "2 days ago",
      status: "Resolved",
      votes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: "Broken streetlight in residential area",
      location: "Pine Street & 2nd Avenue",
      date: "1 day ago",
      status: "In Progress",
      votes: 12,
      comments: 3,
    },
    {
      id: 3,
      title: "Illegal garbage dump behind shopping center",
      location: "Westfield Shopping Center",
      date: "3 days ago",
      status: "Pending",
      votes: 32,
      comments: 12,
    },
  ];

  // Trending issues data
  const trendingIssues = [
    { id: 1, title: "Street flooding near Downtown", location: "Downtown District", votes: 156 },
    { id: 2, title: "Multiple potholes on Highway 5", location: "Highway 5", votes: 142 },
    { id: 3, title: "Broken traffic lights at Main & 5th", location: "Main & 5th Ave", votes: 128 },
    { id: 4, title: "Park bench vandalism", location: "Central Park", votes: 89 },
  ];

  // Top contributors data
  const topContributors = [
    { id: 1, name: "Sarah Johnson", reports: 28, points: 450 },
    { id: 2, name: "Michael Chen", reports: 22, points: 380 },
    { id: 3, name: "Emily Davis", reports: 19, points: 320 },
  ];

  // Community impact data
  const communityImpact = {
    issuesReported: 15200,
    resolved: 8500,
    activeUsers: 3200,
  };

  // User stats
  const userStats = {
    reports: 12,
    votes: 24,
    points: 36,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "reported":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "updated":
        return <TrendingUp className="w-5 h-5 text-yellow-500" />;
      case "progress":
        return <Clock className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#e3f2fd] to-[#e8f5e9]">
      {/* TOP NAVBAR */}
      <header className="w-full bg-white shadow-sm py-3 px-4 md:px-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 md:w-10" alt="logo" />
          <h1 className="text-xl md:text-2xl font-bold text-black">CleanStreet</h1>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/dashboard" className="text-green-600 font-semibold border-b-2 border-green-600 pb-1">
            Dashboard
          </Link>
          <Link to="/report-issue" className="hover:text-green-600">Report Issue</Link>
          <Link to="/complaints" className="hover:text-green-600">View Complaints</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="text-xl">🔔</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              DU
            </div>
            <span className="hidden sm:block text-sm font-medium">Demo User</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back, {username}! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening in your community today</p>
          </div>
          <Link
            to="/report-issue"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Report New Issue
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.totalIssues}</p>
              <p className="text-gray-500 text-sm">Total Issues</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.pending}</p>
              <p className="text-gray-500 text-sm">Pending</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.inProgress}</p>
              <p className="text-gray-500 text-sm">In Progress</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.resolved}</p>
              <p className="text-gray-500 text-sm">Resolved</p>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                <Link to="/activity" className="text-green-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Reports */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">My Reports</h2>
                <Link to="/my-reports" className="text-green-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {myReports.map((report) => (
                  <div key={report.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-gray-800 pr-2">{report.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location}</span>
                      <span className="mx-1">•</span>
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {report.votes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {report.comments}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/report-issue"
                  className="flex items-center gap-3 w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Report New Issue</span>
                </Link>
                <Link
                  to="/complaints"
                  className="flex items-center gap-3 w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">View All Complaints</span>
                </Link>
                <Link
                  to="/map"
                  className="flex items-center gap-3 w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Issue Map</span>
                </Link>
              </div>
            </div>

            {/* Community Impact */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Community Impact</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Issues Reported</span>
                    <span className="font-semibold text-gray-800">
                      {communityImpact.issuesReported.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Resolved</span>
                    <span className="font-semibold text-gray-800">
                      {communityImpact.resolved.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "56%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-semibold text-gray-800">
                      {communityImpact.activeUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "21%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mb-3">
                  DU
                </div>
                <h3 className="font-semibold text-gray-800">Demo User</h3>
                <p className="text-sm text-gray-500 mb-4">@demouser</p>
                <div className="grid grid-cols-3 gap-4 w-full mb-4">
                  <div>
                    <p className="text-xl font-bold text-gray-800">{userStats.reports}</p>
                    <p className="text-xs text-gray-500">Reports</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">{userStats.votes}</p>
                    <p className="text-xs text-gray-500">Votes</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">{userStats.points}</p>
                    <p className="text-xs text-gray-500">Points</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="text-green-600 text-sm font-medium hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Trending Issues */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-800">Trending Issues</h2>
              </div>
              <div className="space-y-4">
                {trendingIssues.map((issue, index) => (
                  <div key={issue.id} className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-gray-400"
                          : index === 2
                          ? "bg-amber-600"
                          : "bg-gray-300"
                      }`}
                    >
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{issue.title}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{issue.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <ThumbsUp className="w-4 h-4" />
                      {issue.votes}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-800">Top Contributors</h2>
              </div>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={contributor.id} className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                          ? "bg-gray-400"
                          : "bg-amber-600"
                      }`}
                    >
                      {contributor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{contributor.name}</p>
                      <p className="text-xs text-gray-500">{contributor.reports} reports</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{contributor.points}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
