import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import AddressPopupPage from "../AddressPopupPage/AddressPopupPage";
import EditProfilePopup from "../EditPorfilePopup/EdtProfilePopup";
// import EditAddressPopup from "../EditAddressPopup/EditAddressPopup";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await ApiService.post("/client/getClientDetailsById", {
        companyCode,
        unitCode,
        clientId,
      });

      if (response.status) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await ApiService.post("/client/deleteClientAddress", {
        companyCode,
        unitCode,
        clientId,
        addressId,
      });
      if (response.status) fetchProfile();
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <div className="profilePage__container">
      <h2 className="profilePage__heading">Profile</h2>

      <div className="profilePage__card">
        <div className="profilePage__nameSection">
          <span className="profilePage__name">{user.name}</span>
          <FaEdit
            className="profilePage__editIcon"
            onClick={() => setShowProfilePopup(true)}
          />
        </div>
        <div className="profilePage__emailSection">
          <p className="profilePage__emailLabel">Mobile</p>
          <p className="profilePage__emailValue">{user.phoneNumber}</p>
        </div>
      </div>

      {showProfilePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button
              className="popup-close-btn"
              onClick={() => setShowProfilePopup(false)}
            >
              ✕
            </button>
            <EditProfilePopup
              user={user}
              onClose={() => setShowProfilePopup(false)}
            />
          </div>
        </div>
      )}

      <div className="profilePage__addressCard">
        <div className="profilePage__addressHeader">
          <h3 className="profilePage__addressTitle">Addresses</h3>
          <button
            className="profilePage__addButton"
            onClick={() => {
              setSelectedAddress(null);
              setShowAddressPopup(true);
            }}
          >
            + Add
          </button>
        </div>

        <div className="profilePage__addressBlock__container">
          {user?.customerAddress?.map((addr, index) => (
            <div key={index} className="profilePage__addressBlock">
              <div className="profilePage__addressHeaderBlock">
                {addr.isDefault && (
                  <span className="profilePage__defaultLabel">
                    Default Address
                  </span>
                )}
                <div
                  className="more-options-container"
                  onMouseEnter={() => setShowOptionsIndex(index)}
                  onMouseLeave={() => setShowOptionsIndex(null)}
                >
                  <BsThreeDotsVertical className="profilePage__moreIcon" />
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
                        onClick={() => handleDeleteAddress(addr.addressId)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="profilePage__addressLine">{addr.name}</p>
              <p className="profilePage__addressLine">{addr.country}</p>
              <p className="profilePage__addressLine">{addr.state}</p>
              <p className="profilePage__addressLine">{addr.city}</p>
              <p className="profilePage__addressLine">{addr.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>

      {showAddressPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button
              className="popup-close-btn"
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
