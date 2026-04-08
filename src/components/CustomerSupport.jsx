import React, { useState } from "react";
import "./CustomerSupport.css";

const CustomerSupport = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Your message has been sent. Our team will contact you soon.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="support-page">

      <div className="support-container">

        <h2>Customer Support</h2>

        {/* FAQ SECTION */}

        <div className="support-section">

          <h3>Frequently Asked Questions</h3>

          <div className="faq">
            <p><strong>How long does delivery take?</strong></p>
            <span>Orders are delivered within 1 day.</span>
          </div>

          <div className="faq">
            <p><strong>Can I cancel my order?</strong></p>
            <span>Yes, before the order is shipped.</span>
          </div>

          <div className="faq">
            <p><strong>What payment methods are available?</strong></p>
            <span>UPI, Debit Card, Credit Card and Cash on Delivery.</span>
          </div>

        </div>


        {/* CONTACT FORM */}

        <div className="support-section">

          <h3>Contact Us</h3>

          <form onSubmit={handleSubmit} className="contact-form">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Describe your issue..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>

          </form>

        </div>


        {/* WHATSAPP SUPPORT */}

        <div className="support-section">

          <h3>Chat with us on WhatsApp</h3>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            Chat on WhatsApp
          </a>

        </div>


        {/* PHONE SUPPORT */}

        <div className="support-section">

          <h3>Call Customer Support</h3>

          <p className="phone">+91 98765 43210</p>

          <span>Available: 8:45 AM – 10:00 PM</span>

        </div>

      </div>

    </div>
  );
};

export default CustomerSupport;