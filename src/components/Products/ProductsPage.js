import React, { useState, useEffect, useContext } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import "./ProductsPage.css";
import ProductPopupPage from "../ProductPopupPage/ProductPopupPage";

function ProductsPage() {
  const { addToCart, updateQuantity, cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ type: "", price: "" });
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const fetchAllProducts = async () => {
    try {
      const response = await ApiService.post(
        "/website-product/getWebsiteproductDetails",
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setProducts(response.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters]);

  const filterProducts = () => {
    let filtered = products;

    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    if (filters.price === "low") {
      filtered = filtered.filter((p) => p.cost < 5000);
    } else if (filters.price === "mid") {
      filtered = filtered.filter((p) => p.cost >= 5000 && p.cost <= 10000);
    } else if (filters.price === "high") {
      filtered = filtered.filter((p) => p.cost > 10000);
    }

    setProducts(filtered);
  };

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productCounts = filteredProducts.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + 1;
    return acc;
  }, {});

  const uniqueProductNames = Object.keys(productCounts);

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type === "inc" ? 1 : -1);
  };

  const removeProduct = (productId) => {
    updateQuantity(productId, 0);
  };

  // const handleAddToCart = (product) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id);
  //   if (!existingItem) {
  //     addToCart({ ...product, quantity: 1 });
  //   }
  // };

  const handleAddToCart = (device) => {
    setSelectedProduct(device);
    setShowProductModal(true);
  };

  console.log(cartItems, "products");

  return (
    <div className="products-container">
      <div className="products-heading-container">
        <h1 className="products-title section-heading">Devices</h1>
      </div>
      <div className="products-sidebar-container">
        <div className="sidebar-wrapper">
          <div className="filter-group product-filter-group">
            <h2 className="subsection-heading">Products</h2>
            {uniqueProductNames.map((productName) => (
              <label
                key={productName}
                className="checkbox-label product-checkbox-label"
              >
                <div className="checkbox-container product-checkbox-container">
                  <input
                    type="checkbox"
                    className="products-filter-checkbox checkbox-input"
                  />
                  <span className="product-name checkbox-name">
                    {productName}
                  </span>
                </div>
                <div className="count-container product-count-container">
                  <span className="product-count count-badge">
                    {productCounts[productName]}
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="filter-group price-filter-group">
            <h2 className="subsection-heading">Price</h2>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="price-slider"
            />
            <div className="price-range price-display">
              Price: ₹{priceRange[0]} - ₹{priceRange[1]}
            </div>
          </div>

          <div className="filters-wrapper sort-filter-wrapper">
            <select
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
              className="filter-select sort-select"
            >
              <option value="">Sort By</option>
              <option value="low">Price Low to High</option>
              <option value="mid">Price High to Low</option>
              <option value="high">A to Z</option>
              <option value="high">Z to A</option>
            </select>
          </div>
        </div>

        <div className="productsPage-main-container">
          <div className="products-grid">
            {filteredProducts.map((product) => {
              return product.device?.map((device) => {
                const startPrice =
                  ((device.amount + device.subscriptionMonthlyAmt) *
                    device.discount) /
                  100;
                const matchedItem = cartItems.find(
                  (item) => item.device.id === device.id
                );

                // const endPrice =
                //   ((device.amount +
                //     device.subscriptionMonthlyAmt +
                //     device.relayAmt) *
                //     device.discount) /
                //   100;

                return (
                  <div
                    key={device.id}
                    className="product-card product-card-custom"
                  >
                    <div className="product-card-inner">
                      <Link
                        to={`/product/${device.id}`}
                        className="product-image-wrapper"
                      >
                        <img
                          src={device.image}
                          alt={device.model}
                          className="products-product-image"
                        />
                      </Link>

                      <div className="product-info">
                        <h2 className="product-name">{device.name}</h2>
                        <p className="product-description">
                          {device.description}
                        </p>
                        <div className="product-old-price-container">
                          <p className="product-base-price">
                            Rs.{device.amount}
                          </p>
                          <span className="product-price-discount">
                            -{device.discount}%
                          </span>
                        </div>
                        <p className="product-price">From Rs.{startPrice}/-</p>
                        <div className="product-buttons">
                          {matchedItem ? (
                            <div className="quantity-controls">
                              <button
                                className="products-add-cart"
                                onClick={() => handleAddToCart(device)}
                                onMouseEnter={() => setHovered(device.id)}
                                onMouseLeave={() => setHovered(false)}
                              >
                                {hovered===device.id ? "Update Cart" : "Added"}
                              </button>

                              {/* <button
                                className="qty-btn"
                                onClick={() =>
                                  handleQuantityChange(product.id, "dec")
                                }
                              >
                                -
                              </button>
                              <span className="qty-number">
                                {matchedItem.quantity}
                              </span>
                              <button
                                className="qty-btn"
                                onClick={() =>
                                  handleQuantityChange(product.id, "inc")
                                }
                              >
                                +
                              </button> */}
                            </div>
                          ) : (
                            <button
                              className="button products-add-cart"
                              onClick={() => handleAddToCart(device)}
                            >
                              Add Cart
                            </button>
                          )}

                          <button
                            className="button products-buy-now"
                            onClick={() => handleAddToCart(device)}
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
      {showProductModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowProductModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowProductModal(false)}
            >
              ×
            </button>
            <ProductPopupPage
              device={selectedProduct}
              isOpen={showProductModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;

// import React, { useState, useEffect, useContext } from "react";
// import ApiService, { initialAuthState } from "../Services/ApiServices";
// import { CartContext } from "../../contexts/CartContext";
// import { Link } from "react-router-dom";
// import "./ProductsPage.css";
// import ProductPopupPage from "../ProductPopupPage/ProductPopupPage";

// const dummyProducts = [
//   {
//     id: 1,
//     deviceName: "Vehicle Tracker X1",
//     productName: "GPS Tracker",
//     type: "vehicle",
//     cost: 4500,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 2,
//     deviceName: "Car GPS Pro",
//     productName: "GPS Tracker",
//     type: "vehicle",
//     cost: 4600,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 3,
//     deviceName: "Fleet Master 100",
//     productName: "GPS Tracker",
//     type: "vehicle",
//     cost: 4700,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 4,
//     deviceName: "Personal GPS Watch",
//     productName: "Wearable Tracker",
//     type: "personal",
//     cost: 7500,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 5,
//     deviceName: "Runner's Tracker",
//     productName: "Wearable Tracker",
//     type: "personal",
//     cost: 7600,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 6,
//     deviceName: "SmartBand Geo",
//     productName: "Wearable Tracker",
//     type: "personal",
//     cost: 7700,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 7,
//     deviceName: "Heavy Duty Tracker Z3",
//     productName: "Industrial GPS",
//     type: "vehicle",
//     cost: 11000,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 8,
//     deviceName: "Truck Locator XL",
//     productName: "Industrial GPS",
//     type: "vehicle",
//     cost: 11100,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
//   {
//     id: 9,
//     deviceName: "Excavator Guard",
//     productName: "Industrial GPS",
//     type: "vehicle",
//     cost: 11200,
//     productPhoto:
//       "https://res.cloudinary.com/dabzdwxet/image/upload/v1745839753/ap_mining_04_mofsrk.png",
//   },
// ];

// function ProductsPage() {
//   const { addToCart, updateQuantity, cartItems } = useContext(CartContext);
//   const [products, setProducts] = useState(dummyProducts);
//   const [filters, setFilters] = useState({ type: "", price: "" });
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showProductModal, setShowProductModal] = useState(false);

//   const fetchAllProducts = async () => {
//     try {
//       const response = await ApiService.post(
//         "/website-product/getWebsiteproductDetails",
//         {
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         }
//       );
//       setAllProducts(response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//       setAllProducts([]);
//     }
//   };

//   useEffect(() => {
//     fetchAllProducts();
//   }, []);

//   useEffect(() => {
//     filterProducts();
//   }, [filters]);

//   const filterProducts = () => {
//     let filtered = dummyProducts;

//     if (filters.type) {
//       filtered = filtered.filter((p) => p.type === filters.type);
//     }

//     if (filters.price === "low") {
//       filtered = filtered.filter((p) => p.cost < 5000);
//     } else if (filters.price === "mid") {
//       filtered = filtered.filter((p) => p.cost >= 5000 && p.cost <= 10000);
//     } else if (filters.price === "high") {
//       filtered = filtered.filter((p) => p.cost > 10000);
//     }

//     setProducts(filtered);
//   };

//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = products.filter((product) =>
//     product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const productCounts = filteredProducts.reduce((acc, product) => {
//     acc[product.productName] = (acc[product.productName] || 0) + 1;
//     return acc;
//   }, {});

//   const uniqueProductNames = Object.keys(productCounts);

//   const handleQuantityChange = (id, type) => {
//     updateQuantity(id, type === "inc" ? 1 : -1);
//   };

//   const removeProduct = (productId) => {
//     updateQuantity(productId, 0);
//   };

//   // const handleAddToCart = (product) => {
//   //   const existingItem = cartItems.find((item) => item.id === product.id);
//   //   if (!existingItem) {
//   //     addToCart({ ...product, quantity: 1 });
//   //   }
//   // };

//   const handleAddToCart = (product) => {
//     setSelectedProduct(product);
//     setShowProductModal(true);
//   };

//   return (
//     <div className="products-container">
//       <div className="products-sidebar-container">
//         <div className="sidebar">
//           <div className="filter-group">
//             <h1 className="products-title">Devices</h1>
//             <h2>Products</h2>
//             {uniqueProductNames.map((productName) => (
//               <label key={productName} className="checkbox-label">
//                 <div className="checkbox-container">
//                   <input type="checkbox" className="products-filter-checkbox" />
//                   <span className="product-name">{productName}</span>
//                 </div>
//                 <div className="count-container">
//                   <span className="product-count">
//                     {productCounts[productName]}
//                   </span>
//                 </div>
//               </label>
//             ))}
//           </div>

//           <div className="filter-group">
//             <h2>Price</h2>
//             <input
//               type="range"
//               min="0"
//               max="10000"
//               value={priceRange[1]}
//               onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//             />
//             <div className="price-range">
//               Price: ₹{priceRange[0]} - ₹{priceRange[1]}
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="filters-wrapper">
//             <select
//               onChange={(e) =>
//                 setFilters({ ...filters, price: e.target.value })
//               }
//               className="filter-select"
//             >
//               <option value="">Sort By</option>
//               <option value="low">Price Low to High</option>
//               <option value="mid">Price High to Low</option>
//               <option value="high">A to Z</option>
//               <option value="high">Z to A</option>
//             </select>
//           </div>

//           <div className="products-grid">
//             {filteredProducts.map((product) => {
//               const matchedItem = cartItems.find(
//                 (item) => item.id === product.id
//               );
//               return (
//                 <div
//                   key={product.id}
//                   className="product-card product-card-custom"
//                 >
//                   <div className="product-card-inner">
//                     <Link
//                       to={`/product/${product.id}`}
//                       className="product-image-wrapper"
//                     >
//                       <img
//                         src={product.productPhoto}
//                         alt={product.deviceName}
//                         className="products-product-image"
//                       />
//                     </Link>

//                     <div className="product-info">
//                       <h2 className="product-name">{product.deviceName}</h2>
//                       <p className="product-price">₹{product.cost}</p>
//                       <div className="product-buttons">
//                         {matchedItem ? (
//                           <div className="quantity-controls">
//                             <button
//                               className="qty-btn"
//                               onClick={() =>
//                                 handleQuantityChange(product.id, "dec")
//                               }
//                             >
//                               -
//                             </button>
//                             <span className="qty-number">
//                               {matchedItem.quantity}
//                             </span>
//                             <button
//                               className="qty-btn"
//                               onClick={() =>
//                                 handleQuantityChange(product.id, "inc")
//                               }
//                             >
//                               +
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             className="button products-add-cart"
//                             onClick={() => handleAddToCart(product)}
//                           >
//                             Add Cart
//                           </button>
//                         )}

//                         <button className="button products-buy-now">Buy</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       {showProductModal && (
//         <div
//           className="modal-overlay"
//           onClick={() => setShowProductModal(false)}
//         >
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="modal-close"
//               onClick={() => setShowProductModal(false)}
//             >
//               ×
//             </button>
//             <ProductPopupPage product={selectedProduct} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductsPage;
