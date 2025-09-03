import './school_bus.css';

function SchoolBus() {
  return (
    <div>
      {/* Landing Section */}
      <div className="school-bus-landing">
        <img
          className="school-bus-landing-pic"
          src="/images/schoolbus.jpg"
          alt="School Bus"
        />
      </div>

      {/* Header Content */}
      <div className="school-bus-content">
        <div className="school-bus-content-1">
          <h1>Looking for safer school bus journeys?</h1>
        </div>
        <div className="school-bus-content-2">
          <p>
           Planning school bus routes is complex—managers, drivers, and parents all face challenges.
From deciding routes and bus capacities to tracking delays and safety, the process is overwhelming.
SmartBus simplifies it all with optimized routes, real-time tracking, and apps for everyone.
          </p>
        </div>
      </div>



      {/* Tracker Properties Section */}
      <div className="school-bus-tracker-properties">
        <div className="school-bus-features-grid">
          {/* Feature 1 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/escalator_warning.png" alt="Enhance Student Safety" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Enhance Student Safety
              </div>
              <div className="school-bus-feature-desc">
                Ensure safer school commutes for students with GPS-enabled tracking. Provide parents and schools peace of mind through constant monitoring.
              </div>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/add_road.png" alt="Optimize Bus Routes" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Optimize Bus Routes
              </div>
              <div className="school-bus-feature-desc">
                Reduce travel time and fuel costs with AI-powered route optimization. Smart planning ensures buses take the most efficient paths daily.
              </div>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/airplay.png" alt="Real-Time Monitoring" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Real-Time Monitoring
              </div>
              <div className="school-bus-feature-desc">
                Track bus locations, student check-ins, and trip status in real time. Stay updated instantly to improve coordination and response.
              </div>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/add_location.png" alt="Improve Resource Allocation" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Improve Resource Allocation
              </div>
              <div className="school-bus-feature-desc">
                Assign buses and drivers efficiently to maximize fleet performance. Smart allocation reduces idle time and enhances productivity.
              </div>
            </div>
          </div>
          {/* Feature 5 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/mindfulness.png" alt="Streamline Operations" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Streamline Operations
              </div>
              <div className="school-bus-feature-desc">
                Automate trip planning, attendance, and reporting processes. Ensure smoother coordination and hassle-free transport management.
              </div>
            </div>
          </div>
          {/* Feature 6 */}
          <div className="school-bus-feature-card">
            <div className="school-bus-feature-img">
              <img src="/images/zone_person_alert.png" alt="Safety First" />
            </div>
            <div className="school-bus-feature-content">
              <div className="school-bus-feature-title">
                Safety First
              </div>
              <div className="school-bus-feature-desc">
                Geofencing alerts for restricted zones. - SOS notifications during emergencies. - Live incident reporting. - Real-time updates for parents & schools. - Always-on safety monitoring.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apps Section */}
      <div className="school-bus-apps-section">
        <div className="school-bus-apps-grid">
          {/* Manager App */}
          <div className="school-bus-app-card">
            <div className="school-bus-app-title">
              The Manager App
            </div>
            <div className="school-bus-app-desc">
              The Manager App is a web portal designed for school administrators and transportation managers to oversee the entire system. It provides real-time bus tracking on a map, tools to create and assign trips, and features to plan and optimize routes. Managers can monitor student attendance, receive instant alerts and notifications, and generate reports with detailed analytics. The portal also enables user management, including parents and drivers, ensuring full control and smooth operation of school transport.
            </div>
            <div className="school-bus-app-btn">
              <button>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/manager_app.png" alt="Manager App" />
            </div>
          </div>
          {/* Driver App */}
          <div className="school-bus-app-card">
            <div className="school-bus-app-title">
              The Driver App
            </div>
            <div className="school-bus-app-desc">
              The Driver App helps drivers efficiently manage routes and students. It provides guided navigation to handle complex routes, tools to manage student behavior, and communication features to stay connected with managers and parents—solving the challenge of delayed or missing updates. The app also helps drivers manage schedules effectively, reducing time management pressure and ensuring every trip runs smoothly, safely, and on time.
            </div>
            <div className="school-bus-app-btn">
              <button>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/driver_app.png" alt="Driver App" />
            </div>
          </div>
          {/* Parent App */}
          <div className="school-bus-app-card">
            <div className="school-bus-app-title">
              The Parent App
            </div>
            <div className="school-bus-app-desc">
              The Parent App gives parents peace of mind with immediate alerts for delays or emergencies. Parents can check their child's status in real time, ensuring safety throughout the journey. The app provides accurate and predictable schedules, reducing disruption and confusion. By offering real-time location and attendance updates, it helps ease parental anxiety and ensures parents stay informed, reassured, and stress-free about their child's commute.
            </div>
            <div className="school-bus-app-btn">
              <button>
                Know More <span className="school-bus-app-btn-arrow">→</span>
              </button>
            </div>
            <div className="school-bus-app-img">
              <img src="/images/parent_app.png" alt="Parent App" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolBus;