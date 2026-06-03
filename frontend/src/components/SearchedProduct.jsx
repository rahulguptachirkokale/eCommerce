import React, { useEffect, useState, useRef } from "react";
import HomeCart from "../utility/HomeUtils/HomeCart";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const SearchedProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [tempItems, setTempItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const loaderRef = useRef(null);

  // order
  const order = () => {
    setOrderStatus(true);
    setTimeout(() => {
      setOrderStatus(false);
    }, 1500);
  };

  // get product
  const GetProduct = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/products/searchedproduct/${
          window.location.pathname.split("/")[2]
        }`,
        {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => {
        loaderRef.current.classList.add("d-none");
        setProduct(res.data.product);
        setTempItems(res.data.allProducts);
      })
      .catch((err) => navigate("/"));
  };
  useEffect(() => {
    GetProduct();
  }, []);
 return (
  <div className="container py-3">

    {/* Back Button */}
    <Link
      to="/"
      className="btn btn-dark rounded-pill px-4 shadow-sm mb-3"
    >
      <i className="fa-solid fa-arrow-left me-2"></i>
      Back
    </Link>

    {/* Order Success */}
    {orderStatus && (
      <div
        className="alert alert-success text-center fw-bold shadow border-0 rounded-3"
        role="alert"
      >
        <i className="fa-solid fa-circle-check me-2"></i>
        Order Placed Successfully!
      </div>
    )}

    {/* Loader */}
    <div id="loader" className="w-100 fw-bold p-3" ref={loaderRef}>
      <div className="loader m-auto"></div>
    </div>

    {/* Product Details */}
    {product && (
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <div className="row g-0">

          {/* Image */}
          <div className="col-md-5 p-3">
            <div className="bg-light rounded-4 p-4 text-center h-100 d-flex align-items-center justify-content-center">
              <img
                src={product.imgPath}
                alt="product"
                className="img-fluid rounded-4"
                style={{
                  maxHeight: "350px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="col-md-7">
            <div className="card-body p-4 p-lg-5">

              <span className="badge bg-primary mb-3 px-3 py-2">
                {product.category}
              </span>

              <h2 className="fw-bold mb-3">
                {product.title}
              </h2>

              <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
                <h2 className="text-success fw-bold m-0">
                  ₹
                  {(
                    product.price -
                    (product.price / 100) * product.discount
                  ).toFixed(0)}
                </h2>

                <h5 className="text-muted text-decoration-line-through m-0">
                  ₹{product.price}
                </h5>

                <span className="badge bg-danger fs-6">
                  {product.discount}% OFF
                </span>
              </div>

              <div className="mb-3">
                <span className="text-success fw-bold">
                  <i className="fa-solid fa-truck-fast me-2"></i>
                  Free Delivery Available
                </span>
              </div>

              <div className="mb-4">
                <span className="text-warning">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </span>

                <span className="ms-2 text-muted">
                  4.0 Customer Ratings
                </span>
              </div>

              <div className="row g-3">
                <div className="col-sm-6">
                  <button
                    className="btn btn-warning btn-lg w-100 fw-bold shadow-sm"
                    onClick={() => dispatch(add(product))}
                  >
                    <i className="fa-solid fa-cart-plus me-2"></i>
                    Add To Cart
                  </button>
                </div>

                <div className="col-sm-6">
                  <button
                    className="btn btn-success btn-lg w-100 fw-bold shadow-sm"
                    onClick={() => order()}
                  >
                    <i className="fa-solid fa-bag-shopping me-2"></i>
                    Buy Now
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )}

    {/* Similar Products Heading */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h3 className="fw-bold">
        Similar Products
      </h3>

      <span className="badge bg-secondary">
        {tempItems.length} Products
      </span>
    </div>

    {/* Similar Products */}
    <div className="row g-3">
      {tempItems.map((item, idx) => (
        <div
          key={idx}
          className="col-6 col-md-4 col-lg-3 col-xl-2"
        >
          <HomeCart
            category={item.category}
            title={item.title}
            price={item.price}
            discount={item.discount}
            image={item.imgPath}
            id={item._id}
            order={order}
          />
        </div>
      ))}
    </div>

  </div>
);
};

export default SearchedProduct;
