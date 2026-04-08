import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./CartPage.css";
import axios from "axios";

const BASE_URL = "http://localhost:2000";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {

    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const updated = cart.map((item) => ({
        ...item,
        qty: item.qty || 1,
        price: Number(item.price) || 0   // ✅ FIX
      }));

      setCartItems(updated);
    };

    loadCart();

    // ✅ LISTEN FOR REAL-TIME UPDATES
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };

  }, []);

  const updateCart = (items) => {

    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.userId) {
      axios.post(`${BASE_URL}/api/auth/savecart`, {
        userId: user.userId,
        cart: items
      });
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (index) => {

    const updated = [...cartItems];
    updated[index].qty += 1;

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decreaseQty = (index) => {

    const updated = [...cartItems];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    }

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {

    const updated = cartItems.filter((_, i) => i !== index);

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const orderPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const deliveryPrice = cartItems.length > 0 ? 60 : 0;
  const totalPrice = orderPrice + deliveryPrice;

  /* ================= CHECKOUT ================= */

  const handleCheckout = async () => {

    if (cartItems.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const orderId = Math.floor(100000 + Math.random() * 900000);

    const date = new Date();
    date.setDate(date.getDate() + 2);

    const newOrder = {
      orderId,
      date: new Date().toDateString(),
      deliveryDate: date.toDateString(),
      items: cartItems,
      total: totalPrice
    };

    // ✅ SAVE IN BACKEND
    await axios.post(`${BASE_URL}/api/auth/placeorder`, {
      userId: user.userId,
      order: newOrder
    });

    // UI (DON'T CHANGE)
    setOrderData(newOrder);
    setShowSuccess(true);

    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <>
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

              <div className="cart-product">
                <img src={`${BASE_URL}${item.image}`} alt={item.name} />

                <div className="product-info">
                  <h4>{item.name}</h4>
                  <p>{item.size}</p>

                  <FaTrash
                    className="delete"
                    onClick={() => removeItem(index)}
                  />
                </div>
              </div>

              <div className="price">₹{item.price}</div>

              <div className="quantity">
                <button onClick={() => decreaseQty(index)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(index)}>+</button>
              </div>

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

          <button className="checkout-btn" onClick={handleCheckout}>
            Check Out
          </button>

        </div>

      </div>

      {/* ================= SUCCESS POPUP ================= */}

      {showSuccess && orderData && (

        <div className="success-overlay">

          <div className="success-card">

            <div className="success-icon">✓</div>

            <h1 className="success-title">Order Confirmed</h1>
            <p className="success-subtitle">
              Your order has been placed successfully
            </p>

            <div className="success-info">
              <p><strong>Order ID:</strong> #{orderData.orderId}</p>
              <p><strong>Delivery:</strong> {orderData.deliveryDate}</p>
            </div>

            <h3 className="items-title">Items</h3>

            <div className="items-list">
              {orderData.items.map((item, i) => (
                <div key={i} className="item-row">
                  <span>{item.name}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <h2 className="total-text">Total: ₹{orderData.total}</h2>

            <button
              className="close-btn"
              onClick={() => setShowSuccess(false)}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default CartPage;