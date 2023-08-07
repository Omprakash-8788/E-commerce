import { useState } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter, NavLink } from "react-router-dom";

import LandingPage from "./components/landingPage";
import Header from './components/layout/header.tsx'
import Footer from "./components/layout/footer.tsx";
import HomePage from "./components/Home/homePage.tsx";
import ProductDetails from "./components/productDetail/productDetails.tsx";
import Products from "./components/productDetail/products/products.tsx";
import LoginSignUp from "./components/User/loginSignUp.tsx";

const App =() => {
  return (
   <div>
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<Header />}>
       <Route index element={<HomePage />} />
       <Route  path="/product/:id" element={<ProductDetails />} />
       <Route  path="/products" element={<Products />} />
       <Route path="/products/:keywords" element={<Products/>} />
       <Route path="/login" element={<LoginSignUp/>} />


     </Route>
   </Routes>
 </BrowserRouter></div>
  );
}

export default App;
