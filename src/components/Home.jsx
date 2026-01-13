import React from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaHome, FaFire } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import range1 from "../assets/range1.png";
import range2 from "../assets/range2.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="background">
        <div className="headerbar">

          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          <div className="homebars">
            <ul className="homebar-items">
              <li>
                <FaHome className="nav-icon" />
                Home
              </li>

              <li>All categories</li>

              <li className="active badge-item">
                <FaFire className="nav-icon green" />
                Best selling
              </li>

              <li className="badge-item">
                <AiOutlineHeart className="nav-icon" />
                GG Special
              </li>

              <li className="badge-item">
                Special Combo
              </li>

              <li>Track Order</li>
            </ul>
          </div>

          <div className="header-icons">
            <span className="icon-item">
              <IoSearchOutline />
            </span>

            <Link to="/login" className="icon-item">
              <IoPersonCircle />
              <span className="icons">Login / Signup</span>
            </Link>

            <span className="icon-item">
              <AiOutlineHeart />
              <span className="icons">Wishlist</span>
            </span>

            <span className="icon-item">
              <HiOutlineShoppingBag />
              <span className="icons">Cart</span>
            </span>
          </div>

        </div>
      </div>

      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img className="d-block w-100 banner-img" src={banner1} alt="banner" />
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 banner-img" src={banner2} alt="banner" />
        </Carousel.Item>
      </Carousel>

      <div className="organic-range">
        <h2>OUR ORGANIC RANGE</h2>

        <div className="range-list">
          <div className="range-circle">
            <img src={range1} alt="Organic range" />
          </div>
          <div className="range-circle">
            <img src={range1} alt="Organic range" />
          </div>
          <div className="range-circle">
            <img src={range1} alt="Organic range" />
          </div>
          <div className="range-circle">
            <img src={range1} alt="Organic range" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
