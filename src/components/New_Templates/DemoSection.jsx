import "./DemoSection.css";

function DemoSection() {
  return (
    <div>
      <div className="demo">
        <div className="demo-section">
          <div className="demo-content">
            <div>
              <h2>
                Experience Smarter <br /> Tracking in Action
              </h2>
              <p>
                Still unsure if GPS tracking fits your business or personal
                needs? <br />
                Join a 15-min live demo call and discover how Way4Track <br />{" "}
                can save you time, money, and stress.
              </p>
            </div>
            <div className="demo-button">
              <button className="demo-btn">
                Book A Demo
                <span className="icon">↗</span>
              </button>
            </div>
          </div>
          <div className="demo-image">
            <img src="/images/Rectangle 59.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoSection;
