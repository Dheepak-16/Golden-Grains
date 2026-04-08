// import React from "react";
// import "./Login.css";
// import ForgetPassword from "./ForgetPassword";
// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, provider } from "../GoogleAuth/GoogleAuthentication";
// import { signInWithPopup } from "firebase/auth";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const API = "http://localhost:2000/api/auth"

// function Login() {
//   const [showForgot, setShowForgot] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     email: "",
//     password: ""
//   })

//   const { email, password } = state;

//   function handleChange(e) {
//     setState({ ...state, [e.target.name]: e.target.value })
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   async function handleLogin(e) {
//     e.preventDefault();

//     if (!emailRegex.test(email)) {
//       return alert("Enter valid email")
//     }

//     if (!password.trim()) {
//       return alert("Password cannot be empty");
//     }

//     try {
//       const res = await axios.post(`${API}/login`, state);
//       alert(res.data.message);

//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // navigate('/');
//       window.location.href = "/";
//     }

//     catch (error) {
//       alert(error.response?.data?.message || "Login Failed");
//     }

//   }

//   const handleGoogleClick = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const googleUser = result.user;

//       const res = await axios.post(
//         "http://localhost:2000/api/auth/googlesignUp",
//         {
//           name: googleUser.displayName,
//           email: googleUser.email,
//           googleId: googleUser.uid
//         }
//       );

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert(res.data.message);
//       // navigate("/");
//       window.location.href = "/";
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Google Signup Failed");
//     }
//   };

//   return (
//     <>
//       <div className="login-container">
//         <div className="login-card">

//           {/* <h1 className="app-name">Golden Grains</h1> */}

//           <h2 className="title">Welcome Back</h2>
//           <p className="subtitle">Enter your credentials to continue</p>

//           <form className="login-form" onSubmit={handleLogin}>

//             <input
//               type="email" name="email" placeholder="Email Address" value={email} className="input" onChange={handleChange} />

//             <div className="password-box">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 className="input"
//                 onChange={handleChange}
//               />

//               <span
//                 className="eye-icon"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
//               </span>
//             </div>


//             <div className="forgot" >
//               <span onClick={() => setShowForgot(true)}>
//                 Forgot Password?
//               </span>
//             </div>

//             <button className="login-btn">Log In</button>

//             <div className="divider">
//               <span>Or continue with</span>
//             </div>

//             <div className="social-login">
//               <button className="social-btn" type="button" onClick={handleGoogleClick}>Google</button>
//               <button className="social-btn">Apple</button>
//             </div>

//             <p className="signup-text">
//               Don’t have an account? <Link to="/signup">Sign Up</Link>
//             </p>

//           </form>
//         </div>
//       </div>
//       {showForgot && (
//         <ForgetPassword onClose={() => setShowForgot(false)}
//           onSuccess={(email) => {
//             setShowForgot(false);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import ForgetPassword from "./ForgetPassword";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../GoogleAuth/GoogleAuthentication";
import { signInWithPopup } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API = "http://localhost:2000/api/auth";

function Login() {
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const { email, password } = state;

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ================= LOGIN ================= */

  async function handleLogin(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      return alert("Enter valid email");
    }

    if (!password.trim()) {
      return alert("Password cannot be empty");
    }

    try {
      const res = await axios.post(`${API}/login`, state);

      console.log("LOGIN RESPONSE:", res.data); // ✅ DEBUG

      // ✅ STORE CORRECT DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Login Successful ✅");

      // navigate("/");
      window.location.href = "/";
      // if (res.data.user.role === "admin") {
      //   window.location.href = "/admin";
      // } else {
      //   window.location.href = "/";
      // }

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert(error.response?.data?.message || "Login Failed");
    }
  }

  /* ================= GOOGLE LOGIN ================= */

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const res = await axios.post(
        `${API}/googlesignUp`,
        {
          name: googleUser.displayName,
          email: googleUser.email,
          googleId: googleUser.uid
        }
      );

      console.log("GOOGLE RESPONSE:", res.data); // ✅ DEBUG

      // ✅ STORE CORRECT USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Google Login Successful ✅");

      // navigate("/");
      window.location.href = "/";

    } catch (error) {
      console.error("GOOGLE ERROR:", error);
      alert(error.response?.data?.message || "Google Signup Failed");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">

          <h2 className="title">Welcome Back</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          <form className="login-form" onSubmit={handleLogin}>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              className="input"
              onChange={handleChange}
              required
            />

            {/* PASSWORD */}
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                className="input"
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot">
              <span onClick={() => setShowForgot(true)}>
                Forgot Password?
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button className="login-btn">Log In</button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="social-login">
              <button
                className="social-btn"
                type="button"
                onClick={handleGoogleClick}
              >
                Google
              </button>
              <button className="social-btn" type="button">
                Apple
              </button>
            </div>

            {/* SIGNUP */}
            <p className="signup-text">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>

          </form>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgot && (
        <ForgetPassword
          onClose={() => setShowForgot(false)}
          onSuccess={() => {
            setShowForgot(false);
          }}
        />
      )}
    </>
  );
}

export default Login;
