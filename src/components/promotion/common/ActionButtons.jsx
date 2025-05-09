import React from "react";

const ActionButtons = ({ promo, handlers, navigate, className = "" }) => {
  return (
    <div className={`d-flex gap-3 flex-wrap ${className || "justify-content-center"}`}>
      <a
        href={`tel:${promo.callNumber || "1234567890"}`}
        className="btn btn-primary btn-animated"
        onClick={() => handlers?.call?.(promo.callNumber)}
      >
        <i className="bi bi-telephone-fill me-1"></i> Call
      </a>
      <button
        className="btn btn-info text-white btn-animated"
        onClick={() => navigate(promo.themeLink || "/more-info")}
      >
        <i className="bi bi-info-circle-fill me-1"></i> Know More
      </button>
      <button
        className="btn btn-success btn-animated"
        onClick={() => handlers?.enquiry?.(promo)}
      >
        <i className="bi bi-chat-dots-fill me-1"></i> Enquiry
      </button>
    </div>
  );
};

export default ActionButtons;