import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const auth = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const searchProduct = async (e) => {
    setSearchValue(e.target.value);
    const value = e.target.value;
    if (value.length <= 0) setSearchStatus(false);
    else {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/products/searchalgorithms`, {
          headers: { Authorization: "bearer " + localStorage.getItem("token") },
          params: { value },
        })
        .then((res) => {
          setSearchedProducts(res.data.product);
        })
        .catch((err) => navigate('/'));
      setSearchStatus(true);
    }
  };

  return (
 <header className="w-100">
  <div style={{ height: "75px" }}></div>

  <div
    className="bg-white shadow-sm border-bottom position-fixed top-0 w-100 z-3"
    style={{
      backdropFilter: "blur(8px)",
    }}
  >
    <div className="container">
      <div className="row align-items-center py-2">
        {/* Logo */}
        <div className="col-2 text-start">
          <Link to="/">
            <img
              src={require("../static/eCommerce-logo.jpg")}
              alt="logo"
              className="rounded-circle shadow border border-2 border-primary"
              style={{
                height: "55px",
                width: "55px",
                objectFit: "cover",
              }}
            />
          </Link>
        </div>

        {/* Search */}
        <div className="col-7 col-md-4 text-center">
          <form className="d-flex justify-content-center">
            <input
              className="form-control rounded-pill shadow-sm"
              type="search"
              onMouseOut={() => {
                if (searchValue.length < 1) setSearchStatus(false);
              }}
              placeholder="🔍 Search products..."
              aria-label="Search"
              value={searchValue}
              onChange={(e) => searchProduct(e)}
            />
          </form>
        </div>

        {/* Admin/Login */}
        <div className="col-md-4 text-end d-none d-md-block">
          {auth ? (
            <>
              <Link
                to="/admin"
                className="btn btn-info text-dark fw-bold rounded-pill px-3 me-2"
              >
                <i className="fa-solid fa-user-shield me-1"></i>
                Admin
              </Link>

              <Link
                onClick={(e) => logout()}
                className="btn btn-danger fw-bold rounded-pill px-3"
              >
                <i className="fa-solid fa-right-from-bracket me-1"></i>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-info text-dark fw-bold rounded-pill px-3 me-2"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-danger fw-bold rounded-pill px-3"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Cart */}
        <div className="text-end col-3 col-md-2">
          <Link
            to="/cart"
            className="btn btn-outline-dark fw-bold rounded-pill px-3 shadow-sm"
          >
            <i className="fa-solid fa-cart-shopping me-1"></i>
            Cart ({data.length})
          </Link>
        </div>
      </div>
    </div>

    {/* Search Result */}
    {searchStatus && (
      <div
        className="border bg-white rounded-4 shadow-lg position-absolute col-12 col-md-8 col-lg-6 mx-auto col-sm-10 ms-sm-5 overflow-auto p-3"
        style={{
          height: "320px",
          marginTop: "5px",
        }}
      >
        {searchedProducts.length === 0 && (
          <h4 className="text-center text-secondary mt-5">
            No Result Found 😔
          </h4>
        )}

        {searchedProducts.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSearchValue("");
              setSearchStatus(false);
              navigate("/");

              setTimeout(() => {
                navigate(`/search/${item._id}`);
              }, 1);
            }}
          >
            <div
              className="p-2 border rounded-3 m-2 d-flex align-items-center shadow-sm"
              style={{
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              <img
                src={item.imgPath}
                alt={idx}
                className="rounded shadow-sm border"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                }}
              />

              <div className="ms-3 w-100">
                <span className="badge bg-primary mb-2">
                  {item.category}
                </span>

                <h6 className="fw-bold mb-2">
                  {item.title}
                </h6>

                <div className="d-flex gap-2 align-items-center">
                  <span className="fw-bold text-success">
                    ₹
                    {item.price -
                      (item.price / 100) * item.discount}
                  </span>

                  <span className="text-decoration-line-through text-muted">
                    ₹{item.price}
                  </span>

                  <span className="badge bg-danger">
                    {item.discount}% OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</header>
  );
};

export default Header;
