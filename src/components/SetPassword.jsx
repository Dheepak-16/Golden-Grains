import React, { useState } from "react";
import "./SetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API = "http://localhost:2000/api/auth";

const SetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      alert("Session expired. Try again.");
      navigate("/forgetpassword");
      return;
    }

    if (!newPassword || !confirmPassword) {
      return alert("Fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await axios.post(`${API}/resetpassword`, {
        email,
        password: newPassword,
      });

      alert(res.data.message);
      localStorage.removeItem("resetEmail");
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="sp-container">
      <div className="sp-card">

        <div className="sp-header">
          <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
          <h4>Security</h4>
        </div>

        <h2 className="sp-title">Create New Password</h2>
        <p className="sp-subtitle">
          Your new password must be different from previously used passwords.
        </p>

        {/* New Password */}
        <div className="sp-group">
          <label>New Password</label>
          <div className="sp-input-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span
              className="eye"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="sp-group">
          <label>Confirm Password</label>
          <div className="sp-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </span>
          </div>
        </div>

        <div className="strength-box">
          <ul className="rules">
            <li className="active">✔ At least 8 characters</li>
            <li className="active">✔ Contains a number</li>
            <li>○ One special character (@, #, $)</li>
          </ul>
        </div>

        <button className="sp-btn" onClick={handleResetPassword}>
          Reset Password
        </button>

      </div>
    </div>
  );
};

export default SetPassword;
