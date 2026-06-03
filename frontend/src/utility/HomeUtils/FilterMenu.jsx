import React, { useState } from "react";

const FilterMenu = ({ FilterHandler }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(1000000);

  const [mobile, setMobile] = useState(true);
  const [appliances, setAppliances] = useState(true);
  const [electronics, setElectronics] = useState(true);
  const [fashion, setFashion] = useState(true);
  const [beauty, setBeauty] = useState(true);
  const [kitchen, setKitchen] = useState(true);
  const [furniture, setFurniture] = useState(true);
  const [grocery, setGrocery] = useState(true);

  // const [filter, setfilter] = useState([]);

  const applyhandler = (e, cb) => {
    e.preventDefault();

    FilterHandler(
      [
        mobile,
        appliances,
        electronics,
        fashion,
        beauty,
        kitchen,
        furniture,
        grocery,
      ],
      priceFilter
    );
    setShowFilter(false);

    // setMobile(true);
    // setAppliances(true);
    // setElectronics(true);
    // setFashion(true);
    // setBeauty(true);
    // setKitchen(true);
    // setFurniture(true);
    // setGrocery(true);
  };

return (
  <div className="ms-2 mt-2 d-inline-block">
    <div className="position-relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="btn btn-light border shadow-sm fw-semibold rounded-pill px-3"
      >
        <i className="fa-solid fa-filter me-2 text-primary"></i>
        Filters
      </button>

      {showFilter && (
        <form
          className="bg-white p-4 border rounded-4 shadow-lg position-absolute mt-2"
          style={{
            minWidth: "350px",
            zIndex: 1000,
          }}
        >
          <div className="d-flex gap-4">
            {/* Categories */}
            <div>
              <h6 className="fw-bold text-primary mb-3">
                Categories
              </h6>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={mobile}
                  onChange={(e) => setMobile(e.target.checked)}
                />
                <label className="form-check-label">Mobile</label>
              </div>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={appliances}
                  onChange={(e) => setAppliances(e.target.checked)}
                />
                <label className="form-check-label">Appliances</label>
              </div>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={electronics}
                  onChange={(e) => setElectronics(e.target.checked)}
                />
                <label className="form-check-label">Electronics</label>
              </div>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={fashion}
                  onChange={(e) => setFashion(e.target.checked)}
                />
                <label className="form-check-label">Fashion</label>
              </div>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={beauty}
                  onChange={(e) => setBeauty(e.target.checked)}
                />
                <label className="form-check-label">Beauty</label>
              </div>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={kitchen}
                  onChange={(e) => setKitchen(e.target.checked)}
                />
                <label className="form-check-label">Kitchen</label>
              </div>

              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={furniture}
                  onChange={(e) => setFurniture(e.target.checked)}
                />
                <label className="form-check-label">Furniture</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={grocery}
                  onChange={(e) => setGrocery(e.target.checked)}
                />
                <label className="form-check-label">Grocery</label>
              </div>
            </div>

            {/* Price */}
            <div>
              <h6 className="fw-bold text-success mb-3">
                Price Range
              </h6>

              <div className="form-check">
                <input
                  className="form-check-input"
                  name="priceFilter"
                  type="radio"
                  defaultChecked
                  onChange={() => setPriceFilter(1000000)}
                />
                <label className="form-check-label">All</label>
              </div>

              {[300, 1000, 2000, 5000, 10000, 15000, 20000].map(
                (price) => (
                  <div className="form-check" key={price}>
                    <input
                      className="form-check-input"
                      name="priceFilter"
                      type="radio"
                      onChange={() => setPriceFilter(price)}
                    />
                    <label className="form-check-label">
                      ₹{price.toLocaleString()}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) => applyhandler(e)}
            className="btn btn-primary w-100 mt-3 fw-semibold rounded-pill"
          >
            <i className="fa-solid fa-check me-2"></i>
            Apply Filter
          </button>
        </form>
      )}
    </div>
  </div>
);
};

export default FilterMenu;
