import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";

import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;

  // Redirect path, fallback to '/' if no previous route found
  const redirectPath = location.state?.from?.pathname || "/"; 

  const handleLogin = async () => {
    try {
      const response = await ApiService.post("client/clientLoginDetails", {
        companyCode,
        unitCode,
        phoneNumber: phone,
      });

      if (response.status) {
        const { id, clientId, phoneNumber } = response.data;

        localStorage.setItem("client_id", clientId);
        localStorage.setItem("client_db_id", id);
        localStorage.setItem("client_phone", phoneNumber);

        console.log(response, "login");

        // Redirect to the previous location or homepage
        navigate(redirectPath, { replace: true });
      } else {
        handleRegister();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await ApiService.post("/client/handleClientDetails", {
        companyCode,
        unitCode,
        phoneNumber: phone,
      });

      if (response.status) {
        console.log(response, "register");

        // Navigate back to the previous location after successful registration
        navigate(redirectPath, { replace: true });
      } else {
        alert("Error during registration.");
        console.error("Failed to fetch cart items:", response.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <img src="/images/logo.png" alt="logo" className="logo-square" />
        </div>

        <h2>Login with Phone</h2>
        <div className="input-group">
          <input
            type="tel"
            className="login-input"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError(""); // Reset error when typing
            }}
            maxLength={10}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
