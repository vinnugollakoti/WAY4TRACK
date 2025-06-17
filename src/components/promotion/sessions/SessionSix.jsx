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

  const visibleItems = promo.list.slice(0, 3);   // limit to 3 cards

  return (
    <div style={{ padding: "10px 20px", borderRadius: "20px" }}>
      <div
        className="container-fluid px-4"
        style={{
          backgroundColor: "#64CAA4",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <div className="text-center text-dark mb-2">
          <p className="mining-name mb-1">{promo.name}</p>
          <p className="fw-bold small mb-0">{promo.header}</p>
        </div>

        {/* Content row */}
        <div className="d-flex flex-column flex-md-row" style={{ overflow: "hidden" }}>
          {/* -------- Left: Image -------- */}
          {promo.image && (
            <div
              className="mb-3 mb-md-2 me-md-3 d-flex align-items-center justify-content-center"
              style={{ width: "100%", maxWidth: "400px" }}   // mobile full‑width, desktop max 400 px
            >
              <img
                src={promo.image}
                alt={promo.name}
                className="img-fluid rounded-4"
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
          )}

          {/* -------- Right: Cards -------- */}
          <div className="flex-grow-1 ps-md-3 d-flex flex-column justify-content-center">
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className="mb-2 border-0 shadow-sm rounded-4"
                style={{ padding: "10px", minHeight: "75px" }}
              >
                <div className="d-flex align-items-start">
                  <i className="bi bi-arrow-right-circle text-success me-2 mt-1"></i>
                  <div>
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div className="mt-2">
              <ActionButtons promo={promo} handlers={handlers} navigate={navigate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSix;
