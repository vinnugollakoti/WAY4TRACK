import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import AddressPage from "../AddressPage/AddressPage";
import "./Cart.css";

function CartPage() {
  const { cartItems, updateQuantity, getTotal } = useContext(CartContext);
  console.log(cartItems, "cart");

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type === "inc" ? 1 : -1);
  };

  return (
    <div className="cart-container">
      <CheckoutSteps currentStep={1} />
      <div className="cart-address-container">
        <AddressPage />
        <div>
          <h1 className="cart-title">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
              {/* <Link to="/" className="back-btn">
                Continue Shopping
              </Link> */}
              {cartItems.map((item) => (
                <div key={item.id} className="cart-card">
                  <div className="cart-card-inner">
                    <div className="cart-image-wrapper">
                      <img
                        src={item.device.image}
                        alt={item.device.name}
                        className="cart-image"
                      />
                    </div>
                    <div className="cart-info">
                      <h2 className="cart-name">{item.device.name}</h2>
                      <p>
                        Accessories:{" "}
                        {item.isRelay ? "With Relay" : "Without Relay"}
                      </p>
                      <p>Subscription: {item.subscription} subscription</p>
                      <p>Network: {item.network}</p>
                      <p>Rs. {item.totalAmount}</p>
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item.id, "dec")}
                        >
                          -
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item.id, "inc")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="cart-summary">
            <h2>Total: Rs.{getTotal()}/-</h2>
            <button className="checkout">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";

// import "./Cart.css";

// const dummyCartItems = [
//   {
//     id: 1,
//     name: "Vehicle Tracker X1",
//     price: 4500,
//     quantity: 1,
//     image_url: "https://via.placeholder.com/300x200?text=Vehicle+Tracker+X1",
//   },
//   {
//     id: 2,
//     name: "Personal GPS Watch",
//     price: 7500,
//     quantity: 2,
//     image_url: "https://via.placeholder.com/300x200?text=Personal+GPS+Watch",
//   },
// ];

// function CartPage() {
//   const [cartItems, setCartItems] = useState(dummyCartItems);

//   const handleQuantityChange = (id, type) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity:
//                 type === "inc"
//                   ? item.quantity + 1
//                   : Math.max(1, item.quantity - 1),
//             }
//           : item
//       )
//     );
//   };

//   const getTotal = () =>
//     cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <div className="cart-container">
//       <CheckoutSteps currentStep={1} />
//       <h1 className="cart-title">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="empty-cart">Your cart is empty.</p>
//       ) : (
//         <div className="cart-grid">
//           <Link to="/" className="back-btn">
//             Continue Shopping
//           </Link>
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-card">
//               <div className="cart-card-inner">
//                 <div className="cart-image-wrapper">
//                   <img
//                     src={item.image_url}
//                     alt={item.name}
//                     className="cart-image"
//                   />
//                 </div>
//                 <div className="cart-info">
//                   <h2 className="cart-name">{item.name}</h2>
//                   <p className="cart-price">₹{item.price}</p>
//                   <div className="quantity-controls">
//                     <button
//                       className="qty-btn"
//                       onClick={() => handleQuantityChange(item.id, "dec")}
//                     >
//                       -
//                     </button>
//                     <span className="qty-number">{item.quantity}</span>
//                     <button
//                       className="qty-btn"
//                       onClick={() => handleQuantityChange(item.id, "inc")}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="cart-summary">
//         <h2>Total: ₹{getTotal()}</h2>
//         <button className="checkout">Proceed to Checkout</button>
//       </div>
//     </div>
//   );
// }

// export default CartPage;
