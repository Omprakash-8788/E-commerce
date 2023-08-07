import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Search from "../productDetail/Search/search";
import {  useSelector } from "react-redux";

const Header = () => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  return (
    <>
      <div>
        <header className="bg-gray-800 py-10">
          <div className="container mx-auto ">
            <nav className="flex justify-between items-center content-center">
              <div className="text-white font-bold text-3xl">Logo</div>
              <div style={{ width: "100%" }}>
                <Search />
              </div>
              <div className="space-x-10 text-2xl">
                <NavLink to="/" className="text-white hover:text-gray-400">
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className="text-white hover:text-gray-400"
                >
                  Products
                </NavLink>
                <NavLink to="/" className="text-white hover:text-gray-400">
                  Shop
                </NavLink>
                <NavLink to="/" className="text-white hover:text-gray-400">
                  About
                </NavLink>
               {isAuthenticated ? <h2>Dashboard</h2> :  <NavLink to="/login" className="text-white hover:text-gray-400">
                  Login
                </NavLink>}
                {/* {isAuthenticated && <h2>LOggedin</h2>} */}
              </div>
            </nav>
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
