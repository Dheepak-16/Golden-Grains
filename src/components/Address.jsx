import React, { useState, useEffect } from "react";
import "./Address.css";
import axios from "axios";

const BASE_URL = "http://localhost:2000/api/auth";

const Address = () => {

    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([]);

    const [form, setForm] = useState({
        house: "",
        area: "",
        city: "",
        pincode: ""
    });

    const user = JSON.parse(localStorage.getItem("user"));

    /* ================= GET ADDRESS FROM BACKEND ================= */

    useEffect(() => {

        if (!user?.id) return;

        const fetchAddresses = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/getaddress/${user.id}`
                );

                setAddresses(res.data.addresses);

            } catch (err) {
                console.log(err);
            }
        };

        fetchAddresses();

    }, [user?.id]);

    /* ================= HANDLE INPUT ================= */

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    /* ================= SAVE ADDRESS (API) ================= */

    const saveAddress = async () => {

        try {

            const res = await axios.post(
                `${BASE_URL}/addaddress`,
                {
                    userId: user.id,
                    ...form
                }
            );

            setAddresses(res.data.addresses);

            setShowModal(false);

            setForm({
                house: "",
                area: "",
                city: "",
                pincode: ""
            });

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="address-container">

            <h2>Addresses</h2>

            {/* EMPTY STATE */}

            {addresses.length === 0 && (

                <div className="empty">

                    <p>No address added yet.</p>

                    <button
                        className="add-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Add Address
                    </button>

                </div>

            )}

            {/* ADDRESS LIST */}

            {addresses.map((addr, index) => (

                <div key={index} className="address-card">

                    <h4>{addr.house}</h4>

                    <p>{addr.area}</p>
                    <p>{addr.city} - {addr.pincode}</p>

                    <div className="btn-row">

                        <button
                            className="edit-btn"
                            onClick={() => {
                                setForm(addr);
                                setShowModal(true);
                            }}
                        >
                            Edit Address
                        </button>

                        <button
                            className="add-btn"
                            onClick={() => {
                                setForm({
                                    house: "",
                                    area: "",
                                    city: "",
                                    pincode: ""
                                });
                                setShowModal(true);
                            }}
                        >
                            Add Address
                        </button>

                    </div>

                </div>

            ))}

            {/* MODAL */}

            {showModal && (

                <div className="modal">

                    <div className="modal-box">

                        <h3>Add Address</h3>

                        <input
                            name="house"
                            placeholder="House / Flat"
                            value={form.house}
                            onChange={handleChange}
                        />

                        <input
                            name="area"
                            placeholder="Area / Street"
                            value={form.area}
                            onChange={handleChange}
                        />

                        <input
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={handleChange}
                        />

                        <input
                            name="pincode"
                            placeholder="Pincode"
                            value={form.pincode}
                            onChange={handleChange}
                        />

                        <div className="modal-buttons">

                            <button
                                className="save-btn"
                                onClick={saveAddress}
                            >
                                Save Address
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default Address;