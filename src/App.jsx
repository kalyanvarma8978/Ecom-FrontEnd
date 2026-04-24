import React from 'react'
import Navbar from './layouts/navbar/Navbar'
import MainLayout from './layouts/MainLayout'
import ProductCard from "./components/ProductCard";
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';


const App = () => {
  return (
   <MainLayout>
   <Routes>
    <Route path={'/'} element={<Home/>}/>
    <Route path={'/product/:slug'} element={<ProductDetails/>}/>
   </Routes>
   </MainLayout>
  )
}

export default App
