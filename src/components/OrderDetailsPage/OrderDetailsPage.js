import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import PromoCode from "../Promocode/Promocode";
import toast, { Toaster } from "react-hot-toast";
import "./OrderDetailsPage.css";
import Navbar from "../New_Templates/Navbar";
import Footer from "../New_Templates/Footer";

function OrderDetailsPage() {
  const location = useLocation();
  const { cartItems, setCartItems, removeFromCart, addToCart } = useContext(CartContext);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [selectedPromoDetails, setSelectedPromoDetails] = useState(null);
  console.log(selectedPromoDetails, "promo details of selecting");

  const { deliveryAddress, billingAddress, isBuyNow, orderItems } =
    location.state || {};
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = Number(localStorage.getItem("client_db_id"));
  const userId = localStorage.getItem("client_id");
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  console.log(
    "BillingAddress:",
    billingAddress,
    "DeliveryAddress:",
    deliveryAddress
  );

  const calculateItemTotal = (item) => {
    if (!item) return 0;
    const price =
      (item?.device?.amount || 0) -
      ((item?.device?.amount || 0) * (item?.device?.discount || 0)) / 100;
    return (price * (item?.quantity || 1)).toFixed(2);
  };


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
        },
      };
    }
    return item;
  });

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

  const total = displayedItems.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );
  const totalOrdersAmount = orders.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );


  const finalAmount = total - promoDiscount;

  // const handleQuantityChange = (id, type) => {
  //   updateQuantity(id, type === "inc" ? 1 : -1);
  // };

  const updateQuantity = async (itemId, change) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return;
    const updatedQuantity = (cartItem?.quantity || 1) + change;

    if (updatedQuantity < 1) return;

    console.log(cartItems, "cartItwenfj");

    console.log(itemId, "itemaisndihw");

    const updatedCartData = {
      ...cartItem,
      id: itemId,
      quantity: updatedQuantity,
      clientId: cartItem.client.id,
      deviceId: cartItem.device.id,
    };

    try {
      await addToCart(updatedCartData);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const createOrderPayload = (razorpayResponse = {}) => {
    if (!deliveryAddress || !billingAddress) {
      // Handle the case where the addresses are missing
      alert("Please provide both delivery and billing addresses.");
      return;
    }
    const orderItems = displayedItemsNormalized.map((item) => ({
      name: item.device.name,
      qty: item.quantity,
      amount: calculateItemTotal(item),
      deviceId: item.device.id,
      is_relay: item.isRelay,
      network: item.network,
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
      companyCode,
      unitCode,
      orderItems,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
      delivaryDate: deliveryDate.toISOString(),
    };
  };

  const placeOrder = async () => {
    // ✅ Check addresses before payment
    if (!deliveryAddress || !billingAddress) {
      alert("Please provide both delivery and billing addresses before payment.");
      return; // stop here if missing
    }

    setIsLoading(true);

    const payload = { totalAmount: finalAmount };

    try {
      const response = await ApiService.post("/order/CreateOrder", payload);

      if (response.status) {
        console.log("Order placed successfully:", response);
        handlePaymentVerify(response.data); // ✅ start Razorpay only after validation
      } else {
        throw new Error("Failed to place order");
      }
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

          // ✅ Delete all cart items for this client one by one
          const clientCartItems = cartItems.filter(
            (item) => Number(item.client.id) === Number(clientId)
          );

          for (const item of clientCartItems) {
            await ApiService.post("/cart/deleteCartDetails", { id: item.id });
          }

          // Clear local state
          setCartItems([]);
          localStorage.removeItem("guestCartItems");

          // Navigate to orders page
          navigate("/my-profile", { state: { activeTab: "orders" } });
        } else {
          toast.error(verifyData.message || "Payment verification failed");
        }
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



// Utility to clear client cart
const clearClientCart = async (clientId) => {
  try {
    await ApiService.post("/cart/clearCartByClientId", { clientId });
    console.log("Client cart cleared successfully");
  } catch (error) {
    console.error("Failed to clear client cart:", error);
  }
};


  const verificationPayment = async (data) => {
    setIsLoading(true);
    console.log("verfiyrequest data :", data)
    const payload = createOrderPayload();

    // try {
    //   const response = await ApiService.post(
    //     "/order/OrderVerify",
    //     payload
    //   );

    //   if (response.status) {
    //     console.log("Order placed successfully:", response);
    //     verificationPayment(response.data);
    //     if (selectedPromoDetails) {
    //       let existingPromoUsers = [];

    //       try {
    //         existingPromoUsers = JSON.parse(selectedPromoDetails.promoUsers);
    //         if (!Array.isArray(existingPromoUsers)) {
    //           existingPromoUsers = [];
    //         }
    //       } catch (err) {
    //         existingPromoUsers = [];
    //       }
    //       const updatedPromoUsers = [
    //         ...new Set([...existingPromoUsers, userId]),
    //       ];

    //       await ApiService.post(`/promocode/handlePromocodeDetails`, {
    //         promoUsers: JSON.stringify(updatedPromoUsers),
    //         id: selectedPromoDetails.id,
    //       });
    //     }

    //     if (!isBuyNow) {
    //       for (const item of displayedItemsNormalized) {
    //         await removeFromCart(item.id);
    //       }
    //     }

    //     localStorage.removeItem("buyNowItem");
    //     navigate("/orders", { state: { order: response.data } });
    //   } else {
    //     throw new Error("Failed to place order");
    //   }
    // } catch (err) {
    //   console.error("Error placing order:", err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="order-details-container">
      <Navbar />
      <CheckoutSteps currentStep={3} />
      <h1 className="title">Order Confirmation</h1>

      <div className="order-details-grid">
        {/* Left: Order Items */}
        <div className="order-left">
          {displayedItemsNormalized.length > 0 ? (
            displayedItemsNormalized.map((item) => (
              <div key={item.id} className="cart-card">
                <div className="cart-card-inner">
                  <div className="cart-image-wrapper">
                    <img
                      src={item?.device?.image}
                      alt={item?.device?.name}
                      className="cart-image"
                    />
                  </div>
                  <div className="cart-info">
                    <h2 className="cart-name">{item?.device?.name}</h2>
                    <p>
                      Accessories:{" "}
                      {item.isRelay ? "With Relay" : "Without Relay"}
                    </p>
                    <p>Subscription: {item.subscription} subscription</p>
                    <p>Network: {item.network}</p>
                    <p>Rs. {calculateItemTotal(item)}</p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
            ))
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
                {deliveryAddress.city}, {deliveryAddress.state},{" "}
                {deliveryAddress.country} - {deliveryAddress.pin}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>
          <div className="order-section">
            <h2>Billing Address</h2>
            {billingAddress ? (
              <p>
                {billingAddress.name}
                <br />
                {billingAddress.phoneNumber}
                <br />
                {billingAddress.city}, {billingAddress.state},{" "}
                {billingAddress.country} - {billingAddress.pin}
              </p>
            ) : (
              <p>No address provided.</p>
            )}
          </div>

          <div className="order-section summary">
            <h2>Summary</h2>
            <p>Total Items: {displayedItems.length}</p>
            <p>Total Price: ₹{total}</p>

            {promoDiscount > 0 && (
              <p style={{ color: "green" }}>
                Promo Discount: -₹{promoDiscount.toFixed(2)}
              </p>
            )}

            <p>
              <strong>Final Amount: ₹{finalAmount.toFixed(2)}</strong>
            </p>

            <button
              className="place-order"
              onClick={placeOrder}
              disabled={isLoading}
            >
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
