import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./AddressPopupPage.css";

const AddressPopupPage = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
    pin: "",
    phone: "",
    saveInfo: false,
  });

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const fetchSavedAddresses = async () => {
    try {
      const payload = { companyCode, unitCode, clientId };
      const response = await ApiService.post(
        "/client/getClientDetailsById",
        payload
      );
      if (response.status) {
        setAddresses(response.data.customerAddress);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setShowForm(true);
    }
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
  };

  const handleProceed = () => {
    if (selectedAddress) {
      navigate("/order-details", { state: { selectedAddress } });
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
      const response = await ApiService.post(
        "/address/handleCreateAddress",
        payload
      );
      if (response.status === 200 || response.status) {
        navigate("/order-details");
      } else {
        alert("Failed to save address");
      }
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  return (
    <div className="address-popup-wrapper">
      <h2 className="address-popup-title">Select a Delivery Address</h2>
      <div className="address-popup-list">
        {addresses.map((addr, index) => (
          <div
            key={index}
            className={`address-popup-card ${
              selectedAddress?.id === addr.id ? "active" : ""
            }`}
            onClick={() => handleAddressSelect(addr)}
          >
            <p className="address-popup-name">
              <strong>Name: {addr.name}</strong>
            </p>
            <p className="address-popup-line">
              Address: {addr.city}, {addr.state} - {addr.pin}
            </p>
            <p className="address-popup-line">
              {addr.country} | Phone: {addr.phoneNumber}
            </p>
          </div>
        ))}
      </div>
      <div className="address-popup-buttons">
        <button
          onClick={() => setShowForm(true)}
          className="address-popup-add-btn"
        >
          + Add New Address
        </button>
        <button
          onClick={handleProceed}
          className="address-popup-proceed-btn"
          disabled={!selectedAddress}
        >
          Proceed
        </button>
      </div>

      {showForm && (
        <form className="address-popup-form" onSubmit={handleSubmit}>
          {/* Include relevant form inputs with onChange={handleChange} and value={form.field} */}
          {/* Keep it minimal or expand based on your needs */}
        </form>
      )}
    </div>
  );
};

export default AddressPopupPage;
