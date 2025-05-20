import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import DeviceReviewComponent from "../DeviceReviewComponent/DeviceReviewCOmponent";

import "./ProductDetails.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);

  const device = location.state?.device;
  const cartItem = cartItems.find((item) => item.deviceId === device?.id);
  const clientDbId = localStorage.getItem("client_db_id");

  const [accessory, setAccessory] = useState("Without Relay");
  const [network, setNetwork] = useState("Airtel");
  const [subscription, setSubscription] = useState("monthly");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(device?.image || "");
  const [images, setImages] = useState([
    {
      id: 0,
      thumbnail: device?.image,
      original: device?.image,
    },
  ]);

  useEffect(() => {
    if (cartItem) {
      setAccessory(cartItem.isRelay ? "With Relay" : "Without Relay");
      setNetwork(cartItem.network);
      setSubscription(cartItem.subscription);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  if (!device)
    return <div className="product-details-not-found">Product not found!</div>;

  const calculateTotalAmount = () => {
    let base = device.amount;
    if (accessory === "With Relay") base += device.relayAmt || 0;
    if (subscription === "monthly") base += device.subscriptionMonthlyAmt || 0;
    else if (subscription === "yearly")
      base += device.subscriptionYearlyAmt || 0;

    const discount =
      ((device.amount + (device.relayAmt || 0)) * (device.discount || 0)) / 100;
    return (base - discount) * quantity;
  };

  const handleAddToCart = async () => {
    const totalAmount = calculateTotalAmount();
    localStorage.removeItem("buyNowItem");

    const cartData = {
      deviceId: device.id,
      name: device.name,
      quantity,
      isRelay: accessory === "With Relay",
      network,
      subscription,
      totalAmount: totalAmount.toString(),
      clientId: clientDbId,
    };

    if (cartItem && cartItem.id) {
      cartData.id = cartItem.id;
    }

    try {
      await addToCart(cartData);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const handleBuyNow = () => {
    const totalAmount = calculateTotalAmount();

    const orderItem = {
      deviceId: device.id,
      name: device.name,
      image: device.image,
      quantity,
      isRelay: accessory === "With Relay",
      network,
      subscription,
      totalAmount: totalAmount.toString(),
    };

    localStorage.setItem("buyNowItem", JSON.stringify(orderItem));
    navigate("/checkout");
  };

  return (
    <div className="product-details-container">
      <div className="product-details-row">
        {/* LEFT IMAGE + THUMBNAILS */}
        <div className="product-details-left">
          <div className="product-details-gallery-container">
            <div className="product-details-main-image">
              <img
                src={currentImage}
                alt="Main display"
                className="product-details-img zoom-in"
              />
            </div>
            {/* <div className="product-details-thumbnails">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.thumbnail}
                  alt={`Thumbnail ${image.id + 1}`}
                  onMouseEnter={() => setCurrentImage(image.original)}
                  className={`product-details-thumbnail ${
                    currentImage === image.original
                      ? "product-details-active"
                      : ""
                  }`}
                />
              ))}
            </div> */}
          </div>
        </div>

        {/* RIGHT PRODUCT INFO */}
        <div className="product-details-right">
          <h2 className="product-details-title">{device.name}</h2>
          <p className="product-details-description">{device.description}</p>

          <div className="product-details-price-container">
            <p className="product-details-price-original">
              Rs.{device.amount}.00/-
            </p>
            <p className="product-details-price-discounted">
              Rs.{calculateTotalAmount().toFixed(2)}
            </p>
          </div>
          <p className="product-details-text-muted">Tax included.</p>

          <div className="product-details-product-options">
            <div className="product-details-option-group">
              <label>Accessories:</label>
              <div className="product-details-btn-group">
                {["Without Relay", "With Relay"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAccessory(opt)}
                    className={`product-details-btn ${
                      accessory === opt
                        ? "product-details-btn-primary"
                        : "product-details-btn-outline-primary"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details-option-group">
              <label>Network:</label>
              <div className="product-details-btn-group">
                <button
                  onClick={() => setNetwork("Airtel")}
                  className={`product-details-btn ${
                    network === "Airtel"
                      ? "product-details-btn-primary"
                      : "product-details-btn-outline-primary"
                  }`}
                >
                  Airtel
                </button>
              </div>
            </div>

            <div className="product-details-option-group">
              <label>Subscription:</label>
              <div className="product-details-btn-group">
                {["monthly", "yearly"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSubscription(type)}
                    className={`product-details-btn ${
                      subscription === type
                        ? "product-details-btn-primary"
                        : "product-details-btn-outline-primary"
                    }`}
                  >
                    {type} Subscription
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details-option-group">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="product-details-form-control"
              />
            </div>
          </div>

          <div className="product-details-action-buttons">
            <button
              onClick={handleAddToCart}
              className="product-details-btn product-details-btn-outline-dark"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="product-details-btn product-details-btn-dark"
            >
              Buy It Now
            </button>
          </div>
          {/* <DeviceReviewComponent /> */}
        </div>
        <DeviceReviewComponent device={device} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
