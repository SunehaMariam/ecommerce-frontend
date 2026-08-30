import React from "react";
import Hero from "../../../public/images/hero.jpg";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      
      <div className="hero-content">

        <h1 className="hero-heading">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>

        <p className="hero-description">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <button className="hero-button">
          Shop Now
        </button>

        <div className="hero-stats">

          <div className="hero-stat">
            <h3>200+</h3>
            <p>Happy Clients</p>
          </div>

          <div className="hero-stat">
            <h3>2,000+</h3>
            <p>Products</p>
          </div>

          <div className="hero-stat">
            <h3>30,000+</h3>
            <p>Orders</p>
          </div>

        </div>

      </div>

      <div className="hero-image-container">
        <img
          className="hero-image"
          src={Hero}
          alt="Fashion collection"
        />
      </div>

    </section>
  );
};

export default HeroSection;