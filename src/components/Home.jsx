import React, { useEffect, useState } from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "../assets/logo.png";
import { IoSearchOutline, IoPersonCircle } from "react-icons/io5";
import { FaHome, FaFire } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const [carousel, setCarousel] = useState(null);
  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState(null);

  const BASE_URL = "http://localhost:2000";
  const navigate = useNavigate();

  const organicDescriptions = [
    "Traditional Organic Rice",
    "Naturally Grown Millets",
    "Chemical-Free Pulses",
    "Healthy Cold-Pressed Oils",
    "Chemical-Free Peanut Candy"
  ];

  /* ================= USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    axios.get(`${BASE_URL}/api/carousel`)
      .then(res => setCarousel(res.data))
      .catch(err => console.log(err));

    axios.get(`${BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

    axios.get(`${BASE_URL}/api/bestselling`)
      .then(res => setBestSelling(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>

      {/* ================= HEADER ================= */}
      <div className="background">
        <div className="headerbar">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          <ul className="homebar-items">
            <li className="homelogo"><FaHome /> Home</li>
            <li className="allcategorylogo" onClick={()=> navigate("/allcategories")}>All Categories</li>
            <li className="active"><FaFire /> Best Selling</li>
            <li className="ggspeciallogo"><AiOutlineHeart /> GG Special</li>
            <li className="trackorderlogo">Track Order</li>
          </ul>

          <div className="header-icons">
            <span className="icon-item">
              <IoSearchOutline />
            </span>

            <div
              className="icon-item user-box"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
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

            <span className="icon-item">
              <AiOutlineHeart />
            </span>

            <span className="icon-item">
              <HiOutlineShoppingBag />
            </span>
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL ================= */}
      {carousel && (
        <Carousel fade interval={3000}>
          {carousel.images.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 banner-img"
                src={`${BASE_URL}${img.imageUrl}`}
                alt="banner"
              />
              <Carousel.Caption>
                <h3>{carousel.title}</h3>
                <p>{carousel.subtitle}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* ================= ORGANIC RANGE ================= */}
      <div className="organic-range">
        <h2>OUR ORGANIC RANGE</h2>

        <div className="range-list">
          {products.map((item, index) => (
            <div key={index} className="range-item">
              <div className="range-circle">
                <img
                  src={`${BASE_URL}${item.imageUrl}`}
                  alt={item.name}
                />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BEST SELLING ================= */}
      <div className="best-selling">
        <h2>BEST SELLING PRODUCTS</h2>

        <div className="best-selling-list">
          {bestSelling?.products?.map((item, index) => (
            <div key={index} className="bs-card">
              <div className="bs-image">
                <img
                  src={`${BASE_URL}${item.imageUrl}`}
                  alt={item.name}
                />
              </div>

              <div className="bs-info">
                <h4>{item.name}</h4>
                <span className="bs-price">₹{item.price}</span>

                <button className="bs-btn">
                  View Product →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
