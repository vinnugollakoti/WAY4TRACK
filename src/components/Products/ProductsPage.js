// import React, { useState } from "react";
// import "./ProductsPage.css"

// const products = [
//   {
//     id: 1,
//     title:
//       "Fleettrack Pro™ Wired GPS Tracker | For Car, Bike, Scooter, Truck, Bus with 15+ Premium Features",
//     image: "/images/product1.png", // Replace with your real image path
//     oldPrice: 4699,
//     price: 2599,
//     discount: 45,
//     inStock: true,
//   },
//   {
//     id: 2,
//     title:
//       "Fleettrack 4G Wired GPS Tracker | For Car, Bike, Scooter, Truck, Bus with 15+ Premium Features",
//     image: "/images/product2.png", // Replace with your real image path
//     oldPrice: 9999,
//     price: 3299,
//     discount: 67,
//     inStock: true,
//   },
// ];

// export default function ProductsPage() {
//   const [availabilityFilter, setAvailabilityFilter] = useState(true);
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [sortOrder, setSortOrder] = useState("date-old-new");

//   const filteredProducts = products.filter(
//     (product) =>
//       (!availabilityFilter || product.inStock) &&
//       product.price >= priceRange[0] &&
//       product.price <= priceRange[1]
//   );

//   return (
//     <div className="container">
//       {/* Sidebar Filter */}
//       <div className="sidebar">
//         <div className="filter-group">
//           <h2>Availability</h2>
//           <label className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={availabilityFilter}
//               onChange={() => setAvailabilityFilter(!availabilityFilter)}
//             />
//             <span>In Stock</span>
//           </label>
//         </div>

//         <div className="filter-group">
//           <h2>Price</h2>
//           <input
//             type="range"
//             min="0"
//             max="10000"
//             value={priceRange[1]}
//             onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//           />
//           <div className="price-range">
//             Price: ₹{priceRange[0]} - ₹{priceRange[1]}
//           </div>
//         </div>
//       </div>

//       {/* Products List */}
//       <div className="product-list">
//         <div className="top-bar">
//           <div>
//             {filteredProducts.length} of {products.length} products
//           </div>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <option value="date-old-new">Date, old to new</option>
//             <option value="date-new-old">Date, new to old</option>
//             <option value="price-low-high">Price, low to high</option>
//             <option value="price-high-low">Price, high to low</option>
//           </select>
//         </div>

//         <div className="products-grid">
//           {filteredProducts.map((product) => (
//             <div key={product.id} className="product-card">
//               <div className="discount-badge">-{product.discount}%</div>
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="product-image"
//               />
//               <h3 className="product-title">{product.title}</h3>
//               <div className="product-price">
//                 From ₹{product.price.toLocaleString()}
//               </div>
//               <div className="product-old-price">
//                 ₹{product.oldPrice.toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import ApiService from "../Services/ApiServices";
import { Link } from "react-router-dom";
import "./ProductsPage.css";

const dummyProducts = [
  {
    id: 1,
    deviceName: "Vehicle Tracker X1",
    productName: "GPS Tracker",
    type: "vehicle",
    cost: 4500,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 2,
    deviceName: "Car GPS Pro",
    productName: "GPS Tracker",
    type: "vehicle",
    cost: 4600,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 3,
    deviceName: "Fleet Master 100",
    productName: "GPS Tracker",
    type: "vehicle",
    cost: 4700,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 4,
    deviceName: "Personal GPS Watch",
    productName: "Wearable Tracker",
    type: "personal",
    cost: 7500,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 5,
    deviceName: "Runner's Tracker",
    productName: "Wearable Tracker",
    type: "personal",
    cost: 7600,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 6,
    deviceName: "SmartBand Geo",
    productName: "Wearable Tracker",
    type: "personal",
    cost: 7700,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 7,
    deviceName: "Heavy Duty Tracker Z3",
    productName: "Industrial GPS",
    type: "vehicle",
    cost: 11000,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 8,
    deviceName: "Truck Locator XL",
    productName: "Industrial GPS",
    type: "vehicle",
    cost: 11100,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
  {
    id: 9,
    deviceName: "Excavator Guard",
    productName: "Industrial GPS",
    type: "vehicle",
    cost: 11200,
    productPhoto:
      "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
  },
];

function ProductsPage() {
  const [products, setProducts] = useState(dummyProducts);
  const [filters, setFilters] = useState({ type: "", price: "" });
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await ApiService.post(
        "/products/getAllproductDetails"
        // {
        //   companyCode: initialAuthState.companyCode,
        //   unitCode: initialAuthState.unitCode,
        // }
      );
      console.log(response.data, "Data");

      setAllProducts(response.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

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

  const [availabilityFilter, setAvailabilityFilter] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOrder, setSortOrder] = useState("date-old-new");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const productCounts = filteredProducts.reduce((acc, product) => {
    acc[product.productName] = (acc[product.productName] || 0) + 1;
    return acc;
  }, {});

  // Get unique product names
  const uniqueProductNames = Object.keys(productCounts);

  return (
    <div className="products-container">
      <h1 className="products-title">GPS Tracking Devices</h1>

      <div className="products-sidebar-container">
        <div className="sidebar">
          <div className="filter-group">
            <h2>Products</h2>
            {uniqueProductNames.map((productName) => (
              <label key={productName} className="checkbox-label">
                <div className="checkbox-container">
                  <input type="checkbox" className="products-filter-checkbox" />
                  <span className="product-name">{productName}</span>
                </div>
                <div className="count-container">
                  <span className="product-count">
                    ({productCounts[productName]})
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h2>Price</h2>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <div className="price-range">
              Price: ₹{priceRange[0]} - ₹{priceRange[1]}
            </div>
          </div>
        </div>

        <div>
          <div className="filters-wrapper">
            {/* <select
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="filter-select"
            >
              <option value="">All Types</option>
              <option value="vehicle">Vehicle</option>
              <option value="personal">Personal</option>
            </select> */}

            <select
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
              className="filter-select"
            >
              <option value="">Sort By</option>
              <option value="low">Price Low to High</option>
              <option value="mid">Price High to low</option>
              <option value="high">A to Z</option>
              <option value="high">Z to A</option>
            </select>
          </div>

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
                      src={product.productPhoto}
                      alt={product.deviceName}
                      className="products-product-image"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="product-info">
                    <h2 className="product-name">{product.deviceName}</h2>
                    <p className="product-price">₹{product.cost}</p>
                    <div className="product-buttons">
                      <button className="btn products-add-cart">
                        Add to Cart
                      </button>
                      <button className="btn products-buy-now">Buy</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
