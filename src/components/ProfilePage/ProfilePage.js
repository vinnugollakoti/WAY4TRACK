import React, { useState, useEffect } from "react";
import { FaEdit, FaPhone } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import AddressPopupPage from "../AddressPopupPage/AddressPopupPage";
import EditProfilePopup from "../EditPorfilePopup/EdtProfilePopup";
import "./ProfilePage.css";
import MyOrders from "../MyOrders/MyOrders";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  const [editProfileData, setEditProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("companyCode", companyCode);
    payload.append("unitCode", unitCode);
    payload.append("clientId", clientId);
    payload.append("name", editProfileData.name);
    payload.append("phoneNumber", editProfileData.phoneNumber);

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
        fetchProfile(); // refresh data
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

  const fetchProfile = async () => {
    try {
      const response = await ApiService.post("/client/getClientDetailsById", {
        companyCode,
        unitCode,
        clientId,
      });
      if (response.status) {
        setUser(response.data);
        setEditProfileData({
          name: response.data.name || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await ApiService.post("/address/deleteAddress", {
        companyCode,
        unitCode,
        clientId,
        id: addressId,
      });
      if (response.status) fetchProfile();
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <div className="profilePage-layout">
      <div className="profilePage-left">
        <div className="profilePage-imageWrapper">
          {user.image ? (
            <img src={user.image} alt="profile" className="ProfileCard-image" />
          ) : (
            <div className="ProfileCard-placeholder">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>

        <h2>{user.name}</h2>
        <div className="profilePage-contact-info">
          <FaPhone /> {user.phoneNumber}
        </div>
        <div className="profilePage-contact-info">
          <MdMarkEmailRead /> {user.email || "example@gmail.com"}
        </div>
        {/* <div className="profilePage-upload-btns">
          <button onClick={() => setShowProfilePopup(true)}>Edit Profile</button>
        </div> */}
        {/* <button className="profilePage-logout">
          <FiLogOut /> Logout
        </button> */}
      </div>

      <div className="profilePage-right">
        <div className="profilePage-tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
          {/* <button
            className={activeTab === "membership" ? "active" : ""}
            onClick={() => setActiveTab("membership")}
          >
            Membership
          </button> */}
        </div>

        {activeTab === "profile" && (
          <div className="profilePage-tab-content">
            <div className="profilePage-card">
              <div className="profilePage-card-header">
                <h3>Account Information</h3>
                <button
                  className="profilePage-edit-btn"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
              <p>Update your personal details</p>
              <div className="profilePage-form">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    value={editProfileData.name}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={editProfileData.email}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={editProfileData.phoneNumber}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <button
                  className="profilePage-update-btn"
                  // onClick={handleUpdateProfile}
                >
                  Update
                </button> */}
              </div>
            </div>

            <div className="profilePage-card">
              <div className="profilePage-address-header">
                <h3>Saved Addresses</h3>
                <button
                  className="profilePage-add-btn"
                  onClick={() => {
                    setSelectedAddress(null);
                    setShowAddressPopup(true);
                  }}
                >
                  + Add New Address
                </button>
              </div>
              <div className="profilePage-address-list">
                {user?.customerAddress?.map((addr, index) => (
                  <div className="profilePage-address-card" key={index}>
                    <div className="profilePage-address-header-row">
                      {addr.isDefault && (
                        <span className="profilePage-default-badge">
                          Default
                        </span>
                      )}
                      <div
                        className="profilePage-address-options"
                        onMouseEnter={() => setShowOptionsIndex(index)}
                        onMouseLeave={() => setShowOptionsIndex(null)}
                      >
                        <BsThreeDotsVertical />
                        {showOptionsIndex === index && (
                          <div className="address-options-popup">
                            <button
                              onClick={() => {
                                setSelectedAddress(addr);
                                setShowAddressPopup(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p>{addr.name}</p>
                    <p>
                      {addr.houseNo}, {addr.street}, {addr.locality}
                    </p>
                    <p>
                      {addr.city}, {addr.state}, {addr.pinCode}
                    </p>
                    <p>{addr.phoneNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          // <div className="profilePage-tab-content">
          //   <p>Order history content goes here.</p>
            <MyOrders />
          // </div>
        )}

        {/* {activeTab === "membership" && (
          <div className="profilePage-tab-content">
            <p>Membership details go here.</p>
          </div>
        )} */}
      </div>

      {showAddressPopup && (
        <div className="profilePage-popup-overlay">
          <div className="profilePage-popup-content">
            <button
              className="profilePage-popup-close-btn"
              onClick={() => setShowAddressPopup(false)}
            >
              ✕
            </button>
            <AddressPopupPage
              address={selectedAddress}
              onClose={() => setShowAddressPopup(false)}
              onSuccess={fetchProfile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
