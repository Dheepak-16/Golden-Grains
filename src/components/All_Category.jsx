import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import "./All_Category.css";

const BASE_URL = "http://localhost:2000";

const All_Category = () => {
  const [allCategory, setAllCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showBriyani, setShowBriyani] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/allcategory`)
      .then((res) => {
        setAllCategory(res.data);
        setFilteredItems(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);

  /* 🔽 FILTER BRIYANI */
  const showBriyaniRice = () => {
    const briyaniItems = allCategory.categories.filter(
      (item) => item.category === "briyani"
    );
    setFilteredItems(briyaniItems);
    setShowBriyani(true);
  };

  return (
    <div className="category-wrapper">

      <h2 className="page-title">
        {showBriyani ? "Briyani Rice" : "All Categories"}
      </h2>

      <h2 className="page-title2">
        {showBriyani ? "Premium Briyani Selection" : "Rajabogam Rice"}
      </h2>

      <div className="product-grid">
        {filteredItems?.map((item, index) => (
          <div key={index} className="product-card">

            <span className="discount-badge">18% OFF</span>

            <div className="img-box">
              <img
                src={`${BASE_URL}${item.imageUrl}`}
                alt={item.name}
              />
            </div>

            <div className="card-body">
              <h4>{item.name}</h4>

              <div className="price-row">
                <span className="price">₹{item.price}</span>
                <span className="old-price">₹{item.mrp}</span>
              </div>

              <button className="add-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 BOTTOM CENTER ARROW */}
      {!showBriyani && (
        <div className="arrow-container">
          <button className="arrow-btn" onClick={showBriyaniRice}>
            <FaArrowRight />
          </button>
          <p className="arrow-text">View Briyani Rice</p>
        </div>
      )}

    </div>
  );
};

export default All_Category;
