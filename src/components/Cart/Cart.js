import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import AddressPopupPage from "../AddressPopupPage/AddressPopupPage";
import { FaMapMarkerAlt, FaHome, FaCreditCard, FaArrowRight } from "react-icons/fa";
import "./Cart.css";
import Navbar from "../New_Templates/Navbar";

function CartPage() {
  const { cartItems } = useContext(CartContext);
  const [addresses, setAddresses] = useState([]);
  const [billingAddress, setBillingAddress] = useState(null);
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [isBillingChanging, setIsBillingChanging] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const clientId = localStorage.getItem("client_id");
  const navigate = useNavigate();
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  
  const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
  const isBuyNow = !!buyNowItem;

  const calculateTotal = () => {
    if (isBuyNow) {
      return buyNowItem?.totalAmount?.toFixed(2);
    }
    return cartItems.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0).toFixed(2);
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const fetchSavedAddresses = async () => {
    try {
      const payload = { companyCode, unitCode, clientId };
      const response = await ApiService.post("/client/getClientDetailsById", payload);

      if (response.status) {
        const data = response.data;
        setAddresses(data.customerAddress);

        if (data.customerAddress.length > 0) {
          setDeliveryAddress(data.customerAddress[0]);
          setBillingAddress(data.customerAddress[0]);
        } else {
          setShowForm(true);
        }
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setShowForm(true);
    }
  };

  const handleAddressSelect = (addr) => {
    setDeliveryAddress(addr);
  };

  useEffect(() => {
    if (isBillingSame && deliveryAddress) {
      setBillingAddress(deliveryAddress);
    }
  }, [deliveryAddress, isBillingSame]);

  const handleProceed = () => {
    if (deliveryAddress) {
      navigate("/order-details", {
        state: {
          deliveryAddress,
          billingAddress,
          orderItems: isBuyNow ? [buyNowItem] : cartItems,
          isBuyNow,
        },
      });
    }
  };

  return (
    <div className="modern-cart-container">
      <Navbar />
      <CheckoutSteps currentStep={1} />
      
      <div className="address-only-layout">
        {/* Main Address Section */}
        <div className="address-main-section">
          <div className="section-header-main">
            <FaMapMarkerAlt className="section-icon-main" />
            <h1>Delivery & Billing Information</h1>
            <p className="section-subtitle">Choose where you want your order delivered</p>
          </div>

          {/* Delivery Address Section */}
          <div className="address-card-main">
            <div className="address-section-header">
              <div className="header-left">
                <FaHome className="address-section-icon" />
                <div>
                  <h3>Delivery Address</h3>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>
              {deliveryAddress && !isChangingAddress && (
                <button className="change-address-btn-main" onClick={() => setIsChangingAddress(true)}>
                  Change
                </button>
              )}
            </div>

            {deliveryAddress && !isChangingAddress ? (
              <div className="selected-address-main">
                <div className="address-display-main">
                  <div className="address-badge">Selected</div>
                  <div className="address-content">
                    <strong className="address-name">{deliveryAddress.name}</strong>
                    <p className="address-full">
                      {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pin}
                    </p>
                    <p className="address-contact">
                      {deliveryAddress.country} | 📱 {deliveryAddress.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="address-selection-main">
                <h4>Select Delivery Address</h4>
                <div className="address-grid-main">
                  {addresses.map((addr, index) => (
                    <div
                      key={index}
                      className={`address-option-card ${deliveryAddress?.id === addr.id ? "active" : ""}`}
                      onClick={() => {
                        handleAddressSelect(addr);
                        setIsChangingAddress(false);
                      }}
                    >
                      <div className="address-option-content">
                        <div className="address-option-header">
                          <FaHome className="address-option-icon" />
                          <strong>{addr.name}</strong>
                        </div>
                        <p className="address-option-line">{addr.city}, {addr.state} - {addr.pin}</p>
                        <p className="address-option-line">{addr.country} | 📱 {addr.phoneNumber}</p>
                      </div>
                      {deliveryAddress?.id === addr.id && (
                        <div className="selected-indicator">✓ Selected</div>
                      )}
                    </div>
                  ))}
                </div>
                <button className="add-new-address-btn" onClick={() => setShowForm(true)}>
                  + Add New Delivery Address
                </button>
              </div>
            )}
          </div>

          {/* Billing Address Section */}
          {deliveryAddress && (
            <div className="address-card-main">
              <div className="address-section-header">
                <div className="header-left">
                  <FaCreditCard className="address-section-icon" />
                  <div>
                    <h3>Billing Address</h3>
                    <p>Where should we send the invoice?</p>
                  </div>
                </div>
              </div>

              <div className="billing-options-main">
                <label className="billing-option">
                  <input
                    type="radio"
                    checked={isBillingSame}
                    onChange={() => {
                      setIsBillingSame(true);
                      setBillingAddress(deliveryAddress);
                    }}
                  />
                  <div className="billing-option-content">
                    <span className="billing-option-title">Same as delivery address</span>
                    <span className="billing-option-desc">Use the delivery address for billing</span>
                  </div>
                </label>
                
                <label className="billing-option">
                  <input
                    type="radio"
                    checked={!isBillingSame}
                    onChange={() => {
                      setIsBillingSame(false);
                      setIsBillingChanging(true);
                    }}
                  />
                  <div className="billing-option-content">
                    <span className="billing-option-title">Use different billing address</span>
                    <span className="billing-option-desc">Choose a different address for billing</span>
                  </div>
                </label>
              </div>

              {!isBillingSame && billingAddress && !isBillingChanging && (
                <div className="selected-address-main">
                  <div className="address-display-main">
                    <div className="address-badge">Billing Address</div>
                    <div className="address-content">
                      <strong className="address-name">{billingAddress.name}</strong>
                      <p className="address-full">
                        {billingAddress.city}, {billingAddress.state} - {billingAddress.pin}
                      </p>
                      <p className="address-contact">
                        {billingAddress.country} | 📱 {billingAddress.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <button className="change-address-btn-main" onClick={() => setIsBillingChanging(true)}>
                    Change
                  </button>
                </div>
              )}

              {!isBillingSame && isBillingChanging && (
                <div className="address-selection-main">
                  <h4>Select Billing Address</h4>
                  <div className="address-grid-main">
                    {addresses.filter((addr) => addr.id !== deliveryAddress.id).map((addr, index) => (
                      <div
                        key={index}
                        className={`address-option-card ${billingAddress?.id === addr.id ? "active" : ""}`}
                        onClick={() => {
                          setBillingAddress(addr);
                          setIsBillingChanging(false);
                        }}
                      >
                        <div className="address-option-content">
                          <div className="address-option-header">
                            <FaHome className="address-option-icon" />
                            <strong>{addr.name}</strong>
                          </div>
                          <p className="address-option-line">{addr.city}, {addr.state} - {addr.pin}</p>
                          <p className="address-option-line">{addr.country} | 📱 {addr.phoneNumber}</p>
                        </div>
                        {billingAddress?.id === addr.id && (
                          <div className="selected-indicator">✓ Selected</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="add-new-address-btn" onClick={() => setShowForm(true)}>
                    + Add New Billing Address
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Order Summary & Proceed Button */}
          <div className="order-summary-main">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-content">
                <div className="summary-row-main">
                  <span>Total Amount</span>
                  <span className="total-amount-main">₹{calculateTotal()}</span>
                </div>
                <div className="summary-note">
                  <span className="free-shipping-main">✓ Free Shipping</span>
                </div>
              </div>
              <button
                className="proceed-btn-main"
                onClick={handleProceed}
                disabled={!deliveryAddress || (!isBillingSame && !billingAddress)}
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight className="proceed-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddressPopupPage
              onClose={() => setShowForm(false)}
              onSuccess={() => window.location.reload()}
              onSave={(newAddr) => {
                handleAddressSelect(newAddr);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;