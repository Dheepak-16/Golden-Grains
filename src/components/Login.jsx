import React from "react";
import "./Login.css";
import ForgetPassword from "./ForgetPassword";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../GoogleAuth/GoogleAuthentication";
import { signInWithPopup } from "firebase/auth";

const API = "http://localhost:2000/api/auth"

function Login() {
  const [showForgot, setShowForgot] = useState(false);
  
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const { email, password } = state;

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/login`, state);
      alert(res.data.message);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate('/home');
    }

    catch (error) {
      alert(error.response?.data?.message || "Login Failed");
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
          googleId: googleUser.uid
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Google Signup Failed");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">

          {/* <h1 className="app-name">Golden Grains</h1> */}
          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          <form className="login-form" onSubmit={handleLogin}>

            <input
              type="email" name="email" placeholder="Email Address" value={email} className="input" onChange={handleChange} />

            <input
              type="password" name="password" placeholder="Password" value={password} className="input" onChange={handleChange} />

            <div className="forgot" >
              <span onClick={() => setShowForgot(true)}>
                Forgot Password?
              </span>
            </div>

            <button className="login-btn">Log In</button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <div className="social-login">
              <button className="social-btn" type="button" onClick={handleGoogleClick}>Google</button>
              <button className="social-btn">Apple</button>
            </div>

            <p className="signup-text">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>

          </form>
        </div>
      </div>
      {showForgot && (
        <ForgetPassword onClose={() => setShowForgot(false)} />
      )}
    </>
  );
};

export default Login;
