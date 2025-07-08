import React, { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./Login.css";
import { CartContext } from "../../contexts/CartContext";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotal, addToCart } = useContext(CartContext);
  useEffect(()=>{
    localStorage.clear();
  },[])
  

  const handleSendCode = async () => {
    if (phone.length !== 10) {
      alert("Enter a valid 10-digit number");
      return;
    }
    try {
      const response = await ApiService.post("otp/sendClientOtp", {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        phoneNumber: phone,
      });

      if (response.status) {
        alert("Otp Sent successfully.");
        navigate("/verify-otp", { state: { phone } });
      } else {
        alert("Error during sending the otp.");
        console.error("Error during sending OTP");
      }
    } catch (error) {
      console.error("Error during OTP request:", error);
    }
  };

  return (
    <div className="Login-wrapper">
      <div className="Login-card-glass">
        <div className="Login-image-side">
          <img
            src="https://res.cloudinary.com/dabzdwxet/image/upload/v1749645288/login_xkxs2t.avif"
            alt="Login Illustration"
            className="Login-image"
          />
        </div>
        <div className="Login-form-side">
          <h2 className="Login-title">Login / Signup</h2>
          <p className="Login-subtitle">
            Confirm your mobile number to proceed
          </p>
          <input
            className="Login-input"
            type="text"
            placeholder="+91"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="Login-btn" onClick={handleSendCode}>
            Send OTP →
          </button>
          <div className="Login-policy-links">
            <a href="/">T&C</a> | <a href="/">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ApiService, { initialAuthState } from "../Services/ApiServices";

// import "./Login.css";

// function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState("");

//   const companyCode = initialAuthState.companyCode;
//   const unitCode = initialAuthState.unitCode;

//   // Redirect path, fallback to '/' if no previous route found
//   const redirectPath = location.state?.from?.pathname || "/";

// const handleLogin = async () => {
//   try {
//     const response = await ApiService.post("client/clientLoginDetails", {
//       companyCode,
//       unitCode,
//       phoneNumber: phone,
//     });

//     if (response.status) {
//       const { id, clientId, phoneNumber } = response.data;

//       localStorage.setItem("client_id", clientId);
//       localStorage.setItem("client_db_id", id);
//       localStorage.setItem("client_phone", phoneNumber);

//       console.log(response, "login");

//       // Redirect to the previous location or homepage
//       navigate(redirectPath, { replace: true });
//     } else {
//       handleRegister();
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//   }
// };

//   const handleRegister = async () => {
//     try {
//       const response = await ApiService.post("/client/handleClientDetails", {
//         companyCode,
//         unitCode,
//         phoneNumber: phone,
//       });

//       if (response.status) {
//         const { id, clientId, phoneNumber } = response.data;

//         localStorage.setItem("client_id", clientId);
//         localStorage.setItem("client_db_id", id);
//         localStorage.setItem("client_phone", phoneNumber);
//         console.log(response, "register");

//         // Navigate back to the previous location after successful registration
//         navigate(redirectPath, { replace: true });
//       } else {
//         alert("Error during registration.");
//         console.error("Failed to fetch cart items:", response.message);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="logo-section">
//           <img src="/images/logo.png" alt="logo" className="logo-square" />
//         </div>

//         <h2>Login with Phone</h2>
//         <div className="input-group">
//           <input
//             type="tel"
//             className="login-input"
//             placeholder="Enter phone number"
//             value={phone}
//             onChange={(e) => {
//               setPhone(e.target.value);
//               setError(""); // Reset error when typing
//             }}
//             maxLength={10}
//           />
//         </div>

//         {error && <p className="error-text">{error}</p>}

//         <button className="login-btn" onClick={handleLogin}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
