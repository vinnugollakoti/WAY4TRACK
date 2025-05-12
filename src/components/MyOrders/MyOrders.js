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
      const response = await ApiService.post(
        "client/getClientDetailsById",
        payload
      );
      if (response.status) {
        setOrders(response.data.orders);
      } else {
        console.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
                              ❌ This order was aborted. You were not charged.
                            </p>
                          )}

                          {order.orderStatus === "cancelled" && (
                            <p>
                              ❌ This order was cancelled. Contact support if
                              needed.
                            </p>
                          )}

                          {order.orderStatus === "success" && (
                            <p>✅ Order successfully processed.</p>
                          )}

                          {order.orderStatus === "request_raised" && (
                            <p>📝 A request has been raised for your order.</p>
                          )}

                          {order.orderStatus === "request_approved" && (
                            <p>✅ Your order request has been approved.</p>
                          )}

                          {order.orderStatus === "request_reject" && (
                            <p>❌ Your order request was rejected.</p>
                          )}

                          {order.orderStatus === "request_sucess" && (
                            <p>✅ Your order request was successful.</p>
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
