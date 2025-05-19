import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPModal = ({ onClose }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(600);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("resetEmail");
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setError("Please enter complete OTP.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/forgotpassword/validate-otp`,
        {
          email,
          otpCode,
        }
      );
      localStorage.setItem("resetOtp", otpCode);
      onClose();
      navigate("/reset-password");
    } catch {
      setError("Invalid or expired OTP.");
    }
  };

  const resendOTP = async () => {
    const email = localStorage.getItem("resetEmail");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/forgotpassword/request-otp`,
        { email }
      );
      setTimer(600);
    } catch {
      setError("Failed to resend OTP.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl flex flex-col">
        <h2 className="text-lg font-semibold mb-6 text-center">Enter OTP</h2>
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 border border-gray-300 rounded text-center text-lg opacity-80"
            />
          ))}
        </div>
        <p className="text-sm text-gray-700 text-center mb-3">
          Time left: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
        </p>
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            className="bg-[#25aadb] text-white py-2 rounded text-sm hover:bg-[#1b86c1]"
          >
            Continue
          </button>
          <button
            onClick={resendOTP}
            disabled={timer > 0}
            className={`py-2 rounded text-white text-sm ${
              timer > 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            Resend OTP
          </button>
          <button
            onClick={onClose}
            className="mt-2 py-2 text-center text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
