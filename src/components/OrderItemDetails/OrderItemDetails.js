import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import ProductReviewForm from "../ProductReviewForm/ProductReviewForm";
import jsPDF from "jspdf";
import "./OrderItemDetails.css";

const OrderStatus = {
  PENDING: "pending",
  ORDERSUCESS: "orderSuccess",
  Dispatched: "dispatched",
  Delivered: "delivered",
  CANCELED: "cancelled",
  request_raised: "request_raised",
  request_approved: "request_approved",
  request_reject: "request_reject",
  request_sucess: "request_sucess",
};

const RefundStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SUCCESS: "success",
};

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
  const [refundDevices, setRefundDevices] = useState([]);

  const [cancelReason, setCancelReason] = useState("");
  const [replaceReason, setReplaceReason] = useState("");
  const [replaceDescription, setReplaceDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [showReplaceForm, setShowReplaceForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");
  const clientDbId = localStorage.getItem("client_db_id");
  console.log(order);

  console.log(rating, "rating");
  console.log(reviews, "review");

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
          setRefundDevices(response.data.refund);
        }
      } catch (error) {
        console.error("Error fetching order item details:", error);
      }
    };

    fetchOrders();
  }, [orderId, deviceId, companyCode, unitCode, clientId]);

  useEffect(() => {
    if (item) {
      fetchReviews();
    }
  }, [item]);

  const fetchReviews = async () => {
    const value = item?.deviceId;
    try {
      const response = await ApiService.post("/client/getClientReviewsById", {
        companyCode,
        unitCode,
        clientId: clientId,
      });

      if (response.status) {
        const allReviews = response.data?.review || [];

        const filteredReviews = allReviews.filter(
          (item) => item.deviceId.id === value
        );

        setReviews(filteredReviews[0]);

        if (filteredReviews.length > 0) {
          setRating(filteredReviews[0].rating);
        } else {
          setRating(0);
        }
      }
    } catch (error) {
      console.error("Reviews fetching failed:", error);
      alert("Failed to fetch reviews.");
    }
  };

  const handleStarClick = async (value) => {
    setRating(value);

    try {
      const payload = {
        companyCode,
        unitCode,
        clientId: clientDbId,
        orderId,
        deviceId: item.deviceId,
        rating: value,
      };

      console.log(reviews,"reeviews")

      if (reviews && reviews.id) {
        payload.id = reviews.id;
      }
      const response = await ApiService.post(
        "/review/handleReviewDetails",
        payload
      );

      console.log("Rating submitted successfully:", response.data);
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Rating submission failed:", error);
      alert("Failed to submit rating.");
    }
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);

    // Customer & Order Details
    doc.setFontSize(12);
    doc.text(`Customer: ${order?.name}`, 20, 35);
    doc.text(`Order ID: ${order?.id}`, 20, 45);
    doc.text(`Order Date: ${formatDate(order?.orderDate)}`, 20, 55);
    doc.text(`Delivery Date: ${formatDate(order?.delivaryDate)}`, 20, 65);

    // Item Details
    doc.text("Item Details:", 20, 80);
    doc.text(`- Product: ${item?.name}`, 25, 90);
    doc.text(`- Network: ${item?.network}`, 25, 100);
    doc.text(`- Subscription: ${item?.subscriptionType}`, 25, 110);
    doc.text(
      `- Accessories: ${item?.is_relay ? "With Relay" : "Without Relay"}`,
      25,
      120
    );
    doc.text(`- Amount: ₹${item?.amount}`, 25, 130);

    // Footer
    doc.text("Thank you for your purchase!", 20, 150);

    // Save the PDF
    doc.save(`Invoice_Order_${order?.id}.pdf`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the file object
    if (file) {
      setUploadedImage(file); // Store the file object in state
    }
  };

  const refund = refundDevices?.find(
    (r) => r.deviceId?.id.toString() === deviceId
  );

  const refundStatus = refund?.refundStatus;

  console.log(refundStatus, "ref");

  const getRefundStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your replacement request is pending. We'll update you shortly.";
      case "request_recived":
        return "We've received your replacement request and are reviewing it.";
      case "request_accept":
        return "Your replacement request has been accepted.";
      case "request_reject":
        return "Unfortunately, your replacement request has been rejected.";
      case "pick_scheduled":
        return "Pickup for the item has been scheduled.";
      case "item_picked_up":
        return "The item has been picked up successfully.";
      case "new_item_dispatched":
        return "The replacement item has been dispatched.";
      case "replaced_sucess":
        return "The replacement was successful. Thank you!";
      case "returning":
        return "The item is being returned. We’ll notify you once it’s received.";
      default:
        return "Status unknown. Please contact support.";
    }
  };

  const handleUpdate = async (actionType, additionalData = {}) => {
    setIsLoading(true);

    const basePayload = {
      companyCode,
      unitCode,
      clientId: clientDbId,
      deliveryAddressId: order.deliveryAddress?.id,
      buildingAddressId: order.buildingAddress?.id,
      ...additionalData,
    };

    try {
      if (actionType === "cancel") {
        const payload = {
          ...basePayload,
          id: orderId,
          orderStatus: OrderStatus.CANCELED,
          description: cancelReason || "User action",
        };

        const cancelResponse = await ApiService.post(
          "/order/handleCreateOrder",
          payload
        );

        if (cancelResponse.status) {
          alert("Order item canceled successfully.");
          window.location.reload();
        } else {
          alert("Failed to cancel item.");
        }
      } else if (actionType === "replace") {
        const refundFormData = new FormData();
        refundFormData.append("companyCode", companyCode);
        refundFormData.append("unitCode", unitCode);
        refundFormData.append("clientId", clientDbId);
        refundFormData.append("orderId", order.id);
        refundFormData.append("deviceId", item.deviceId);
        refundFormData.append("orderStatus", OrderStatus.request_raised);
        refundFormData.append("refundStatus", RefundStatus.PENDING);
        refundFormData.append(
          "description",
          replaceDescription || "User action"
        );
        refundFormData.append("name", order.name);
        refundFormData.append("reason", replaceReason);
        refundFormData.append("dateOfRequest", new Date().toISOString());
        refundFormData.append("dateOfReplace", new Date().toISOString());

        // if (uploadedImage instanceof File) {
        //   refundFormData.append("photo", uploadedImage);
        // }

        // 🔁 Send refund request
        const refundResponse = await ApiService.post(
          "/Refund/handleRefundDetails",
          refundFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (refundResponse.status) {
          alert("Replacement request submitted successfully.");
        } else {
          alert("Failed to submit replacement request.");
          return;
        }

        const createOrderPayload = {
          ...basePayload,
          id: order.id,
          orderStatus: OrderStatus.request_raised,
          description: replaceDescription || "Replacement initiated",
        };

        const createOrderResponse = await ApiService.post(
          "/order/handleCreateOrder",
          createOrderPayload
        );

        if (createOrderResponse.status) {
          alert("Order updated successfully for replacement.");
          window.location.reload();
        } else {
          alert("Failed to update the order.");
        }
      }
    } catch (err) {
      console.error(
        "Error during order update:",
        err.response?.data || err.message || err
      );
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!item || !order) return <p>Loading item details...</p>;

  const deliveryDate = new Date(order.delivaryDate);
  const today = new Date();
  const status = order.orderStatus;

  const isDelivered = status === OrderStatus.Delivered;
  const isDispatched = status === OrderStatus.Dispatched;
  const isPending = status === OrderStatus.PENDING;
  const isSuccess = status === OrderStatus.ORDERSUCESS;
  const isCancelled = status === OrderStatus.CANCELED;
  const isReturnRequested = status === OrderStatus.request_raised;
  const isReturnApproved = status === OrderStatus.request_approved;
  const isReturnRejected = status === OrderStatus.request_reject;
  const isReturnSuccess = status === OrderStatus.request_sucess;

  const canCancel =
    (isPending || isSuccess) &&
    !(
      isCancelled ||
      isReturnRequested ||
      isReturnApproved ||
      isReturnRejected ||
      isReturnSuccess ||
      isDispatched
    );

  const canReturn =
    isDelivered &&
    (today - deliveryDate) / (1000 * 60 * 60 * 24) <= 7 &&
    !isReturnRequested;

  const showExpectedDelivery = !isDelivered && !isCancelled;



  console.log(item, "item");

  return (
    <div className="OrderItemDetails-container">
      <div className="OrderItemDetails-main">
        <div className="OrderItemDetails-left">
          <div className="OrderItemDetails-product">
            <div className="OrderItemDetails-productDetails">
              <h2 className="OrderItemDetails-title">{item.name}</h2>
              <p className="OrderItemDetails-subtext">
                <strong>Network:</strong> {item.network}
              </p>
              <p className="OrderItemDetails-subtext">
                <strong>Subscription:</strong> {item.subscriptionType}
              </p>
              <p className="OrderItemDetails-subtext">
                <strong>Accessories:</strong>{" "}
                {item.is_relay ? "With Relay" : "Without Relay"}
              </p>
              <p className="OrderItemDetails-price">₹{item.amount}</p>
            </div>
            <img
              src={device?.image || "https://via.placeholder.com/100"}
              alt={item.name}
              className="OrderItemDetails-image"
            />
          </div>

          <div className="OrderItemDetails-statusTimeline">
            <p>
              <strong>
                {isDelivered
                  ? `Delivered on ${formatDate(order.delivaryDate)}`
                  : `Order Status: ${status}`}
              </strong>
            </p>
            <div className="OrderItemDetails-timeline">
              {status !== OrderStatus.ABORTED &&
                status !== OrderStatus.CANCELED && (
                  <div className="OrderItemDetails-timelineItem">
                    <span className="OrderItemDetails-icon">✔</span>
                    <span>Order Placed</span>
                  </div>
                )}

              {isDispatched && (
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
                : status === OrderStatus.request_raised ||
                  status === OrderStatus.request_approved ||
                  status === OrderStatus.request_reject ||
                  status === OrderStatus.request_sucess
                ? ""
                : `Expected delivery: ${formatDate(order.delivaryDate)}`}
            </p>

            {canCancel && item.status !== OrderStatus.CANCELED && (
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

            {canReturn && !isReturnRequested && (
              <button
                className="OrderItemDetails-actionBtn"
                // onClick={() =>
                //   handleUpdate("replace", {
                //     reason: "Return requested by user",
                //     orderStatus: OrderStatus.request_raised,
                //   })
                // }
                onClick={() => setShowReplaceForm(true)}
              >
                Request Replace
              </button>
            )}

            {showReplaceForm && (
              <div className="OrderItemDetails-replaceForm">
                <label>
                  Reason for replacement:
                  <select onChange={(e) => setReplaceReason(e.target.value)}>
                    <option value="">-- Select a reason --</option>
                    <option value="Defective item">Defective item</option>
                    <option value="Item damaged during delivery">
                      Item damaged during delivery
                    </option>
                    <option value="Wrong item received">
                      Wrong item received
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  Additional Description (optional):
                  <textarea
                    onChange={(e) => setReplaceDescription(e.target.value)}
                  />
                </label>

                <label>
                  Upload Damage Image (optional):
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>

                <button
                  className="OrderItemDetails-actionBtn"
                  onClick={() =>
                    handleUpdate("replace", {
                      reason: replaceReason,
                      description: replaceDescription,
                      damageImage: uploadedImage, // You will set this in handleImageUpload
                    })
                  }
                >
                  Submit Replacement Request
                </button>
              </div>
            )}

            {refundStatus && (
              <div className="OrderItemDetails-refundStatusMessage">
                <strong>Replacement Status:</strong>
                <p>{getRefundStatusMessage(refundStatus)}</p>
                {refund.description && (
                  <p>
                    <strong>Note:</strong> {refund.description}
                  </p>
                )}
              </div>
            )}

            {isReturnRequested && !refundStatus && (
              <p className="OrderItemDetails-statusNote">
                Return request is under review.
              </p>
            )}
            {isReturnApproved && (
              <p className="OrderItemDetails-statusNote">
                Return approved. Awaiting pickup.
              </p>
            )}
            {isReturnRejected && (
              <p className="OrderItemDetails-statusNote">
                Return request was rejected.
              </p>
            )}
            {isReturnSuccess && (
              <p className="OrderItemDetails-statusNote">
                Return completed successfully.
              </p>
            )}
          </div>

          <div className="OrderItemDetails-reviewSection">
            <div className="OrderItemDetails-starDisplay">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <span
                    key={i}
                    className={`OrderItemDetails-star ${
                      starValue <= (hoverRating || rating) ? "filled" : ""
                    }`}
                    onClick={() => handleStarClick(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            {!showReviewForm && (
              <button
                className="OrderItemDetails-actionBtn"
                onClick={() => setShowReviewForm(true)}
              >
                Add Review
              </button>
            )}

            {showReviewForm && (
              <div className="OrderItemDetails-modalOverlay">
                <div className="OrderItemDetails-modalContent">
                  <button
                    className="OrderItemDetails-modalClose"
                    onClick={() => setShowReviewForm(false)}
                  >
                    ×
                  </button>
                  <ProductReviewForm
                  item={item}
                    review={reviews}
                    initialRating={rating}
                  />
                </div>
              </div>
            )}
          </div>

          {/* <ProductReviewForm /> */}
        </div>

        <div className="OrderItemDetails-right">
          <div
            className="OrderItemDetails-invoice"
            onClick={handleDownloadInvoice}
          >
            <p className="OrderItemDetails-invoice-description">
              <LiaFileInvoiceSolid size={30} />
              Download Invoice
            </p>
            <IoMdArrowDropright size={30} />
            {/* <a href="#" download>
              Download Invoice
            </a> */}
            {/* <button className="OrderItemDetails-actionBtn">
              Download Invoice
            </button> */}
          </div>

          <div className="OrderItemDetails-shippingBox">
            <h3>Shipping Address</h3>
            <h1>{order.deliveryAddress.name}</h1>

            <p>{order.deliveryAddress.city}</p>
            <p>{order.deliveryAddress.state}</p>
            <p>{order.deliveryAddress.country}</p>
            <p>
              <span>Phone Number:</span> {order.deliveryAddress.phoneNumber}
            </p>
          </div>

          <div className="OrderItemDetails-shippingBox">
            <h3>Billing Address</h3>
            <h1>{order.deliveryAddress.name}</h1>

            <p>{order.addressLine1}</p>
            <p>{order.addressLine2}</p>
            <p>{order.deliveryAddress.city}</p>
            <p>
              <span>Phone Number:</span> {order.deliveryAddress.phone}
            </p>
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
    </div>
  );
};

export default OrderItemDetails;
