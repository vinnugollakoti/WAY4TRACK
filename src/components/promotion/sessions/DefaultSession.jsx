import React from "react";

const DefaultSession = ({ promo }) => {
  return (
    <div className="row align-items-center default-session py-4">
      <div className="col-md-4 mb-4 mb-md-0 animation-fade-in">
        {promo.header && <h5 className="fw-bold">{promo.header}</h5>}
        <p className="mb-2 fw-bold">{promo.name}</p>
        <p className="text-muted">{promo.shortDescription}</p>
      </div>
      <div className="col-md-8 animation-slide-in">
        {promo?.image && (
          <div className="img-container">
            <img
              src={promo?.image}
              alt={promo.name || "Promotion"}
              className="img-fluid rounded shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultSession;