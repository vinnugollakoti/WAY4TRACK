import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./AddressPopupPage.css";

const AddressPopupPage = ({ address = null, onClose, onSuccess }) => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(!address); // if address is passed, show form directly

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");
  const dbId = localStorage.getItem("client_db_id");
  const phone = localStorage.getItem("client_phone");

  const [form, setForm] = useState({
    email: "",
    subscribe: true,
    country: "India",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "Andhra Pradesh",
    pincode: "",
    phone: "",
    saveInfo: false,
  });

  useEffect(() => {
    if (address) {
      // Edit mode: pre-fill form with address
      setForm({
        email: "",
        subscribe: true,
        country: "India",
        firstName: address.name || "",
        lastName: "",
        company: address.company || "",
        address: address.address || "",
        apartment: address.apartment || "",
        city: address.city || "",
        state: address.state || "Andhra Pradesh",
        pincode: address.pincode || "",
        phone: address.phoneNumber || "",
        saveInfo: false,
      });
    } else {
      // Add mode: try to fetch existing addresses
      fetchSavedAddresses();
    }
  }, [address]);

  const fetchSavedAddresses = async () => {
    try {
      const payload = { companyCode, unitCode, clientId };
      const response = await ApiService.post(
        "/client/getClientDetailsById",
        payload
      );
      if (!response.status) {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setShowForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await ApiService.post("/client/handleClientDetails", {
        companyCode,
        unitCode,
        phoneNumber: phone,
        name: form.firstName,
        id: dbId,
        clientId,
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister();

    try {
      const payload = {
        ...form,
        companyCode,
        unitCode,
        clientId: Number(dbId),
        phoneNumber: phone,
        name: form.firstName,
      };

      if (address?.id) {
        payload.id = address.id; // important for edit
      }

      const response = await ApiService.post(
        "/address/handleCreateAddress",
        payload
      );

      if (response.status === 200 || response.status) {
        alert(address ? "Address updated!" : "Address added!");
        onSuccess?.(); // parent callback
        onClose?.(); // close popup
      } else {
        alert("Failed to save address");
      }
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  return (
    <div className="address-popup-wrapper">
      <form className="address-form" onSubmit={handleSubmit}>
        <h2 className="delivery-title">Delivery</h2>

        <div className="name-fields">
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          {/* <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
          /> */}
        </div>

        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          value={form.company}
          onChange={handleChange}
        />
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="India">India</option>
        </select>

        <div className="location-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          >
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            {/* Add more states if needed */}
          </select>
          <input
            type="text"
            name="pincode"
            placeholder="PIN code"
            value={form.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="checkout">
          {address ? "Update Address" : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default AddressPopupPage;
