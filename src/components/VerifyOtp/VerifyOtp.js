import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";

import "./VerifyOtp.css";

function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const phone = location.state?.phone;

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp];
      updated[index] = value;
      setOtp(updated);
      if (value !== "" && index < 5) {
        document.getElementById(`OtpVerification-input-${index + 1}`).focus();
      }
    }
  };

  //   const handleVerify = () => {
  //     const fullOtp = otp.join("");
  //     if (fullOtp.length === 4) {
  //       alert(`Verifying OTP: ${fullOtp}`);
  //     } else {
  //       alert("Enter complete OTP");
  //     }
  //   };

  const handleLoginSuccess = async (clientId) => {
    const guestCartItems = JSON.parse(
      localStorage.getItem("guestCartItems") || "[]"
    );

    if (guestCartItems.length > 0) {
      for (const item of guestCartItems) {
        await ApiService.post("/cart/handleCreateCart", {
          ...item,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          clientId,
        });
      }

      localStorage.removeItem("guestCartItems");
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      alert("Enter the complete 6-digit OTP");
      return;
    }

    try {
      const response = await ApiService.post("otp/verifyClientOtp", {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        otp: fullOtp, // ✅ send the actual entered OTP
        // phoneNumber: phone,
      });

      if (response.status) {
        console.log(response.data, "client data");
        const { id, clientId } = response.data;

        localStorage.setItem("client_id", clientId);
        localStorage.setItem("client_db_id", id);

        await handleLoginSuccess(id);

        alert("OTP Verified successfully.");
        navigate("/products");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="OtpVerification-container">
      <div className="OtpVerification-left">
        <div className="OtpVerification-summary-card">
          <div className="OtpVerification-item">
            <img
              src="https://res.cloudinary.com/dabzdwxet/image/upload/v1746123490/bike_device1_ip8bus.png"
              alt="Login"
              className="OtpVerification-product-img"
            />
          </div>
        </div>
      </div>

      <div className="OtpVerification-right">
        <div className="Login-card">
          <h2 className="OtpVerification-title">Verify Mobile Number</h2>
          <p className="OtpVerification-subtitle">
            Enter the code sent to +91{phone}
          </p>
          <div className="OtpVerification-otp-box">
            {otp.map((val, idx) => (
              <input
                key={idx}
                id={`OtpVerification-input-${idx}`}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="OtpVerification-input"
              />
            ))}
          </div>
          <p className="OtpVerification-resend">
            Didn’t receive the OTP? Retry in{" "}
            <b>00:{timer.toString().padStart(2, "0")}</b>
          </p>
          <button className="OtpVerification-btn" onClick={handleVerify}>
            Verify Code
          </button>

          <div className="OtpVerification-policy-links">
            <a href="/">T&C</a> | <a href="/">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
