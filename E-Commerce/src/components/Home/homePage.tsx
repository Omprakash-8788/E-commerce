import React, { useEffect } from "react";
import "./homePage.css";
import Product from "./productCard";
import MetaData from "../layout/metaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import Footer from "../layout/footer";
import ProductCard from "./productCard";

const HomePage = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  console.log(products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="E-Commerce" />
          <div className="homepage-container">
            <div className="welcome-container">
              <h1>Welcome to Our Store!</h1>
              <p>Find Amazing products below</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur sit amet vestibulum nulla. Donec vel purus at elit
                condimentum bibendum. Sed auctor consectetur malesuada. Etiam
                nec elementum magna.
              </p>
              <a href="#feature-product">
                <button>Click Me</button>
              </a>
            </div>

            <div className="featuredProduct-container" id="feature-product">
              {products &&
                products.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
