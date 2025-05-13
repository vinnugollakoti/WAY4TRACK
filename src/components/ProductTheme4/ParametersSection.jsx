import React, { useState } from "react";

const ParameterRow = ({ param, value, animDelay }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`parameter-row ${hover ? "active" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-aos="fade-up"
      data-aos-delay={animDelay}
    >
      <div className="parameter-label">{param}</div>
      <div className="parameter-divider"></div>
      <div className="parameter-value">{value}</div>
    </div>
  );
};

const ParametersSection = ({ description }) => {
  const renderParameters = (descriptionString) => {
    const parts = descriptionString
      .split(";")
      .filter(Boolean)
      .map((item) => {
        const [key, ...rest] = item.split(":");
        return {
          param: key.trim(),
          value: rest.join(":").trim().replace(/\*/g, " × "), // Replace * with ×
        };
      });

    return parts.map((item, index) => (
      <ParameterRow
        key={item.param + index}
        param={item.param}
        value={item.value}
        animDelay={100 + index * 50}
      />
    ));
  };

  return (
    <section className="parameters-section py-5">
      <div className="row justify-content-center" style={{ padding: "50px" }}>
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">
            Technical Details
          </h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Product Specifications
          </h2>
          <div
            className="divider mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
          <p
            className="section-subtitle"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Premium quality and reliable performance guaranteed
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="parameters-container">
            {renderParameters(description)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParametersSection;
