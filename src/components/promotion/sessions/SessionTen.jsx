import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionTen = ({ promo, handlers, navigate }) => {
  return (
    <div className="row py-4">
      {/* Title */}
      <div className="col-12 mb-3 text-center animation-fade-in">
        <p className="mining-name">{promo.name}</p>
      </div>

      {/* Left: Content and buttons */}
      <div className="col-md-4 mb-4 mb-md-0 animation-slide-in">
        <div className="session7-list p-4 mb-4 rounded shadow-sm">
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

      {/* Right: Image */}
      <div className="col-md-8 d-flex justify-content-center animation-fade-in">
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
    </div>
  );
};

export default SessionTen;