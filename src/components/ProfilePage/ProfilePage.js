import React, { useState, useEffect } from "react";
import { FaEdit, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdMarkEmailRead, MdShoppingBag } from "react-icons/md";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import AddressPopupPage from "../AddressPopupPage/AddressPopupPage";
import EditProfilePopup from "../EditPorfilePopup/EdtProfilePopup";
import "./ProfilePage.css";
import MyOrders from "../MyOrders/MyOrders";
import Navbar from "../New_Templates/Navbar";
import Footer from "../New_Templates/Footer"
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  const initialTab = location.state?.activeTab || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    payload.append("email", editProfileData.email);

    try {
      const response = await ApiService.post(
        "/client/handleClientDetails",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status) {
        toast.success("Profile updated successfully!");
        fetchProfile();
      } else {
        toast.error("Please update at least one field.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
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
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const response = await ApiService.post("/address/deleteAddress", {
          companyCode,
          unitCode,
          clientId,
          id: addressId,
        });
        if (response.status) {
          toast.success("Address deleted successfully");
          fetchProfile();
        }
      } catch (error) {
        console.error("Failed to delete address", error);
        toast.error("Failed to delete address");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("client_id");
    localStorage.removeItem("client_db_id");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="profile-page-container">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      
      <div className="profile-main-content">
        <div className="profile-header">
          <h1>My Account</h1>
          <p>Manage your profile, addresses, and orders</p>
        </div>

        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="user-card">
              <div className="user-avatar">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <FaUser size={24} />
                  </div>
                )}
              </div>
              <div className="user-info">
                <h3>{user.name || "User"}</h3>
                <div className="user-contact">
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>{user.phoneNumber || "No phone number"}</span>
                  </div>
                  <div className="contact-item">
                    <MdMarkEmailRead className="contact-icon" />
                    <span>{user.email || "No email address"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-nav">
              <button
                className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <FaUser className="nav-icon" />
                <span>Profile Information</span>
              </button>
              <button
                className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                <MdShoppingBag className="nav-icon" />
                <span>Order History</span>
              </button>
              <button className="nav-item logout-btn" onClick={handleLogout}>
                <FiLogOut className="nav-icon" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-content">
            {activeTab === "profile" && (
              <div className="tab-content">
                {/* Account Information */}
                <div className="content-card">
                  <div className="card-header">
                    <h2>Account Information</h2>
                    <button 
                      className="update-btn"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </button>
                  </div>
                  
                  <form className="profile-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editProfileData.name}
                          onChange={(e) =>
                            setEditProfileData({
                              ...editProfileData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-input"
                          value={editProfileData.email}
                          onChange={(e) =>
                            setEditProfileData({
                              ...editProfileData,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editProfileData.phoneNumber}
                          onChange={(e) =>
                            setEditProfileData({
                              ...editProfileData,
                              phoneNumber: e.target.value,
                            })
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Saved Addresses */}
                <div className="content-card">
                  <div className="card-header">
                    <h2>Saved Addresses</h2>
                    <button
                      className="add-address-btn"
                      onClick={() => {
                        setSelectedAddress(null);
                        setShowAddressPopup(true);
                      }}
                    >
                      + Add New Address
                    </button>
                  </div>

                  <div className="addresses-grid">
                    {user?.customerAddress?.length > 0 ? (
                      user.customerAddress.map((addr, index) => (
                        <div className="address-card" key={index}>
                          <div className="address-header">
                            <div className="address-title">
                              <h4>{addr.name}</h4>
                              {addr.isDefault && (
                                <span className="default-badge">Default</span>
                              )}
                            </div>
                            <div className="address-actions">
                              <div
                                className="options-trigger"
                                onMouseEnter={() => setShowOptionsIndex(index)}
                                onMouseLeave={() => setShowOptionsIndex(null)}
                              >
                                <BsThreeDotsVertical />
                                {showOptionsIndex === index && (
                                  <div className="options-menu">
                                    <button
                                      className="option-item"
                                      onClick={() => {
                                        setSelectedAddress(addr);
                                        setShowAddressPopup(true);
                                      }}
                                    >
                                      <FaEdit />
                                      Edit
                                    </button>
                                    <button
                                      className="option-item delete"
                                      onClick={() => handleDeleteAddress(addr.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="address-details">
                            <p className="address-line">
                              <FaMapMarkerAlt className="address-icon" />
                              {addr.street}, {addr.locality}
                            </p>
                            <p className="address-line">
                              {addr.city}, {addr.state} - {addr.pinCode}
                            </p>
                            <p className="address-line">
                              <FaPhone className="address-icon" />
                              {addr.phoneNumber}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-addresses">
                        <FaMapMarkerAlt size={48} className="empty-icon" />
                        <h3>No addresses saved</h3>
                        <p>Add your first address to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="tab-content">
                <div className="content-card orders-card">
                  <MyOrders isInProfile={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Popup */}
      {showAddressPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h3>{selectedAddress ? "Edit Address" : "Add New Address"}</h3>
              <button
                className="popup-close"
                onClick={() => setShowAddressPopup(false)}
              >
                ×
              </button>
            </div>
            <AddressPopupPage
              address={selectedAddress}
              onClose={() => setShowAddressPopup(false)}
              onSuccess={fetchProfile}
            />
          </div>
        </div>
      )}

      <div className="profile-footer">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;