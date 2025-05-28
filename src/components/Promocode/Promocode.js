import React, { useState, useEffect } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./Promocode.css";

const PromoCode = ({ totalAmount, onApply }) => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const userId = localStorage.getItem("client_id");

  useEffect(() => {
    fetchPromocodes();
  }, []);

 

  const fetchPromocodes = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const response = await ApiService.post(
        "/promocode/getPromocodeDetails",
        payload
      );

      if (response?.data) {
        const eligible = response.data
          .filter((promo) => {
            return parseFloat(totalAmount) >= parseFloat(promo.minSaleAmount);
          })
          .map((promo) => {
            let usedByUser = false;
            try {
              const users = JSON.parse(promo.promoUsers);
              console.log(users, "users");
              if (Array.isArray(users) && users.includes(userId)) {
                usedByUser = true;
              }
            } catch (err) {
              console.warn("Invalid promoUsers JSON", promo.promoUsers);
            }
            return { ...promo, usedByUser };
          });
        console.log(eligible, "eligible promos");

        setPromoCodes(eligible);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching promocodes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCode = () => {
    const promo = promoCodes.find(
      (p) => p.promocode.toLowerCase() === inputCode.trim().toLowerCase()
    );
    if (!promo) {
      setMessage("Invalid or ineligible promo code!");
      return;
    }
    applyPromo(promo);
  };

  const applyPromo = (promo) => {
    let discount = 0;
    if (promo.discountType.toLowerCase() === "amount") {
      discount = parseFloat(promo.discount);
    } else if (promo.discountType.toLowerCase() === "percentage") {
      discount = (totalAmount * parseFloat(promo.discount)) / 100;
    }

    // Respect maxDiscountAmount cap
    if (
      promo.maxDiscountAmount &&
      discount > parseFloat(promo.maxDiscountAmount)
    ) {
      discount = parseFloat(promo.maxDiscountAmount);
    }

    setSelectedPromo(promo);
    onApply(discount, promo);
    setMessage(`Promo "${promo.promocode}" applied successfully!`);
    setInputCode("");
    setShowModal(false);
  };

  return (
    <div className="PromoCode-container">
      <h3 className="PromoCode-heading">Apply Promo Code</h3>

      <div className="PromoCode-inputArea">
        <input
          type="text"
          value={inputCode}
          placeholder="Enter promo code"
          onChange={(e) => setInputCode(e.target.value)}
          className="PromoCode-input"
        />
        <button onClick={handleApplyCode} className="PromoCode-applyBtn">
          Apply
        </button>
      </div>

      <button onClick={() => setShowModal(true)} className="PromoCode-showBtn">
        Show Promo Cards
      </button>

      {message && <p className="PromoCode-message">{message}</p>}

      {showModal && (
        <div className="PromoCode-modal">
          <div className="PromoCode-modalContent">
            <h4>Eligible Promo Codes</h4>
            <span
              className="PromoCode-closeBtn"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <div className="PromoCode-cards">
              {promoCodes.map((promo) => (
                <div
                  key={promo.id}
                  className={`PromoCode-voucher ${
                    selectedPromo?.id === promo.id ? "selected" : ""
                  } ${promo.usedByUser ? "disabled" : ""}`}
                  onClick={() => {
                    if (!promo.usedByUser) applyPromo(promo);
                  }}
                  style={{
                    cursor: promo.usedByUser ? "not-allowed" : "pointer",
                    opacity: promo.usedByUser ? 0.5 : 1,
                    pointerEvents: promo.usedByUser ? "none" : "auto",
                  }}
                >
                  <div className="voucher-left">
                    <h4>
                      {promo.discountType === "Amount"
                        ? `₹${promo.discount}`
                        : `${promo.discount}%`}
                    </h4>
                    <span>Discount</span>
                  </div>
                  <div className="voucher-right">
                    <small>Voucher Code</small>
                    <p>{promo.promocode}</p>
                    <small>
                      {promo.usedByUser ? "Already Used" : "Click to apply"}
                    </small>
                  </div>
                </div>
              ))}

              {!promoCodes.length && <p>No eligible promo codes available.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
