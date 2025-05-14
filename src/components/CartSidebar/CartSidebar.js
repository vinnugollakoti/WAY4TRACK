import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartSidebar.css";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal, addToCart } =
    useContext(CartContext);
  console.log(cartItems, "cart items");

  const updateQuantity = async (itemId, change) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return;
    const updatedQuantity = (cartItem?.quantity || 1) + change;

    if (updatedQuantity < 1) return; // prevent quantity from going below 1
    console.log(itemId,"eefhj")

    const updatedCartData = {
      ...cartItem,
      id: itemId,
      quantity: updatedQuantity,
      clientId: cartItem.client.id,
      deviceId: cartItem.device.id
    };

    try {
      await addToCart(updatedCartData); // reusing your existing addToCart function
      console.log(`Updated quantity for item ${itemId}`);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const goToCart = () => {
    onClose()
    navigate("/cart");
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>

      <div className="cart-content">
        <div className="cart-header">
          <h2>Your cart</h2>
          {/* <div className="progress-bar-container">
            <p>
              <strong>Spend Rs. {getTotal() + 1000}</strong> more to reach{" "}
              <strong>Free Shipping!</strong>
            </p>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: "47%" }}></div>
            </div>
          </div> */}
        </div>

        <div className="cart-items-wrapper">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.device.image || "/images/default.jpg"}
                  alt={item.device.name}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h6>
                    <strong>{item.device.name}</strong>
                  </h6>
                  <p>
                    Accessories: {item.isRelay ? "With Relay" : "Without Relay"}
                  </p>
                  <p>Subscription: {item.subscription} subscription</p>
                  <p>Network: {item.network}</p>
                  <p>Rs. {item.totalAmount}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-footer">
          <p>
            <strong>SUBTOTAL</strong> Rs. {getTotal()}
          </p>
          <button className="checkout-btn" onClick={goToCart}>
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
