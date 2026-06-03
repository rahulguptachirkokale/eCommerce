import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsList = ({ updateProductHandler }) => {
  const [items, setItems] = useState([]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/deleteproduct/${id}`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}});
    } catch (err) {
      alert("invalid product id");
    }
  };

  const getData = async () => {
     await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admin/productslist`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}}
    ).then((res)=>setItems(res.data.totalProducts)).catch((err)=>console.log(err))
    
  };
  useEffect(() => {
    getData();
  }, [deleteProduct]);
return (
  <div className="container my-4">
    <div className="card border-0 shadow-lg rounded-4">
      <div className="card-header bg-primary text-white fw-bold py-3">
        <i className="fa-solid fa-boxes-stacked me-2"></i>
        Products List ({items.length})
      </div>

      <div className="card-body p-2">
        {items.map((item, idx) => (
          <div
            key={item._id}
            className="card mb-3 border-0 shadow-sm rounded-4"
          >
            <div className="card-body">
              <div className="row align-items-center">
                
                {/* Product Image */}
                <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
                  <div className="position-relative">
                    <span className="badge bg-dark position-absolute top-0 start-0">
                      #{idx + 1}
                    </span>

                    <img
                      src={item.imgPath}
                      alt={item.title}
                      className="img-fluid rounded-4 border shadow-sm"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="col-12 col-md-5 text-center text-md-start">
                  <span className="badge bg-primary mb-2">
                    {item.category.toUpperCase()}
                  </span>

                  <h5
                    className="fw-bold mb-1"
                    title={item.title}
                  >
                    {item.title.length > 35
                      ? item.title.slice(0, 35) + "..."
                      : item.title}
                  </h5>

                  <small className="text-muted">
                    Product ID: {item._id.slice(-8)}
                  </small>
                </div>

                {/* Price */}
                <div className="col-12 col-md-2 text-center my-3 my-md-0">
                  <h5 className="fw-bold text-success mb-1">
                    ₹
                    {(
                      item.price -
                      (item.price / 100) * item.discount
                    ).toFixed(2)}
                  </h5>

                  <div className="text-decoration-line-through text-muted">
                    ₹{item.price}
                  </div>

                  <span className="badge bg-success mt-1">
                    {item.discount}% OFF
                  </span>
                </div>

                {/* Actions */}
                <div className="col-12 col-md-3">
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button
                      className="btn btn-primary rounded-pill px-3"
                      onClick={() =>
                        updateProductHandler(item._id)
                      }
                    >
                      <i className="fa-solid fa-pen-to-square me-1"></i>
                      Edit
                    </button>

                    <button
                      className="btn btn-danger rounded-pill px-3"
                      onClick={() =>
                        deleteProduct(item._id)
                      }
                    >
                      <i className="fa-solid fa-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-5">
            <i className="fa-solid fa-box-open fs-1 text-secondary"></i>
            <h4 className="mt-3 text-secondary">
              No Products Found
            </h4>
          </div>
        )}
      </div>
    </div>
  </div>
); 
};

export default ProductsList;
