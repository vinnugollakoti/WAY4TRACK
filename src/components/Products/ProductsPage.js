import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./ProductsPage.css"; // external CSS

const dummyProducts = [
  {
    id: 1,
    name: "Vehicle Tracker X1",
    type: "vehicle",
    price: 4500,
    image_url: "https://via.placeholder.com/300x200?text=Vehicle+Tracker+X1",
  },
  {
    id: 2,
    name: "Personal GPS Watch",
    type: "personal",
    price: 7500,
    image_url: "https://via.placeholder.com/300x200?text=Personal+GPS+Watch",
  },
  {
    id: 3,
    name: "Heavy Duty Tracker Z3",
    type: "vehicle",
    price: 11000,
    image_url: "https://via.placeholder.com/300x200?text=Tracker+Z3",
  },
  {
    id: 4,
    name: "Kid's Safety Tracker",
    type: "personal",
    price: 3500,
    image_url: "https://via.placeholder.com/300x200?text=Kid+Tracker",
  },
];

function ProductsPage() {
  const [products, setProducts] = useState(dummyProducts);
  const [filters, setFilters] = useState({ type: "", price: "" });

  useEffect(() => {
    filterProducts();
  }, [filters]);

  const filterProducts = () => {
    let filtered = dummyProducts;

    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    if (filters.price === "low") {
      filtered = filtered.filter((p) => p.price < 5000);
    } else if (filters.price === "mid") {
      filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 10000);
    } else if (filters.price === "high") {
      filtered = filtered.filter((p) => p.price > 10000);
    }

    setProducts(filtered);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">GPS Tracking Devices</h1>

      {/* <div className="filters-wrapper">
        <select
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="vehicle">Vehicle</option>
          <option value="personal">Personal</option>
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="filter-select"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹5000</option>
          <option value="mid">₹5000–₹10000</option>
          <option value="high">Above ₹10000</option>
        </select>
      </div> */}

      <div className="products-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card product-card-custom"
          >
            <div className="product-card-inner">
              {/* Image Section */}
              <div className="product-image-wrapper">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              {/* Info Section */}
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">₹{product.price}</p>
                <div className="product-buttons">
                  <button className="btn products-add-cart">Add to Cart</button>
                  <button className="btn products-buy-now">Buy</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
