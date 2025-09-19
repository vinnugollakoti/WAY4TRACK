import React, { useContext } from "react";
import "./CartPage.css";
import Navbar from "./Navbar";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal, addToCart } = useContext(CartContext);


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
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item?.device?.image || "/images/default.jpg"}
                    alt={item?.device?.name}
                  />
                  <div className="cart-item-text">
                    <div className="cart-item-header">
                      <span className="cart-header">{item?.device?.name}</span>
                      <span className="cart-price">₹{((item?.device?.amount - (item?.device?.amount * item?.device?.discount) / 100) * item.quantity)}
                      </span>
                    </div>
                    <div className="cart-item-details">
                      {/* <p>
                        Accessories: {item.isRelay ? "With Relay" : "Without Relay"}
                      </p>
                      <p>Subscription: {item.subscription} subscription</p>
                      <p>Network: {item.network}</p> */}
                      <p>{item?.device?.description}</p>
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
              ))
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
                  <span>  ₹{((item?.device?.amount - (item?.device?.amount * item?.device?.discount) / 100) * item.quantity)}
                  </span>
                </div>
              ))}

              <div className="bill-total">
                <span>Total</span>
                <div className="ckcjc7">
                  <div className="c1az4bwh"></div>
                </div>
                <span>₹{getTotal()}</span>
              </div>
              <div className="proceed-to-payment">
                <button className="proceed-to-payment-button" onClick={() => { navigate('/old-cart') }}>
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
