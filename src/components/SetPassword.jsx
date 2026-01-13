import React from "react";
import "./SetPassword.css";

const SetPassword = () => {
    return (
        <div className="sp-container">
            <div className="sp-card">

                <div className="sp-header">
                    <span className="back-arrow">←</span>
                    <h4>Security</h4>
                </div>

                <h2 className="sp-title">Create New Password</h2>
                <p className="sp-subtitle">
                    Your new password must be different from previously used passwords.
                </p>

                <div className="sp-group">
                    <label>New Password</label>
                    <div className="sp-input-wrapper">
                        <input type="password" placeholder="Enter new password" />
                        <span className="eye">👁</span>
                    </div>
                </div>

                <div className="sp-group">
                    <label>Confirm Password</label>
                    <div className="sp-input-wrapper">
                        <input type="password" placeholder="Confirm new password" />
                        <span className="eye">👁</span>
                    </div>
                </div>

                <div className="strength-box">
                    <ul className="rules">
                        <li className="active">✔ At least 8 characters</li>
                        <li className="active">✔ Contains a number</li>
                        <li>○ One special character (@, #, $)</li>
                    </ul>
                </div>

                <button className="sp-btn">Reset Password</button>

            </div>
        </div>
    );
};

export default SetPassword;
