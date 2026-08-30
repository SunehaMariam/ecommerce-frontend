import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Price string ("$230") ko number mein convert karne ke liye
  const getPriceNumber = (price) => {
    return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
  };

  const increaseQuantity = (item) => {
    updateQuantity(
      item.id,
      item.selectedSize,
      item.selectedColor,
      item.quantity + 1
    );
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(
        item.id,
        item.selectedSize,
        item.selectedColor,
        item.quantity - 1
      );
    }
  };

  const removeItem = (item) => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + getPriceNumber(item.price) * item.quantity,
    0
  );

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <>
      <div className="cart-page">

        {/* Breadcrumb */}
        <div className="cart-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Cart</span>
        </div>

        {/* Heading */}
        <h1 className="cart-title">YOUR CART</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* LEFT SIDE */}
            <div className="cart-items">

              {cartItems.map((item, index) => (
                <div
                  className="cart-item"
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                >

                  {/* Product Image */}
                  <div className="cart-product-image">
                    <img
                      src={`http://localhost:4000/uploads/${item.image}`}
                      alt={item.title}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="cart-product-details">

                    <div className="cart-product-top">
                      <h3>{item.title}</h3>

                      <button
                        className="delete-btn"
                        onClick={() => removeItem(item)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>

                    <p>
                      Size: <span>{item.selectedSize}</span>
                    </p>

                    <p>
                      Color:{" "}
                      <span
                        style={{
                          display: "inline-block",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          backgroundColor: item.selectedColor,
                          verticalAlign: "middle",
                        }}
                      ></span>
                    </p>

                    <div className="cart-product-bottom">

                      <strong>
                        ${getPriceNumber(item.price) * item.quantity}
                      </strong>

                      <div className="quantity-control">
                        <button onClick={() => decreaseQuantity(item)}>
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQuantity(item)}>
                          +
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* RIGHT SIDE */}
            <div className="order-summary">

              <h2>Order Summary</h2>

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

              {/* Promo */}
              <div className="promo-section">

                <div className="promo-input-wrapper">

                  <i className="fa-solid fa-tag"></i>

                  <input
                    type="text"
                    placeholder="Add promo code"
                  />

                </div>

                <button className="apply-btn">
                  Apply
                </button>

              </div>

              {/* Checkout */}
              <Link to="/checkout" className="checkout-btn">
                <span>Go to Checkout</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>

            </div>

          </div>
        )}

      </div>
    </>
  );
};

export default Cart;