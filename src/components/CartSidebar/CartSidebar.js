import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartSidebar.css";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal, addToCart } = useContext(CartContext);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.cart-sidebar');
      const isClickInside = sidebar && sidebar.contains(event.target);
      
      if (isOpen && sidebar && !isClickInside && !event.target.closest('.cart-link')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

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

  const goToCart = () => {
    onClose();
    navigate("/cart");
  };

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const continueShopping = () => {
    onClose();
    navigate("/products");
  };

  // Add simple animation for cart items
  useEffect(() => {
    if (isOpen) {
      const cartItems = document.querySelectorAll('.cart-item');
      cartItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
      });
    }
  }, [isOpen, cartItems]);

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
            <BsCartX size={120} className="empty-cart-icon" />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
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
                    <div className="cart-item-image-container">
                      <img
                        src={item?.device?.image || "/images/default.jpg"}
                        alt={item?.device?.name}
                        className="cart-item-img"
                      />
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-info">
                        <h6 className="item-name">{item?.device?.name}</h6>
                        <p className="item-meta">
                          Accessories: {item.isRelay ? "With Relay" : "Without Relay"}
                        </p>
                        <p className="item-meta">Subscription: {item.subscription} subscription</p>
                        <p className="item-meta">Network: {item.network}</p>
                        <p className="item-price">Rs. {item.totalAmount}</p>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
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
                ))}
              </div>
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>SUBTOTAL</span>
                <span className="total-amount">Rs. {getTotal()}</span>
              </div>
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