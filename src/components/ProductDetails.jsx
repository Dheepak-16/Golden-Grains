import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import Header from "../components/Header";
import { FaShoppingCart } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetails.css";

const BASE_URL = "http://localhost:2000";

const ProductDetails = () => {

  const { name } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {

    axios
      .get(`${BASE_URL}/api/productdetails/${name}`)
      .then((res) => {

        console.log("Product Data:", res.data); // debug

        setProduct(res.data);
        setSelectedSize(res.data?.sizes?.[0]?.label || "");

      })
      .catch((err) => console.log(err));

  }, [name]);

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  const activeSize =
    product?.sizes?.find((s) => s.label === selectedSize) ||
    product?.sizes?.[0];

  return (
    <>
      {/* <Header /> */}

      <div className="detail-wrapper">

        {/* HEADER */}

        <div className="detail-header">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={22} />
          </button>

          <h3>Detail Product</h3>

          <FaShoppingCart
            className="cart-icon"
            size={22}
            onClick={() => navigate("/cart")}
          />

        </div>

        {/* PRODUCT IMAGE */}

        <div className="detail-image">
          <img
            src={`${BASE_URL}${product?.imageUrl}`}
            alt={product?.name}
          />
        </div>

        {/* PRODUCT DETAILS */}

        <div className="detail-body">

          <h2>{product?.name}</h2>

          {/* RICE VARIETY */}

          <p className="detail-sub">
            Variety : {product?.riceVariety || "Not Available"}
          </p>

          {/* MANUFACTURER */}

          <p className="detail-sub">
            Manufacturer : {product?.manufacturer || "Not Available"}
          </p>

          {/* PRICE */}

          <div className="detail-price">

            <span className="main-price">
              ₹{activeSize?.price}
            </span>

            {activeSize?.mrp && (
              <span className="mrp">
                ₹{activeSize?.mrp}
              </span>
            )}

          </div>

          {/* SIZE SELECT */}

          <div className="size-select">

            <select
              value={selectedSize}
              onChange={(e) =>
                setSelectedSize(e.target.value)
              }
            >

              {product?.sizes?.map((s, i) => (
                <option key={i} value={s.label}>
                  {s.label}
                </option>
              ))}

            </select>

          </div>

          {/* ADD TO CART */}

          <button
            className="detail-cart-btn"
            onClick={() => {

              const cart =
                JSON.parse(localStorage.getItem("cart")) || [];

              cart.push({
                name: product.name,
                price: activeSize?.price,
                size: activeSize?.label,
                image: product.imageUrl
              });

              localStorage.setItem("cart", JSON.stringify(cart));

              toast.success("Item added to cart 🛒");

            }}
          >
            + Add to Cart
          </button>

        </div>

      </div>

      {/* TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />

    </>
  );
};

export default ProductDetails;