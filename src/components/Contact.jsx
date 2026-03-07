import React from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {

    const navigate = useNavigate();

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Useful Links */}
                <div className="footer-column">
                    <h3>Useful Links</h3>
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/aboutus")}>About Us</li>
                        <li onClick={() => navigate("/allcategories/rajabogam")}>All Categories</li>
                        <li
                            onClick={() => {
                                navigate("/");
                                setTimeout(() => {
                                    const section = document.getElementById("best-selling");
                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth" });
                                    }
                                }, 100);
                            }}
                        >
                            Best Selling
                        </li>
                        <li onClick={() => navigate("/cart")}>Cart</li>
                    </ul>
                </div>

                {/* Categories */}
                <div className="footer-column">
                    <h3>Categories</h3>
                    <ul>
                        <li onClick={() => navigate("/allcategories/rajabogam")}>
                            Rice Varieties
                        </li>

                        <li onClick={() => navigate("/allcategories/millet")}>
                            Millets
                        </li>

                        <li onClick={() => navigate("/allcategories/dhal")}>
                            Dhal & Pulses
                        </li>

                        <li onClick={() => navigate("/allcategories/oils")}>
                            Cooking Oils
                        </li>

                        <li onClick={() => navigate("/allcategories/millet")}>
                            Traditional Rice
                        </li>

                        <li onClick={() => navigate("/allcategories/millet")}>
                            Healthy Grains
                        </li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div className="footer-column">
                    <h3>Customer Support</h3>
                    <ul>
                        <li>FAQs</li>
                        <li>Delivery Information</li>
                        <li>Payment Methods</li>
                        <li>Return Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <p>Sri KariyaKaliamman Rice Mandy</p>
                    <p>Goundampalayam, Coimbatore</p>
                    <p>Tamil Nadu</p>
                    <p>📞 +91 91767 44547</p>
                    <p>📞 +91 97865 82975</p>
                    <p>🕒 8:40 AM – 10:00 PM</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Sri KariyaKaliamman Rice Mandy. All Rights Reserved.</p>
            </div>

        </footer>
    );
};

export default Contact;