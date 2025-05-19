import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Weather Dashboard</h1>
        <p className="text-lg sm:text-xl">
          Get real-time weather updates and detailed forecasts for your location.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300 text-sm sm:text-base">
            Login
          </button>
        </Link>
        <Link to="/home">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 text-sm sm:text-base">
            Sign Up for Free
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;