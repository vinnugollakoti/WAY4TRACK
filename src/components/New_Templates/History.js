import { useState, useEffect, useRef } from "react";
import "./History.css";

export default function History() {
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  const timelineData = [
    {
      year: "2009",
      title: "Founded with a Vision",
      description:
        "Started our journey to make GPS tracking smarter and accessible for everyone.",
      side: "left",
    },
    {
      year: "2012",
      title: "First Major Platform Release",
      description:
        "Launched our flagship GPS platform, setting new standards in vehicle tracking.",
      side: "right",
    },
    {
      year: "2015",
      title: "International Expansion",
      description:
        "Expanded our services beyond borders, connecting fleets worldwide.",
      side: "left",
    },
    {
      year: "2018",
      title: "AI Integration",
      description:
        "Introduced artificial intelligence to enhance tracking accuracy and predictive analytics.",
      side: "right",
    },
    {
      year: "2021",
      title: "IoT Ecosystem",
      description:
        "Connected devices and vehicles into a seamless Internet of Things experience.",
      side: "left",
    },
    {
      year: "2024",
      title: "Next-Gen Platform",
      description:
        "Unveiled the future of GPS tracking with advanced tech and unparalleled reliability.",
      side: "right",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.offsetTop;
      const windowScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      const newHeight = Math.min(
        windowScroll + windowHeight / 2 - timelineTop,
        timelineRef.current.offsetHeight
      );
      setLineHeight(newHeight > 0 ? newHeight : 0);

      // Reveal items
      itemRefs.current.forEach((item) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.8) {
          item.classList.add("show");
          item.classList.remove("hide");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Our History</h2>
        <p>From a Simple Idea to a Trusted GPS Solutions Leader</p>
      </div>

      <div className="timeline-wrapper" ref={timelineRef}>
        {/* Gray background line */}
        <div className="timeline-line-gray"></div>


        <div
          className="timeline-line-green"
          style={{ height: `${lineHeight}px` }}
        ></div>

        {/* Timeline items */}
        <div className="timeline-items">
          {timelineData.map((item, index) => (
            <div
              key={item.year}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`timeline-item hide ${item.side}`}
            >
              {/* Year Badge */}
              <div className="timeline-badge">
                <span>{item.year}</span>
              </div>

              {/* Dotted Line */}
              <div className={`timeline-dotted ${item.side}`}></div>

              {/* Content */}
              <div className={`timeline-box ${item.side}`}>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="history-footer">
        <p>
          And this is just the beginning — at Way4Track, innovation never stops.
        </p>
      </div>
    </div>
  );
}
