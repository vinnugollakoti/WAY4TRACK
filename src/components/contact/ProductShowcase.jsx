import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import {
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import MapView from "./MapView";
import "./ProductShowcase.css";
import ApiService from "../Services/ApiServices";

const ContactCardList = () => {
  const [contacts, setContacts] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const branchPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const response = await ApiService.post(
          "branch/getBranchDetails",
          branchPayload
        );

        console.log("Branch response:", response);
        setContacts(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };

    fetchContacts();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container">
      <div className="row">
        {contacts.map((contact, index) => {
          const lat = parseFloat(contact.latitude);
          const lng = parseFloat(contact.longitude);
          const isValidLatLng = !isNaN(lat) && !isNaN(lng);

          return (
            <motion.div
              key={index}
              className="col-md-6 col-lg-6 mb-4"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="contact-card h-100 border-0 shadow-sm">
                <Card.Body className="position-relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card.Title className="contact-name mb-3">
                      {contact.branchName}
                    </Card.Title>
                    <div className="contact-info">
                      <div className="info-item d-flex align-items-start mb-2">
                        <FaMapMarkerAlt className="text-primary me-2 mt-1" />
                        <p className="mb-0">{contact.branchAddress}</p>
                      </div>
                      <div className="info-item d-flex align-items-start mb-2">
                        <FaPhoneAlt className="text-success me-2 mt-1" />
                        <p className="mb-0">{contact.branchNumber}</p>
                      </div>
                      <div className="info-item d-flex align-items-start mb-2">
                        <FaEnvelope className="text-danger me-2 mt-1" />
                        <p className="mb-0">{contact.email}</p>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        height: expandedIndex === index ? "auto" : 0,
                        opacity: expandedIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="map-container overflow-hidden"
                    >
                      {expandedIndex === index && isValidLatLng && (
                        <MapView position={[lat, lng]} />
                      )}
                    </motion.div>
                  </motion.div>
                </Card.Body>

                <Card.Footer className="bg-white border-0 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleExpand(index)}
                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    {expandedIndex === index ? (
                      <>
                        <span>Hide Map</span>
                        <FiChevronUp />
                      </>
                    ) : (
                      <>
                        <span>View Map</span>
                        <FiChevronDown />
                      </>
                    )}
                  </motion.button>
                </Card.Footer>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactCardList;
