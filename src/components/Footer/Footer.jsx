import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Newsletter Banner */}
      <div className="newsletter">
        <div className="newsletter-title">
          <h2>STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS</h2>
        </div>

        <div className="newsletter-form">
          <div className="email-box">
            <span>✉</span>
            <input
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <button>
            Subscribe to Newsletter
          </button>
        </div>
      </div>


      {/* Main Footer */}
      <div className="footer-content">

        {/* Brand */}
        <div className="footer-brand">
          <h2>SHOP.CO</h2>

          <p>
            We have clothes that suits your style and
            which you're proud to wear. From
            women to men.
          </p>

          <div className="social-icons">
            <span>●</span>
            <span>f</span>
            <span>◎</span>
            <span>p</span>
          </div>
        </div>


        {/* Company */}
        <div className="footer-column">
          <h4>COMPANY</h4>

          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Works</a>
          <a href="#">Career</a>
        </div>


        {/* Help */}
        <div className="footer-column">
          <h4>HELP</h4>

          <a href="#">Customer Support</a>
          <a href="#">Delivery Details</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>


        {/* FAQ */}
        <div className="footer-column">
          <h4>FAQ</h4>

          <a href="#">Account</a>
          <a href="#">Manage Deliveries</a>
          <a href="#">Orders</a>
          <a href="#">Payments</a>
        </div>


        {/* Resources */}
        <div className="footer-column">
          <h4>RESOURCES</h4>

          <a href="#">Free eBooks</a>
          <a href="#">Development Tutorial</a>
          <a href="#">How to - Blog</a>
          <a href="#">Youtube Playlist</a>
        </div>

      </div>


      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          Shop.co © 2000-2023, All Rights Reserved
        </p>

        <div className="payment-methods">
          <span className="visa">VISA</span>
          <span className="master">●●</span>
          <span className="paypal">PayPal</span>
          <span className="apple">Pay</span>
          <span className="gpay">G Pay</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;