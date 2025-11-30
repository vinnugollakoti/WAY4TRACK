import React, { useEffect, useState, useRef } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import { useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import ProductReviewForm from "../ProductReviewForm/ProductReviewForm";
import jsPDF from "jspdf";
import "./OrderItemDetails.css";
import Navbar from "../New_Templates/Navbar";
import toast, { Toaster } from "react-hot-toast";
import html2canvas from "html2canvas";
import InvoicePrintable from "./InvoicePrintable";

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

  const invoiceRef = useRef();

  const items = [
  {
    name: item?.name || "Product",
    description: item?.deviceId || "",
    qty: Number(item?.qty ?? 1),
    rate: Number(item?.rate ?? item?.price ?? Math.round((order?.totalAmount||0) / (item?.qty||1))),
    hsn: item?.hsn || "85269190",
    cgstPercent: 9,
    sgstPercent: 9,
  }
];

const subtotal = items.reduce((s,it)=> s + (it.rate * it.qty), 0);
const totalCgst = items.reduce((s,it)=> s + (it.rate * it.qty * (it.cgstPercent/100)), 0);
const totalSgst = items.reduce((s,it)=> s + (it.rate * it.qty * (it.sgstPercent/100)), 0);
const totalAmount = subtotal + totalCgst + totalSgst;
const totals = { subtotal, totalCgst, totalSgst, totalAmount, amountInWords: "" };

const company = {
  name: "SHARON TELEMATICS PRIVATE LIMITED",
  addressLines: [
    "Company ID: CIN3333333333",
    "21-27, Double road",
    "Viman Nagar, Kakani Nagar",
    "Visakhapatnam",
    "Andhra Pradesh  Pincode : 530009"
  ],
  gstin: "37ABACS4415R1ZV"
};

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
          setRefundDevices(response.data.refund || []);
        }
      } catch (error) {
        console.error("Error fetching order item details:", error);
        toast.error("Failed to load order details");
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
        setRating(filteredReviews[0]?.rating || 0);
      }
    } catch (error) {
      console.error("Reviews fetching failed:", error);
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

      if (reviews && reviews.id) {
        payload.id = reviews.id;
      }
      
      const response = await ApiService.post(
        "/review/handleReviewDetails",
        payload
      );

      toast.success("Rating submitted successfully!");
    } catch (error) {
      console.error("Rating submission failed:", error);
      toast.error("Failed to submit rating");
    }
  };

  const handleDownloadInvoice = async () => {
  const invoiceEl = invoiceRef.current;
  if (!invoiceEl) return;

  // WAIT FOR ALL IMAGES INSIDE INVOICE TO LOAD
  const imgs = invoiceEl.getElementsByTagName("img");
  await Promise.all(
    Array.from(imgs).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = () => resolve(); // fail-safe
        }
      });
    })
  );

  // WAIT FOR BROWSER TO RENDER LAYOUT
  await new Promise((r) => setTimeout(r, 150));

  // CAPTURE WITH html2canvas
  const canvas = await html2canvas(invoiceEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);

  const pdfWidth = 210;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Invoice_${order?.id || Date.now()}.pdf`);

  toast.success("Invoice downloaded!");
};





  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setUploadedImage(file);
      toast.success("Image uploaded successfully");
    }
  };

  const refund = refundDevices?.find(
    (r) => r.deviceId?.id.toString() === deviceId
  );

  const refundStatus = refund?.refundStatus;

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
        return "The item is being returned. We'll notify you once it's received.";
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
          "/order/UpdateOrder",
          payload
        );

        if (cancelResponse.status) {
          toast.success("Order item canceled successfully.");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error("Failed to cancel item.");
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
          toast.success("Replacement request submitted successfully.");
        } else {
          toast.error("Failed to submit replacement request.");
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
          toast.success("Order updated successfully for replacement.");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          toast.error("Failed to update the order.");
        }
      }
    } catch (err) {
      console.error("Error during order update:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!item || !order) {
    return (
      <div>
        <Navbar />
        <div className="order-item-loading">
          <div className="loading-spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
        <div
        style={{
          position: "absolute",
          top: "-2000px",      // completely off-screen
          left: "0",
          opacity: 0,          // completely invisible but STILL renders
          pointerEvents: "none",
        }}
      >
        <InvoicePrintable
          ref={invoiceRef}
          order={{
            id: order?.id,
            orderDateStr: formatDate(order?.orderDate),
            placeOfSupply: "Andhra Pradesh",
            deliveryAddress: order?.deliveryAddress,
          }}
          items={items}
          company={company}
          totals={totals}
        />
      </div>



      <div className="OrderItemDetails-container">
        <div className="OrderItemDetails-main">
          <div className="OrderItemDetails-left">
            {/* Product Information Section */}
            <div className="OrderItemDetails-product">
              <div className="OrderItemDetails-productDetails">
                <h2 className="OrderItemDetails-title">{item.name}</h2>
                
                <div className="OrderItemDetails-specs">
                  {item?.network && (
                    <div className="spec-item">
                      <strong>Network:</strong> {item.network}
                    </div>
                  )}
                  {item?.subscriptionType && (
                    <div className="spec-item">
                      <strong>Subscription:</strong> {item.subscriptionType} subscription
                    </div>
                  )}
                  {item?.state && (
                    <div className="spec-item">
                      <strong>State:</strong> {item.state}
                    </div>
                  )}
                  {item?.city && (
                    <div className="spec-item">
                      <strong>City:</strong> {item.city}
                    </div>
                  )}
                  <div className="spec-item">
                    <strong>Accessories:</strong> {item.is_relay ? "With Relay" : "Without Relay"}
                  </div>
                  <div className="spec-item">
                    <strong>Quantity:</strong> {item.qty}
                  </div>
                </div>
                
                <p className="OrderItemDetails-price">₹{order?.totalAmount}</p>
              </div>
              
              <div className="OrderItemDetails-imageContainer">
                <img
                  src={device?.image?.[0] || "/images/placeholder-product.png"}
                  alt={item.name}
                  className="OrderItemDetails-image"
                  onError={(e) => {
                    e.target.src = "/images/placeholder-product.png";
                  }}
                />
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="OrderItemDetails-statusTimeline">
              <div className="status-header">
                <h3>
                  {isDelivered
                    ? `Delivered on ${formatDate(order.delivaryDate)}`
                    : `Order Status: ${status.replace(/_/g, " ")}`}
                </h3>
              </div>
              
              <div className="OrderItemDetails-timeline">
                <div className={`timeline-item ${status !== OrderStatus.CANCELED ? 'completed' : ''}`}>
                  <span className="timeline-icon">✓</span>
                  <span className="timeline-text">Order Placed</span>
                </div>
                
                {isDispatched && (
                  <div className="timeline-item completed">
                    <span className="timeline-icon">✓</span>
                    <span className="timeline-text">Dispatched</span>
                  </div>
                )}
                
                {isDelivered && (
                  <div className="timeline-item completed">
                    <span className="timeline-icon">✓</span>
                    <span className="timeline-text">Delivered</span>
                  </div>
                )}
              </div>

              <div className="delivery-info">
                {isDelivered ? (
                  <p className="return-policy">
                    Return policy ends on {formatDate(
                      new Date(deliveryDate.getTime() + 7 * 24 * 60 * 60 * 1000)
                    )}
                  </p>
                ) : (
                  <p className="expected-delivery">
                    Expected delivery: {formatDate(order.delivaryDate)}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                {canCancel && (
                  <div className="action-section">
                    <button
                      className="action-btn cancel-btn"
                      onClick={() => setShowCancelReason(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Cancel Order"}
                    </button>

                    {showCancelReason && (
                      <div className="reason-form">
                        <label>
                          Reason for cancellation:
                          <select
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            required
                          >
                            <option value="">-- Select a reason --</option>
                            <option value="Changed my mind">Changed my mind</option>
                            <option value="Found a better price">Found a better price</option>
                            <option value="Ordered by mistake">Ordered by mistake</option>
                            <option value="Item not required">Item not required</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>
                        <div className="form-actions">
                          <button
                            className="action-btn submit-btn"
                            onClick={() => handleUpdate("cancel", { reason: cancelReason })}
                            disabled={!cancelReason || isLoading}
                          >
                            {isLoading ? "Submitting..." : "Submit Cancellation"}
                          </button>
                          <button
                            className="action-btn secondary-btn"
                            onClick={() => setShowCancelReason(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {canReturn && (
                  <div className="action-section">
                    <button
                      className="action-btn replace-btn"
                      onClick={() => setShowReplaceForm(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Request Replace"}
                    </button>

                    {showReplaceForm && (
                      <div className="reason-form">
                        <label>
                          Reason for replacement:
                          <select
                            value={replaceReason}
                            onChange={(e) => setReplaceReason(e.target.value)}
                            required
                          >
                            <option value="">-- Select a reason --</option>
                            <option value="Defective item">Defective item</option>
                            <option value="Item damaged during delivery">Item damaged during delivery</option>
                            <option value="Wrong item received">Wrong item received</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>

                        <label>
                          Additional Description:
                          <textarea
                            value={replaceDescription}
                            onChange={(e) => setReplaceDescription(e.target.value)}
                            placeholder="Please provide additional details..."
                            rows="3"
                          />
                        </label>

                        <label>
                          Upload Damage Image (optional):
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input"
                          />
                        </label>

                        <div className="form-actions">
                          <button
                            className="action-btn submit-btn"
                            onClick={() => handleUpdate("replace", {
                              reason: replaceReason,
                              description: replaceDescription,
                              damageImage: uploadedImage,
                            })}
                            disabled={!replaceReason || isLoading}
                          >
                            {isLoading ? "Submitting..." : "Submit Replacement Request"}
                          </button>
                          <button
                            className="action-btn secondary-btn"
                            onClick={() => setShowReplaceForm(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Refund/Replacement Status */}
              {refundStatus && (
                <div className="refund-status">
                  <h4>Replacement Status</h4>
                  <div className={`status-message ${refundStatus}`}>
                    {getRefundStatusMessage(refundStatus)}
                  </div>
                  {refund?.description && (
                    <p className="refund-note">
                      <strong>Note:</strong> {refund.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Review Section */}
            <div className="OrderItemDetails-reviewSection">
              <div className="rating-section">
                <h4>Rate this product</h4>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      disabled={isLoading}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="rating-text">
                  {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : "Click to rate"}
                </span>
              </div>

              <button
                className="action-btn review-btn"
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </button>

              {showReviewForm && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <button
                      className="modal-close"
                      onClick={() => setShowReviewForm(false)}
                    >
                      ×
                    </button>
                    <ProductReviewForm
                      item={item}
                      review={reviews}
                      initialRating={rating}
                      onClose={() => setShowReviewForm(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="OrderItemDetails-right">
            <div className="sidebar-card invoice-card" onClick={handleDownloadInvoice}>
              <div className="card-icon">
                <LiaFileInvoiceSolid size={24} />
              </div>
              <div className="card-content">
                <h4>Download Invoice</h4>
                <p>Get your order invoice in PDF format</p>
              </div>
              <IoMdArrowDropright size={20} className="arrow-icon" />
            </div>

            <div className="sidebar-card">
              <h3>Shipping Address</h3>
              <div className="address-details">
                <h4>{order.deliveryAddress?.name}</h4>
                <p>{order.deliveryAddress?.city}</p>
                <p>{order.deliveryAddress?.state}</p>
                <p>{order.deliveryAddress?.country}</p>
                <p className="phone">
                  <span>Phone:</span> {order.deliveryAddress?.phoneNumber}
                </p>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Billing Address</h3>
              <div className="address-details">
                <h4>{order.deliveryAddress?.name}</h4>
                <p>{order.addressLine1}</p>
                <p>{order.addressLine2}</p>
                <p>{order.deliveryAddress?.city}</p>
                <p className="phone">
                  <span>Phone:</span> {order.deliveryAddress?.phone}
                </p>
              </div>
            </div>

            <div className="sidebar-card price-card">
              <h3>Price Details</h3>
              <div className="price-details">
                <div className="price-row">
                  <span>Quantity:</span>
                  <span>{item.qty}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount:</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetails;