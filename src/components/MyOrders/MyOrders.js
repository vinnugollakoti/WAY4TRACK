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
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [orders, selectedStatuses, searchTerm]);

  const fetchOrders = async () => {
    try {
      const payload = { companyCode, unitCode, clientId };
      const response = await ApiService.post("client/getClientDetailsById", payload);
      if (response.status) {
        setOrders(response.data.orders || []);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (selectedStatuses.length > 0) {
      const lowerCaseStatuses = selectedStatuses.map((s) => s.toLowerCase());
      filtered = filtered.filter((order) =>
        lowerCaseStatuses.includes(order.orderStatus?.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.orderItems.some((item) =>
          item.name?.toLowerCase().includes(searchTerm) ||
          order.id?.toString().includes(searchTerm)
        )
      );
    }

    setFilteredOrders(filtered);
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSearchTerm("");
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "delivered":
      case "success":
      case "request_sucess":
        return "status-delivered";
      case "pending":
      case "request_raised":
        return "status-pending";
      case "received":
        return "status-received";
      case "dispatched":
      case "request_approved":
        return "status-dispatched";
      case "cancelled":
      case "aborted":
      case "request_reject":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  return (
    <div className="myorders-container">
      <div className="myorders-main">
        <div className="myorders-header">
          <h1 className="myorders-title">My Orders</h1>
          <p className="myorders-subtitle">Track and manage your orders</p>
        </div>

        <div className="myorders-controls">
          <div className="myorders-search-container">
            <div className="myorders-search">
              <input
                type="text"
                className="myorders-search-input"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="myorders-search-button">
                <span className="search-icon">🔍</span>
                Search
              </button>
            </div>
            {(selectedStatuses.length > 0 || searchTerm) && (
              <button className="myorders-clear-filters" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>

          <div className="filter-bar">
            {statusOptions.map((status) => (
              <button
                key={status}
                className={`status-pill ${selectedStatuses.includes(status) ? "active" : ""
                  }`}
                onClick={() => handleStatusChange(status)}
              >
                {status.replace(/_/g, " ")}
                {selectedStatuses.includes(status) && (
                  <span className="pill-count">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="myorders-empty">
            <div className="empty-icon">📦</div>
            <h3>No orders found</h3>
            <p>
              {orders.length === 0
                ? "You haven't placed any orders yet."
                : "No orders match your current filters."}
            </p>
            {(selectedStatuses.length > 0 || searchTerm) && (
              <button className="myorders-clear-filters-btn" onClick={clearFilters}>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="myorders-list">
            {[...filteredOrders].reverse().map((order) => (
              <div className="myorders-order-card" key={order.id}>
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">Order #{order.id}</h3>
                    <span className="order-date">
                      Placed on {formatDate(order.createdAt || order.orderDate)}
                    </span>
                  </div>
                  <div className={`order-status ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus?.replace(/_/g, " ")}
                  </div>
                </div>

                <div className="order-items">
                  {order.orderItems.map((item) => {
                    const device = Array.isArray(order.deviceDetails)
                      ? order.deviceDetails.find(
                        (d) => Number(d.deviceId) === Number(item.deviceId)
                      )
                      : null;

                    return (
                      <Link
                        to={`/order-item/${order.id}/${item.deviceId}`}
                        className="order-item-link"
                        key={item.deviceId}
                      >
                        <div className="order-item">
                          <div className="item-image-container">
                            <img
                              src={device?.image?.[0] || "/images/placeholder-product.png"}
                              alt={item.name}
                              className="order-item-image"
                              onError={(e) => {
                                e.target.src = "/images/placeholder-product.png";
                              }}
                            />
                          </div>
                          <div className="item-details">
                            <h4 className="item-name">{item.name}</h4>
                            <div className="item-specs">
                              {item?.network && (
                                <span className="spec-item">
                                  <strong>Network:</strong> {item.network}
                                </span>
                              )}
                              {item?.subscriptionType && (
                                <span className="spec-item">
                                  <strong>Subscription:</strong> {item.subscriptionType}
                                </span>
                              )}
                              {item?.state && (
                                <span className="spec-item">
                                  <strong>State:</strong> {item.state}
                                </span>
                              )}
                              {item?.city && (
                                <span className="spec-item">
                                  <strong>City:</strong> {item.city}
                                </span>
                              )}
                              <span className="spec-item">
                                <strong>Accessories:</strong> {item.is_relay ? "With Relay" : "Without Relay"}
                              </span>
                              <span className="spec-item">
                                <strong>Quantity:</strong> {item.qty}
                              </span>
                            </div>
                          </div>
                          <div className="item-price">
                            <div className="price-amount">₹{order.totalAmount}</div>
                            <div className="delivery-info">
                              {order.orderStatus === "delivered" && (
                                <div className="delivered-info">
                                  <span className="delivered-text">
                                    Delivered on {formatDate(order.delivaryDate)}
                                  </span>
                                  <p className="delivery-message">
                                    Your item has been delivered
                                  </p>
                                </div>
                              )}
                              {order.orderStatus === "pending" && (
                                <p className="status-message">
                                  ⏳ Order is pending confirmation
                                </p>
                              )}
                              {order.orderStatus === "received" && (
                                <div className="received-info">
                                  <p className="status-message">
                                    📦 We've received your order
                                  </p>
                                  <p className="expected-date">
                                    📅 Expected: {formatDate(order.delivaryDate)}
                                  </p>
                                </div>
                              )}
                              {order.orderStatus === "dispatched" && (
                                <div className="dispatched-info">
                                  <p className="status-message">
                                    🚚 Your order is on the way
                                  </p>
                                  <p className="expected-date">
                                    📅 Expected: {formatDate(order.delivaryDate)}
                                  </p>
                                </div>
                              )}
                              {order.orderStatus === "aborted" && (
                                <p className="status-message">
                                  ❌ Order was aborted
                                </p>
                              )}
                              {order.orderStatus === "cancelled" && (
                                <div className="cancelled-info">
                                  <p className="status-message">
                                    ❌ Order was cancelled
                                  </p>
                                  <Link to="/contactus" className="contact-link">
                                    Contact support here 👈
                                  </Link>
                                </div>
                              )}
                              {order.orderStatus === "success" && (
                                <p className="status-message">
                                  ✅ Order processed successfully
                                </p>
                              )}
                              {order.orderStatus === "request_raised" && (
                                <p className="status-message">
                                  📝 Request raised
                                </p>
                              )}
                              {order.orderStatus === "request_approved" && (
                                <p className="status-message">
                                  ✅ Request approved
                                </p>
                              )}
                              {order.orderStatus === "request_reject" && (
                                <p className="status-message">
                                  ❌ Request rejected
                                </p>
                              )}
                              {order.orderStatus === "request_sucess" && (
                                <p className="status-message">
                                  ✅ Request successful
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    Total: <span className="total-amount">₹{order?.totalAmount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;