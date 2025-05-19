import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage or API
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        name: storedUser.name || "N/A",
        email: storedUser.email || "N/A",
        phone: storedUser.phone || "N/A",
        city: storedUser.city || "N/A",
        country: storedUser.country || "N/A",
        postalCode: storedUser.postalCode || "N/A",
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-gray-800 dark:text-gray-200">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-4 h-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#748df9]">
          User Profile
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData.name}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData.email}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Phone
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData.phone}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              City
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData.city.charAt(0).toUpperCase() + userData.city.slice(1)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Country
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData.country.charAt(0).toUpperCase() + userData.country.slice(1)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Postal Code
            </label>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData.postalCode}
            </p>
          </div>
        </div>
        {/* Button to navigate to Home */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-2 bg-[#a25cf7] text-white rounded-md shadow-md hover:bg-[#748df9] transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;