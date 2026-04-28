import React, { useState } from "react";
import "./ForgetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const API = "http://localhost:2000/api/auth";
const API = `${process.env.REACT_APP_API_URL}/auth`;

const ForgetPassword = ({ onClose, onSuccess }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Please enter email");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API}/forgetpassword`, { email });
            alert(res.data.message);
            
            localStorage.setItem("resetEmail", email);
            onSuccess(email);
            navigate('/otpVerification');

        } catch (error) {
            alert(error.response?.data?.message || "something went wrong");
        } finally {
            setLoading(false);
        }
    }
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

                    <form onSubmit={handleSubmit}>
                        <div className="fp-input-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="example@domain.com" value={email} onChange={handleChange} />
                        </div>

                        <button className="fp-btn" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset OTP"}
                        </button>
                    </form>

                    <div className="fp-back" onClick={onClose}>
                        ← Back to Login
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
