import React, { useEffect, useState } from "react";
import "./CatalogPage.css";

// =========================================
// CONSTANTS
// =========================================

const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];
const COLORS = [
  "#22c55e", // green
  "#ef4444", // red
  "#eab308", // yellow
  "#f97316", // orange
  "#38bdf8", // blue
  "#2563eb", // blue (checked in screenshot)
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#ffffff", // white
  "#111827", // black
];

const MIN_PRICE = 0;
const MAX_PRICE = 200;

// =========================================
// RATING STARS
// =========================================

const RatingStars = ({ rating }) => {
  const value = Number(rating) || 0;

  return (
    <div className="catalog-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.floor(value)
              ? "rating-star active"
              : star - value < 1
              ? "rating-star half"
              : "rating-star"
          }
        >
          ★
        </span>
      ))}

      <span className="rating-number">{value}/5</span>
    </div>
  );
};

// =========================================
// PRODUCT CARD
// =========================================

const ProductCard = ({ product }) => {
  return (
    <div className="catalog-product-card">
      <div className="catalog-product-image">
        <img
          src={`https://ecomerce-backend-dun.vercel.app/uploads/${product.image}`}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <h3>{product.title}</h3>

      <RatingStars rating={product.rating} />

      <div className="catalog-price">
        <span className="current-price">${product.price}</span>

        {product.originalPrice && (
          <span className="original-price">${product.originalPrice}</span>
        )}

        {product.discount && (
          <span className="discount">{product.discount}</span>
        )}
      </div>
    </div>
  );
};

// =========================================
// FILTER SIDEBAR
// =========================================

