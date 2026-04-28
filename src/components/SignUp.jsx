import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../GoogleAuth/GoogleAuthentication";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const API = "http://localhost:2000/api/auth";
const API = `${process.env.REACT_APP_API_URL}/auth`;

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
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

    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    async function handleSignup(e) {
        e.preventDefault();

        const { name, email, mobileNumber, password } = user;

        if (!nameRegex.test(name)) {
            return alert("Enter a valid name")
        }
        if (!emailRegex.test(email)) {
            return alert("Enter a valid email")
        }
        if (!mobileRegex.test(mobileNumber)) {
            return alert("Enter a valid mobile number")
        }
        if (!passwordRegex.test(password)) {
            return alert("Password must contain at least 8 characters, one uppercase, one lowercase, one number & one special character")
        }

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
                // "http://localhost:2000/api/auth/googlesignUp",
                `${API}/googlesignUp`,
                {
                    name: googleUser.displayName,
                    email: googleUser.email,
                    googleId: googleUser.uid
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert(res.data.message);
            navigate("/");
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

                    <div className="password-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input"
                            onChange={handleChange}
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </span>
                    </div>

                    <button className="signup-btn" >Sign Up</button>
                </form>

                <div className="divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-buttons">
                    <button className="social-btn" onClick={handleGoogleClick}>Google</button>
                    {/* <button className="social-btn">Apple</button> */}
                </div>

                <p className="footer-text">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
