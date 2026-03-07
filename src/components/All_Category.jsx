import React, { useEffect, useState } from "react";
import axios from "axios";
import "./All_Category.css";
// import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const BASE_URL = "http://localhost:2000";
const BASE_URL = "https://golden-grains-backend.vercel.app/api";

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

  const { category } = useParams();
  const navigate = useNavigate();

  const [allCategory, setAllCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [activeCategory, setActiveCategory] =
    useState(category || "rajabogam");

  /* SYNC URL CATEGORY */
  useEffect(() => {
    if (category) setActiveCategory(category);
  }, [category]);

  /* FETCH PRODUCTS */
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

  /* NEXT CATEGORY */
  const currentIndex = categoriesOrder.indexOf(activeCategory);
  const nextCategory =
    categoriesOrder[(currentIndex + 1) % categoriesOrder.length];

  return (
    <>
      {/* <Header /> */}

      <div className="category-wrapper">

        <h2 className="page-title">All Categories</h2>

        <h3 className="page-title2">
          {categoryLabels[activeCategory]}
        </h3>

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

                <div className="img-box">
                  <img
                    src={`${BASE_URL}${item.imageUrl}`}
                    alt={item.name}
                  />
                </div>

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

                  <div className="btn-row">

                    {/* ADD TO CART */}
                    <button
                      className="add-btn"
                      disabled={!priceAvailable}
                      onClick={() => {

                        const cart =
                          JSON.parse(localStorage.getItem("cart")) || [];

                        cart.push({
                          name: item.name,
                          price: activeSize.price,
                          size: activeSize.label,
                          image: item.imageUrl
                        });

                        localStorage.setItem("cart", JSON.stringify(cart));

                        toast.success("Item added to cart 🛒");

                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/productdetails/${item.name}`)
                      }
                    >
                      View Product
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

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

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  );
};

export default All_Category;