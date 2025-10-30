import React, { useContext } from "react";
import "./CartPage.css";
import Navbar from "./Navbar";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  // Helper to parse number safely
  const toNumber = (val) => Number(val) || 0;

  // Helper function to check if relay is included based on totalAmount difference
  const isRelaySelected = (item) => {
    if (!item || !item.device) return false;

    const baseAmount = toNumber(item.device.amount);
    const discount = toNumber(item.device.discount);
    const relayAmt = toNumber(item.device.relayAmt);
    const network2gAmt = toNumber(item.device.network2gAmt);
    const network4gAmt = toNumber(item.device.network4gAmt);
    const subscriptionMonthlyAmt = toNumber(item.device.subscriptionMonthlyAmt);
    const subscriptionYearlyAmt = toNumber(item.device.subscriptionYearlyAmt);

    // Calculate base price with discount
    let basePrice = baseAmount;
    if (discount > 0) {
      basePrice -= (baseAmount * discount) / 100;
    }

    // Add network amount according to selected network
    if (item.network === "2G") {
      basePrice += network2gAmt;
    } else if (item.network === "4G") {
      basePrice += network4gAmt;
    }

    // Add subscription amount according to selected subscription
    if (item.subscription === "monthly") {
      basePrice += subscriptionMonthlyAmt;
    } else if (item.subscription === "yearly") {
      basePrice += subscriptionYearlyAmt;
    }

    // Multiply by quantity
    basePrice *= toNumber(item.quantity);

    const totalAmount = toNumber(item.totalAmount);

    // If totalAmount includes relayAmt * quantity, then relay is selected
    return totalAmount >= basePrice + relayAmt * toNumber(item.quantity);
  };

  // We will use totalAmount from backend for price display instead of calculating
  const getTotalAmount = () => {
    return cartItems.reduce((acc, item) => acc + toNumber(item.totalAmount), 0);
  };

  const updateQuantity = async (itemId, change) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return;

    const updatedQuantity = (cartItem?.quantity || 1) + change;
    if (updatedQuantity < 1) return;

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

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateItemTotal = (item) => {
    if (!item) return 0;
    const price =
      (item?.device?.amount || 0) -
      ((item?.device?.amount || 0) * (item?.device?.discount || 0)) / 100;
    return (price * (item?.quantity || 1)).toFixed(2);
  };



  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className="cart-details">
          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
              </div>
            ) : (
              cartItems.map((item) => {
                const relaySelected = isRelaySelected(item);
                const totalPrice = toNumber(item.totalAmount) || calculateItemTotal(item);
                return (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item?.device?.image[0] || "/images/default.jpg"}
                      alt={item?.device?.name}
                    />
                    <div className="cart-item-text">
                      <div className="cart-item-header">
                        <span className="cart-header">{item?.device?.name}</span>
                        <span className="cart-price">₹{toNumber(item.totalAmount)}</span>
                      </div>
                      <div className="cart-item-details">
                        {item?.device?.isRelay && item?.device?.relayAmt > 0 && (
                          <p>
                            Accessories: {relaySelected ? "With Relay" : "Without Relay"}
                          </p>
                        )}

                        {item?.device?.isNetwork &&
                          (item?.device?.network2gAmt > 0 || item?.device?.network4gAmt > 0) && (
                            <p>Network: {item.network ? item.network : "N/A"}</p>
                          )}

                        {item?.device?.isSubscription &&
                          (item.device.subscriptionMonthlyAmt > 0 ||
                            item.device.subscriptionYearlyAmt > 0) && (
                            <p>
                              Subscription:{" "}
                              {item.subscription ? `${item.subscription} subscription` : "N/A"}
                            </p>
                          )}

                          


                        {item?.state && item?.city && (
                          <>
                            <p>State: {item.state}</p>
                            <p>City: {item.city}</p>
                          </>
                        )}

                        <span className="cart-price">Total: ₹{totalPrice}</span>

                      </div>

                      <div className="cart-item-actions">
                        <div className="cart-item-buttons">
                          <button onClick={() => updateQuantity(item.id, 1)}>
                            <FaPlus />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, -1)}>
                            <FaMinus />
                          </button>
                        </div>
                        <div className="trashbin-button">
                          <button
                            className="trashbin"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
 
        {cartItems.length > 0 && (
          <div className="bill-container">
            <div className="bill-header">
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
              <h1>Bill</h1>
              <span className="diamond-line right">
                <span className="line-shape" />
                <span className="diamond-shape" />
              </span>
            </div>

            <div className="bill-content">
              {cartItems.map((item) => (
                <div className="bill-item" key={item.id}>
                  <span>
                    {item?.device?.name} x{item.quantity}
                  </span>
                  <div className="ckcjc7">
                    <div className="c1az4bwh"></div>
                  </div>
                  <span>₹{toNumber(item.totalAmount)}</span>
                </div>
              ))}

              <div className="bill-total">
                <span>Total</span>
                <div className="ckcjc7">
                  <div className="c1az4bwh"></div>
                </div>
                <span>₹{getTotalAmount()}</span>
              </div>
              <div className="proceed-to-payment">
                <button
                  className="proceed-to-payment-button"
                  onClick={() => {
                    navigate("/old-cart");
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
