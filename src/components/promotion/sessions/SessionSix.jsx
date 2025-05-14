import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionSix = ({ promo, handlers, navigate }) => {
  if (!promo.list || promo.list.length === 0) {
    return (
      <div className="alert alert-warning">
        No feature items found for Session Six
      </div>
    );
  }

  return (
    <div className="container-fluid px-0 py-4" style={{ backgroundColor: "aliceblue" }}>
      <div className="row m-0 py-3">
        {/* Title and Header */}
        <div className="col-12 text-center mb-4 animation-fade-in">
          <p className="mining-name">{promo.name}</p>
          <p className="fw-bold">{promo.header}</p>
        </div>

        {/* Left column: Main image and buttons (opposite of Session 5) */}
        <div className="col-md-8 d-flex flex-column align-items-center mb-4 mb-md-0">
          {promo.image && (
            <div className="img-container mb-4 animation-fade-in">
              <img
                src={promo.image}
                alt={promo.name}
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          )}

          <ActionButtons 
            promo={promo} 
            handlers={handlers} 
            navigate={navigate} 
          />
        </div>

        {/* Right column: List of features */}
        <div className="col-md-4 d-flex flex-column align-items-start">
          {promo.list.map((item, index) => (
            <div
              key={index}
              className="card feature-card-1 mb-4 shadow-lg border-0 rounded-4 w-100 animation-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-body p-4">
                <div className="d-flex flex-column align-items-start">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-arrow-right-circle text-primary feature-icon"></i>
                    <h5 className="card-title fw-bold text-dark mb-0">
                      {item.name}
                    </h5>
                  </div>
                  <p className="card-text text-muted">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionSix;