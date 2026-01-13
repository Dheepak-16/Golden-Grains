import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'
import { IoSearchOutline } from "react-icons/io5";
import { FaHome, FaFire } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BiUser } from "react-icons/bi";

const Header = () => {
  return (
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
              {/* <span className="badge hot">HOT</span> */}
            </li>

            <li className="badge-item">
              <AiOutlineHeart className="nav-icon" />
              GG Special
              {/* <span className="badge best">BEST</span> */}
            </li>

            <li className="badge-item">
              Special Combo
              {/* <span className="badge offer">Offers</span> */}
            </li>

            <li>Track Order</li>

          </ul>
        </div>

        <div className="header-icons">
          <IoSearchOutline />
          <IoPersonCircle />
          <AiOutlineHeart />
          <div className="cart">
            <HiOutlineShoppingBag />
            {/* <span className="count">0</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
