import React, { useState } from "react";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./EditProfilePopup.css";

const EditProfilePopup = ({ user, onClose }) => {
  const [name, setName] = useState(user.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     const payload = {
  //       companyCode,
  //       unitCode,
  //       clientId,
  //       name,
  //       phoneNumber,
  //     };

  //     try {
  //       const response = await ApiService.post(
  //         "/client/updateClientProfile",
  //         payload
  //       );
  //       if (response.status) {
  //         alert("Profile updated successfully!");
  //         onClose();
  //       } else {
  //         alert("Failed to update profile.");
  //       }
  //     } catch (error) {
  //       console.error("Profile update error:", error);
  //       alert("Something went wrong.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("companyCode", companyCode);
    payload.append("unitCode", unitCode);
    payload.append("clientId", clientId);
    payload.append("name", name);
    payload.append("phoneNumber", phoneNumber);

    try {
      const response = await ApiService.post(
        "/client/handleClientDetails",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status) {
        alert("Client updated successfully!");
        onClose(); // close the popup
      } else {
        alert("Failed to update. Please try again.");
      }
    } catch (error) {
      console.error("Error updating client details:", error);
      alert("Failed to update. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editProfilePopup__container">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="editProfilePopup__formGroup">
          <label>Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="editProfilePopup__formGroup">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="editProfilePopup__buttonGroup">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={onClose} className="cancelBtn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePopup;
