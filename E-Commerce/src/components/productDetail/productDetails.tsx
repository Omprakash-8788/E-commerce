import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReviewCard from "./reviewCard";
import Footer from "../layout/footer";
import Loader from "../layout/Loader/loader";
import {useAlert} from 'react-alert';
import MetaData from "../layout/metaData";

const ProductDetails = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state: any) => state.productDetails
  );


  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
   <>
   {loading ? <Loader/> :  <>
    <MetaData title={`${product.name} -- ECOMMERCE` }/>
      <div className="productDetails">
        <div className="product-image">
          <div>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="carouselImage"
                  src={item.url}
                  alt={`${i}Slide`}
                  key={item.url}
                />
              ))}
          </div>
        </div>

        <div className="details-blocks">
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <span>{product.numOfReviews} Reviews</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detaildBlock-3-1-1">
                <button>-</button>
                <input type="number" name="" id="" value="1" />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
            </div>
            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button className="submitReview">Submit Reviews</button>
        </div>
      </div>

    <div className="review-container">
    <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews.map((review) => <ReviewCard  review = {review}/>)}

        </div>
      ):(
        <p className="noReviews">No Reviews</p>
      )}
    </div>
    <Footer/>
    </>}
   </>
  );
};

export default ProductDetails;
