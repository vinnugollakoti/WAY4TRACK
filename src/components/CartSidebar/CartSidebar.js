import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartSidebar.css";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { CartContext } from "../../contexts/CartContext";
import { BsCartX } from "react-icons/bs";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal, addToCart } =
    useContext(CartContext);

  const updateQuantity = async (itemId, change) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    if (!cartItem) return;
    const updatedQuantity = (cartItem?.quantity || 1) + change;

    if (updatedQuantity < 1) return;

    console.log(itemId,"itemaisndihw")

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

  const goToCart = () => {
    onClose();
    navigate("/cart");
  };

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const continueShopping = () => {
    onClose();
    navigate("/products"); // Change this route if your products page differs
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>

      <div className="cart-content">
        <div className="cart-header">
          <h2>Your Cart</h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            {/* <img
              src="/images/empty-cart.png" 
              alt="Empty Cart"
              className="empty-cart-img"
            /> */}

            <BsCartX size={120} />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven’t added anything yet.</p>
            <button className="continue-btn" onClick={continueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-wrapper">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item?.device?.image || "/images/default.jpg"}
                      alt={item?.device?.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-info">
                      <h6>
                        <strong>{item?.device?.name}</strong>
                      </h6>
                      <p>
                        Accessories:{" "}
                        {item.isRelay ? "With Relay" : "Without Relay"}
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
                      onClick={() => handleDelete(item.id)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
