import React from "react";
import Slider from "react-slick";
import locations from "../../components/footer/footerData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Footer.css";

const Footer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        {/* Logo Row */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 text-center">
            <img
              src="/images/footerlogo.png"
              className="img-fluid"
              style={{ maxWidth: "300px" }}
              alt="Footer Logo"
            />
          </div>
        </div>

        <div className="row">
          {/* Home */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5>Home</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li>GPS Tracking</li>
              <li>Fleet Management</li>
              <li>Asset Monitoring</li>
              <li>Fuel Monitoring</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <h5>Contact</h5>
            <p>Email: support@way4track.com</p>
            <p>Phone: +91 9110 729 757</p>
            <p>Address: Visakhapatnam, Andhra Pradesh</p>
          </div>

          {/* Locations */}
          <div className="col-12 col-md-3">
            <h5>Locations</h5>
            <Slider {...settings}>
              {locations.map((loc, index) => (
                <div key={index} className="p-2">
                  <div className="bg-secondary text-white p-2 p-md-3 rounded">
                    <h6>{loc.title}</h6>
                    <iframe
                      src={loc.mapEmbed}
                      width="100%"
                      height="120"
                      style={{ border: 0, borderRadius: "8px" }}
                      allowFullScreen
                      loading="lazy"
                      title={loc.title}
                    ></iframe>
                    <small>{loc.address}</small>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top pt-3">
          <p>© 2025 Way4Track. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
