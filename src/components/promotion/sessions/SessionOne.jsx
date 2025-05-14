import React from "react";
import Typewriter from "typewriter-effect";

const SessionOne = ({ promo }) => {
  return (
    <div className="row align-items-center session-one">
      <div
        className="col-md-5 mb-4 mb-md-0 animation-fade-in"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0px 50px",
        }}
      >
        <h4 className="way4track-text">WAY4TRACK</h4>
        <h1 className="typewriter-container">
          <Typewriter
            options={{
              strings: ["Track Anything...", "Anytime...", "Anywhere..."],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 40,
            }}
          />
        </h1>
        <p className="short-desc">{promo.shortDescription}</p>

           <button
          className="btn btn-primary mt-3 shadow talk-button"
          style={{
             background: "linear-gradient(45deg, #0c743b, #00ff95)",
            border: "none",
            borderRadius: "10px",
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => {
            // You can trigger a modal, redirect, or open a chat widget here
            alert("Connecting to an expert...");
          }}
        >
          Talk to Expert
        </button>
      </div>
      <div className="col-md-7 animation-slide-in">
        {promo?.image && (
          <div
            className="img-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={promo?.image}
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
