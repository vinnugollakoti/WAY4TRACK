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
          relayAmt: item.relayAmt,
          network2gAmt: item.network2gAmt,
          network4gAmt: item.network4gAmt,
          subscriptionMonthlyAmt: item.subscriptionMonthlyAmt,
          subscriptionYearlyAmt: item.subscriptionYearlyAmt,
        },
      };
    }
    return item;
  });

  console.log(displayedItems)

  const toNumber = (val) => Number(val) || 0;

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

  const calculateItemTotal = (item) => {
    if (!item) return 0;
    const price =
      (item?.device?.amount || 0) -
      ((item?.device?.amount || 0) * (item?.device?.discount || 0)) / 100;
    return (price * (item?.quantity || 1)).toFixed(2);
  };

  const total = displayedItems.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );

  const totalOrdersAmount = orders.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );
  const finalAmount = total - promoDiscount;

  const createOrderPayload = (razorpayResponse = {}) => {
    if (!deliveryAddress || !billingAddress) {
      alert("Please provide both delivery and billing addresses.");
      return;
    }
    const orderItemsPayload = displayedItemsNormalized.map((item) => ({
      name: item.device.name,
      qty: item.quantity,
      amount: item.totalAmount,
      deviceId: item.device.id,
      is_relay: item.isRelay,
      network: item.network,
      state: item.state,
      city: item.city,
      subscriptionType: item.subscription,
      desc: item.device.model,
    }));

    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 4);

    return {
      name: "Mahesh",
      totalAmount: total,
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
    };
  };

  const placeOrder = async () => {
    if (!deliveryAddress || !billingAddress) {
      alert("Please provide both delivery and billing addresses before payment.");
      return;
    }
    setIsLoading(true);
    const payload = { totalAmount: finalAmount };
    try {
      const response = await ApiService.post("/order/CreateOrder", payload);
      if (response.status) handlePaymentVerify(response.data);
      else throw new Error("Failed to place order");
    } catch (err) {
      console.error("Error placing order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.KEY_ID || "rzp_test_NPT4UOaHTgxvZj",
      amount: data.amount,
      currency: data.currency,
      name: "Mahesh",
      description: "Test Mode",
      image: "/images/logo.png",
      order_id: data.id,
      handler: async (response) => {
        const finalPayload = createOrderPayload({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
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
            navigate("/order-placed");
          } else toast.error(verifyData.message || "Payment verification failed");
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error("Something went wrong after payment");
        }
      },
      theme: { color: "#5f63b8" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="order-details-container">
      <Navbar />
      <CheckoutSteps currentStep={3} />
      <h1 className="title">Order Confirmation</h1>

      <div className="order-details-grid">
        {/* Left: Cart Product Listing */}
        <div className="order-left">
          {displayedItemsNormalized.length > 0 ? (
            displayedItemsNormalized.map((item) => {
              // Determine if relay is selected
              const relaySelected = item.isRelay || false;

              // Calculate total price using backend totalAmount if available
              const totalPrice = toNumber(item.totalAmount) || calculateItemTotal(item);

              return (
                <div key={item.id} className="cart-item" style={{ marginBottom: "20px" }}>
                  <img
                    src={item.device.image?.[0] || "/images/default.jpg"}
                    alt={item.device.name}
                    className="cart-image"
                  />
                  <div className="cart-item-text">
                    <div className="cart-item-header">
                      <span className="cart-header">{item.device.name}</span>
                    </div>
                    <div className="cart-item-details">
                      {item.device.relayAmt > 0 && (
                        <p>Accessories: {relaySelected ? "With Relay" : "Without Relay"}</p>
                      )}
                      {(item.device.network2gAmt > 0 || item.device.network4gAmt > 0) && (
                        <p>Network: {item.network || "N/A"}</p>
                      )}
                      {(item.device.subscriptionMonthlyAmt > 0 || item.device.subscriptionYearlyAmt > 0) && (
                        <p>Subscription: {item.subscription || "N/A"}</p>
                      )}
                      <p>{item.device.model}</p>
                      <p>Quantity: {item.quantity}</p>
                      <span className="cart-price">₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No items in cart.</p>
          )}

        </div>


        {/* Right: Address + Summary */}
        <div className="order-right">
          <PromoCode
            totalAmount={totalOrdersAmount}
            onApply={(discount, promoDetails) => {
              setPromoDiscount(discount);
              setSelectedPromoDetails(promoDetails);
            }}
          />
          <div className="order-section">
            <h2>Shipping Address</h2>
            {deliveryAddress ? (
              <p>
                {deliveryAddress.name}
                <br />
                {deliveryAddress.phoneNumber}
                <br />
                {deliveryAddress.city}, {deliveryAddress.state}, {deliveryAddress.country} - {deliveryAddress.pin}
              </p>
            ) : <p>No address provided.</p>}
          </div>

          <div className="order-section">
            <h2>Billing Address</h2>
            {billingAddress ? (
              <p>
                {billingAddress.name}
                <br />
                {billingAddress.phoneNumber}
                <br />
                {billingAddress.city}, {billingAddress.state}, {billingAddress.country} - {billingAddress.pin}
              </p>
            ) : <p>No address provided.</p>}
          </div>

          <div className="order-section summary">
            <h2>Summary</h2>
            <p>Total Items: {displayedItems.length}</p>
            <p>Total Price: ₹{total}</p>
            {promoDiscount > 0 && <p style={{ color: "green" }}>Promo Discount: -₹{promoDiscount.toFixed(2)}</p>}
            <p><strong>Final Amount: ₹{finalAmount.toFixed(2)}</strong></p>
            <button className="place-order" onClick={placeOrder} disabled={isLoading}>
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}

export default OrderDetailsPage;
