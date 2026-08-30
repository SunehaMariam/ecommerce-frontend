import React, { useState } from "react";
import "./ProductDetails.css";
import { useCart } from "../../context/CartContext"; // 👈 naya import

const ProductDetails = ({ product }) => {
  const productImage = `https://ecomerce-backend-dun.vercel.app/uploads/${product.image}`;

  const [selectedImage, setSelectedImage] = useState(productImage);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart(); // 👈 naya

  const images = [
    productImage,
    productImage,
    productImage,
  ];

  const colors = ["#4d4934", "#294c4b", "#30334f"];

  const sizes = [
    "Small",
    "Medium",
    "Large",
    "X-Large",
  ];

  const rating = Number(product.rating) || 0;

  // 👇 naya function
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      selectedColor: colors[selectedColor],
      selectedSize: selectedSize,
      quantity: quantity,
    });

  };

  return (
    <div className="product-page">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>

        <span className="arrow">›</span>

        <span>Shop</span>

        <span className="arrow">›</span>

        <span>Men</span>

        <span className="arrow">›</span>

        <span className="current">
          {product.title}
        </span>
      </div>


      <div className="product-container">

        {/* ================= LEFT ================= */}

        <div className="product-gallery">

          {/* Thumbnails */}
          <div className="thumbnail-list">

            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  selectedImage === image
                    ? "active-thumbnail"
                    : ""
                }`}
                onClick={() =>
                  setSelectedImage(image)
                }
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                />
              </div>
            ))}

          </div>


          {/* Main Image */}
          <div className="main-image">

            <img
              src={selectedImage}
              alt={product.title}
            />

          </div>

        </div>


        {/* ================= RIGHT ================= */}

        <div className="product-info">

          {/* Product Title */}
          <h1>
            {product.title}
          </h1>


          {/* Rating */}
          <div className="rating">

            <div className="stars">

              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}

            </div>

            <span className="rating-number">
              {rating}/5
            </span>

          </div>


          {/* Price */}
          <div className="price-row">

            <span className="current-price">
              {product.price}
            </span>

            {/* Agar backend mein oldPrice nahi hai
                to ye values show nahi hongi */}
            {product.oldPrice && (
              <span className="old-price">
                ${product.oldPrice}
              </span>
            )}

            {product.discount && (
              <span className="discount">
                -{product.discount}%
              </span>
            )}

          </div>


          {/* Description */}
          <p className="description">

            {product.description ||
              "This product is perfect for any occasion. Crafted from a soft and comfortable fabric, it offers great comfort and style."}

          </p>


          <div className="divider"></div>


          {/* Colors */}
          <div className="option-section">

            <p className="option-title">
              Select Colors
            </p>

            <div className="color-list">

              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`color ${
                    selectedColor === index
                      ? "selected-color"
                      : ""
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() =>
                    setSelectedColor(index)
                  }
                >
                  {selectedColor === index && "✓"}
                </button>
              ))}

            </div>

          </div>


          <div className="divider"></div>


          {/* Sizes */}
          <div className="option-section">

            <p className="option-title">
              Choose Size
            </p>

            <div className="size-list">

              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${
                    selectedSize === size
                      ? "selected-size"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>
              ))}

            </div>

          </div>


          <div className="divider"></div>


          {/* Bottom Actions */}
          <div className="cart-actions">

            {/* Quantity */}
            <div className="quantity">

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
              >
                +
              </button>

            </div>


            {/* Add Cart */}
            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
