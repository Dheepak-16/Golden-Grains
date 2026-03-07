import React from "react";
import "./AboutUs.css";

import rice1 from "../assets/shop image1.png";
import rice2 from "../assets/about1.png";

const AboutUs = () => {
  return (
    <section className="about-container">
      
      {/* LEFT SIDE */}
      <div className="about-left">

        {/* <div className="about-card">
          <h2>30,000+</h2>
          <p>Happy customers who trust our quality rice products.</p>
        </div> */}

        <div className="about-images">
          <img src={rice1} alt="Rice Variety" className="img-small" />
          <img src={rice2} alt="Rice Grains" className="img-large" />
        </div>

        <p className="ratings">⭐ ⭐ ⭐ ⭐ ⭐ Best Quality Products</p>

      </div>

      {/* RIGHT SIDE */}
      <div className="about-right">

        <span className="about-subtitle">A BIT</span>
        <h1 className="about-title">ABOUT US</h1>

        <p className="about-text">
          Welcome to <b>Sri KariyaKaliamman Rice Mandy</b>, your trusted
          destination for premium quality rice and traditional grains.
          We take pride in delivering fresh, nutritious, and carefully
          selected rice varieties that bring authentic taste to every meal.
        </p>

        <p className="about-text">
          Our rice is sourced from trusted farmers and reliable mills to
          ensure purity, freshness, and consistent quality. We offer a
          wide range of rice varieties suitable for households, restaurants,
          and bulk buyers.
        </p>

        <p className="about-text">
          At Sri KariyaKaliamman Rice Mandy, customer satisfaction is our
          highest priority. We are committed to providing quality products,
          fair pricing, and reliable service to every customer.
        </p>

        {/* <button className="about-btn">Explore More</button> */}

      </div>

    </section>
  );
};

export default AboutUs;