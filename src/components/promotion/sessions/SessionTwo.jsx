import React, { useState } from "react";

const SessionTwo = ({ promo }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
            <div className="row hover-card align-items-start rounded p-3 shadow-sm">
              {/* Left: 2x2 Image Grid */}
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="row">
                  {group.map((item, index) => {
                    const absoluteIndex = groupStart + index;
                    return (
                      <div className="col-6 mb-3" key={absoluteIndex}>
                        <div className="image-wrapper shadow-sm">
                          <img
                            src={item.photo}
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
                  <h4 className="fw-bold text-primary">{promo.header}</h4>
                  <p className="text-muted">{promo.shortDescription}</p>
                </div>

                <div className="row">
                  {group.map((item, index) => {
                    const absoluteIndex = groupStart + index;
                    const isHovered = hoveredIndex === absoluteIndex;
                    return (
                      <div className="col-6 mb-3" key={absoluteIndex}>
                        <div
                          className={`feature-item d-flex align-items-start p-2 rounded ${
                            isHovered ? "bg-light-session2 text-primary" : ""
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