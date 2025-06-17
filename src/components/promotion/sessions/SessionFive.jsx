import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionFive = ({ promo, handlers, navigate }) => {
  const bgStyle = {
    backgroundColor: "rgb(255, 219, 82)",
    // height: "500px",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "20px",
    ...(promo.themeBgimage && {
      backgroundImage: `url(${promo.themeBgimage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }),
  };

  if (!promo.list || promo.list.length === 0) {
    return (
      <div className="alert alert-warning">
        No feature items found for Session Five
      </div>
    );
  }

  const visibleItems = promo.list.slice(0, 3); // limit to 3 cards

  return (
  <div style={{ padding: "10px", borderRadius: "20px" }}>
  <div className="session-five" style={bgStyle}>
    {/* Title */}
    <div className="text-center text-white mb-2">
      <p className="mining-name mb-1">{promo.name}</p>
      <p className="fw-bold small mb-0">{promo.shortDescription}</p>
    </div>

    {/* Content: Left cards + Right image */}
    <div className="d-flex flex-column flex-md-row" style={{ overflow: "hidden" }}>
      {/* Left Cards */}
      <div className="flex-grow-1 pe-md-3 d-flex flex-column justify-content-center">
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

        {/* Action Buttons */}
        <div className="mt-2">
          <ActionButtons promo={promo} handlers={handlers} navigate={navigate} />
        </div>
      </div>

      {/* Right Image */}
   {promo.image && (
  <div className="mt-3 mt-md-0 ms-md-3 d-flex align-items-center justify-content-center" style={{ width: "100%", maxWidth: "400px" }}>
    <img
      src={promo.image}
      alt={promo.name}
      className="img-fluid rounded-4"
      style={{ objectFit: "contain", width: "100%", height: "auto" }}
    />
  </div>
)}

    </div>
  </div>
</div>

  );
};

export default SessionFive;
