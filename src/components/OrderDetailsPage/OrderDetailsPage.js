import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import PromoCode from "../Promocode/Promocode";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../New_Templates/Navbar";
import Footer from "../New_Templates/Footer";
import "./OrderDetailsPage.css";

function OrderDetailsPage() {
  const location = useLocation();
  const { cartItems, setCartItems, removeFromCart, addToCart } = useContext(CartContext);
  const [promoDiscount, setPromoDiscount] = useState(0);
  console.log("PROMOCODE DISCOUNT : ", promoDiscount)
  const [selectedPromoDetails, setSelectedPromoDetails] = useState(null);

  const { deliveryAddress, billingAddress, isBuyNow, orderItems } = location.state || {};
  const navigate = useNavigate();
  const clientId = Number(localStorage.getItem("client_db_id"));
  const userId = localStorage.getItem("client_id");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const displayedItems = isBuyNow ? orderItems : cartItems;

  const displayedItemsNormalized = displayedItems.map((item) => {
    if (isBuyNow) {
      return {
        ...item,
        device: {
          name: item.name,
          model: item.model,
          id: item.deviceId,
          image: item.image,
          amount: item.amount,
          discount: item.discount,
          relayAmt: item.relayAmt,
          isRelay: item.isRelay,
          network2gAmt: item.network2gAmt,
          network4gAmt: item.network4gAmt,
          subscriptionMonthlyAmt: item.subscriptionMonthlyAmt,
          subscriptionYearlyAmt: item.subscriptionYearlyAmt,
          isNetwork: item.isNetwork,
          isSubscription: item.isSubscription,
        },
      };
    }
    return item;
  });

  const toNumber = (val) => Number(val) || 0;

  // Calculate base item price (same logic as CartPage)
  const calculateBaseItemPrice = (item) => {
    if (!item || !item.device) return 0;

    const baseAmount = toNumber(item.device.amount);
    const discount = toNumber(item.device.discount);
    const network2gAmt = toNumber(item.device.network2gAmt);
    const network4gAmt = toNumber(item.device.network4gAmt);
    const subscriptionMonthlyAmt = toNumber(item.device.subscriptionMonthlyAmt);
    const subscriptionYearlyAmt = toNumber(item.device.subscriptionYearlyAmt);

    // Calculate base price with discount
    let price = baseAmount;
    if (discount > 0) {
      price -= (baseAmount * discount) / 100;
    }

    // Add network amount
    if (item.network === "2G") {
      price += network2gAmt;
    } else if (item.network === "4G") {
      price += network4gAmt;
    }

    // Add subscription amount
    if (item.subscription === "monthly") {
      price += subscriptionMonthlyAmt;
    } else if (item.subscription === "yearly") {
      price += subscriptionYearlyAmt;
    }

    return price;
  };

  // Check if relay is selected (same logic as CartPage)
  const isRelaySelected = (item) => {
    if (!item || !item.device) return false;

    const basePrice = calculateBaseItemPrice(item);
    const quantity = toNumber(item.quantity);
    const totalAmount = toNumber(item.totalAmount);
    const baseTotal = basePrice * quantity;

    return totalAmount > baseTotal;
  };

  // Calculate final item price including relay (same logic as CartPage)
  const calculateFinalItemPrice = (item) => {
    const basePrice = calculateBaseItemPrice(item);
    const relayAmt = toNumber(item.device.relayAmt);
    
    const relaySelected = isRelaySelected(item);
    
    if (relaySelected && item.device.isRelay && relayAmt > 0) {
      return basePrice + relayAmt;
    }
    
    return basePrice;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        clientId: userId,
      };
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

  const total = displayedItems.reduce(
    (sum, item) => sum + toNumber(item.totalAmount),
    0
  );

  const totalOrdersAmount = orders.reduce(
    (sum, item) => sum + toNumber(item.totalAmount),
    0
  );

  

  
  const finalAmount = Math.max(0, total - promoDiscount);

  console.log("FINAL AMOUTN : ", finalAmount)

  const createOrderPayload = (razorpayResponse ) => {
    console.log("RAZORPAY RESPONSE : ", razorpayResponse)
    if (!deliveryAddress || !billingAddress) {
      alert("Please provide both delivery and billing addresses.");
      return;
    }
    const orderItemsPayload = displayedItemsNormalized.map((item) => ({
      name: item.device.name,
      qty: item.quantity,
      amount: item.totalAmount,
      deviceId: item.device.id,
      is_relay: isRelaySelected(item), // Use the correct relay detection
      network: item.network,
      state: item.state,
      city: item.city,
      subscriptionType: item.subscription,
      desc: item.device.model,
    }));

    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 4);
    console.log("DELIVERY ADDRESS", JSON.stringify(deliveryAddress))
    console.log("DELIVERY NAME :  ", deliveryAddress.name)
    return {
      name: (deliveryAddress.name),
      totalAmount: finalAmount, // Use final amount including promo discount
      paymentStatus: "pending",
      orderDate: orderDate.toISOString(),
      deliveryAddressId: JSON.stringify(deliveryAddress.id),
      buildingAddressId: JSON.stringify(billingAddress.id),
      subscription: "pending",
      clientId,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      orderItems: orderItemsPayload,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
      delivaryDate: deliveryDate.toISOString(),
      promoDiscount: promoDiscount, // Include promo discount in payload
      promoCode: selectedPromoDetails?.code || null, // Include promo code if applied
    };
  };

  const placeOrder = async () => {
    if (!deliveryAddress || !billingAddress) {
      alert("Please provide both delivery and billing addresses before payment.");
      return;
    }
    setIsLoading(true);
    const payload = { totalAmount: finalAmount }; // Razorpay expects amount in paise
    console.log("CREATE ORDER PAYLOAD : ", payload)
    try {
      const response = await ApiService.post("/order/CreateOrder", payload);
      console.log("CREATE ORDER RESPONSE : ", response.data)
      if (response.status) handlePaymentVerify(response.data);
      else throw new Error("Failed to place order");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    console.log("PAYLOAD FOR VERIFY : ", JSON.stringify(data))
     const ORDER_ID = data?.razorpayOrder?.id; 
    console.log("ORDER ID : ", ORDER_ID)
    const options = {
      key: process.env.KEY_ID || "rzp_test_NPT4UOaHTgxvZj",
      amount: data.amount,
      currency: data.currency,
      name: "WAY4TRACK",
      description: "Test Mode",
      image: "/images/logo.png",
      order_id: ORDER_ID,

      
      handler: async (response) => {
        console.log("DATA : ", ORDER_ID)
        const finalPayload = createOrderPayload({
          razorpay_order_id: ORDER_ID,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        console.log("FINAL PAYLOAD : ", finalPayload)
        if (!finalPayload) return;

        try {
          const verifyData = await ApiService.post(`/order/OrderVerify`, finalPayload);
          if (verifyData.status) {
            toast.success("Payment successful");
            const clientCartItems = cartItems.filter(
              (item) => Number(item.client.id) === Number(clientId)
            );
            for (const item of clientCartItems) {
              await ApiService.post("/cart/deleteCartDetails", { id: item.id });
            }
            setCartItems([]);
            localStorage.removeItem("guestCartItems");
            window.scrollTo(0, 0);
            navigate("/order-placed");
          } else toast.error(verifyData.message || "Payment verification failed");
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Something went wrong after payment");
        }
      },
      theme: { color: "#5f63b8" },
    };
    console.log("USING KEY:", options.key);
    const rzp1 = new window.Razorpay(options);
    console.log("RZP@@@@@@ : ", rzp1)
    rzp1.open();
  };

  const AddressCard = ({ address, title, type }) => (
    <div className="address-card">
      <div className="address-header">
        <h3>{title}</h3>
        <span className="address-type">{type}</span>
      </div>
      {address ? (
        <div className="address-content">
          <div className="address-name">
            <strong>{address.name}</strong>
          </div>
          <div className="address-phone">{address.phoneNumber}</div>
          <div className="address-line">{address.addressLineOne}</div>
          <div className="address-line">{address.city}, {address.state}</div>
          <div className="address-line">{address.country} - {address.pin}</div>
          {address.landmark && (
            <div className="address-landmark">Landmark: {address.landmark}</div>
          )}
        </div>
      ) : (
        <div className="no-address">
          <p>No {title.toLowerCase()} provided</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="order-details-container">
      <Navbar />
      <CheckoutSteps currentStep={3} />

      
      <div className="order-header-confirmation">
        <h1 className="title">Order Confirmation</h1>
        <p className="order-subtitle">Review your order details before proceeding to payment</p>
      </div>

      <div className="order-details-grid">
        {/* Left: Cart Product Listing */}
        <div className="order-left">
          <div className="order-left-header">
            <h2>Order Items</h2>
            <span className="items-count">{displayedItemsNormalized.length} items</span>
          </div>
          
          {displayedItemsNormalized.length > 0 ? (
            <div className="items-list">
              {displayedItemsNormalized.map((item) => {
                const relaySelected = isRelaySelected(item);
                const itemPrice = calculateFinalItemPrice(item);
                const totalPrice = toNumber(item.totalAmount);

                return (
                  <div key={item.id} className="cart-item">
                    <div className="item-image-container">
                      <img
                        src={item.device.image?.[0] || "/images/default.jpg"}
                        alt={item.device.name}
                        className="cart-image"
                      />
                    </div>
                    <div className="cart-item-text">
                      <div className="cart-item-header">
                        <span className="cart-header">{item.device.name}</span>
                        <span className="item-model">{item.device.model}</span>
                      </div>
                      
                      <div className="cart-item-details">
                        {item.device.isRelay && item.device.relayAmt > 0 && (
                          <div className="detail-row">
                            <span className="detail-label">Accessories:</span>
                            <span className="detail-value">
                              {relaySelected ? "With Relay" : "Without Relay"}
                            </span>
                          </div>
                        )}
                        
                        {item.device.isNetwork &&
                          (item.device.network2gAmt > 0 || item.device.network4gAmt > 0) && (
                            <div className="detail-row">
                              <span className="detail-label">Network:</span>
                              <span className="detail-value">{item.network || "Not selected"}</span>
                            </div>
                          )}
                        
                        {item.device.isSubscription &&
                          (item.device.subscriptionMonthlyAmt > 0 || item.device.subscriptionYearlyAmt > 0) && (
                            <div className="detail-row">
                              <span className="detail-label">Subscription:</span>
                              <span className="detail-value">
                                {item.subscription ? `${item.subscription} subscription` : "Not selected"}
                              </span>
                            </div>
                          )}
                        
                        {item?.state && item?.city && (
                          <>
                            <div className="detail-row">
                              <span className="detail-label">Location:</span>
                              <span className="detail-value">{item.city}, {item.state}</span>
                            </div>
                          </>
                        )}
                        
                        <div className="detail-row">
                          <span className="detail-label">Base Unit Price:</span>
                          <span className="detail-value">₹{itemPrice.toFixed(2)}</span>
                        </div>
                        
                        <div className="detail-row">
                          <span className="detail-label">Quantity:</span>
                          <span className="detail-value">{item.quantity}</span>
                        </div>
                      </div>
                      
                      <div className="item-total">
                        <span className="cart-price">₹{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <p>No items in cart</p>
            </div>
          )}
        </div>

        {/* Right: Address + Summary */}
        <div className="order-right">
          <div className="promo-section">
            <PromoCode 
              totalAmount={total}
              onApply={(discount, promoDetails) => {
                const num = Number(discount) || 0;
                setPromoDiscount(num);
                setSelectedPromoDetails(promoDetails);
              }}
              onRemove={() => {
                setPromoDiscount(0);
                setSelectedPromoDetails(null);
              }}
            />

          </div>

          <div className="addresses-section">
            <AddressCard 
              address={deliveryAddress} 
              title="Shipping Address" 
              type="Delivery"
            />
            
            <AddressCard 
              address={billingAddress} 
              title="Billing Address" 
              type="Billing"
            />
          </div>

          <div className="order-section summary">
            <h2>Order Summary</h2>
            
            <div className="summary-content">
              <div className="summary-row">
                <span className="summary-label">Items ({displayedItems.length})</span>
                <span className="summary-value">₹{total.toFixed(2)}</span>
              </div>
              
              
              
              {promoDiscount > 0 && (
                <div className="summary-row discount">
                  <span className="summary-label">Promo Code Discount</span>
                  <span className="summary-value">-₹{promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value free">FREE</span>
              </div>
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value final-amount">₹{finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {selectedPromoDetails && (
              <div className="promo-applied-message">
                <span className="promo-success">✓</span>
                Promo code <strong>{selectedPromoDetails.code}</strong> applied successfully!
              </div>
            )}

            <button 
              className="place-order-btn" 
              onClick={placeOrder} 
              disabled={isLoading || finalAmount <= 0}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Processing...
                </>
              ) : (
                <>
                  <span className="btn-icon">💳</span>
                  Proceed to Payment - ₹{finalAmount.toFixed(2)}
                </>
              )}
            </button>
            
            <p className="security-note">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}

export default OrderDetailsPage;