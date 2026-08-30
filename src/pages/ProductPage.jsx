import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import ProductDetails from "../components/ProductDetail/ProductDetails";
import Reviews from "../components/Reviews/Reviews";
import Product from "../components/Products/Product";
import Footer from "../components/Footer/Footer";

const ProductPage = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 naya state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // 👈 fetch shuru hone par true

        const response = await fetch("http://localhost:4000/product/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        console.log("ALL PRODUCTS:", data);
        console.log("URL ID:", id);

        setProducts(data);

        const product = data.find(
          (item) => String(item.id) === String(id)
        );

        console.log("SELECTED PRODUCT:", product);

        setSelectedProduct(product);
      } catch (error) {
        console.log("Products error:", error);
      } finally {
        setLoading(false); // 👈 fetch complete hone par false
      }
    };

    fetchProducts();
  }, [id]);

  // 👇 pehle loading check karo
  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          Loading...
        </div>
      </>
    );
  }

  if (!selectedProduct) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          Product not found...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={selectedProduct} />
      <Reviews />

      <section className="home-products-section">
        <h1 className="product-section-title">Top Selling</h1>

        <div className="home-products-container">
          {products.map((product, index) => (
            <Product
              key={product.id || index}
              id={product.id}
              title={product.title}
              price={product.price}
              image={`http://localhost:4000/uploads/${product.image}`}
              rating={product.rating}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductPage;