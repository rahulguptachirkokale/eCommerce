import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import HomeCart from "../utility/HomeUtils/HomeCart";
import { Link } from "react-router-dom";

const Categories = () => {
  const [items, setItems] = useState([]);
const [orderStatus,setOrderStatus] = useState(false)
  const loaderRef = useRef(null);


const order = ()=>{
  setOrderStatus(true)
  setTimeout(() => {
    setOrderStatus(false)
  }, 1500);
}
// get product 
  const GetProduct = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/products/singleproduct/${
        window.location.pathname.split("/")[2]
      }`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}}
    );
    loaderRef.current.classList.add("d-none");
    setItems(res.data);
  };

  useEffect(() => {
    GetProduct();
  }, []);
 return (
  <div className="container py-3">

    {/* Back Button */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <Link
        to="/"
        className="btn btn-dark rounded-pill px-4 shadow-sm"
      >
        <i className="fa-solid fa-arrow-left me-2"></i>
        Back
      </Link>

      <span className="badge bg-primary fs-6 px-3 py-2">
        {items.length} Products
      </span>
    </div>

    {/* Success Alert */}
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
    <div id="loader" className="w-100 py-4" ref={loaderRef}>
      <div className="loader m-auto"></div>
    </div>

    {/* Category Header */}
    <div className="bg-light rounded-4 shadow-sm p-4 mb-4 text-center">
      <h2 className="fw-bold text-capitalize mb-2">
        {window.location.pathname.split("/")[2]}
      </h2>

      <p className="text-muted mb-0">
        Explore the best products available in this category
      </p>
    </div>

    {/* Products Grid */}
    <div className="row g-4">
      {items && items.length > 0 ? (
        items.map((item, idx) => (
          <div
            key={idx}
            className="col-6 col-md-4 col-lg-3 col-xl-2"
          >
            <div className="h-100">
              <HomeCart
                image={item.imgPath}
                category={item.category}
                title={item.title}
                price={item.price}
                discount={item.discount}
                order={order}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
          <div className="card border-0 shadow rounded-4 text-center py-5">
            <div className="card-body">
              <i className="fa-solid fa-box-open fa-4x text-secondary mb-3"></i>

              <h3 className="fw-bold">
                No Products Found
              </h3>

              <p className="text-muted">
                Products are currently unavailable in this category.
              </p>

              <Link
                to="/"
                className="btn btn-primary rounded-pill px-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>

  </div>
);
};

export default Categories;
