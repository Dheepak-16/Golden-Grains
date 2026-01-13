import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../GoogleAuth/GoogleAuthentication";

const API = "http://localhost:2000/api/auth";

function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userId: "",
        name: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSignup(e) {
        e.preventDefault();

        try {
            const res = await axios.post(`${API}/signup`, user);
            alert(res.data.message);
            navigate('/login');
        }
        catch (error) {
            alert(error.response?.data?.message || "Signup Failed");
        }
    }

    const handleGoogleClick = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const googleUser = result.user;

            const res = await axios.post(
                "http://localhost:2000/api/auth/googlesignUp",
                {
                    name: googleUser.displayName,
                    email: googleUser.email,
                    googleId: googleUser.uid   // ✅ FIXED
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert(res.data.message);
            navigate("/home"); // or dashboard
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Google Signup Failed");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">

                <h1 className="title">Create Account</h1>
                <p className="subtitle">Enter your details to get started</p>

                <form onSubmit={handleSignup}>
                    <input type="text" name="name" placeholder="Full Name" className="input" onChange={handleChange} />

                    <input type="email" name="email" placeholder="Email Address" className="input" onChange={handleChange} />

                    <input type="tel" name="mobileNumber" maxLength={10} placeholder="Mobile Number" className="input" onChange={handleChange} />

                    <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} />

                    <button className="signup-btn" >Sign Up</button>
                </form>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-buttons">
                    <button className="social-btn" onClick={handleGoogleClick}>Google</button>
                    <button className="social-btn">Apple</button>
                </div>

                <p className="footer-text">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
