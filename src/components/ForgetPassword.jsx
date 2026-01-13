import React from "react";
import "./ForgetPassword.css";

const ForgetPassword = ({ onClose }) => {
    return (
        <div className="fp-container">
            <div className="cont">
                <div className="fp-card">
                    <div className="back" onClick={onClose}>X</div>
                    <h2>Forgot Password?</h2>

                    <p className="fp-text">
                        Enter the email address associated with your account and we'll send
                        you a OTP to reset your password.
                    </p>

                    <div className="fp-input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="example@domain.com"
                        />
                    </div>

                    <button className="fp-btn">Send Reset OTP</button>

                    <div className="fp-back" onClick={onClose}>
                        ← Back to Login
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
