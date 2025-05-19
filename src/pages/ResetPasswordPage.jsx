import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleKeyDown = (e, field) => {
    if (e.key === "ArrowDown") {
      if (field === "newPassword") confirmPasswordRef.current.focus();
    } else if (e.key === "ArrowUp") {
      if (field === "confirmPassword") newPasswordRef.current.focus();
    } else if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = localStorage.getItem("resetEmail");
    const otpCode = localStorage.getItem("resetOtp");

    if (!newPassword.trim()) {
      setError("Password is required.");
      setLoading(false);
      return;
    } else if (!passwordPattern.test(newPassword)) {
      setError(
        "Password should be at least 6 characters, include one letter, one number, and one special character."
      );
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/forgotpassword/reset-password`,
        {
          email,
          otpCode,
          newPassword,
          confirmPassword,
        }
      );

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");
      navigate("/login");
    } catch {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // SVGs for eyes from your URLs, simplified for inline use:
  const EyeOpenIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeClosedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
    >
      <path d="M17.94 17.94A10.05 10.05 0 0112 19c-5.52 0-10-4.48-10-10a9.96 9.96 0 012.06-5.94" />
      <path d="M1 1l22 22" />
      <path d="M9.88 9.88a3 3 0 104.24 4.24" />
    </svg>
  );

  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Background Image */}
      <div className="w-full h-[100vh]">
        <img
          className="w-full h-[100vh] object-cover opacity-90"
          src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
        />
      </div>

      {/* Translucent Form Container */}
      <div className="shadow-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] min-h-[400px] flex flex-col justify-center rounded-md absolute bg-[#ffffff72] p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>

        <form
          onSubmit={handleSubmit}
          className="w-[95%] mx-auto flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm">New Password</label>
            <input
              ref={newPasswordRef}
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className="w-full h-[30px] border border-gray-300 pl-2 rounded-sm opacity-65 pr-8"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "newPassword")}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-2 top-[28px] text-gray-600 hover:text-gray-900"
              tabIndex={-1}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? EyeClosedIcon : EyeOpenIcon}
            </button>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label className="text-sm">Confirm Password</label>
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full h-[30px] border border-gray-300 pl-2 rounded-sm opacity-65 pr-8"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-[28px] text-gray-600 hover:text-gray-900"
              tabIndex={-1}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? EyeClosedIcon : EyeOpenIcon}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[30px] bg-[#25aadb] text-white rounded-sm text-sm hover:bg-[#1b86c1]"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
