
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import ViewComplaintsPage from "./pages/ViewComplaintsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportCivicIssue from  "./pages/ReportCivicIssue";


function App() {
  return (
    <Router>
      <Routes>
        {/* Show Landing Page first */}
        <Route path="/" element={<LandingPage />} />  

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<SignupPage />} /> 
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/report-issue" element={<ReportCivicIssue/>}></Route>
        <Route path="/complaints" element={<ViewComplaintsPage />} />
      </Routes>
    </Router>
  );
}

export default App;



