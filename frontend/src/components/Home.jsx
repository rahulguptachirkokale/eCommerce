import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import CategoriesPages from "../utility/HomeUtils/CategoriesPages";
import HomeCart from "../utility/HomeUtils/HomeCart";
import FilterMenu from "../utility/HomeUtils/FilterMenu";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9,1,1,1,1,1,1,1,1,1,1];
  const [items, setItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState(false);
  const loaderRef = useRef(null);
  const token = localStorage.getItem("token");

  const order = () => {
    setOrderStatus(true);
    setTimeout(() => {
      setOrderStatus(false);
    }, 1500);
  };
  // get product
  const GetProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/product`, {
        headers: { Authorization: "bearer " + token },
      })
      .then((res) => {
        loaderRef.current.classList.add("d-none");
        setItems(res.data);
        setTempItems(res.data);
      })
      .catch((err) => navigate("/login"));
  };

  // productFilter

  const FilterHandler = (categories, value) => {
    let temporaryItems = [];
    const allCategory = [
      "mobile",
      "appliances",
      "electronics",
      "fashion",
      "beauty",
      "kitchen",
      "furniture",
      "grocery",
    ];
    categories.forEach((singleCategories, idx) => {
      if (singleCategories) {
        let newitems = items.filter(
          (item) =>
            item.category.toLowerCase() === allCategory[idx] &&
            item.price - (item.price / 100) * item.discount <= value
        );

        newitems.forEach((item) => temporaryItems.push(item));
      }
    });
    setTempItems(temporaryItems);
  };

  useEffect(() => {
    GetProduct();
  }, []);
  return (
  <div className="container-fluid py-4 bg-light min-vh-100">
    
    {/* Categories Section */}
    <div className="mb-4">
      <CategoriesPages />
    </div>

    {/* Filter Section */}
    <div className="bg-white rounded-4 shadow-sm p-3 mb-4">
      <FilterMenu FilterHandler={FilterHandler} />
    </div>

    {/* Success Alert */}
    {orderStatus && (
      <div
        className="alert alert-success text-center fw-bold shadow-sm border-0 rounded-3 mb-4"
        role="alert"
      >
        ✅ Order Placed Successfully!
      </div>
    )}

    {/* Loader */}
    <div
      id="loader"
      className="w-100 py-5 text-center"
      ref={loaderRef}
    >
      <div className="loader mx-auto"></div>
    </div>

    {/* Product Grid */}
    <div className="row g-4">
      {tempItems.map((item, idx) => (
        <div
          key={idx}
          className="col-6 col-md-4 col-lg-3 col-xl-2"
        >
          <div className="h-100">
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
        </div>
      ))}
    </div>
  </div>
);
};

export default Home;
