import React from "react";
import { Link } from "react-router-dom";

const CategoriesFilter = () => {
  return (
    <div
      className="w-100 px-4 py-3 bg-white rounded-4 shadow-sm border d-flex justify-content-between overflow-x-auto"
      style={{
        scrollbarWidth: "none",
        whiteSpace: "nowrap",
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/topoffer" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Top_Offers.webp")}
            alt="TopOffers"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Top Offers</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/mobile" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Mobile_&_Tablets.webp")}
            alt="Mobile"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Mobiles</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/appliances" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/TVs_&_Appliances.webp")}
            alt="Appliances"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Appliances</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/electronics" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Electronics.webp")}
            alt="Electronics"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Electronics</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/fashion" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Fashion.webp")}
            alt="Fashion"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Fashion</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/beauty" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Beauty.webp")}
            alt="Beauty"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Beauty</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/kitchen" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Home_&_Kitchen.webp")}
            alt="Kitchen"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Kitchen</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/furniture" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Furniture.webp")}
            alt="Furniture"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Furniture</h6>
        </Link>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center mx-2">
        <Link to="/singleproduct/grocery" className="text-decoration-none text-dark text-center">
          <img
            src={require("../../static/categories/Grocery.webp")}
            alt="Grocery"
            className="rounded-circle shadow-sm border p-1 bg-light"
            style={{ width: "65px", height: "65px", objectFit: "cover" }}
          />
          <h6 className="mt-2 fw-semibold small">Grocery</h6>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesFilter;