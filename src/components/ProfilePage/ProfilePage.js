import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import AddressPopupPage from "../AddressPopupPage/AddressPopupPage"

import "./ProfilePage.css";

const ProfilePage = () => {
  const users = {
    name: "Mahesh G",
    email: "maheshgaddala333@gmail.com",
    addresses: [
      {
        name: "Mahesh G",
        company: "Company",
        addressLine1:
          "Visakhapatnam International Airport Drop Location Airport",
        addressLine2: "530009 Visakhapatnam Andhra Pradesh",
        country: "India",
        phone: "+917995357141",
        isDefault: true,
      },
      {
        name: "Mahesh G",
        company: "ABCD",
        addressLine1: "Ongole Railway station Santhapet",
        addressLine2: "523001 Ongole Andhra Pradesh",
        country: "India",
        phone: "+917995357141",
        isDefault: false,
      },
    ],
  };

  const [user, setUser] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  console.log(user, "users");

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;
  const clientId = localStorage.getItem("client_id");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const payload = {
        companyCode,
        unitCode,
        clientId,
      };
      const response = await ApiService.post(
        "/client/getClientDetailsById",
        payload
      );

      if (response.status) {
        const data = response.data;
        console.log(data, "addressknjfidfh");
        setUser(data);
      } else {
        console.error("Error fetching profile");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  return (
    <div className="profilePage__container">
      <h2 className="profilePage__heading">Profile</h2>

      <div className="profilePage__card">
        <div className="profilePage__nameSection">
          <span className="profilePage__name">{user.name}</span>
          <FaEdit className="profilePage__editIcon" />
        </div>
        <div className="profilePage__emailSection">
          <p className="profilePage__emailLabel">Mobile</p>
          <p className="profilePage__emailValue">{user.phoneNumber}</p>
        </div>
      </div>

      <div className="profilePage__addressCard">
        <div className="profilePage__addressHeader">
          <h3 className="profilePage__addressTitle">Addresses</h3>
          <div>
            <button
              className="profilePage__addButton"
              onClick={() => setShowPopup(true)}
            >
              + Add
            </button>

            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <button
                    className="popup-close-btn"
                    onClick={() => setShowPopup(false)}
                  >
                    ✕
                  </button>
                  <AddressPopupPage
                    onClose={() => setShowPopup(false)} 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profilePage__addressBlock__container">
          {user?.customerAddress?.map((addr, index) => (
            <div key={index} className="profilePage__addressBlock">
              <div className="profilePage__addressHeaderBlock">
                {addr.isDefault ? (
                  <>
                    <span className="profilePage__defaultLabel">
                      Default Address
                    </span>
                    <FaEdit className="profilePage__editIcon" />
                  </>
                ) : (
                  <FaEdit className="profilePage__editIcon" />
                )}
              </div>
              <p className="profilePage__addressLine">{addr.name}</p>
              {/* <p className="profilePage__addressLine">{addr.company}</p> */}
              {/* <p className="profilePage__addressLine">{addr.addressLine1}</p> */}
              {/* <p className="profilePage__addressLine">{addr.addressLine2}</p> */}
              <p className="profilePage__addressLine">{addr.country}</p>
              <p className="profilePage__addressLine">{addr.state}</p>
              <p className="profilePage__addressLine">{addr.city}</p>
              <p className="profilePage__addressLine">{addr.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
