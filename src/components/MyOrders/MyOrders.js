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
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  const statusOptions = [
    "delivered",
    "cancelled",
    "returned",
    "pending",
    "received",
    "dispatched",
    "aborted",
    "success",
    "request_raised",
    "request_approved",
    "request_reject",
    "request_sucess",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, selectedStatuses]);

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

  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filterOrders = () => {
    if (selectedStatuses.length === 0) {
      setFilteredOrders(orders);
    } else {
      const lowerCaseStatuses = selectedStatuses.map((s) => s.toLowerCase());
      const filtered = orders.filter((order) =>
        lowerCaseStatuses.includes(order.orderStatus?.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="container my-4">
      <div className="mb-4">
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Search your orders here"
          />
          <button className="btn btn-primary">🔍 Search Orders</button>
        </div>
      </div>

      <div className="filter-bar mb-4">
        {statusOptions.map((status) => (
          <button
            key={status}
            className={`status-pill ${
              selectedStatuses.includes(status) ? "active" : ""
            }`}
            onClick={() => handleStatusChange(status)}
          >
            {status.replace("_", " ")}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-muted">No orders found.</p>
      ) : (
        filteredOrders.map((order) => (
          <div className="card mb-4" key={order.id}>
            <div className="card-header bg-light">
              <h5 className="mb-0">Order #{order.id}</h5>
            </div>
            <div className="card-body">
              {order.orderItems.map((item) => {
                const device = Array.isArray(order.deviceDetails)
                  ? order.deviceDetails.find(
                      (d) => Number(d.deviceId) === Number(item.deviceId)
                    )
                  : null;

                return (
                  <Link
                    to={`/order-item/${order.id}/${item.deviceId}`}
                    className="text-decoration-none text-dark"
                    key={item.deviceId}
                  >
                    <div className="row align-items-center border-bottom py-3">
                      <div className="col-3 col-md-2">
                        <img
                          src={device?.image || "https://via.placeholder.com/60"}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-9 col-md-6">
                        <h6>{item.name}</h6>
                        <p className="mb-1 small">Network: {item.network}</p>
                        <p className="mb-1 small">
                          Subscription: {item.subscriptionType} subscription
                        </p>
                        <p className="mb-1 small">
                          Accessories:{" "}
                          {item.is_relay ? "With Relay" : "Without Relay"}
                        </p>
                        <p className="mb-1 small">Quantity: {item.qty}</p>
                      </div>
                      <div className="col-12 col-md-4 mt-2 mt-md-0">
                        <div className="fw-bold mb-2">
                          Price: ₹{item.amount}
                        </div>
                        <div
                          className={`alert p-2 mb-0 text-capitalize alert-${
                            order.orderStatus?.toLowerCase() === "delivered"
                              ? "success"
                              : order.orderStatus?.toLowerCase() === "pending"
                              ? "warning"
                              : order.orderStatus?.toLowerCase() === "cancelled"
                              ? "danger"
                              : "secondary"
                          }`}
                        >
                          {order.orderStatus === "delivered" && (
                            <>
                              <span>
                                Delivered on {formatDate(order.delivaryDate)}
                              </span>
                              <p className="mb-0">
                                Your item has been delivered.
                              </p>
                            </>
                          )}
                          {order.orderStatus === "pending" && (
                            <p className="mb-0">
                              ⏳ Order is pending confirmation by the seller.
                            </p>
                          )}
                          {order.orderStatus === "received" && (
                            <>
                              <p className="mb-0">
                                📦 We've received your order.
                              </p>
                              <p className="mb-0">
                                📅 Expected: {formatDate(order.delivaryDate)}
                              </p>
                            </>
                          )}
                          {order.orderStatus === "dispatched" && (
                            <>
                              <p className="mb-0">🚚 Your order is on the way.</p>
                              <p className="mb-0">
                                📅 Expected: {formatDate(order.delivaryDate)}
                              </p>
                            </>
                          )}
                          {order.orderStatus === "aborted" && (
                            <p className="mb-0">
                              ❌ Order was aborted. You were not charged.
                            </p>
                          )}
                          {order.orderStatus === "cancelled" && (
                            <p className="mb-0">
                              ❌ Order was cancelled. Contact support if needed.
                            </p>
                          )}
                          {order.orderStatus === "success" && (
                            <p className="mb-0">✅ Order processed.</p>
                          )}
                          {order.orderStatus === "request_raised" && (
                            <p className="mb-0">📝 Request raised.</p>
                          )}
                          {order.orderStatus === "request_approved" && (
                            <p className="mb-0">✅ Request approved.</p>
                          )}
                          {order.orderStatus === "request_reject" && (
                            <p className="mb-0">❌ Request rejected.</p>
                          )}
                          {order.orderStatus === "request_sucess" && (
                            <p className="mb-0">✅ Request successful.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="card-footer text-end fw-bold">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
