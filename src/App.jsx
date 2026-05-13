import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'

import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

const Dashboard = () => {
  return <h1 className='text-3xl font-bold p-6'>Dashboard Page</h1>
}

const App = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (

    <div>

      {/* Global Navbar */}
      <Navbar searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Routes */}
      <Routes>

        {/* Home Page */}
        <Route

          path="/"
          element={<Home searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory} />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Signin Page */}
        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
        path='/product/:slug'
        element={<ProductDetails/>}
        />
        <Route
        path='/cart'
        element={<Cart/>}
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </div>

  )

}

export default App