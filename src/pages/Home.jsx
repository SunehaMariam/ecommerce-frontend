import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import Banner from "../components/Banner/Banner";
import Product from "../components/Products/Product";
import Button from "../components/Button/Button";
import Grid from "../components/Grid/Grid";
import Testimonial from "../components/Testimonial/Testimonial";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/product/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        console.log("GET API DATA:", data);

        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Navbar />

      <HeroSection />

      <Banner />

      <section className="home-products-section">
  <h1 className="product-section-title">
    New Arrivals
  </h1>

  <div className="home-products-container">
    {products.map((product, index) => (
<Product
  key={product.id}
  id={product.id}   // yahan _id use karo
  title={product.title}
  price={product.price}
  image={`http://localhost:4000/uploads/${product.image}`}
  rating={product.rating}
/>
    ))}
  </div>

  <Button />
</section>


<section className="home-products-section">
  <h1 className="product-section-title">
    Top Selling
  </h1>

  <div className="home-products-container">
    {products.map((product, index) => (
 <Product
  key={product.id}
  id={product.id}   // yahan _id use karo
  title={product.title}
  price={product.price}
  image={`http://localhost:4000/uploads/${product.image}`}
  rating={product.rating}
/>
    ))}
  </div>

  <Button />
</section>
         
    <Grid/>
    <Testimonial/>
    <Footer/>
    </>
  );
};

export default Home;