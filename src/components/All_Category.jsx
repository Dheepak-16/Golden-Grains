import React, { useEffect, useState } from "react";
import axios from "axios";
import "./All_Category.css";
import Header from "./Header";
import { useParams } from "react-router-dom";

// const BASE_URL = "http://localhost:2000";
const BASE_URL = "https://golden-grains-backend.onrender.com";
// const BASE_URL = process.env.REACT_APP_API_URL;

/* CATEGORY ORDER */
const categoriesOrder = [
  "rajabogam",
  "briyani",
  "idly",
  "raw",
  "dhal",
  "oils",
  "millet"
];

/* DISPLAY LABEL */
const categoryLabels = {
  rajabogam: "Rajabogam Rice",
  briyani: "Briyani Rice",
  idly: "Idly Rice",
  raw: "Raw Rice",
  dhal: "Dhal",
  oils: "Oils",
  millet: "Millets"
};

const All_Category = () => {

  /* GET CATEGORY FROM URL */
  const { category } = useParams();

  const [allCategory, setAllCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [activeCategory, setActiveCategory] =
    useState(category || "rajabogam");

  /* SYNC CATEGORY WITH URL */
  useEffect(() => {
    if (category) setActiveCategory(category);
  }, [category]);

  /* FETCH DATA */
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/allcategory`)
      .then((res) => setAllCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* FILTER PRODUCTS */
  const filteredProducts =
    allCategory?.categories?.filter(
      (item) => item.category === activeCategory
    ) || [];

  /* NEXT CATEGORY LOGIC */
  const currentIndex = categoriesOrder.indexOf(activeCategory);
  const nextCategory =
    categoriesOrder[(currentIndex + 1) % categoriesOrder.length];

  return (
    <>
      <Header />

      <div className="category-wrapper">

        {/* TITLE */}
        <h2 className="page-title">All Categories</h2>
        <h3 className="page-title2">
          {categoryLabels[activeCategory]}
        </h3>

        {/* PRODUCTS */}
        <div className="product-grid">
          {filteredProducts.map((item, index) => {
            const sizes = item.sizes || [];

            const activeSize =
              sizes.find((s) => s.label === selectedSize[index]) ||
              sizes[0];

            const priceAvailable =
              activeSize?.price !== null &&
              activeSize?.price !== undefined;

            return (
              <div key={index} className="product-card">

                {/* SIZE SELECT */}
                <div className="qty-box">
                  <select
                    value={selectedSize[index] || sizes[0]?.label}
                    onChange={(e) =>
                      setSelectedSize({
                        ...selectedSize,
                        [index]: e.target.value
                      })
                    }
                  >
                    {sizes.map((s, i) => (
                      <option key={i} value={s.label}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* IMAGE */}
                <div className="img-box">
                  <img
                    src={`${BASE_URL}${item.imageUrl}`}
                    alt={item.name}
                  />
                </div>

                {/* DETAILS */}
                <div className="card-body">
                  <h4>{item.name}</h4>

                  <div className="price-row">
                    {priceAvailable ? (
                      <>
                        <span className="price">
                          ₹{activeSize.price}
                        </span>

                        {activeSize.mrp && (
                          <span className="old-price">
                            ₹{activeSize.mrp}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="not-available">
                        Not Available
                      </span>
                    )}
                  </div>

                  <button
                    className="add-btn"
                    disabled={!priceAvailable}
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* NEXT CATEGORY ARROW */}
        <div
          className="arrow-wrapper"
          onClick={() => setActiveCategory(nextCategory)}
        >
          <div className="arrow-circle">→</div>
          <p className="next-category-text">
            {categoryLabels[nextCategory]}
          </p>
        </div>

      </div>
    </>
  );
};

export default All_Category;
