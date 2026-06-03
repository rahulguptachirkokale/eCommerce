import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear, remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [orderStatus, setOrderStatus] = useState(false);
  const [singleOrder, setSingleOrder] = useState(false);

  let price = 0;
  cartItems.forEach((item) => {
    // price += Number(item.price);
   price += (item.price - (item.price / 100) * item.discount)
  });

  // orderAll
  const orderAll = () => {
    dispatch(clear());
    setOrderStatus(true);
  };

  // orderSingle
  const orderSingle = (id) => {
    dispatch(remove(id));
    setSingleOrder(true);
    setTimeout(() => {
      setSingleOrder(false);
    }, 2000);
  };

return (
  <div className="container py-4">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <Link
        to="/"
        className="btn btn-outline-dark fw-semibold"
      >
        ← Continue Shopping
      </Link>

      <h2 className="fw-bold mb-0">
        Shopping Cart ({cartItems.length})
      </h2>
    </div>

    {singleOrder && (
      <div
        className="alert alert-success shadow-sm border-0 rounded-3"
        role="alert"
      >
        ✅ Order Placed Successfully!
      </div>
    )}

    {cartItems.length === 0 ? (
      orderStatus ? (
        <div
          className="alert alert-success text-center shadow-sm rounded-3"
          role="alert"
        >
          🎉 Order Successfully!
        </div>
      ) : (
        <div
          className="alert alert-info text-center shadow-sm rounded-3"
          role="alert"
        >
          🛒 Your cart is empty!
        </div>
      )
    ) : (
      <>
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Details</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.uniqueId}>
                      <td>
                        <img
                          src={item.image}
                          alt={item._id}
                          className="img-fluid rounded shadow-sm border"
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "contain",
                          }}
                        />
                      </td>

                      <td>
                        <div className="small text-secondary fw-semibold mb-1">
                          {item.category.toUpperCase()}
                        </div>

                        {JSON.stringify(item.title).length > 24 ? (
                          <div title={item.title}>
                            {JSON.stringify(item.title).slice(1, 23)}...
                          </div>
                        ) : (
                          <div>{item.title}</div>
                        )}
                      </td>

                      <td>
                        <span className="fw-bold text-success">
                          $
                          {(
                            item.price -
                            (item.price / 100) * item.discount
                          ).toFixed(2)}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              dispatch(remove(item.uniqueId))
                            }
                          >
                            Remove
                          </button>

                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              orderSingle(item.uniqueId)
                            }
                          >
                            Order Now
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4 mt-4">
          <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">

            <h4 className="fw-bold mb-3 mb-md-0">
              Total:
              <span className="text-success ms-2">
                ${price.toFixed(2)}
              </span>
            </h4>

            <button
              className="btn btn-primary px-4 py-2 fw-semibold"
              onClick={() => orderAll()}
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      </>
    )}
  </div>
);
};

export default Cart;
