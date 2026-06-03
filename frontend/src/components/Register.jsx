import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [passView, setPassView] = useState(0);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName) setError("Please Enter Full Name");
    else if (mobile.length > 10 || mobile.length < 10)
      setError("Please Enter a Valid Mobile Number");
    else if (password.length < 6)
      setError("Password should be at least 6 digits");
    else if (password !== password2) setError("Password not matched");
    else {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
          fullName,
          mobile,
          password,
        })
        .then((res) => {
          localStorage.setItem('token',res.data.token)
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
        "linear-gradient(135deg,#0f172a,#1e293b,#3b82f6)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">

          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div className="card-body p-5">

              {/* Logo */}
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

                <h2 className="fw-bold mb-2">
                  Create Account
                </h2>

                <p className="text-muted">
                  Join MyShop and start shopping today
                </p>
              </div>

              <form>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="form-control form-control-lg shadow-sm"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                    />
                  </div>
                </div>

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
                      placeholder="Enter mobile number"
                      className="form-control form-control-lg shadow-sm"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value)
                      }
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
                      placeholder="Enter password"
                      className="form-control form-control-lg shadow-sm"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setPassView(!passView)
                      }
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

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fa-solid fa-shield-halved"></i>
                    </span>

                    <input
                      type={passView ? "text" : "password"}
                      placeholder="Repeat password"
                      className="form-control form-control-lg shadow-sm"
                      value={password2}
                      onChange={(e) =>
                        setPassword2(e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="alert alert-danger py-2">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {error}
                  </div>
                )}

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-lg w-100 rounded-3 fw-bold text-white shadow"
                  style={{
                    background:
                      "linear-gradient(135deg,#0d6efd,#6610f2)",
                    border: "none",
                  }}
                  onClick={(e) => submitHandler(e)}
                >
                  <i className="fa-solid fa-user-plus me-2"></i>
                  Create Account
                </button>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?
                  </span>

                  <Link
                    to="/login"
                    className="text-primary fw-bold ms-2 text-decoration-none"
                  >
                    Login Here
                  </Link>
                </div>

              </form>
            </div>
          </div>

          <div className="text-center mt-3 text-white">
            © {new Date().getFullYear()} MyShop
          </div>

        </div>
      </div>
    </div>
  </div>
);
};

export default Register;
