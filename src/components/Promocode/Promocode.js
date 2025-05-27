import React, { useState } from "react";
import "./Promocode.css";

const PromoCode = ({ totalAmount, onApply }) => {
  const [promos] = useState([
    { id: 1, code: "SAVE10", type: "percentage", value: 10 },
    { id: 2, code: "FLAT100", type: "amount", value: 100 },
    { id: 3, code: "SAVE25", type: "percentage", value: 25 },
    { id: 4, code: "FLAT50", type: "amount", value: 50 },
  ]);
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const handleApplyCode = () => {
    const promo = promos.find(
      (p) => p.code.toLowerCase() === inputCode.trim().toLowerCase()
    );
    if (!promo) {
      setMessage("Invalid promo code!");
      return;
    }
    applyPromo(promo);
  };

  const applyPromo = (promo) => {
    let discount =
      promo.type === "percentage"
        ? (totalAmount * promo.value) / 100
        : promo.value;

    setSelectedPromo(promo);
    onApply(discount);
    setMessage(`Promo "${promo.code}" applied successfully!`);
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
            <h4>Available Promo Codes</h4>
            <span
              className="PromoCode-closeBtn"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <div className="PromoCode-cards">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className={`PromoCode-voucher ${
                    selectedPromo?.id === promo.id ? "selected" : ""
                  }`}
                  onClick={() => applyPromo(promo)}
                >
                  <div className="voucher-left">
                    <h4>
                      {promo.type === "percentage"
                        ? `${promo.value}%`
                        : `₹${promo.value}`}
                    </h4>
                    <span>Cashback</span>
                  </div>
                  <div className="voucher-right">
                    <small>Voucher Code</small>
                    <p>{promo.code}</p>
                    <small>Click to apply</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCode;
