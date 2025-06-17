import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionTen = ({ promo, handlers, navigate }) => {
    const bgStyle = {
    backgroundColor: "#D2DAFF", // base color
    // padding: "50px",
     padding: "10px 20px",
    ...(promo.themeBgimage && {
      backgroundImage: `url(${promo.themeBgimage})`,
      backgroundSize: "cover",
      // backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
    }),
  };
  return (
    <div style={{padding:"10px 10px"}}>
    <div className="container-fluid">
    <div className="row py-4" style={{ padding: "0px 50px",background:"#D2DAFF", ...bgStyle }}>
      {/* Title */}
      <div className="col-12 mb-3 text-center animation-fade-in">
        <p className="mining-name">{promo.name}</p>
      </div>

      {/* Left: Content and buttons */}
      <div className="col-md-6 mb-4 mb-md-0 animation-slide-in">
        <div className="session7-list p-4 mb-4">
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
          className="justify-content-start" 
        />
      </div>

      {/* Right: Image */}
      <div className="col-md-6 d-flex justify-content-end animation-fade-in">
        {promo?.image && (
          <div className="img-container" style={{display: "flex", justifyContent: "end"}}>
            <img
              src={promo?.image}
              alt={promo.name}
              className="img-fluid rounded"
              style={{width:"400px"}}
            />
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default SessionTen;