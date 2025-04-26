import React from "react";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ currentStep }) => {
  const steps = ["Cart", "Address", "Order Details"];

  return (
    <div className="checkout-steps">
      {steps.map((step, index) => (
        <div className="step-container" key={index}>
          <div
            className={`step-circle ${
              currentStep > index
                ? "completed"
                : currentStep === index
                ? "active"
                : ""
            }`}
          >
            {index + 1}
          </div>
          <div
            className={`step-label ${
              currentStep > index
                ? "completed"
                : currentStep === index
                ? "active"
                : ""
            }`}
          >
            {step}
          </div>
          {index !== steps.length - 1 && (
            <div
              className={`step-line ${currentStep > index ? "completed" : ""}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
