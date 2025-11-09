import { useState, useEffect } from "react";
import './school_bus.css';
import { useParams } from "react-router-dom";
import Navbar from './Navbar';

// Import your JSON data (you might need to adjust the path)
import appsData from './schoolbus.json';
import { point } from "leaflet";
import HomepageProducts from "./HomepageProducts";
import DemoSection from "./DemoSection";
import Footer from "./Footer";

function SchoolBus({ websiteData }) {
  const { id } = useParams();

  const [selectedAppIndex, setSelectedAppIndex] = useState(0);
  const [stateData, setData] = useState(null);

  const appContent = stateData?.productApp?.[selectedAppIndex] || null;

  console.log(appContent)
  useEffect(() => {
    const product = websiteData.find((item) => item.id === parseInt(id));
    setData(product);
    console.log(product);
  }, [id, websiteData]);

  return (
    <div>
      <div className='navbar-schoolbus'>
        <Navbar />
      </div>
      <div className='schoolbus-body'>
        {/* Landing Section */}
        <div className="school-bus-landing">
          <img
            className="school-bus-landing-pic"
            src={stateData?.blogImage}
            alt="School Bus"
          />
        </div>

        {/* Header Content */}
        <div className="school-bus-content">
          <div className="school-bus-content-1">
            <h1>Looking for safer {stateData?.name} journeys?</h1>
          </div>
          <div className="school-bus-content-2">
            <p> {stateData?.shortDescription} </p>
          </div>
        </div>

        {/* Tracker Properties Section */}
        <div className="school-bus-tracker-properties">
          <div className="school-bus-features-grid">
            {/* Feature 1 */}
            <div className="school-bus-feature-card">
              <div className="school-bus-feature-img">
                <img src={stateData?.amenities[0]?.image} alt="Enhance Student Safety" />
              </div>
              <div className="school-bus-feature-content">
                <div className="school-bus-feature-title">
                  {stateData?.amenities[0]?.name || ''}
                </div>
                <div className="school-bus-feature-desc">
                  {stateData?.amenities[0]?.desc || ''}
                </div>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="school-bus-feature-card">
              <div className="school-bus-feature-img">
                <img src={stateData?.amenities[1]?.image} alt="Optimize Bus Routes" />
              </div>
              <div className="school-bus-feature-content">
                <div className="school-bus-feature-title">
                  {stateData?.amenities[1]?.name || ''}
                </div>
                <div className="school-bus-feature-desc">
                  {stateData?.amenities[1]?.desc || ''}
                </div>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="school-bus-feature-card">
              <div className="school-bus-feature-img">
                <img src={stateData?.amenities[2]?.image} alt="Real-Time Monitoring" />
              </div>
              <div className="school-bus-feature-content">
                <div className="school-bus-feature-title">
                  {stateData?.amenities[2]?.name || ''}
                </div>
                <div className="school-bus-feature-desc">
                  {stateData?.amenities[2]?.desc || ''}
                </div>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="school-bus-feature-card">
              <div className="school-bus-feature-img">
                <img src={stateData?.amenities[3]?.image} alt="Improve Resource Allocation" />
              </div>
              <div className="school-bus-feature-content">
                <div className="school-bus-feature-title">
                  {stateData?.amenities[3]?.name || ''}
                </div>
                <div className="school-bus-feature-desc">
                  {stateData?.amenities[3]?.desc || ''}
                </div>
              </div>
            </div>
            {/* Feature 5 */}
            <div className="school-bus-feature-card">
              <div className="school-bus-feature-img">
                <img src={stateData?.amenities[4]?.image} alt="Streamline Operations" />
              </div>
              <div className="school-bus-feature-content">
                <div className="school-bus-feature-title">
                  {stateData?.amenities[4]?.name || ''}
                </div>
                <div className="school-bus-feature-desc">
                  {stateData?.amenities[4]?.desc || ''}
                </div>
              </div>
            </div>
            {/* Feature 6 */}
            <div className="school-bus-feature-card">
              <div className="school-bus-feature-img">
                <img src={stateData?.amenities[5]?.image} alt="Safety First" />
              </div>
              <div className="school-bus-feature-content">
                <div className="school-bus-feature-title">
                  {stateData?.amenities[5]?.name || ''}
                </div>
                <div className="school-bus-feature-desc">
                  {stateData?.amenities[5]?.desc || ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="school-bus-apps-section">
          <div className="school-bus-apps-grid">
            {stateData?.productApp?.slice(0, 3).map((app, index) => (
              <div className="school-bus-app-card" key={index}>
                <div className="school-bus-app-title">
                  {app?.name || ""}
                </div>
                <div className="school-bus-app-desc">
                  {app?.shortDescription || ""}
                </div>
                <div className="school-bus-app-btn">
                  <button onClick={() => setSelectedAppIndex(index)}>
                    Know More <span className="school-bus-app-btn-arrow">→</span>
                  </button>
                </div>
                <div className="school-bus-app-img">
                  <img src={stateData?.productApp[index]?.image} alt={app?.name || "App"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic App Detail Section */}
        {appContent && (
          <div className="manager-app-section">
            {/* Title */}
            {appContent?.name && (
              <div className="manager-app-title">{appContent?.name}</div>
            )}

            {/* Top Content Row */}
            <div className="manager-app-top-row">
              {/* Left Side Text */}
              <div className="manager-app-intro">{appContent.shortDescription}</div>

              {/* Features List */}
              {appContent?.points?.length > 0 && (
                <div className="manager-app-features-list">
                  {appContent?.points.slice(0, 6).map((feature, index) => (
                    <div className="manager-app-feature" key={index}>
                      <div className="manager-app-feature-img">
                        <img src={feature?.file} alt={feature.alt} />
                      </div>
                      <div className="manager-app-feature-content">
                        <div className="manager-app-feature-title">{feature.title}</div>
                        <div className="manager-app-feature-desc">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Key Advantages */}
            {/* <div className="manager-app-advantages">
              <div className="manager-app-advantages-title">
                Key advantages of {appContent?.key_advantages?.title}
              </div>
              <div className="manager-app-advantages-desc">
                Desc: {appContent?.key_advantages?.desc}
              </div>
            </div> */}

            {/* 4th Div: Manager App Advantages Grid */}
            <div className="manager-app-advantages-grid-bg">
              <div className="manager-app-advantages-grid">
                {appContent?.points.slice(6, 10).map((advantage, index) => (
                  <div className="manager-app-advantage-card" key={index}>
                    <div className="manager-app-advantage-img">
                      <img src={advantage.file} alt={advantage.alt} />
                    </div>
                    <div className="manager-app-advantage-content">
                      <div className="manager-app-advantage-title">{advantage.title}</div>
                      <div className="manager-app-advantage-desc">{advantage.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5th Div: Manager App Features Grid */}
            <div className="manager-app-features-adv-bg">
              <div className="manager-app-features-adv-grid">
                {appContent?.points.slice(10, 16).map((feature, index) => (
                  <div className="manager-app-features-adv-card" key={index}>
                    <div className="manager-app-features-adv-img">
                      <img src={feature.file} alt={feature.alt} />
                    </div>
                    <div className="manager-app-features-adv-row">
                      <span className="manager-app-features-adv-title">{feature.title}</span>
                      <span className="manager-app-features-adv-number">{feature.number}</span>
                    </div>
                    <div className="manager-app-features-adv-divider"></div>
                    <div className="manager-app-features-adv-desc">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6th Div: Manager App Image Section */}
            <div className="manager-app-image-section">
              <div className="manager-app-image-wrapper">
                <img
                  src={appContent?.points[16]?.file}
                  alt={appContent?.points[16]?.alt}
                />
              </div>
            </div>

            {/* 7th Div: Attendance and Alerts Section */}
            <div className="manager-app-attendance-alerts-section">
              {/* First Div */}
              <div className="manager-app-attendance">
                {/* Attendance Management */}
                <div className="manager-app-attendance-management">
                  <div className="manager-app-attendance-title">
                    {appContent?.points[17]?.title}
                  </div>
                  <div className="manager-app-attendance-desc">
                    {appContent?.points[17]?.desc}
                  </div>
                </div>

                {/* Driver & Attendant Management */}
                <div className="manager-app-driver-management">
                  <div className="manager-app-driver-title">
                    {appContent?.points[18]?.title}
                  </div>
                  <div className="manager-app-driver-desc">
                    {appContent?.points[18]?.desc}
                  </div>
                </div>
              </div>

              {/* Second Div */}
              <div className="manager-app-alerts">
                <div className="manager-app-alerts-content">
                  <div className="manager-app-alerts-title">
                    {appContent?.points[19]?.title}
                  </div>
                  <div className="manager-app-alerts-desc">
                    {appContent?.points[19]?.desc}
                  </div>
                </div>
                <div className="manager-app-alerts-button">
                  <button className="manager-app-alerts-btn">
                    <span className="manager-app-alerts-btn-icon">
                      <img
                        src="/images/check_icon.png"
                        alt="Check Icon"
                      />
                    </span>
                    GET TO KNOW MORE
                  </button>
                </div>
              </div>
            </div>

            {/* 8th Div: Detailed Reports and Emergency Handling */}
            <div className="manager-app-reports-emergency-section">
              {/* Detailed Reports */}
              <div className="manager-app-reports">
                <div className="manager-app-reports-title">
                  {appContent?.points[20]?.title}
                </div>
                <div className="manager-app-reports-desc">
                  {appContent?.points[20]?.desc}
                </div>
              </div>

              {/* Emergency Handling */}
              <div className="manager-app-emergency">
                <div className="manager-app-emergency-title">
                  {appContent?.points[21]?.title}
                </div>
                <div className="manager-app-emergency-desc">
                  {appContent?.points[21]?.desc}
                </div>
              </div>
            </div>

            {/* 9th Div: APIs, Fees, Resource, Safety */}
            <div className="manager-app-apis-fees-section">
              {appContent?.points.slice(22, 26).map((item, index) => (
                <div className="manager-app-apis-fees-card" key={index}>
                  <div className="manager-app-apis-fees-img">
                    <img src={item.file} alt={item.alt} />
                  </div>
                  <div className="manager-app-apis-fees-content">
                    <div className="manager-app-apis-fees-title">{item.title}</div>
                    <div className="manager-app-apis-fees-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 10th Div: Manager App Product Image Section */}
            {appContent?.product_image_section && (
              <div className="manager-app-product-image-section">
                <div className="manager-app-product-image-wrapper">
                  <img
                    src={appContent.product_image_section.img}
                    alt={appContent.product_image_section.alt}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo Section */}
        {/* <div className="school-bus-demo-section"> */}
        {/* <div className="school-bus-demo-grid">
            <div className="school-bus-demo-left">
              <div className="school-bus-demo-title">
                Schedule a Live <br /> Demo with Our Team
              </div>
              <div className="school-bus-demo-desc">
                Still unsure if GPS tracking fits your business or personal <br /> needs? Join a 15-min live demo call and discover how <br /> Way4Track can save you time, money, and stress.
              </div>
              <div className="school-bus-demo-rating">
                <div className="school-bus-demo-rating-img">
                  <img src="/images/demo_avatars.png" alt="Customer Avatars" />
                </div>
                <div className="school-bus-demo-rating-info">
                  <div className="school-bus-demo-rating-score">
                    4.9 / 5 Rated
                  </div>
                  <div className="school-bus-demo-rating-customers">
                    Over 9.2k Customers
                  </div>
                </div>
              </div>
            </div> */}
        {/* Right Side - Form */}
        {/* <div className="school-bus-demo-form">
              <form>
                <label htmlFor="demo-name">Name</label>
                <input
                  type="text"
                  id="demo-name"
                  name="demo-name"
                  placeholder="Jane Smith"
                  autoComplete="off"
                />
                <label htmlFor="demo-email">Email</label>
                <input
                  type="email"
                  id="demo-email"
                  name="demo-email"
                  placeholder="jane@framer.com"
                  autoComplete="off"
                />
                <button type="submit" className="school-bus-demo-submit">
                  Submit <span className="school-bus-app-btn-arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </div> */}
        <div className="mining-view-more-text">
          <h1>
            Want to see more ? <br />
            Check our remaining products...
          </h1>
        </div>
      </div>
      <HomepageProducts />
      <DemoSection />
      <Footer />
    </div>
  );
}

export default SchoolBus;