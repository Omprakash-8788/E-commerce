import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, BrowserRouter, NavLink } from "react-router-dom";

import LandingPage from "./components/landingPage";
import Header from "./components/layout/header.tsx";
import Footer from "./components/layout/footer.tsx";
import HomePage from "./components/Home/homePage.tsx";
import ProductDetails from "./components/productDetail/productDetails.tsx";
import Products from "./components/productDetail/products/products.tsx";
import LoginSignUp from "./components/User/loginSignUp.tsx";
import store from "./store.tsx";
import { loadUser } from "./actions/userAction.tsx";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/userOptions.tsx";
const App = () => {

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );


  useEffect(() => {
    store.dispatch(loadUser());
    console.log('testing')
  }, []);
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keywords" element={<Products />} />
            <Route path="/login" element={<LoginSignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
