import React, { useState } from "react";

const SessionTwo = ({ promo }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const headerText = promo.header || "";
  const [firstWord, ...restWords] = headerText.split(" ");

  if (!promo.list || promo.list.length === 0) {
    return (
      <div className="alert alert-warning">
        No list items found for Session Two
      </div>
    );
  }

  return (
    <div className="row">
      {[...Array(Math.ceil(promo.list.length / 4))].map((_, groupIndex) => {
        const groupStart = groupIndex * 4;
        const group = promo.list.slice(groupStart, groupStart + 4);

        return (
          <div className="col-12 mb-4" key={groupIndex}>
            <div className="row hover-card align-items-start rounded" style={{padding:"30px 40px"}}>
              {/* Left: 2x2 Image Grid */}
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="row">
                  {group.map((item, index) => {
                    const absoluteIndex = groupStart + index;
                    return (
                      <div className="col-6 mb-3" key={absoluteIndex}>
                        <div className="image-wrapper shadow-sm">
                          <img
                            src={item?.photo}
                            alt={`Feature-${absoluteIndex}`}
                            className="img-fluid rounded zoom-img"
                            onMouseEnter={() => setHoveredIndex(absoluteIndex)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Content Section */}
              <div className="col-md-6">
                <div className="mb-4 animation-fade-in">
                  {/* <h2 className="fw-bold" style={{color:"#4e4a4a"}}>{promo.header}</h2> */}
                  <h2 className="fw-bold" style={{ color: "#4e4a4a" }}>
                    <span
                      style={{
                        background:
                          "linear-gradient(to right, rgb(12, 116, 59), rgb(0, 255, 149))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                      }}
                    >
                      {firstWord}
                    </span>{" "}
                    {restWords.join(" ")}
                  </h2>
                  <p className="text-muted" style={{ fontSize: "17px" }}>
                    {promo.shortDescription}
                  </p>
                </div>

                <div className="row">
                  {group.map((item, index) => {
                    const absoluteIndex = groupStart + index;
                    const isHovered = hoveredIndex === absoluteIndex;
                    return (
                      <div className="col-6 mb-3" key={absoluteIndex}>
                        <div
                          className={`feature-item d-flex align-items-start p-2 rounded ${
                            isHovered ? "bg-light-session2" : ""
                          }`}
                        >
                          <span className="feature-check me-2">✔</span>
                          <p className="fw-bold mb-0 feature-description">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SessionTwo;
