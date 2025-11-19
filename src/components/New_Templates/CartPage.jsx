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

  // Calculate item price based on selections (without relay)
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

  // Calculate final item price including relay if selected
  const calculateFinalItemPrice = (item) => {
    const basePrice = calculateBaseItemPrice(item);
    const relayAmt = toNumber(item.device.relayAmt);
    
    // Check if relay is selected by comparing with totalAmount
    const quantity = toNumber(item.quantity);
    const totalAmount = toNumber(item.totalAmount);
    const baseTotal = basePrice * quantity;
    
    // If totalAmount is greater than baseTotal, relay is included
    const relaySelected = totalAmount > baseTotal;
    
    if (relaySelected && item.device.isRelay && relayAmt > 0) {
      return basePrice + relayAmt;
    }
    
    return basePrice;
  };

  // Check if relay is selected
  const isRelaySelected = (item) => {
    if (!item || !item.device) return false;

    const basePrice = calculateBaseItemPrice(item);
    const quantity = toNumber(item.quantity);
    const totalAmount = toNumber(item.totalAmount);
    const baseTotal = basePrice * quantity;

    return totalAmount > baseTotal;
  };

  const getTotalAmount = () => {
    return cartItems.reduce((acc, item) => acc + toNumber(item.totalAmount), 0);
  };

  const updateQuantity = async (itemId, change) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return;

    const updatedQuantity = (cartItem?.quantity || 1) + change;
    if (updatedQuantity < 1) return;

    // Calculate new total amount based on quantity
    const basePrice = calculateBaseItemPrice(cartItem);
    const relayAmt = toNumber(cartItem.device.relayAmt);
    const currentTotal = toNumber(cartItem.totalAmount);
    const currentQuantity = toNumber(cartItem.quantity);
    
    // Determine if relay was selected in the original item
    const baseTotalForCurrentQty = basePrice * currentQuantity;
    const relaySelected = currentTotal > baseTotalForCurrentQty;
    
    // Calculate new total
    let newTotalAmount = basePrice * updatedQuantity;
    if (relaySelected && cartItem.device.isRelay && relayAmt > 0) {
      newTotalAmount += relayAmt * updatedQuantity;
    }

    const updatedCartData = {
      ...cartItem,
      id: itemId,
      quantity: updatedQuantity,
      totalAmount: newTotalAmount,
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

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <div className="cart-details">
          <div className="cart-header-section">
            <h1>Your Cart</h1>
            <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          
          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <button 
                  className="continue-shopping-btn"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const relaySelected = isRelaySelected(item);
                const itemPrice = calculateFinalItemPrice(item);
                const totalPrice = toNumber(item.totalAmount);

                return (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-image">
                      <img
                        src={item?.device?.image?.[0] || "/images/placeholder-product.png"}
                        alt={item?.device?.name}
                        onError={(e) => {
                          e.target.src = "/images/placeholder-product.png";
                        }}
                      />
                    </div>
                    
                    <div className="cart-item-content">
                      <div className="cart-item-header">
                        <h3 className="product-name">{item?.device?.name}</h3>
                        <span className="item-total">₹{totalPrice}</span>
                      </div>

                      <div className="cart-item-details">
                        {item?.device?.isRelay && item?.device?.relayAmt > 0 && (
                          <div className="detail-item">
                            <span className="detail-label">Accessories:</span>
                            <span className="detail-value">
                              {relaySelected ? "With Relay" : "Without Relay"}
                            </span>
                          </div>
                        )}

                        {item?.device?.isNetwork &&
                          (item?.device?.network2gAmt > 0 || item?.device?.network4gAmt > 0) && (
                            <div className="detail-item">
                              <span className="detail-label">Network:</span>
                              <span className="detail-value">
                                {item.network || "Not selected"}
                              </span>
                            </div>
                          )}

                        {item?.device?.isSubscription &&
                          (item.device.subscriptionMonthlyAmt > 0 ||
                            item.device.subscriptionYearlyAmt > 0) && (
                            <div className="detail-item">
                              <span className="detail-label">Subscription:</span>
                              <span className="detail-value">
                                {item.subscription ? `${item.subscription} subscription` : "Not selected"}
                              </span>
                            </div>
                          )}

                        {item?.state && item?.city && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">State:</span>
                              <span className="detail-value">{item.state}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">City:</span>
                              <span className="detail-value">{item.city}</span>
                            </div>
                          </>
                        )}

                        <div className="detail-item">
                          <span className="detail-label">Base Unit Price:</span>
                          <span className="detail-value">₹{itemPrice.toFixed(2)}</span>
                        </div>
                        
                        <div className="detail-item">
                          <span className="detail-label">Quantity:</span>
                          <span className="detail-value">{item.quantity}</span>
                        </div>
                      </div>

                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                        
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
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
              <h2>Order Summary</h2>
              <span className="diamond-line right">
                <span className="line-shape" />
                <span className="diamond-shape" />
              </span>
            </div>

            <div className="bill-content">
              <div className="bill-items">
                {cartItems.map((item) => (
                  <div className="bill-item" key={item.id}>
                    <span className="item-name">
                      {item?.device?.name} × {item.quantity}
                    </span>
                    <div className="price-dots">
                      <div className="dots"></div>
                    </div>
                    <span className="item-price">₹{toNumber(item.totalAmount)}</span>
                  </div>
                ))}
              </div>

              <div className="bill-total">
                <span className="total-label">Total Amount</span>
                <div className="price-dots">
                  <div className="dots"></div>
                </div>
                <span className="total-amount">₹{getTotalAmount()}</span>
              </div>
              
              <div className="proceed-to-payment">
                <button
                  className="proceed-btn"
                  onClick={() => navigate("/old-cart")}
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