const FilterSidebar = ({ filters, setFilters, onApply }) => {
  const {
    category,
    priceMin,
    priceMax,
    colors,
    size,
    dressStyle,
  } = filters;

  const toggleColor = (color) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handlePriceMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceMax - 1);
    setFilters((prev) => ({ ...prev, priceMin: value }));
  };

  const handlePriceMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceMin + 1);
    setFilters((prev) => ({ ...prev, priceMax: value }));
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h2>Filters</h2>
        <span>⚙</span>
      </div>

      {/* Categories */}
      <div className="filter-section">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className={
              "filter-list-item" + (category === cat ? " active" : "")
            }
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                category: prev.category === cat ? "" : cat,
              }))
            }
          >
            <span>{cat}</span>
            <span>&gt;</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="filter-section">
        <div className="filter-section-title">
          <h3>Price</h3>
          <span>▲</span>
        </div>

        <div className="price-slider">
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceMin}
            onChange={handlePriceMinChange}
            className="price-range-input"
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceMax}
            onChange={handlePriceMaxChange}
            className="price-range-input"
          />
          <div className="price-slider-track">
            <div
              className="price-slider-range"
              style={{
                left: `${(priceMin / MAX_PRICE) * 100}%`,
                right: `${100 - (priceMax / MAX_PRICE) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="price-values">
          <span>${priceMin}</span>
          <span>${priceMax}</span>
        </div>
      </div>

      {/* Colors */}
      <div className="filter-section">
        <div className="filter-section-title">
          <h3>Colors</h3>
          <span>▲</span>
        </div>

        <div className="color-swatches">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={
                "color-swatch" +
                (colors.includes(color) ? " selected" : "") +
                (color === "#ffffff" ? " outline" : "")
              }
              style={{ backgroundColor: color }}
              onClick={() => toggleColor(color)}
            >
              {colors.includes(color) && (
                <span className="color-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="filter-section">
        <div className="filter-section-title">
          <h3>Size</h3>
          <span>▲</span>
        </div>

        <div className="size-pills">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              className={"size-pill" + (size === s ? " active" : "")}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  size: prev.size === s ? "" : s,
                }))
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="filter-section">
        <div className="filter-section-title">
          <h3>Dress Style</h3>
          <span>▲</span>
        </div>

        {DRESS_STYLES.map((style) => (
          <div
            key={style}
            className={
              "filter-list-item" + (dressStyle === style ? " active" : "")
            }
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                dressStyle: prev.dressStyle === style ? "" : style,
              }))
            }
          >
            <span>{style}</span>
            <span>&gt;</span>
          </div>
        ))}
      </div>

      <button className="apply-filter" onClick={onApply}>
        Apply Filter
      </button>
    </aside>
  );
};

// =========================================
// CATALOG PAGE
// =========================================

const DEFAULT_FILTERS = {
  category: "",
  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
  colors: [],
  size: "",
  dressStyle: "",
};

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("popular");

  // Draft filters = what the sidebar shows while the user is picking
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);
  // Applied filters = only updated when "Apply Filter" is clicked
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  // =========================================
  // GET PRODUCTS FROM BACKEND
  // =========================================

  useEffect(() => {
    const getCatalogProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://ecomerce-backend-dun.vercel.app/catalog/products");

        if (!response.ok) {
          throw new Error("Failed to fetch catalog products");
        }

        const data = await response.json();

        console.log("CATALOG PRODUCTS:", data);

        // In case backend sends { products: [...] }
        const productData = Array.isArray(data) ? data : data.products || [];

        setProducts(productData);
      } catch (error) {
        console.error("Catalog error:", error);
        setError("Products load nahi ho rahe");
      } finally {
        setLoading(false);
      }
    };

    getCatalogProducts();
  }, []);

  // =========================================
  // APPLY FILTERS
  // =========================================

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const filteredProducts = products.filter((product) => {
    const {
      category,
      priceMin,
      priceMax,
      colors,
      size,
      dressStyle,
    } = appliedFilters;

    // Category — only checked if the product actually has a category field
    if (category && product.category && product.category !== category) {
      return false;
    }

    // Price
    const price = Number(product.price) || 0;
    if (price < priceMin || price > priceMax) {
      return false;
    }

    // Colors — product.colors expected to be an array of hex strings
    if (colors.length > 0 && Array.isArray(product.colors)) {
      const hasMatch = product.colors.some((c) => colors.includes(c));
      if (!hasMatch) return false;
    }

    // Size — product.sizes expected to be an array of size strings
    if (size && Array.isArray(product.sizes) && !product.sizes.includes(size)) {
      return false;
    }

    // Dress style
    if (
      dressStyle &&
      product.dressStyle &&
      product.dressStyle !== dressStyle
    ) {
      return false;
    }

    return true;
  });

  // =========================================
  // SORT PRODUCTS
  // =========================================

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") {
      return Number(a.price) - Number(b.price);
    }

    if (sort === "high") {
      return Number(b.price) - Number(a.price);
    }

    // Most popular
    return Number(b.rating || 0) - Number(a.rating || 0);
  });

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return <div className="catalog-message">Loading products...</div>;
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return <div className="catalog-message error">{error}</div>;
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="catalog-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <span>Home</span>
        <span>&gt;</span>
        <span className="breadcrumb-current">
          {appliedFilters.category || appliedFilters.dressStyle || "Casual"}
        </span>
      </nav>

      <div className="catalog-layout">
        {/* =====================================
            SIDEBAR
        ===================================== */}

        <FilterSidebar
          filters={draftFilters}
          setFilters={setDraftFilters}
          onApply={applyFilters}
        />

        {/* =====================================
            PRODUCTS
        ===================================== */}

        <main className="catalog-main">
          <div className="catalog-header">
            <h1>{appliedFilters.category || appliedFilters.dressStyle || "Casual"}</h1>

            <div className="catalog-sort">
              <span>
                Showing 1-{sortedProducts.length} of {sortedProducts.length}{" "}
                Products
              </span>

              <span>Sort by:</span>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="low">Low to High Price</option>
                <option value="high">High to Low Price</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="catalog-product-grid">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))
            ) : (
              <div className="catalog-message">No products found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
