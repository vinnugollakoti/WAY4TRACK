import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";

function HomepageProducts() {
  const [session2, setSession2] = useState([]);

  // Fetch promotions from backend
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const payload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const response = await axios.post(
          "https://sharontelematics.org/api/promotion/getAllPromotions",
          payload
        );
        const data = response.data.data || [];

        // Filter for latest Session-2 promotions
        const latestSession2 = data
          .filter((item) => item.theme === "Session-2")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        setSession2(latestSession2?.list || []);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="homepage-products">
      <div className="homepage-products-scroll">
        {session2.map((item, index) => (
          <div key={index} className="homepage-product-card">
            <Link
              to={item.link || "#"}
              className="homepage-product-card-link"
              onClick={scrollToTop}
            >
              <img
                src={item.photo || ""}
                alt={item.name || `Product ${index + 1}`}
              />
              <div className="center-wrapper">
                <h3 className="home-product-heading">
                  {item.name || "Unnamed Product"}
                </h3>
                <p className="home-product-p">{item.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomepageProducts;
