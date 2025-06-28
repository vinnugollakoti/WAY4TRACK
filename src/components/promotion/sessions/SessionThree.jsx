import React from "react";

const SessionThree = ({ promo }) => {
  const bgStyle = {
    backgroundColor: "rgb(185 ,233, 215)", // base color
    // padding: "0px 50px",
    ...(promo.themeBgimage && {
      backgroundImage: `url(${promo.themeBgimage})`,
      backgroundSize: "cover",
      // backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      // padding:"50px"
      borderRadius: "20px",
       padding: "10px 20px",
    }),
  };

  if (!promo.list || promo.list.length === 0) {
    return (
      <div className="alert alert-warning">
        No list items found for Session Three
      </div>
    );
  }

  return (
    <>
    <div className="" style={{padding:"10px 10px"}}>
    <div className="" style={bgStyle}>
      <div className="container-fluid">
        <div className="row align-items-start session-three" style={{paddingRight:"0px"}}>
          <p className="mining-name">{promo.name}</p>
          {/* Left column: split list into two side-by-side columns */}
        <div className="col-md-6 mb-md-0 mb-4" style={{ padding: "0px" }}>
  <div className="row">
    {/* First half of items */}
    <div className="col-12 col-sm-6 mb-3">
      {promo.list.slice(0, 5).map((item, index) => (
        <div
          className="feature-card-1 d-flex align-items-center mb-3 animation-slide-in"
          key={index}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <img
            src={item.photo}
            alt={`Feature-${index}`}
            className="feature-icon-1 me-2"
          />
          <p className="fw-bold mb-0 feature-desc-text">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Second half of items */}
    <div className="col-12 col-sm-6">
      {promo.list.slice(5, 10).map((item, index) => (
        <div
          className="feature-card-1 d-flex align-items-center mb-3 animation-slide-in"
          key={index + 5}
          style={{ animationDelay: `${(index + 5) * 0.1}s` }}
        >
          <img
            src={item.photo}
            alt={`Feature-${index + 5}`}
            className="feature-icon-1 me-2"
          />
          <p className="fw-bold mb-0 feature-desc-text">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>


          {/* Right column: main image */}
          <div
            className="col-md-6 animation-fade-in"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="main-image-container">
              <img
                src={promo?.image}
                alt="Main Feature"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default SessionThree;
