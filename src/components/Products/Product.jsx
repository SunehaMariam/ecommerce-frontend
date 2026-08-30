import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

const Product = ({ id, image, title, price, rating }) => {

  const navigate = useNavigate();

  const handleProductClick = () => {
    console.log("Clicked Product ID:", id);
    console.log("Clicked Product Image:", image);

    navigate(`/products/${id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleProductClick}
    >

      <div className="product-image-box">
        <img
          className="product-image"
          src={image}
          alt={title}
        />
      </div>

      <h3 className="product-title">
        {title}
      </h3>

      <p className="product-price">
        {price}
      </p>

      <div className="rating">

        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "star active"
                : "star"
            }
          >
            ★
          </span>
        ))}

      </div>

    </div>
  );
};

export default Product;