import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import "./Navbar.css"

const Navbar = () => {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false); 

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav>
        <h1 className="hero-title">
          SHOP.CO
        </h1>
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/sale" onClick={closeMenu}>On sale</Link></li>

          <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
            <li><Link to="/checkout" onClick={closeMenu}>Checkout</Link></li>
        </ul>

        <input
          type="search"
          name="search"
          placeholder="Search for products"
        />

        <div className="nav-icons">

          <Link to="/cart" className="cart-icon-wrapper">
            <i className="fa-solid fa-cart-shopping"></i>

            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          <i className="fa-solid fa-circle-user"></i>

        </div>

      </nav>
    </>
  )
}

export default Navbar