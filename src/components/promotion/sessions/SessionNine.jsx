import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionNine = ({ promo, handlers, navigate }) => {
  const bgStyle = promo.themeBgimage
    ? {
        backgroundImage: `url(${promo.themeBgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "50px",
        backgroundColor: "#FFE5D2",
        borderRadius: "20px",
      }
    : { backgroundColor: "#f0f8ff", padding: "40px 0" };

  return (
    <div className="gap-all" style={{ padding: "20px 50px" }}>

    <div className="container-fluid">
    <div className="row session-nine" style={bgStyle}>
      {/* Title */}
      <div className="col-12 mb-3 text-center animation-fade-in">
        <p className="mining-name">{promo.name}</p>
      </div>

      {/* Left: Image */}
      <div className="col-md-6 mb-4 mb-md-0 animation-slide-in">
        {promo?.image && (
          <div className="img-container">
            <img
              src={promo?.image}
              alt={promo.name}
              className="img-fluid rounded"
              style={{ width: "400px" }}
            />
          </div>
        )}
      </div>

      {/* Right: Content and buttons */}
      <div className="col-md-6 animation-fade-in">
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
    </div>
    </div>
  );
};

export default SessionNine;
