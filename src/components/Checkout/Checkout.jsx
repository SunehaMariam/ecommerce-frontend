import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const getPriceNumber = (price) => {
    return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + getPriceNumber(item.price) * item.quantity,
    0
  );

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  // 👇 ye function missing thi, add kar di
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        items: cartItems,
        subtotal,
        discount,
        deliveryFee,
        total,
        paymentMethod: formData.paymentMethod,
      };

      const response = await fetch("http://localhost:4000/order/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error("Order place nahi hua");
      }

      const data = await response.json();
      console.log("Order Response:", data);

      // Cart clear karo
      clearCart();

      // popup dikhao
      alert("Order Placed Successfully! 🎉");

      // Home page pe wapas bhej do
      navigate("/");

    } catch (error) {
      console.log("Order error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out.</p>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Breadcrumb */}
      <div className="checkout-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/cart">Cart</Link>
        <span>›</span>
        <span>Checkout</span>
      </div>

      <h1 className="checkout-title">CHECKOUT</h1>

      <form className="checkout-layout" onSubmit={handlePlaceOrder}>

        {/* LEFT SIDE - Shipping Form */}
        <div className="checkout-form">

          <h2>Shipping Information</h2>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House #, Street, Area"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Karachi"
              />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="75500"
              />
            </div>
          </div>

          <h2>Payment Method</h2>

          <div className="payment-options">

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              Credit / Debit Card
            </label>

          </div>

        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <div className="checkout-items">

            {cartItems.map((item, index) => (
              <div
                className="checkout-item"
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
              >
                <img
                  src={`http://localhost:4000/uploads/${item.image}`}
                  alt={item.title}
                  className="checkout-item-image"
                />

                <div className="checkout-item-info">
                  <h4>{item.title}</h4>
                  <p>
                    {item.selectedSize} · Qty: {item.quantity}
                  </p>
                </div>

                <strong>
                  ${getPriceNumber(item.price) * item.quantity}
                </strong>
              </div>
            ))}

          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>

          <div className="summary-row discount-row">
            <span>Discount (-20%)</span>
            <strong>-${discount}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>${deliveryFee}</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>

        </div>

      </form>

    </div>
  );
};

export default Checkout;