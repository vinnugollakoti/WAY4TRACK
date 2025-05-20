import React from "react";
import ActionButtons from "../common/ActionButtons";

const SessionFive = ({ promo, handlers, navigate }) => {

      const bgStyle = {
    backgroundColor: "rgb(62 100 55)", // base color
    padding: "50px",
    ...(promo.themeBgimage && {
      backgroundImage: `url(${promo.themeBgimage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
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



  return (
    <div className="session-five" style={bgStyle}>
      <div className="container-fluid py-5" >
        <div className="row m-0" style={{padding:"0px 30px"}}>
          {/* Title and header */}
          <div className="col-12 text-center mb-4 animation-fade-in">
            <p className="mining-name">{promo.name}</p>
            <p className="fw-bold">{promo.shortDescription}</p>
          </div>

          {/* Left column: Feature cards */}
          <div className="col-md-4 d-flex flex-column align-items-start mb-4 mb-md-0">
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

             <ActionButtons 
              promo={promo} 
              handlers={handlers} 
              navigate={navigate} 
            />
          </div>

          {/* Right column: Image and buttons */}
          <div className="col-md-8 d-flex flex-column align-items-center">
            {promo?.image && (
              <div className="img-container mb-4 animation-fade-in">
                <img
                  src={promo?.image}
                  alt={promo.name}
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionFive;