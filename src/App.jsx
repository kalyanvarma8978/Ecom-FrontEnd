import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'

import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import OrderDetails from './pages/OrderDetails'
import Profile from './pages/Profile'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (

    <div>

      {/* Global Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Toaster
      position='top-center'
      reverseOrder={false}
       />

      {/* Routes */}
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <Home
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Signin */}
        <Route
          path="/signin"
          element={<Signin />}
        />

        {/* Product Details */}
        <Route
          path='/product/:slug'
          element={<ProductDetails />}
        />

        {/* Protected Cart */}
        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Protected Checkout */}
        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Protected Order Success */}
        <Route
          path='/order-success'
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path='/orders'
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }

        />
        <Route
          path='/orders/:id'
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>

  )

}

export default App