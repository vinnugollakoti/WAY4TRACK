import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionSeven = ({ promo, handlers, navigate }) => {
  const bgStyle = promo.themeBgimage
    ? {
        backgroundImage: `url(${promo.themeBgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "auto",
        padding: "50px",
      }
    : { backgroundColor: "#f8f9fa", padding: "40px 0" };

  return (
    <div className="row align-items-center session-seven" style={bgStyle} >
      {/* Title */}
      <div className="col-12 mb-4 text-center animation-fade-in">
        <p className="mining-name h4">{promo.name}</p>
      </div>

      {/* Left: Image */}
      <div className="col-md-8 mb-4 mb-md-0 animation-slide-in">
        {promo.image && (
          <div className="img-container">
            <img
              src={promo.image}
              alt={promo.name}
              className="img-fluid rounded shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Right: Content and Buttons */}
      <div className="col-md-4 animation-fade-in" style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <div className="session7-list p-4 mb-4 rounded">
          <ul className="list-unstyled">
            <li className="d-flex align-items-start mb-3">
              <span className="me-2 text-primary feature-arrow">➤</span>
              <span className="session7-desc">{promo.shortDescription}</span>
            </li>
          </ul>
        </div>
        
        <ActionButtons 
          promo={promo} 
          handlers={handlers} 
          navigate={navigate} 
          className="justify-content-start ps-4" 
        />
      </div>
    </div>
  );
};

export default SessionSeven;