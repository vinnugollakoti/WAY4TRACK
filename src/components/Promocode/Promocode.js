import React, { useState, useEffect } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./Promocode.css";

const PromoCode = ({ totalAmount, onApply, onRemove, appliedPromo }) => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(appliedPromo || null);
  const userId = localStorage.getItem("client_id");

  useEffect(() => {
    fetchPromocodes();
  }, [totalAmount]); // Add totalAmount as dependency

  useEffect(() => {
    // Sync selectedPromo with appliedPromo from parent
    if (appliedPromo) {
      setSelectedPromo(appliedPromo);
    }
  }, [appliedPromo]);

  console.log("REACHED : ", totalAmount)
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
        console.log("Eligible promos:", eligible);

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
    if (!inputCode.trim()) {
      setMessage("Please enter a promo code!");
      return;
    }

    const promo = promoCodes.find(
      (p) => p.promocode.toLowerCase() === inputCode.trim().toLowerCase()
    );
    
    if (!promo) {
      setMessage("Invalid or ineligible promo code!");
      return;
    }

    if (promo.usedByUser) {
      setMessage("You have already used this promo code!");
      return;
    }

    applyPromo(promo);
  };

  const applyPromo = (promo) => {
  totalAmount = Number(totalAmount) || 0;   // <<< FIX HERE

  let discount = 0;

  if (promo.discountType.toLowerCase() === "amount") {
    discount = parseFloat(promo.discount);
  } else if (promo.discountType.toLowerCase() === "percent") {
    discount = (totalAmount * parseFloat(promo.discount)) / 100;
  }

  if (promo.maxDiscountAmount && discount > parseFloat(promo.maxDiscountAmount)) {
    discount = parseFloat(promo.maxDiscountAmount);
  }

  setSelectedPromo(promo);
  onApply(discount, promo);
  console.log("TOTAL AMOUNT : " , totalAmount)
  console.log("DISCOUNT", discount)
  setMessage(`Promo "${promo.promocode}" applied successfully!`);
  setInputCode("");
  setShowModal(false);
};


  const removePromo = () => {
    console.log("Removing promo");
    setSelectedPromo(null);
    setInputCode("");
    setMessage("");
    onRemove();
  };

  const handleShowPromoCodes = () => {
    fetchPromocodes(); // Refresh available promos
    setShowModal(true);
  };

  return (
    <div className="PromoCode-container">
      <h3 className="PromoCode-heading">Apply Promo Code</h3>

      {selectedPromo ? (
        <div className="PromoCode-applied">
          <div className="PromoCode-appliedInfo">
            <span className="PromoCode-appliedText">
              ✅ Applied: <strong>{selectedPromo.promocode}</strong>
            </span>
            <button 
              onClick={removePromo} 
              className="PromoCode-removeBtn"
              type="button"
            >
              Remove
            </button>
          </div>
          <div className="PromoCode-discountInfo">
            Discount: 
            {selectedPromo.discountType.toLowerCase() === "amount" 
              ? `₹${selectedPromo.discount}`
              : `${selectedPromo.discount}%`
            }
          </div>
        </div>
      ) : (
        <>
          <div className="PromoCode-inputArea">
            <input
              type="text"
              value={inputCode}
              placeholder="Enter promo code"
              onChange={(e) => setInputCode(e.target.value)}
              className="PromoCode-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleApplyCode();
                }
              }}
            />
            <button 
              onClick={handleApplyCode} 
              className="PromoCode-applyBtn"
              disabled={!inputCode.trim()}
            >
              Apply
            </button>
          </div>

          <center>
            <button 
              onClick={handleShowPromoCodes} 
              className="PromoCode-showBtn"
              type="button"
            >
              Show Available Promo Codes
            </button>
          </center>
        </>
      )}

      {message && (
        <p className={`PromoCode-message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

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
            
            {loading ? (
              <p>Loading promo codes...</p>
            ) : (
              <div className="PromoCode-cards">
                {promoCodes.length > 0 ? (
                  promoCodes.map((promo) => (
                    <div
                      key={promo.id}
                      className={`PromoCode-voucher ${
                        selectedPromo?.id === promo.id ? "selected" : ""
                      } ${promo.usedByUser ? "disabled" : ""}`}
                      onClick={() => {
                        if (!promo.usedByUser) {
                          applyPromo(promo);
                        }
                      }}
                      style={{
                        cursor: promo.usedByUser ? "not-allowed" : "pointer",
                        opacity: promo.usedByUser ? 0.5 : 1,
                        pointerEvents: promo.usedByUser ? "none" : "auto",
                      }}
                    >
                      <div className="voucher-left">
                        <h4>
                          {promo.discountType.toLowerCase() === "amount"
                            ? `₹${promo.discount}`
                            : `${promo.discount}%`}
                        </h4>
                        <span>Discount</span>
                      </div>
                      <div className="voucher-right">
                        <small>Voucher Code</small>
                        <p>{promo.promocode}</p>
                        <small>
                          Min. order: ₹{promo.minSaleAmount}
                        </small>
                        <br />
                        <small>
                          {promo.usedByUser ? "Already Used" : "Click to apply"}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No eligible promo codes available for your order amount.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCode;