import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { useParams } from "react-router-dom";
import "./OrderItemDetails.css";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const OrderItemDetails = () => {
  const { orderId, deviceId } = useParams();
  const [item, setItem] = useState(null);
  const [device, setDevice] = useState(null);
  const [order, setOrder] = useState(null);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [status, setStatus] = useState(order.status || "Pending");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const payload = { companyCode, unitCode, clientId };
        const response = await ApiService.post(
          "client/getClientDetailsById",
          payload
        );

        if (response.status) {
          const orders = response.data.orders;
          const currentOrder = orders.find((o) => o.id.toString() === orderId);
          if (currentOrder) {
            const currentItem = currentOrder.orderItems.find(
              (i) => i.deviceId.toString() === deviceId
            );
            const currentDevice = Array.isArray(currentOrder.deviceDetails)
              ? currentOrder.deviceDetails.find(
                  (d) => d.deviceId.toString() === deviceId
                )
              : null;

            setOrder(currentOrder);
            setItem(currentItem);
            setDevice(currentDevice);
          }
        }
      } catch (error) {
        console.error("Error fetching order item details:", error);
      }
    };

    fetchOrders();
  }, [orderId, deviceId]);

  // const handleCancel = () => {
  //   alert("Cancellation request submitted!");
  //   // Implement API call here
  // };

  const handleCancel = async () => {
    if (!cancelReason) {
      alert("Please select a reason for cancellation.");
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this item?"
    );
    if (!confirmCancel) return;

    try {
      const payload = {
        orderId,
        deviceId,
        clientId,
        companyCode,
        unitCode,
        reason: cancelReason,
      };

      const response = await ApiService.post("client/cancelOrderItem", payload);

      if (response.status) {
        alert("Cancellation request submitted successfully.");
        window.location.reload();
      } else {
        alert("Cancellation failed. Please try again.");
      }
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleUpdate = async (actionType, additionalData = {}) => {
    setIsLoading(true);

    let orderStatus = "";
    if (actionType === "cancel") {
      orderStatus = "cancelled";
    } else if (actionType === "replace") {
      orderStatus = "replaced";
    }

    const payload = {
      companyCode,
      unitCode,
      id: orderId,
      orderStatus,
      // actionType,
      // deviceId,
      // clientId,
      ...additionalData,
    };

    try {
      const response = await ApiService.post(
        "/order/handleCreateOrder",
        payload
      );

      if (response.status) {
        alert(`Order item ${orderStatus} successfully.`);
        window.location.reload();
      } else {
        alert(`Failed to ${actionType} item.`);
      }
    } catch (err) {
      console.error(`Error during ${actionType}:`, err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = () => {
    alert("Return request submitted!");
    // Implement API call here
  };

  if (!item || !order) return <p>Loading item details...</p>;

  const isDelivered = order.orderStatus === "delivered";
  const isDispatched = order.orderStatus === "dispatched";
  const isShipped = order.orderStatus === "shipped";
  const deliveryDate = new Date(order.delivaryDate);
  const today = new Date();
  const canReturn =
    isDelivered && (today - deliveryDate) / (1000 * 60 * 60 * 24) <= 7;
  const canCancel = !isShipped && !isDispatched;

  return (
    <div className="OrderItemDetails-container">
      <div className="OrderItemDetails-main">
        <div className="OrderItemDetails-left">
          <div className="OrderItemDetails-product">
            <img
              src={device?.image || "https://via.placeholder.com/100"}
              alt={item.name}
              className="OrderItemDetails-image"
            />
            <div className="OrderItemDetails-productDetails">
              <h2 className="OrderItemDetails-title">{item.name}</h2>
              <p className="OrderItemDetails-subtext">
                Network: {item.network}
              </p>
              <p className="OrderItemDetails-subtext">
                Subscription: {item.subscriptionType}
              </p>
              <p className="OrderItemDetails-subtext">
                Accessories: {item.is_relay ? "With Relay" : "Without Relay"}
              </p>
              <p className="OrderItemDetails-price">₹{item.amount}</p>
            </div>
          </div>

          <div className="OrderItemDetails-statusTimeline">
            <p>
              <strong>
                {isDelivered
                  ? `Delivered on ${formatDate(order.delivaryDate)}`
                  : `Status: ${order.orderStatus}`}
              </strong>
            </p>
            <div className="OrderItemDetails-timeline">
              <div className="OrderItemDetails-timelineItem">
                <span className="OrderItemDetails-icon">✔</span>
                <span>Order Placed</span>
              </div>
              {isShipped && (
                <div className="OrderItemDetails-timelineItem">
                  <span className="OrderItemDetails-icon">✔</span>
                  <span>Shipped</span>
                </div>
              )}
              {isDelivered && (
                <div className="OrderItemDetails-timelineItem">
                  <span className="OrderItemDetails-icon">✔</span>
                  <span>Dispatched</span>
                </div>
              )}
              {isDelivered && (
                <div className="OrderItemDetails-timelineItem">
                  <span className="OrderItemDetails-icon">✔</span>
                  <span>Delivered</span>
                </div>
              )}
            </div>
            <p className="OrderItemDetails-returnInfo">
              {isDelivered
                ? `Return policy ends on ${formatDate(
                    new Date(deliveryDate.getTime() + 7 * 24 * 60 * 60 * 1000)
                  )}`
                : `Expected delivery: ${formatDate(order.delivaryDate)}`}
            </p>
            {canCancel && item.status !== "cancelled" && (
              <>
                <button
                  className="OrderItemDetails-actionBtn"
                  onClick={() => setShowCancelReason(true)}
                >
                  Cancel Order
                </button>

                {showCancelReason && (
                  <div className="OrderItemDetails-cancelReasonBox">
                    <label>
                      Reason for cancellation:
                      <select
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                      >
                        <option value="">-- Select a reason --</option>
                        <option value="Changed my mind">Changed my mind</option>
                        <option value="Found a better price">
                          Found a better price
                        </option>
                        <option value="Ordered by mistake">
                          Ordered by mistake
                        </option>
                        <option value="Item not required">
                          Item not required
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    <button
                      className="OrderItemDetails-actionBtn"
                      onClick={() =>
                        handleUpdate("cancel", {
                          reason: cancelReason,
                        })
                      }
                    >
                      Submit Cancellation
                    </button>
                  </div>
                )}
              </>
            )}

            {canReturn && (
              <button
                className="OrderItemDetails-actionBtn"
                onClick={() => handleUpdate("replace")}
              >
                Replace Item
              </button>
            )}
          </div>
        </div>

        <div className="OrderItemDetails-right">
          <div className="OrderItemDetails-invoice">
            📄{" "}
            <a href="#" download>
              Download Invoice
            </a>
          </div>

          <div className="OrderItemDetails-shippingBox">
            <h3>Shipping Address</h3>
            <p>{order.deliveryAddress.name || "Mahesh G"}</p>
            <p>
              <span>Phone:</span>{" "}
              {order.deliveryAddress.phoneNumber || "7995357141"}
            </p>
            <p>{order.deliveryAddress.city || "Visakhapatnam, AP"}</p>
            <p>{order.deliveryAddress.state || "Andhra Pradesh"}</p>
            <p>{order.deliveryAddress.country || "India"}</p>
          </div>

          <div className="OrderItemDetails-shippingBox">
            <h3>Billing Address</h3>
            <p>{order.deliveryAddress.name || "Mahesh G"}</p>
            <p>
              <span>Phone:</span> {order.deliveryAddress.phone || "7995357141"}
            </p>
            <p>{order.addressLine1 || "Sunshine Boys Hostel"}</p>
            <p>{order.addressLine2 || "PM Palem"}</p>
            <p>{order.deliveryAddress.city || "Visakhapatnam"}</p>
          </div>

          <div className="OrderItemDetails-priceBox">
            <h3>Price Details</h3>
            <p>
              Quantity: <span>{item.qty}</span>
            </p>
            <p>Total: ₹{item.amount}</p>
          </div>
        </div>
      </div>

      {/* <div className="OrderItemDetails-footer">
        <div className="OrderItemDetails-chat">💬 Chat with Support</div>
      </div> */}
    </div>
  );
};

export default OrderItemDetails;
