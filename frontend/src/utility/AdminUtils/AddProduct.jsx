import axios from "axios";
import React, { useState } from "react";

const AddProduct = ({ setAddProduct }) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);

  const productImg = (e) => {
    const File = e.target.files[0];
    document.getElementById("productImg").src =
      window.URL.createObjectURL(File);

    setImg(File);
  };

  const AddProductHandler = async (e) => {
    e.preventDefault();

    let imgPath = "";
    setError("");
    if (!img) return setError("Image Required!");
    else if (!title) return setError("Title is Required!");
    else if (!category) return setError("Please Select Category!");
    else if (!price) return setError("Please Enter Amount!");
    else if (!discount || Number(discount) > 99) return setError("Please Enter Valid Discount");

    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "eCommerce"); // Replace with your Cloudinary upload preset, make sure unsigned

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dluxlnvq7/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      imgPath = response.data.url;
    } catch (err) {
      return setError("Uploading Failed!");
    }

    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/admin/addproduct`, {
          title,
          imgPath,
          category,
          price,
          discount,
        },{headers:{Authorization:"bearer "+localStorage.getItem("token")}})
        .then((res) => setAddProduct(false))
        .catch((err) => setError(err.message));
    } catch (err) {
      setError("Uploading Failed!");
    }
  };
  return (
  <div className="container py-4">
    <div
      className="card border-0 shadow-lg rounded-4 mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <div className="card-body p-4">
        <h2 className="text-center fw-bold text-primary mb-4">
          <i className="fa-solid fa-plus-circle me-2"></i>
          Add New Product
        </h2>

        <form encType="multipart/form-data">
          {/* Image Upload */}
          <div className="text-center mb-4">
            <label
              htmlFor="productImage"
              style={{ cursor: "pointer" }}
            >
              <img
                src={require("../../static/eCommerce-logo.jpg")}
                className="rounded-circle border border-3 shadow"
                id="productImg"
                alt="Product"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            </label>

            <div className="mt-2 text-muted small">
              Click image to upload product photo
            </div>

            <input
              type="file"
              className="form-control d-none"
              id="productImage"
              accept="image/*"
              onChange={(e) => productImg(e)}
            />
          </div>

          {/* Product Title */}
          <div className="mb-3">
            <label htmlFor="productTitle" className="form-label fw-semibold">
              Product Title
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="productTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label fw-semibold">
              Category
            </label>
            <select
              className="form-select form-select-lg"
              id="productCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="mobile">Mobile</option>
              <option value="appliances">Appliances</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="kitchen">Kitchen</option>
              <option value="furniture">Furniture</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>

          {/* Price & Discount */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="productPrice" className="form-label fw-semibold">
                Price (₹)
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                id="productPrice"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label
                htmlFor="productDiscount"
                className="form-label fw-semibold"
              >
                Discount (%)
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                id="productDiscount"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter discount"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress && (
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>

              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold"
            onClick={(e) => AddProductHandler(e)}
          >
            <i className="fa-solid fa-cloud-arrow-up me-2"></i>
            Add Product
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default AddProduct;
