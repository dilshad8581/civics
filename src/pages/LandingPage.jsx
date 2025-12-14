
import React from "react";
import { Link } from "react-router-dom";
import landingcity from "../assets/landing-city.jpg";
import reportedMap from "../assets/reportedissues-map.jpeg.jpg";
import community1 from "../assets/community-gallery-1.jpeg.jpg";
import community2 from "../assets/community-gallery-2.jpeg.jpg";
import issueFixed from "../assets/issue-fix-photo.png";
import community from "../assets/Community-photo.jpg";
import logo from "../assets/logo-leaf.png";

const LandingPage = () => {
  return (
    <div className="font-serif w-full overflow-x-hidden">

      {/* HEADER */}
      <header className="flex flex-wrap justify-between items-center px-4 md:px-8 py-4 bg-white shadow w-full">
        <div className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <img src={logo} className="w-10 md:w-12" alt="logo" />
          CleanStreet
        </div>

        <nav className="flex gap-4 md:gap-6 text-gray-700 font-medium mt-2 md:mt-0">
          <a href="#">Dashboard</a>
          <a href="#">Report Issue</a>
          <a href="#">Complaints</a>
          <Link to="/profile">Profile</Link>
        </nav>

        <div className="flex gap-3 md:gap-4 mt-3 md:mt-0">
          <Link
            to="/login"
            className="px-4 py-2 border border-green-600 text-green-700 rounded-md hover:bg-green-100 transition text-sm md:text-base"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition text-sm md:text-base"
          >
            Register
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="
          relative w-full 
          h-[420px]
          sm:h-[520px]
          md:h-[780px]     /* FIX: More height for tablets */
          lg:h-[850px]
          bg-cover bg-center
        "
        style={{ backgroundImage: `url(${landingcity})` }}
      >
        <div
          className="
            absolute inset-0 
            flex justify-center 
            items-start 
            pt-6 
            sm:pt-10 
            md:pt-32  /* FIX: Push card down on medium screens */
            lg:pt-36
            px-3
          "
        >
          <div
            className="
              bg-white bg-opacity-60 backdrop-blur-xl 
              rounded-3xl shadow-xl
              p-4 sm:p-6 md:p-10
              w-full max-w-[700px]
              mx-auto
            "
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-3">
              Making Our Cities Cleaner, One Report at a Time
            </h1>

            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base text-center">
              Report local issues like garbage dumps, potholes, water leakage, and broken streetlights.
              Track progress, engage with your community, and make a real difference in your neighborhood.
            </p>

            <div className="flex justify-center gap-3 sm:gap-4 mt-6 flex-wrap">
              <Link
                to="/signup"
                className="px-5 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Start Reporting
              </Link>

              <button className="px-5 sm:px-6 py-2 border border-gray-700 rounded-lg hover:bg-gray-200">
                Learn More
              </button>
            </div>

            <div
              className="
                flex justify-center 
                gap-3 sm:gap-6 
                mt-6 
                text-gray-800 font-semibold 
                text-[10px] sm:text-xs md:text-sm 
                flex-wrap
              "
            >
              <span>15K+ Issues Reported</span>
              <span>8.2K+ Issues Resolved</span>
              <span>5K+ Active Users</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAP + GALLERY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-10 py-12 w-full">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Reported Issues Map</h2>
          <div
            className="rounded-xl shadow-lg h-[350px] md:h-[600px] lg:h-[1200px] w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${reportedMap})` }}
          ></div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Community Gallery</h2>
          <img src={community1} className="rounded-lg mb-4 shadow w-full" alt="Community Cleanup" />
          <img src={community2} className="rounded-lg shadow w-full" alt="Community Volunteers" />
        </div>
      </section>

      {/* FIXED ISSUE IMAGE */}
      <section className="relative px-4 md:px-10">
        <img src={issueFixed} className="w-full rounded-xl shadow" alt="" />
      </section>

      {/* FEATURES */}
      <section className="py-16 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Powerful Features for Better Communities</h2>

        <p className="text-gray-600 mb-10 text-sm md:text-base">
          Everything you need to report, track, and resolve issues efficiently
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-10">
          {[
            { icon: "📸", title: "Photo Reports" },
            { icon: "📍", title: "Location Tracking" },
            { icon: "🔔", title: "Real-time Updates" },
            { icon: "🗳️", title: "Community Voting" },
            { icon: "🗳️", title: "user Voting" },
            { icon: "🗳️", title: "Emergency issues" },
            { icon: "📈", title: "Progress Tracking" },
            { icon: "🛡️", title: "Verified Updates" },
          ].map((item, index) => (
            <div key={index} className="bg-gray-200 p-8 md:p-12 rounded-3xl shadow w-full">
              <div className="text-3xl md:text-4xl mb-5">{item.icon}</div>
              <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CELEBRATION IMAGE */}
      <section className="px-4 md:px-10">
        <img src={community} className="rounded-xl shadow-md w-full" alt="" />
      </section>

      {/* JOIN SECTION */}
      <section className="px-4 md:px-14 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join a Growing Community of Active Citizens
        </h2>

        <ul className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
          <li>✔️ Engage with local authorities</li>
          <li>✔️ Support community initiatives</li>
          <li>✔️ Volunteer and make impact</li>
        </ul>

        <Link
          to="/signup"
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-block text-sm md:text-base"
        >
          Join the Community
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-green-500 to-indigo-900 text-white py-10 text-center w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Ready to Make a Difference?</h2>
        <p className="mb-10 text-sm md:text-base">Join thousands of citizens working together.</p>

        <div className="flex flex-wrap justify-center gap-10 md:gap-20 text-sm">
          <div>
            <h4 className="font-bold mb-2">Product</h4>
            <p>Features</p>
            <p>How it Works</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <p>Help Center</p>
            <p>Contact Support</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Legal</h4>
            <p>Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>
        </div>

        <p className="mt-10 text-xs">© 2025 CleanStreet. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
