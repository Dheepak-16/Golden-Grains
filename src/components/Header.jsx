import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../assets/shop logo.png";

import { IoSearchOutline, IoPersonCircle } from "react-icons/io5";
import { FaHome, FaFire } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import axios from "axios";

// const BASE_URL = "http://localhost:2000";
const BASE_URL = process.env.REACT_APP_API_URL;

const Header = () => {

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  const [rotate, setRotate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    /* ADD THIS (IMPORTANT) */
    axios
      .get(`${BASE_URL}/api/allcategory`)
      .then((res) => {
        const allProducts = res.data.categories || [];
        setProducts(allProducts);
      })
      .catch((err) => console.log("Search API error:", err));

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };

  }, []);

  /* SEARCH FILTER */

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchText.toLowerCase())
  );

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

            <li
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  const section = document.getElementById("best-selling");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
            >
              <FaFire /> Best Selling
            </li>

            <li onClick={() => navigate("/aboutus")}>
              About Us
            </li>

            {/* <li>Track Order</li> */}

          </ul>
        </nav>

        {/* RIGHT ICONS */}
        <div className="header-icons">

          {/* SEARCH */}
          <div className="search-icon">
            <IoSearchOutline
              onClick={() => setShowSearch(!showSearch)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* USER PROFILE */}
          <div
            className="user-box"
            onClick={() => {
              if (user) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
          >

            <IoPersonCircle />

            <span className="username">
              {user ? user.name : "Login"}
            </span>

          </div>

          {/* <AiOutlineHeart /> */}

          {/* CART */}
          <div
            className="cart-icon"
            onClick={() => navigate("/cart")}
          >

            <HiOutlineShoppingBag />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </div>

        </div>

      </div>

      {/* SEARCH BOX */}

      {showSearch && (
        <div className="search-container">

          <input
            type="text"
            placeholder="Search rice, millets, dhal..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {searchText && (
            <div className="search-results">

              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <div
                    key={index}
                    className="search-item"
                    onClick={() => {
                      navigate(`/productdetails/${item.name}`);
                      setShowSearch(false);
                      setSearchText("");
                    }}
                  >

                    <img
                      src={`${BASE_URL}${item.imageUrl}`}
                      alt={item.name}
                    />

                    <span>{item.name}</span>

                  </div>
                ))
              ) : (
                <p className="no-result">No products found</p>
              )}

            </div>
          )}

        </div>
      )}

    </header>
  );
};

export default Header;