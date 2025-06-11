import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";

import "./Login.css";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // const handleSendCode = () => {
  //   if (phone.length === 10) {
  //     navigate("/verify-otp", { state: { phone } });
  //   } else {
  //     alert("Enter a valid 10-digit number");
  //   }
  // };

  const handleSendCode = async () => {
    alert("test0");
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
      alert("Test1");

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
    <div className="Login-container">
      <div className="Login-left">
        <div className="Login-summary-card">
          {/* <div className="Login-item"> */}
          <img
            src="https://res.cloudinary.com/dabzdwxet/image/upload/v1746123490/bike_device1_ip8bus.png"
            alt="Login"
            className="Login-product-img"
          />
          {/* <div>
              <p className="Login-product-title">
                Fleettrack AirCheck™ – Digital...
              </p>
              <p className="Login-product-price">₹999.00</p>
            </div> */}
          {/* </div> */}
        </div>
        {/* <div className="Login-powered">
          Powered by <strong>COD King</strong>
        </div> */}
      </div>

      <div className="Login-right">
        <div className="Login-card">
          <h2 className="Login-title">Login/Signup</h2>
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
          <button className="Login-btn Login-send-btn" onClick={handleSendCode}>
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
