import React, { useEffect, useState } from "react";
// import Header from "./Header";
import { FaTrash } from "react-icons/fa";
import "./CartPage.css";

const BASE_URL = "http://localhost:2000";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updated = cart.map((item) => ({
      ...item,
      qty: item.qty || 1
    }));

    setCartItems(updated);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQty = (index) => {
    const items = [...cartItems];
    items[index].qty += 1;
    updateCart(items);
  };

  const decreaseQty = (index) => {
    const items = [...cartItems];
    if (items[index].qty > 1) {
      items[index].qty -= 1;
      updateCart(items);
    }
  };

  const removeItem = (index) => {
    const items = [...cartItems];
    items.splice(index, 1);
    updateCart(items);
  };

  const orderPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const deliveryPrice = cartItems.length > 0 ? 60 : 0;
  const totalPrice = orderPrice + deliveryPrice;

  return (
    <>
      {/* <Header /> */}

      <div className="cart-page">

        {/* LEFT SIDE */}
        <div className="cart-left">

          <div className="cart-header">
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          {cartItems.map((item, index) => (

            <div className="cart-row" key={index}>

              {/* PRODUCT */}
              <div className="cart-product">
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.name}
                />

                <div className="product-info">
                  <h4>{item.name}</h4>
                  <p>{item.size}</p>

                  <FaTrash
                    className="delete"
                    onClick={() => removeItem(index)}
                  />
                </div>
              </div>

              {/* PRICE */}
              <div className="price">
                ₹{item.price}
              </div>

              {/* QUANTITY */}
              <div className="quantity">

                <button
                  className="qty-btn"
                  onClick={() => decreaseQty(index)}
                >
                  -
                </button>

                <span className="qty-number">
                  {item.qty}
                </span>

                <button
                  className="qty-btn"
                  onClick={() => increaseQty(index)}
                >
                  +
                </button>

              </div>

              {/* TOTAL */}
              <div className="total">
                ₹{item.price * item.qty}
              </div>

            </div>

          ))}

        </div>


        {/* RIGHT SIDE */}
        <div className="cart-right">

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Order</span>
            <span>₹{orderPrice}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹{deliveryPrice}</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="checkout-btn">
            Check Out
          </button>

        </div>

      </div>
    </>
  );
};

export default CartPage;