import React, { useState } from "react";
import "./OtpVerification.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:2000/api/auth";

const OtpVerification = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);

  // Handle OTP input change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Only numbers allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const finalOtp = otp.join("");
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      alert("Session expired. Try again.");
      navigate("/forgetpassword");
      return;
    }

    if (finalOtp.length !== 4) {
      return alert("Enter complete 4-digit OTP");
    }

    try {
      const res = await axios.post(`${API}/verifyotp`, {
        email,
        otp: finalOtp,
      });

      alert(res.data.message);
      navigate("/setpassword");

    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">

        {/* Back Button */}
        <div className="otp-header">
          <Link to="/forgetpassword" className="back-arrow">←</Link>
        </div>

        {/* Icon */}
        <div className="otp-icon-wrapper">
          <div className="otp-icon">🔒</div>
        </div>

        <h2 className="otp-title">Verify Your Email</h2>

        {/* OTP Input Boxes */}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
            />
          ))}
        </div>

        {/* Verify Button */}
        <button className="verify-btn" onClick={verifyOtp}>
          Verify
        </button>

        {/* Change Email */}
        <div className="change-email">
          <Link to="/forgetpassword">✎ Change Email</Link>
        </div>

      </div>
    </div>
  );
};

export default OtpVerification;
