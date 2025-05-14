import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { CartContext } from "../../contexts/CartContext";
import AddressPage from "../AddressPage/AddressPage";
import AddressPopupPage from "../AddressPopupPage/AddressPopupPage";
import "./Cart.css";

function CartPage() {
  const { cartItems, updateQuantity, getTotal } = useContext(CartContext);
  const [addresses, setAddresses] = useState([]);
  const [billingAddress, setBillingAddress] = useState(null);
  const [isBillingSame, setIsBillingSame] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [isBillingChanging, setIsBillingChanging] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const clientId = localStorage.getItem("client_id");
  const navigate = useNavigate();
  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  console.log(cartItems, "cart");

  const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
  const isBuyNow = !!buyNowItem;

  console.log(buyNowItem, "localstorage item");

  const handleQuantityChange = (id, type) => {
    updateQuantity(id, type === "inc" ? 1 : -1);
  };

  const totalAmount = isBuyNow ? buyNowItem.totalAmount : getTotal();

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const fetchSavedAddresses = async () => {
    try {
      const payload = {
        companyCode,
        unitCode,
        clientId,
      };
      const response = await ApiService.post(
        "/client/getClientDetailsById",
        payload
      );

      if (response.status) {
        const data = response.data;
        console.log(data, "addressknjfidfh");
        setAddresses(data.customerAddress);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setShowForm(true);
    }
  };

  const handleAddressSelect = (addr) => {
    setDeliveryAddress(addr);
  };

  const handleProceed = () => {
    if (deliveryAddress) {
      navigate("/order-details", {
        state: {
          deliveryAddress,
          billingAddress,
          orderItems: isBuyNow ? [buyNowItem] : cartItems,
          isBuyNow,
        },
      });
    }
  };

  return (
    <div className="cart-container">
      <CheckoutSteps currentStep={1} />
      <div className="cart-address-container">
        {/* <AddressPage /> */}

        <div className="cart-page-saved-addresses">
          {/* <div className="cart-page-address-list"> */}
          {deliveryAddress && !isChangingAddress ? (
            <div className="cart-page-address-selected">
              <h3>Delivery Address</h3>
              <div className="cart-page-address-card cart-page-active">
                <p className="cart-page-address-name">
                  <strong>Name: {deliveryAddress.name}</strong>
                </p>
                <p className="cart-page-address-line">
                  Address: {deliveryAddress.city}, {deliveryAddress.state} -{" "}
                  {deliveryAddress.pin}
                </p>
                <p className="cart-page-address-line">
                  {deliveryAddress.country} | Phone:{" "}
                  {deliveryAddress.phoneNumber}
                </p>
              </div>
              <button
                className="cart-page-change-button"
                onClick={() => setIsChangingAddress(true)}
              >
                Change Address
              </button>
            </div>
          ) : (
            <div>
              <h2 className="cart-page-address-title">
                Select a Delivery Address
              </h2>

              <div className="cart-page-address-list">
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    className={`cart-page-address-card ${
                      deliveryAddress?.id === addr.id ? "cart-page-active" : ""
                    }`}
                    onClick={() => {
                      handleAddressSelect(addr);
                      setIsChangingAddress(false);
                    }}
                  >
                    <p className="cart-page-address-name">
                      <strong>Name: {addr.name}</strong>
                    </p>
                    <p className="cart-page-address-line">
                      Address: {addr.city}, {addr.state} - {addr.pin}
                    </p>
                    <p className="cart-page-address-line">
                      {addr.country} | Phone: {addr.phoneNumber}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className="cart-page-add-button"
                onClick={() => setShowForm(true)}
              >
                + Add New Delivery Address
              </button>
            </div>
          )}
          {/* </div> */}

          {showForm && (
            <div
              className="cart-page-modal-overlay"
              onClick={() => setShowForm(false)}
            >
              <div
                className="cart-page-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <AddressPopupPage
                  onClose={() => setShowForm(false)}
                  onSave={(newAddr) => {
                    // you’d merge newAddr into your `addresses` and close
                    handleAddressSelect(newAddr);
                    setShowForm(false);
                  }}
                />
              </div>
            </div>
          )}

          {deliveryAddress && (
            <div className="billing-address-section">
              <h3>Billing Address</h3>
              <label>
                <input
                  type="radio"
                  checked={isBillingSame}
                  onChange={() => {
                    setIsBillingSame(true);
                    setBillingAddress(deliveryAddress);
                  }}
                />
                Billing address is same as Delivery address
              </label>
              <label>
                <input
                  type="radio"
                  checked={!isBillingSame}
                  onChange={() => {
                    setIsBillingSame(false);
                    setBillingAddress(null);
                    setIsBillingChanging(true); // trigger address selection
                  }}
                />
                Use different billing address
              </label>

              {!isBillingSame && billingAddress && !isBillingChanging && (
                <div className="cart-page-address-selected">
                  <div className="cart-page-address-card cart-page-active">
                    <p className="cart-page-address-name">
                      <strong>Name: {billingAddress.name}</strong>
                    </p>
                    <p className="cart-page-address-line">
                      Address: {billingAddress.city}, {billingAddress.state} -{" "}
                      {billingAddress.pin}
                    </p>
                    <p className="cart-page-address-line">
                      {billingAddress.country} | Phone:{" "}
                      {billingAddress.phoneNumber}
                    </p>
                  </div>
                  <button
                    className="cart-page-change-button"
                    onClick={() => setIsBillingChanging(true)}
                  >
                    Change Billing Address
                  </button>
                </div>
              )}

              {!isBillingSame && isBillingChanging && (
                <>
                  <div className="cart-page-address-list">
                    {addresses
                      .filter((addr) => addr.id !== deliveryAddress.id)
                      .map((addr, index) => (
                        <div
                          key={index}
                          className={`cart-page-address-card ${
                            billingAddress?.id === addr.id
                              ? "cart-page-active"
                              : ""
                          }`}
                          onClick={() => {
                            setBillingAddress(addr);
                            setIsBillingChanging(false);
                          }}
                        >
                          <p className="cart-page-address-name">
                            <strong>Name: {addr.name}</strong>
                          </p>
                          <p className="cart-page-address-line">
                            Address: {addr.city}, {addr.state} - {addr.pin}
                          </p>
                          <p className="cart-page-address-line">
                            {addr.country} | Phone: {addr.phoneNumber}
                          </p>
                        </div>
                      ))}
                  </div>

                  <button
                    className="cart-page-add-button"
                    onClick={() => setShowForm(true)}
                  >
                    + Add New Billing Address
                  </button>
                </>
              )}
            </div>
          )}

          <div className="cart-page-button-container">
            {/* <button
              className="cart-page-add-button"
              onClick={() => setShowForm(true)}
            >
              + Add New Address
            </button> */}
            {/* <button
              type="button"
              className="cart-page-proceed-button"
              onClick={handleProceed}
              disabled={!deliveryAddress || (!isBillingSame && !billingAddress)}
            >
              Proceed
            </button> */}
          </div>
        </div>

        <div className="cart-sub-main-container">
          <h1 className="cart-title">Order Items</h1>

          {!isBuyNow && cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
              {/* <Link to="/" className="back-btn">
                Continue Shopping
              </Link> */}
              {isBuyNow ? (
                <div className="cart-card">
                  <div className="cart-card-inner">
                    <div className="cart-image-wrapper">
                      <img
                        src={buyNowItem.image}
                        alt={buyNowItem.name}
                        className="cart-image"
                      />
                    </div>
                    <div className="cart-info">
                      <h2 className="cart-name">{buyNowItem.name}</h2>
                      <p>
                        Accessories:{" "}
                        {buyNowItem.isRelay ? "With Relay" : "Without Relay"}
                      </p>
                      <p>
                        Subscription: {buyNowItem.subscription} subscription
                      </p>
                      <p>Network: {buyNowItem.network}</p>
                      <p>Rs. {buyNowItem.totalAmount}</p>
                      <p>Quantity: {buyNowItem.quantity}</p>
                    </div>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
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
                ))
              )}
            </div>
          )}
          <div className="cart-summary">
            <h2>Total: Rs.{totalAmount}/-</h2>
            <button
              type="button"
              // className="checkout"
              className="cart-page-proceed-button"
              onClick={handleProceed}
              disabled={!deliveryAddress || (!isBillingSame && !billingAddress)}
            >
              Proceed to Checkout
            </button>
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
