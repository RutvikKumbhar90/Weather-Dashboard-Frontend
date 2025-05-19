import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    country: "",
    phone: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const refs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    city: useRef(null),
    country: useRef(null),
    phone: useRef(null),
    postalCode: useRef(null),
  };

  const inputOrder = [
    "name",
    "email",
    "password",
    "city",
    "country",
    "phone",
    "postalCode",
  ];

  const handleKeyDown = (e, field) => {
    const idx = inputOrder.indexOf(field);
    if (e.key === "ArrowDown" && idx < inputOrder.length - 1) {
      refs[inputOrder[idx + 1]].current.focus();
    } else if (e.key === "ArrowUp" && idx > 0) {
      refs[inputOrder[idx - 1]].current.focus();
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.replace(/\s/g, "").length < 3) {
      newErrors.name = "Name must be more than two letters.";
    } else if (!namePattern.test(formData.name)) {
      newErrors.name = "Name should contain only letters and optional space.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must be valid and contain '@'.";
    }

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password should be at least 6 characters, include one letter, one number, and one special character.";
    }

    const locationPattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    } else if (!locationPattern.test(formData.city)) {
      newErrors.city = "City should contain only letters and optional space.";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    } else if (!locationPattern.test(formData.country)) {
      newErrors.country =
        "Country should contain only letters and optional space.";
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone should be a valid 10-digit Indian number.";
    }

    const postalCodePattern = /^\d{6}$/;
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!postalCodePattern.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code should be exactly 6 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setFormData({
          name: "",
          email: "",
          password: "",
          city: "",
          country: "",
          phone: "",
          postalCode: "",
        });
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.response.data.message,
        }));
      } else {
        console.error("⚠️ Registration error:", error.response?.data || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center relative">
      <div className="w-full">
        <img
          className="w-full h-[100vh] object-cover opacity-90"
          src="https://images.unsplash.com/photo-1597571063304-81f081944ee8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="shadow-xl w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] h-auto flex flex-col items-center justify-center rounded-md absolute bg-[#ffffff72] py-2">
        <div className="w-[95%] h-[100%] flex justify-center items-center flex-col gap-1">
          <div className="w-[95%]">
            <label className="text-sm">Enter your name</label>
            <input
              ref={refs.name}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "name")}
              className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="w-[95%]">
            <label className="text-sm">Enter your email</label>
            <input
              ref={refs.email}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "email")}
              className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="w-[95%]">
            <label className="text-sm">Create password</label>
            <input
              ref={refs.password}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "password")}
              className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="w-[95%] flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-[50%]">
              <label className="text-sm">Enter your city</label>
              <input
                ref={refs.city}
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "city")}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city}</p>
              )}
            </div>
            <div className="w-full sm:w-[50%]">
              <label className="text-sm">Enter your country</label>
              <input
                ref={refs.country}
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "country")}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
              {errors.country && (
                <p className="text-red-500 text-xs">{errors.country}</p>
              )}
            </div>
          </div>
          <div className="w-[95%] flex flex-col sm:flex-row gap-2">
            <div className="w-full sm:w-[50%]">
              <label className="text-sm">Enter your phone number</label>
              <input
                ref={refs.phone}
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "phone")}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            <div className="w-full sm:w-[50%]">
              <label className="text-sm">Enter your postal code</label>
              <input
                ref={refs.postalCode}
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, "postalCode")}
                className="w-full h-[30px] border border-gray-300 pl-1 rounded-sm opacity-65"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-xs">{errors.postalCode}</p>
              )}
            </div>
          </div>
          <div className="w-[95%] h-[30px] mt-2 rounded-sm bg-[#25aadb]">
            <button
              onClick={handleSubmit}
              className="text-center text-sm w-full"
            >
              Submit
            </button>
          </div>
          <div className="w-[95%] h-[30px] flex items-center mt-2 text-sm">
            <p>
              If you have an account!
              <Link to="/login">
                <span className="text-[#0000f7]"> Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
