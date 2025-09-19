import React, { useState, useEffect } from "react";
import { FaEdit, FaPhone } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
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
       alert("Please update at least one item. Try again.");

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
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-md-4 text-center">
          <div className="card p-4 shadow-sm">
            {user.image ? (
              <img
                src={user.image}
                alt="profile"
                className="rounded-circle img-fluid mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "120px", height: "120px", fontSize: "2rem" }}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <h5 className="fw-bold">{user.name}</h5>
            <p className="mb-1 text-muted">
              <FaPhone className="me-2" />
              {user.phoneNumber}
            </p>
            <p className="text-muted">
              <MdMarkEmailRead className="me-2" />
              {user.email || "example@gmail.com"}
            </p>
          </div>
        </div>

        <div className="col-md-8">
          <div className="mb-3 d-flex gap-3 flex-wrap">
            <button
              className={`btn ${
                activeTab === "profile" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`btn ${
                activeTab === "orders" ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </button>
          </div>

          {activeTab === "profile" && (
            <div className="row g-3">
            <div className="col-12">
  <div className="card p-4 shadow-sm">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="fw-bold mb-0">Account Information</h5>
      <button className="btn btn-sm btn-success" onClick={handleSubmit}>
        Update
      </button>
    </div>
    <form>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            className="form-control"
            value={editProfileData.name}
            onChange={(e) =>
              setEditProfileData({
                ...editProfileData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            value={editProfileData.email}
            onChange={(e) =>
              setEditProfileData({
                ...editProfileData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={editProfileData.phoneNumber}
            onChange={(e) =>
              setEditProfileData({
                ...editProfileData,
                phoneNumber: e.target.value,
              })
            }
          />
        </div>
      </div>
    </form>
  </div>
</div>


              <div className="col-12">
                <div className="card p-4 shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Saved Addresses</h5>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSelectedAddress(null);
                        setShowAddressPopup(true);
                      }}
                    >
                      + Add New Address
                    </button>
                  </div>

                  <div className="row">
                    {user?.customerAddress?.map((addr, index) => (
                      <div className="col-md-6 mb-3" key={index}>
                        <div className="border rounded p-3 h-100 position-relative">
                          <div className="d-flex justify-content-between">
                            <div>
                              {addr.isDefault && (
                                <span className="badge bg-success mb-1">
                                  Default
                                </span>
                              )}
                              <p className="mb-1 fw-bold">{addr.name}</p>
                              <p className="mb-1">
                                {addr.phoneNumber}, {addr.street}, {addr.locality}
                              </p>
                              <p className="mb-1">
                                {addr.city}, {addr.state}, {addr.pinCode}
                              </p>
                              <p className="mb-0">{addr.phoneNumber}</p>
                            </div>
                            <div
                              onMouseEnter={() => setShowOptionsIndex(index)}
                              onMouseLeave={() => setShowOptionsIndex(null)}
                              className="position-relative"
                            >
                              <BsThreeDotsVertical
                                style={{ cursor: "pointer" }}
                              />
                              {showOptionsIndex === index && (
                                <div
                                  className="position-absolute bg-white border rounded shadow-sm p-2"
                                  style={{
                                    right: 0,
                                    top: "1.5rem",
                                    zIndex: 10,
                                  }}
                                >
                                  <button
                                    className="btn btn-sm btn-link text-start d-block w-100"
                                    onClick={() => {
                                      setSelectedAddress(addr);
                                      setShowAddressPopup(true);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-link text-danger text-start d-block w-100"
                                    onClick={() => handleDeleteAddress(addr.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="mt-3">
              <MyOrders />
            </div>
          )}
        </div>
      </div>

      {showAddressPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
          <div
            className="bg-white rounded shadow p-3 w-100"
            style={{ maxWidth: "600px" }}
          >
            <div className="text-end">
              <button
                className="btn btn-sm btn-danger"
                onClick={() => setShowAddressPopup(false)}
              >
                ✕
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
    </div>
  );
};

export default ProfilePage;
