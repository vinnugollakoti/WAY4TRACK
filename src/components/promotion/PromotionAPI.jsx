import React, { useEffect, useState } from "react";
import ApiService from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";

// Session Components
import SessionOne from "./sessions/SessionOne";
import SessionTwo from "./sessions/SessionTwo";
import SessionThree from "./sessions/SessionThree";
import SessionFour from "./sessions/SessionFour";
import SessionFive from "./sessions/SessionFive";
import SessionSix from "./sessions/SessionSix";
import SessionSeven from "./sessions/SessionSeven";
import SessionEight from "./sessions/SessionEight";
import SessionNine from "./sessions/SessionNine";
import SessionTen from "./sessions/SessionTen";
import DefaultSession from "./sessions/DefaultSession";

// New Components
import BannerCarousel from "./sections/BannerCarousel";
import ProductIconSection from "./sections/ProductIconSection";
import DevicesSection from "./sections/DevicesSection";

import "./Promotion.css";

const PromotionAPI = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch promotions
        const promotionPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const promotionResponse = await ApiService.post(
          "/promotion/getAllPromotions",
          promotionPayload
        );
        const promotionData = promotionResponse?.data || [];

        console.log("All Promotion Data:...", promotionData);

        const seen = new Set();
        const uniquePromotions = promotionData.filter((item) => {
          if (!item.id || seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });

        setPromotions(uniquePromotions);

        // Fetch products
        const productPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const productResponse = await ApiService.post(
          "website-product/getWebsiteProductDetails", 
          productPayload
        );
        const productData = productResponse?.data || [];
        console.log("Product Data:", productData);

        // Convert each homeBanner string to array
        const formattedProducts = productData.map((product) => ({
          ...product,
          homeBanner:
            typeof product.homeBanner === "string"
              ? product.homeBanner.split(",").map((url) => url.trim())
              : [],
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPromotions([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonActions = {
    call: (callNumber) =>
      (window.location.href = `tel:${callNumber || "1234567890"}`),
    knowMore: (themeLink) => navigate(themeLink || "/more-info"),
    enquiry: (promo) => console.log("Enquiry for:", promo),
  };

  const renderPromotionByTheme = (promo) => {
    const normTheme = normalize(promo.theme);

    switch (normTheme) {
      case "session1":
        return <SessionOne promo={promo} />;
      case "session2":
        return <SessionTwo promo={promo} />;
      case "session3":
        return <SessionThree promo={promo} />;
      case "session4":
        return <SessionFour promo={promo} />;
      case "session5":
        return (
          <SessionFive
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session6":
        return (
          <SessionSix
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session7":
        return (
          <SessionSeven
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session8":
        return (
          <SessionEight
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session9":
        return (
          <SessionNine
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session10":
        return (
          <SessionTen
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      default:
        return <DefaultSession promo={promo} />;
    }
  };

  // Custom order: session4 at the end
  const customOrder = [
    "session1",
    "session2",
    "session3",
    "session5", // Show devices after session5
    "session6",
    "session7",
    "session8",
    "session9",
    "session10",
    "session4", // Placed last
  ];

  // Sort promotions based on customOrder
  const reorderedPromotions = [...promotions].sort((a, b) => {
    const aIndex = customOrder.indexOf(normalize(a.theme));
    const bIndex = customOrder.indexOf(normalize(b.theme));

    // Unmatched themes go to the end
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading data...</span>
        </div>
        <p className="mt-2">Loading content...</p>
      </div>
    );
  }

  // Collect all home banners from all products
  const allBanners = products.flatMap((product) => product.homeBanner || []);
  const firstProduct = products && products.length > 0 ? products[0] : null;

  return (
    <div className="container-fluid my-4 promotion-container">
      {/* Banner Section */}
      <div className="row mb-4">
        <div className="col-12">
          <BannerCarousel banners={allBanners} />
        </div>
      </div>

      {/* Product Icon Section */}
      <div className="row mb-4">
        <div className="col-12">
          <ProductIconSection product={firstProduct} />
        </div>
      </div>

      {/* Render Promotions with Device Section after Session 5 */}
      {reorderedPromotions.map((promo, index) => {
        const normTheme = normalize(promo.theme);
        const isAfterSession5 = 
          customOrder.indexOf(normTheme) === customOrder.indexOf("session5") + 1;
        
        return (
          <React.Fragment key={promo.id || index}>
            <div className="promotion-row mb-3">
              {renderPromotionByTheme(promo)}
            </div>

            {/* Insert Devices Section after Session 5 */}
            {normTheme === "session5" && firstProduct && (
              <div className="row mb-4">
                <div className="col-12">
                  <DevicesSection devices={firstProduct.device || []} />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* If no Session 5 exists, still show devices section */}
      {!reorderedPromotions.some(p => normalize(p.theme) === "session5") && 
       firstProduct && (
        <div className="row mb-4">
          <div className="col-12">
            <DevicesSection devices={firstProduct.device || []} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionAPI;