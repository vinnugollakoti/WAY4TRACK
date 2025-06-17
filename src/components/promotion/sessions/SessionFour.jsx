import React from "react";

const SessionFour = ({ promo }) => {
  if (!promo.list || promo.list.length === 0) {
    return (
      <div className="alert alert-warning">
        No client logos found for Session Four
      </div>
    );
  }

  return (

    <div style={{padding:"10px 20px"}}>
    <section className="client-section" >
      <div className="client-swiper-container">
        <h2 className="client-heading text-center mb-2">
          {promo.heading || "Our Esteemed Clients"}
        </h2>
        <p className="client-subtext text-center mb-4">
          {promo.subtext ||
            "Trusted by businesses across Andhra Pradesh and beyond"}
        </p>

        <div className="scroll-wrapper">
          <div className="scroll-track">
            {/* Duplicate the list to create a seamless loop */}
            {[...promo.list, ...promo.list].map((item, index) => (
              <div className="scroll-card" key={index}>
                <img
                  src={item.photo}
                  alt={`Client-${index % promo.list.length + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default SessionFour;