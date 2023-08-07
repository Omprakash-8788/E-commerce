import React, { useEffect, useState } from "react";
import "./products.css";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Loader from "../../layout/Loader/loader";
import ProductCard from "../../Home/productCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "../../layout/footer";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {useAlert} from 'react-alert'
import MetaData from "../../layout/metaData";

const categories = ["Cloth", "Laptop", "Machine", "Camera", "Footwear"];

const Products = ({ match }) => {
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  // const [ratings, setRatings] = useState(0);
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const nam = localStorage.getItem("keyword");
  const maxDisplayedPages = Math.ceil(productsCount / resultPerPage);
  const { keywor } = useParams();

  const keyword = keywor;
  const setCurrentPageNo = (e, newPage) => {
    setCurrentPage(newPage);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

  let count = filteredProductsCount;
  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(nam.trim().toLowerCase())
      )
    : [];
  console.log(filteredProducts);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <ProductCard product={product} />
              ))}
          </div>
        </>
      )}

      <div className="filter-box">
        <Typography>Price Filter</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
        />

        <div className="category-box">
          <h2>Categories</h2>
          <ul>
            {categories.map((category) => (
              <li onClick={() => setCategory(category)}>{category}</li>
            ))}
          </ul>
        </div>
{/* 
        <div className="rating-box">
          <Typography component="legend">Rating</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => setRatings(newRating)}
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
            valueLabelDisplay="auto"
          ></Slider>
        </div> */}
      </div>

      <Stack
        spacing={5}
        style={{
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "100px",
          paddingTop: "50px",
        }}
      >
        <Pagination
          size="large"
          page={currentPage}
          count={(resultPerPage, maxDisplayedPages)}
          onChange={setCurrentPageNo}
          variant="outlined"
          shape="rounded"
        />
      </Stack>

      <Footer />
    </>
  );
};
export default Products;
