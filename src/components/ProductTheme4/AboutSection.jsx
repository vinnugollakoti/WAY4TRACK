import React from "react";
import { useInView } from "react-intersection-observer";
import { Carousel } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { DiHtml5DeviceAccess } from "react-icons/di";

const AboutSection = ({ devices,title }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const carouselImages = [
    {
      src: "https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg",
      alt: "OBD GPS Tracker - Front View",
    },
    {
      src: "https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg",
      alt: "OBD GPS Tracker - Side View",
    },
    {
      src: "https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg",
      alt: "OBD GPS Tracker - Installation",
    },
  ];

  return (
    <section className="rounded my-4 rrr" style={{backgroundColor:"lightGreen"}} ref={ref}>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
          <h6 className="text-primary text-uppercase" data-aos="fade-up">
            About Our Device
          </h6>
          <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Advanced GPS Tracking Technology
          </h2>
          <div
            className="divider mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
        </div>
      </div>

      <div className="row align-items-center" style={{ padding: "50px" }}>
        <div className="col-lg-5 mb-4 mb-lg-0">
          <div
            className={`about-image position-relative ${
              inView ? "animate" : ""
            }`}
            data-aos="fade-right"
          >
            <Carousel
              interval={5000}
              className="rounded shadow"
              fade={false}
              pause={false}
            >
              {devices.map((device, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 img-fluid rounded"
                    src={device.image}
                    alt={device.name}
                    onLoad={() => console.log("Image loaded")} // optional check
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            {/* <div className="floating-badge" style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              background: 'rgba(0, 123, 255, 0.9)',
              color: 'white',
              padding: '5px 15px',
              borderRadius: '20px',
              zIndex: 2,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
              <span>Premium</span>
            </div> */}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="about-content" data-aos="fade-left">
            <p className="lead">
              Way4Track {title} is an enhanced version of Plus and Basic
              series of GPS tracking devices, offering numerous advanced
              features for comprehensive vehicle monitoring.
            </p>
            {/* <p>
              In the vehicle tracking system, it can be used to track cars,
              buses, trucks, and many other vehicles. Simply attach it to the
              OBD port under the dashboard and use it even when unplugged,
              thanks to its built-in battery backup system.
            </p> */}
            <div className="row mt-4">
              {devices.map((device, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div
                    className="feature-item"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <div className="icon-box">
                      <DiHtml5DeviceAccess  />
                      {/* <i className="bi bi-geo-alt"></i> */}
                    </div>
                    <h5>{device.name}</h5>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          overflow: hidden;
        }

        .divider {
          width: 50px;
          height: 3px;
          background-color: #007bff;
          margin-bottom: 30px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background-color: rgba(0, 123, 255, 0.1);
          border-radius: 50%;
          margin-right: 15px;
        }

        .icon-box i {
          font-size: 1.5rem;
          color: #007bff;
        }

        .about-image.animate {
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          padding: 10px;
        }

        .carousel-indicators button {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 5px;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
