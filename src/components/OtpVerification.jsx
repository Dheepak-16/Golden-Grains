import React from "react";
import "./OtpVerification.css";

const OtpVerification = () => {
  return (
    <div className="otp-container">
      <div className="otp-card">

        <div className="otp-header">
          <span className="back-arrow">←</span>
          <h4>Security</h4>
        </div>

        <div className="otp-icon-wrapper">
          <div className="otp-icon">🔒</div>
        </div>

        <h2 className="otp-title">Verify Your Email</h2>
        <p className="otp-subtitle">
          Please enter the 4-digit code sent to <br />
          <strong>user***@example.com</strong>
        </p>

        <div className="otp-inputs">
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
        </div>
    
        <p className="resend-text">
          Didn’t receive the code?
          <br />
          <span className="resend">
            Resend Code <span className="timer">in 00:55</span>
          </span>
        </p>

        <button className="verify-btn">Verify</button>

        <div className="change-email">
          ✎ Change Email
        </div>

      </div>
    </div>
  );
};

export default OtpVerification;
