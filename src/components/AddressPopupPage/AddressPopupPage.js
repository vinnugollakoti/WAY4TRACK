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
      <form className="address-form" onSubmit={handleSubmit}>
        {/* <input
        type="email"
        name="email"
        placeholder="Email or mobile phone number"
        value={form.email}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="subscribe"
          checked={form.subscribe}
          onChange={handleChange}
        />
        Email me with news and offers
      </label> */}

        <h2 className="delivery-title">Delivery</h2>

        <div className="name-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
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
            name="pin"
            placeholder="PIN code"
            value={form.pin}
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
        {/* <input
        type="text"
        name="apartment"
        placeholder="Apartment, suite, etc. (optional)"
        value={form.apartment}
        onChange={handleChange}
      /> */}

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        {/* <label>
        <input
          type="checkbox"
          name="saveInfo"
          checked={form.saveInfo}
          onChange={handleChange}
        />
        Save this information for next time
      </label> */}

        {/* <div className="shipping-method">
        <strong>Shipping method</strong>
        <div className="free-shipping">
          <span>Thank You for Your Order – Enjoy Free Shipping!</span>
          <span>
            <strong>FREE</strong>
          </span>
        </div>
      </div> */}

        <button type="submit" className="checkout">
          Continue
        </button>
      </form>
    </div>
  );
};

export default AddressPopupPage;
