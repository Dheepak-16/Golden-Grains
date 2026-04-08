import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:2000/api/auth";

const Profile = () => {

  const navigate = useNavigate();

  const [section, setSection] = useState("addresses");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    mobileNumber: "",   // ✅ added
    profilePic: ""
  });

  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState({
    house: "",
    area: "",
    city: "",
    pincode: ""
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Rajabogam Rice",
      date: "12 Mar 2026",
      price: "₹820"
    },
    {
      id: 2,
      product: "Foxtail Millet",
      date: "05 Mar 2026",
      price: "₹350"
    }
  ]);

  /* ================= LOAD USER ================= */

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    console.log("Stored User:", storedUser);

    if (storedUser) {
      setUser({
        ...storedUser,
        id: storedUser.userId   // 🔥 MAIN FIX
      });
    } else {
      navigate("/login");
    }

  }, [navigate]);


  /* ================= FETCH ADDRESS ================= */

  useEffect(() => {

    if (!user?.id) return;

    const fetchAddress = async () => {
      try {

        const res = await axios.get(
          `${BASE_URL}/getaddress/${user.id}`
        );

        setAddresses(res.data.addresses || []);

      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };

    fetchAddress();

  }, [user?.id]);

  useEffect(() => {

    const fetchOrders = async () => {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      try {

        const res = await axios.get(
          `${BASE_URL}/getorders/${user.userId}`
        );

        setUserOrders(res.data.orders || []);

      } catch (err) {
        console.log("Order Fetch Error:", err);
      }
    };

    fetchOrders();

  }, [section]);


  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };


  /* ================= PROFILE UPDATE ================= */

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile Updated ✅");
  };


  /* ================= ADDRESS INPUT ================= */

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };


  /* ================= ADD / UPDATE ADDRESS ================= */

  const handleAddAddress = async (e) => {

    e.preventDefault();

    if (!user?.id) {
      alert("User not found. Please login again.");
      return;
    }

    try {

      let res;

      if (editingIndex !== null) {

        res = await axios.post(
          `${BASE_URL}/updateaddress`,
          {
            userId: user.id,
            index: editingIndex,
            ...newAddress
          }
        );

        alert("Address Updated ✅");

      } else {

        res = await axios.post(
          `${BASE_URL}/addaddress`,
          {
            userId: user.id,
            ...newAddress
          }
        );

        alert("Address Added ✅");
      }

      setAddresses(res.data.addresses);

      setNewAddress({
        house: "",
        area: "",
        city: "",
        pincode: ""
      });

      setEditingIndex(null);
      setShowAddressForm(false);

    } catch (err) {
      console.log(err);
      alert("Operation Failed ❌");
    }

  };


  /* ================= DELETE ADDRESS ================= */

  const handleDeleteAddress = async (index) => {
    try {

      const res = await axios.post(
        `${BASE_URL}/deleteaddress`,
        {
          userId: user.id,
          index
        }
      );

      setAddresses(res.data.addresses);

      alert("Address Deleted 🗑️");

    } catch (err) {
      console.log(err);
      alert("Delete Failed ❌");
    }
  };


  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser({ ...user, profilePic: imageURL });
    }

  };


  return (

    <div className="profile-page">

      <div className="profile-wrapper">

        {/* SIDEBAR */}

        <div className="profile-sidebar">

          <div className="profile-user">

            <label className="avatar-upload">

              {user.profilePic ? (
                <img src={user.profilePic} alt="profile" />
              ) : (
                <div className="avatar">
                  {user.name?.charAt(0)}
                </div>
              )}

              <input type="file" onChange={handleImageUpload} />

            </label>

            <h3 className="username">{user.name}</h3>

          </div>


          <div
            className={`menu-item ${section === "orders" ? "active" : ""}`}
            onClick={() => setSection("orders")}
          >
            Orders
          </div>

          <div
            className={`menu-item ${section === "support" ? "active" : ""}`}
            onClick={() => setSection("support")}
          >
            Customer Support
          </div>

          <div
            className={`menu-item ${section === "addresses" ? "active" : ""}`}
            onClick={() => setSection("addresses")}
          >
            Addresses
          </div>

          <div
            className={`menu-item ${section === "profile" ? "active" : ""}`}
            onClick={() => setSection("profile")}
          >
            Profile
          </div>


          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>

        </div>



        {/* RIGHT CONTENT */}

        <div className="profile-content">


          {/* ================= PROFILE ================= */}

          {section === "profile" && (

            <div className="profile-details">

              <h2>Profile Details</h2>

              <form onSubmit={handleProfileUpdate} className="profile-form">

                <div className="profile-field">
                  <label>Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>

                <div className="profile-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>

                <div className="profile-field">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    value={user.mobileNumber || ""}
                    onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })}
                  />
                </div>

                <button type="submit" className="save-btn">
                  Save Changes
                </button>

              </form>

            </div>

          )}


          {/* ================= ADDRESSES ================= */}

          {section === "addresses" && (

            <>

              <h2 className="address-title">Addresses</h2>

              {addresses.length === 0 && (
                <p className="no-address">No address added yet.</p>
              )}

              <div className="address-list">

                  {addresses.map((addr, index) => (

                  <div key={index} className="address-card">

                    <div className="address-content">

                      <h4>{addr.house}</h4>
                      <p>{addr.area}</p>
                      <p>{addr.city} - {addr.pincode}</p>

                    </div>

                    <div className="address-actions">

                      <button
                        onClick={() => {
                          setNewAddress(addr);
                          setEditingIndex(index);
                          setShowAddressForm(true);
                        }}
                      >
                        Edit Address
                      </button>

                      <button
                        onClick={() => handleDeleteAddress(index)}
                        style={{ marginLeft: "10px", background: "red", color: "#fff" }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>


              <button
                className="add-address-btn"
                onClick={() => {
                  setNewAddress({
                    house: "",
                    area: "",
                    city: "",
                    pincode: ""
                  });
                  setEditingIndex(null);
                  setShowAddressForm(true);
                }}
              >
                {addresses.length === 0 ? "Add Address" : "Add Another Address"}
              </button>


              {showAddressForm && (

                <div className="address-modal">

                  <form
                    className="address-form"
                    onSubmit={handleAddAddress}
                  >

                    <input
                      name="house"
                      placeholder="House / Flat"
                      value={newAddress.house}
                      onChange={handleAddressChange}
                      required
                    />

                    <input
                      name="area"
                      placeholder="Area / Street"
                      value={newAddress.area}
                      onChange={handleAddressChange}
                      required
                    />

                    <input
                      name="city"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      required
                    />

                    <input
                      name="pincode"
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      required
                    />

                    <button type="submit">
                      {editingIndex !== null ? "Update Address" : "Add Address"}
                    </button>

                  </form>

                </div>

              )}

            </>
          )}

          {/* ================= CUSTOMER SUPPORT ================= */}

          {section === "support" && (

            <div className="support-container">

              <h2 className="support-title">Customer Support</h2>

              <div className="support-list">

                <div className="support-item">
                  <h4>FAQs</h4>
                  <p>Find answers to common questions about orders and services.</p>
                </div>

                <div className="support-item">
                  <h4>Delivery Information</h4>
                  <p>Delivery will be completed within 2 days from the order date.</p>
                </div>

                <div className="support-item">
                  <h4>Payment Methods</h4>
                  <p>We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery.</p>
                </div>

                <div className="support-item">
                  <h4>Return Policy</h4>
                  <p>Products can be returned within 2 days of delivery if there is any issue.</p>
                </div>

                <div className="support-item">
                  <h4>Contact Support</h4>
                  <p>Email: support@goldengrains.com</p>
                  <p>Phone: +91 9876543210</p>
                </div>

              </div>

            </div>

          )}

          {section === "orders" && (

            <div className="orders-container">

              <h2 className="orders-title">Your Orders</h2>

              {userOrders.length === 0 && (
                <p className="no-orders">No orders yet</p>
              )}

              {userOrders.map((order, index) => (

                <div key={index} className="order-card">

                  {/* TOP */}
                  <div className="order-header">
                    <div>
                      <h4>Order ID: #{order.orderId}</h4>
                      <p className="order-date">{order.date}</p>
                    </div>
                    <span className="delivery-badge">
                      Delivery: {order.deliveryDate}
                    </span>
                  </div>

                  {/* ITEMS */}
                  <div className="order-items">

                    {order.items.map((item, i) => (
                      <div key={i} className="order-item">

                        {/* IMAGE */}
                        <img
                          src={`http://localhost:2000${item.image}`}
                          alt={item.name}
                          className="order-img"
                        />

                        {/* DETAILS */}
                        <div className="item-left">
                          <h4>{item.name}</h4>
                          <p>{item.size}</p>
                        </div>

                        {/* PRICE */}
                        <div className="item-right">
                          ₹{item.price * item.qty}
                        </div>

                      </div>
                    ))}

                  </div>

                  {/* TOTAL */}
                  <div className="order-footer">
                    Total: ₹{order.total}
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Profile;