import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/logo.png";

import { IoSearchOutline, IoPersonCircle } from "react-icons/io5";
import { FaHome, FaFire } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>

        {/* NAV MENU */}
        <nav className="nav-menu">
          <ul>
            <li onClick={() => navigate("/")}>
              <FaHome /> Home
            </li>
            <li onClick={() => navigate("/allcategories/rajabogam")}>
              All Categories
            </li>
            <li>
              <FaFire /> Best Selling
            </li>
            <li>
              <AiOutlineHeart /> GG Special
            </li>
            <li>Track Order</li>
          </ul>
        </nav>

        {/* RIGHT ICONS */}
        <div className="header-icons">

          <IoSearchOutline />

          {/* USER DROPDOWN */}
          <div
            className="user-box"
            onMouseEnter={() => user && setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
            onClick={() => !user && navigate("/login")}
          >
            <IoPersonCircle />

            <span className="username">
              {user ? user.name : "Login"}
            </span>

            {user && showLogout && (
              <div className="logout-box" onClick={handleLogout}>
                Logout
              </div>
            )}
          </div>

          <AiOutlineHeart />
          <HiOutlineShoppingBag />

        </div>
      </div>
    </header>
  );
};

export default Header;
