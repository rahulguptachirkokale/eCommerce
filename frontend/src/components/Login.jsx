import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [passView, setPassView] = useState(0);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    setError("");
    if (mobile.length < 10 || mobile.length > 10)
      setError("Please enter a valid Mobile Number");
    else if (password.length < 6)
      setError("Password must be at least 6 Digiits");
    else {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
          params: { mobile, password },
        })
        .then((res) => {
          localStorage.setItem('token',res.data?.token)
          navigate('/');
        })
        .catch((err) => {
          setError(err.response.data.message)
        });
    }
  };
 return (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center py-5"
    style={{
      background:
        "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #3b82f6 100%)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="row g-0">

              {/* Login Form */}
              <div className="col-lg-6">
                <div className="card-body p-5 bg-white h-100">

                  <div className="text-center mb-4">
                    <img
                      src={require("../static/eCommerce-logo.jpg")}
                      alt="logo"
                      className="rounded-circle shadow border mb-3"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                    />

                    <h2 className="fw-bold">Welcome Back 👋</h2>
                    <p className="text-muted">
                      Login to continue shopping
                    </p>
                  </div>

                  <form>
                    {/* Mobile */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Mobile Number
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-solid fa-phone"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Password
                      </label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-solid fa-lock"></i>
                        </span>

                        <input
                          type={passView ? "text" : "password"}
                          className="form-control form-control-lg"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setPassView(!passView)}
                        >
                          <i
                            className={
                              passView
                                ? "fa-regular fa-eye"
                                : "fa-regular fa-eye-slash"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="alert alert-danger py-2">
                        <i className="fa-solid fa-circle-exclamation me-2"></i>
                        {error}
                      </div>
                    )}

                    {/* Login Button */}
                    <button
                      type="button"
                      className="btn btn-primary btn-lg w-100 fw-bold rounded-3 shadow"
                      onClick={(e) => loginHandler(e)}
                    >
                      <i className="fa-solid fa-right-to-bracket me-2"></i>
                      Login
                    </button>

                    <div className="text-center mt-4">
                      <span className="text-muted">
                        Don't have an account?
                      </span>

                      <Link
                        to="/register"
                        className="text-primary fw-bold ms-2 text-decoration-none"
                      >
                        Register Now
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Side */}
              <div
                className="col-lg-6 d-none d-lg-flex align-items-center"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                }}
              >
                <div className="text-white p-5">
                  <h2 className="fw-bold mb-4">
                    MyShop E-Commerce
                  </h2>

                  <p className="fs-5">
                    Discover amazing products, best offers and
                    seamless shopping experience.
                  </p>

                  <div className="mt-4">
                    <div className="mb-3">
                      <i className="fa-solid fa-circle-check me-2"></i>
                      Secure Shopping
                    </div>

                    <div className="mb-3">
                      <i className="fa-solid fa-circle-check me-2"></i>
                      Fast Delivery
                    </div>

                    <div>
                      <i className="fa-solid fa-circle-check me-2"></i>
                      Premium Products
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center text-white mt-3">
            © {new Date().getFullYear()} MyShop. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
