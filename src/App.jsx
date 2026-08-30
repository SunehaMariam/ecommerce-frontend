import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Product from './pages/ProductPage'
import Sale from './pages/Sale'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext' // 👈 naya import
import CheckoutPage from './pages/CheckoutPage'

const App = () => {
  return (
    <CartProvider>   {/* 👈 sab kuch isse wrap kar diya */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/products/:id" element={<Product />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sale" element={<Sale/>}/>
      </Routes>
    </CartProvider>
  )
}

export default App