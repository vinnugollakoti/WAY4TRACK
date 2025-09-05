import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left: Logo + Menu in one section */}
      <div className="nav-left">
        <span className="logo">Way4Track</span>
        <ul className="menu">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Blog</li>
          <li>Career</li>
          <li className="dropdown">
            Products <span className="arrow">▼</span>
            <ul className="dropdown-menu">
              <li>GPS Cameras</li>
              <li>Mining Trackers</li>
              <li>General GPS Trackers</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Right: Actions */}
      <div className="actions">
        <div className="cart">🛒</div>
        <button className="login-btn">Login</button>
        <button className="get-started-btn">Get Started</button>
      </div>
    </nav>
  );
}
