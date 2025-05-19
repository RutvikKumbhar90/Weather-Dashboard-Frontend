import { useState } from "react";
import OTPModal from "../components/OTPModal";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/forgotpassword/request-otp`,
        { email }
      );

      if (res.status === 200) {
        localStorage.setItem("resetEmail", email);
        setShowModal(true);
      }
    } catch (err) {
      setError("Email not found or invalid.");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="shadow-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] min-h-[320px] flex flex-col justify-center rounded-md absolute bg-[#ffffff72] p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="w-[95%] mx-auto flex flex-col gap-4" noValidate>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-[30px] border border-gray-300 pl-2 rounded-sm opacity-65"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="mt-2 h-[30px] bg-[#25aadb] text-white rounded-sm text-sm hover:bg-[#1b86c1]"
            disabled={loading}
          >
            Send OTP
          </button>
        </form>

        {showModal && <OTPModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
