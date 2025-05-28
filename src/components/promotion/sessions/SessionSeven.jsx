import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionSeven = ({ promo, handlers, navigate }) => {
  const bgStyle = promo.themeBgimage
    ? {
        backgroundImage: `url(${promo.themeBgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "20px",
        padding: "40px",
        overflow: "hidden", // important if you want inner content to stay inside the border radius
        backgroundColor:"#55AC34"
      }
    : {
        backgroundColor: "#f8f9fa",
        borderRadius: "20px",
        padding: "40px",
        overflow: "hidden",
      };

  return (
    <div className="" style={{padding: "20px 50px"}}>
      <div className="container-fluid" style={bgStyle}>
        <div className="row align-items-center">
          {/* Title */}
          <div className="col-12 mb-4 text-center animation-fade-in">
            <p className="mining-name h4">{promo.name}</p>
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

          {/* Right: Content and Buttons */}
          <div
            className="col-md-6 animation-fade-in"
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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

export default SessionSeven;
