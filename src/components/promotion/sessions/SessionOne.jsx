import React from "react";
import Typewriter from "typewriter-effect";

const SessionOne = ({ promo }) => {
  return (
    <div className="row align-items-center session-one">
      <div className="col-md-5 mb-4 mb-md-0 animation-fade-in" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",padding:"0px 50px"}}>
        <h4 className="way4track-text">WAY4TRACK</h4>
        <h1 className="typewriter-container">
          <Typewriter
            options={{
              strings: [
                "Track Anything...",
                "Anytime...",
                "Anywhere...",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 40,
            }}
          />
        </h1>
        <p className="short-desc">{promo.shortDescription}</p>
      </div>
      <div className="col-md-7 animation-slide-in">
        {promo.image && (
          <div className="img-container" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <img
              src={promo.image}
              alt="WAY4TRACK Solution"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionOne;