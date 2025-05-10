import React, { useState, useEffect } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { Link } from "react-router-dom";
import "./MyOrders.css";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  console.log(orders, "orders");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const payload = { companyCode, unitCode, clientId };
      const response = await ApiService.post("client/getClientDetailsById", payload);
      if (response.status) {
        setOrders(response.data.orders);
      } else {
        console.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  //   const fetchOrders = async () => {
  //     try {
  //       const payload = { companyCode, unitCode, clientId };
  //       const response = await ApiService.post(
  //         "/client/getClientDetailsById",
  //         payload
  //       );
  //       if (response.status) {
  //         setOrders(response.data.order);
  //       } else {
  //         console.error("Error fetching orders");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   const orders = [
  //     {
  //       id: 1,
  //       productName: "GPS Tracking",
  //       deviceImage: "https://via.placeholder.com/60",
  //       name: "Sparx SM 757 | Stylish, Comfortable | Casual Shoes",
  //       subscription: "yearly",
  //       is_relay: true,
  //       network: "Airtel",
  //       price: 849,
  //       deliveryDate: "2025-05-07T18:30:00.000Z",
  //     },
  //     {
  //       id: 2,
  //       image: "https://via.placeholder.com/60",
  //       name: "Amma Diarylo Konni Pageelu",
  //       author: "Ravi Mantri",
  //       price: 137,
  //       deliveredOn: "Feb 25",
  //     },
  //     {
  //       id: 3,
  //       image: "https://via.placeholder.com/60",
  //       name: "CAMPUS MIKE (N) Running Shoes For Men",
  //       color: "Blue",
  //       size: "8",
  //       price: 913,
  //       deliveredOn: "Nov 02, 2024",
  //     },
  //   ];

  //   const orders = [
  //     {
  //       id: 1,
  //       productName: "GPS Tracking",
  //       deviceImage: "https://via.placeholder.com/60",
  //       name: "Sparx SM 757 | Stylish, Comfortable | Casual Shoes",
  //       subscription: "yearly",
  //       is_relay: true,
  //       network: "Airtel",
  //       price: 849,
  //       deliveryDate: "2025-05-07T18:30:00.000Z",
  //     },
  //     {
  //       id: 2,
  //       productName: "Temperature Monitor",
  //       deviceImage: "https://via.placeholder.com/60",
  //       name: "Roadster Men’s Solid Casual Shirt",
  //       subscription: "monthly",
  //       is_relay: false,
  //       network: "Jio",
  //       price: 1299,
  //       deliveryDate: "2025-04-25T18:30:00.000Z",
  //     },
  //     {
  //       id: 3,
  //       productName: "Music Streaming",
  //       deviceImage: "https://via.placeholder.com/60",
  //       name: "boAt Rockerz 255 Pro+ Wireless Earphones",
  //       subscription: "quarterly",
  //       is_relay: true,
  //       network: "Vi",
  //       price: 999,
  //       deliveryDate: "2025-03-14T18:30:00.000Z",
  //     },
  //     {
  //       id: 4,
  //       productName: "Location Logger",
  //       deviceImage: "https://via.placeholder.com/60",
  //       name: "Wildcraft Unisex Backpack",
  //       subscription: "yearly",
  //       is_relay: true,
  //       network: "BSNL",
  //       price: 1799,
  //       deliveryDate: "2025-02-19T18:30:00.000Z",
  //     },
  //     {
  //       id: 5,
  //       productName: "Fitness Tracking",
  //       deviceImage: "https://via.placeholder.com/60",
  //       name: "Noise ColorFit Pulse Smart Watch",
  //       subscription: "monthly",
  //       is_relay: false,
  //       network: "Airtel",
  //       price: 1599,
  //       deliveryDate: "2025-01-10T18:30:00.000Z",
  //     },
  //   ];

  return (
    <div>
      <div className="products-heading-container">
        <h1 className="products-title section-heading">My Orders</h1>
      </div>
      <div className="myorders-container">
        <div className="myorders-sidebar">
          <h2 className="myorders-sidebar-title">Filters</h2>
          <div className="myorders-filter-section">
            <h4>ORDER STATUS</h4>
            {["On the way", "Delivered", "Cancelled", "Returned"].map(
              (status) => (
                <div key={status} className="myorders-checkbox">
                  <input type="checkbox" id={status} />
                  <label htmlFor={status}>{status}</label>
                </div>
              )
            )}
          </div>
        </div>

        <div className="myorders-main">
          <div className="myorders-search">
            <input
              className="myorders-search-input"
              placeholder="Search your orders here"
            />
            <button className="myorders-search-button">🔍 Search Orders</button>
          </div>

          <div className="myorders-list">
            {orders.map((order) => (
              <div key={order.id} className="myorders-order">
                <h1 className="myorders-order-heading">Order: #{order.id}</h1>
                {order.orderItems.map((item) => {
                  const device = Array.isArray(order.deviceDetails)
                    ? order.deviceDetails.find(
                        (d) => Number(d.deviceId) === Number(item.deviceId)
                      )
                    : null;

                  console.log("deviceDetails:", order.deviceDetails);
                  console.log("orderItems:", order.orderItems);
                  console.log(
                    "Matching item.deviceId:",
                    item.deviceId,
                    "against deviceDetails",
                    order.deviceDetails?.map((d) => d.deviceId)
                  );

                  return (
                    <Link
                      to={`/order-item/${order.id}/${item.deviceId}`}
                      className="myorders-redirection-link"
                      key={item.deviceId}
                    >
                      <div className="myorders-item">
                        <img
                          src={
                            device?.image || "https://via.placeholder.com/60"
                          }
                          alt={item.name}
                          className="myorders-item-image"
                        />

                        <div className="myorders-item-details">
                          <h4 className="myorders-item-title">{item.name}</h4>
                          <p className="myorders-item-author">
                            Network: {item.network}
                          </p>
                          <p className="myorders-item-meta">
                            Subscription: {item.subscriptionType} subscription
                          </p>
                          <p className="myorders-item-meta">
                            Accessories:{" "}
                            {item.is_relay ? "With Relay" : "Without Relay"}
                          </p>
                          <p className="myorders-item-meta">
                            Quantity: {item.qty}
                          </p>
                        </div>
                        <div className="myorders-item-price">
                          Price: Rs.{item.amount}
                        </div>
                        <div
                          className={`myorders-item-delivery myorders-status-box status-${order.orderStatus?.toLowerCase()}`}
                        >
                          {order.orderStatus === "delivered" && (
                            <>
                              <span>
                                🟢 Delivered on {formatDate(order.delivaryDate)}
                              </span>
                              <p>Your item has been delivered.</p>
                            </>
                          )}

                          {order.orderStatus === "pending" && (
                            <p>
                              ⏳ Your order is pending confirmation by the
                              seller.
                            </p>
                          )}

                          {order.orderStatus === "received" && (
                            <>
                              <p>
                                📦 We've received your order and it is being
                                prepared.
                              </p>
                              <p>
                                📅 Expected Delivery:{" "}
                                {formatDate(order.delivaryDate)}
                              </p>
                            </>
                          )}

                          {order.orderStatus === "dispatched" && (
                            <>
                              <p>
                                🚚 Your order has been dispatched and is on the
                                way.
                              </p>
                              <p>
                                📅 Expected Delivery:{" "}
                                {formatDate(order.delivaryDate)}
                              </p>
                            </>
                          )}

                          {order.orderStatus === "aborted" && (
                            <p>
                              ❌ This order was aborted due to an issue in
                              processing. You have not been charged.
                            </p>
                          )}

                          {order.orderStatus === "cancelled" && (
                            <p>
                              ❌ This order was cancelled. Please contact
                              support if this was unexpected.
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div className="myorders-total-order-amount-container">
                  <p className="myorders-total-order-amount">
                    Total Order Amount: Rs.{order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

// import React, { useState, useEffect } from "react";
// import ApiService, { initialAuthState } from "../Services/ApiServices";
// import "./MyOrders.css";

// const formatDate = (dateStr) =>
//   new Date(dateStr).toLocaleDateString("en-IN", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const companyCode = initialAuthState.companyCode;
//   const unitCode = initialAuthState.unitCode;
//   const clientId = localStorage.getItem("client_id");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const payload = { companyCode, unitCode, clientId };
//       const response = await ApiService.post(
//         "/client/getClientDetailsById",
//         payload
//       );
//       if (response.status) {
//         setOrders(response.data.order);
//       } else {
//         console.error("Error fetching orders");
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   return (
//     <div className="MyOrders__container">
//       <h2 className="MyOrders__heading">My Orders</h2>
//       <div className="MyOrders__list">
//         {orders.map((order) => (
//           <div key={order.id} className="MyOrders__card">
//             <div className="MyOrders__card-header">
//               <h3>
//                 #{order.id} - {order.name}
//               </h3>
//               <span
//                 className={`MyOrders__status ${order.orderStatus.toLowerCase()}`}
//               >
//                 {order.orderStatus}
//               </span>
//             </div>
//             <p>
//               <strong>Order Date:</strong> {formatDate(order.orderDate)}
//             </p>
//             <p>
//               <strong>Delivery Date:</strong> {formatDate(order.delivaryDate)}
//             </p>
//             <p>
//               <strong>Total Amount:</strong> ₹{order.totalAmount}
//             </p>
//             <p>
//               <strong>Payment Status:</strong>{" "}
//               <span
//                 className={`MyOrders__payment ${order.paymentStatus.toLowerCase()}`}
//               >
//                 {order.paymentStatus}
//               </span>
//             </p>
//             <div className="MyOrders__items">
//               {order.orderItems.map((item, idx) => (
//                 <div key={idx} className="MyOrders__item">
//                   <div className="MyOrders__item-name">{item.name}</div>
//                   <div>Qty: {item.qty}</div>
//                   <div>Amount: ₹{item.amount}</div>
//                   <div>Subscription: {item.subscriptionType}</div>
//                   <div>Relay: {item.is_relay ? "Yes" : "No"}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;
