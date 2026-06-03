import React, { useLayoutEffect, useState } from "react";
import AddProduct from "../utility/AdminUtils/AddProduct";
import axios from "axios";
import ProductsList from "../utility/AdminUtils/ProductsList";
import UpdateProduct from "../utility/AdminUtils/UpdateProduct";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState(false);
  const [productsList, setProductsList] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [id, setId] = useState("");
  const [totalusers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const updateProductHandler = async (id) => {
    setId(id);
    setProductsList(false);
    setUpdateProduct(true);
  };

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/totalusers`, {
        headers: { Authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setTotalUsers(res.data.totalUsers);
        setTotalProducts(res.data.totalProducts);
      })
      .catch((err) => navigate("/"));
  };

  useLayoutEffect(() => {
    getData();
  }, [addProduct]);
 return (
  <div className="container py-4">
    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold text-primary">
        <i className="fa-solid fa-user-shield me-2"></i>
        Admin Dashboard
      </h2>

      <Link
        className="btn btn-outline-primary rounded-pill fw-semibold"
        to="/"
      >
        <i className="fa-solid fa-arrow-left me-2"></i>
        Back
      </Link>
    </div>

    {/* Stats Cards */}
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <i className="fa-solid fa-users text-primary fs-1 mb-3"></i>
            <h6 className="text-muted">Total Users</h6>
            <h2 className="fw-bold">{totalusers}</h2>
            <p className="text-secondary small mb-0">
              Number of registered users.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <i className="fa-solid fa-box-open text-success fs-1 mb-3"></i>
            <h6 className="text-muted">Total Products</h6>
            <h2 className="fw-bold">{totalProducts}</h2>
            <p className="text-secondary small mb-0">
              Products available on store.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <i className="fa-solid fa-indian-rupee-sign text-warning fs-1 mb-3"></i>
            <h6 className="text-muted">Sales Today</h6>
            <h2 className="fw-bold">₹1,234</h2>
            <p className="text-secondary small mb-0">
              Today's sales revenue.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="d-flex justify-content-center gap-3 my-5 flex-wrap">
      <button
        className="btn btn-success rounded-pill px-4 shadow-sm fw-semibold"
        onClick={(e) => {
          setProductsList(false);
          setUpdateProduct(false);
          setAddProduct(!addProduct);
        }}
      >
        <i className="fa-solid fa-plus me-2"></i>
        Add Product
      </button>

      <button
        className="btn btn-primary rounded-pill px-4 shadow-sm fw-semibold"
        onClick={(e) => {
          setAddProduct(false);
          setUpdateProduct(false);
          setProductsList(!productsList);
        }}
      >
        <i className="fa-solid fa-list me-2"></i>
        Products List
      </button>
    </div>

    {/* Dynamic Content */}
    <div className="card border-0 shadow-sm rounded-4 p-3">
      {addProduct && (
        <AddProduct setAddProduct={setAddProduct} />
      )}

      {productsList && (
        <ProductsList
          updateProductHandler={updateProductHandler}
        />
      )}

      {updateProduct && (
        <UpdateProduct
          id={id}
          setUpdateProduct={setUpdateProduct}
          setProductsList={setProductsList}
        />
      )}
    </div>
  </div>
);
};

export default AdminDashboard;
