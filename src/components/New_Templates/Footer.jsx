import './Footer.css'

function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className='footer-content'>
          <div className="footer-top">
            <div className="footer-column">
              <h4>Company</h4>
              <p>
                <a href="#">About</a>
              </p>
              <p>
                <a href="#">Our Products</a>
              </p>
              <p>
                <a href="#">Careers</a>
              </p>
              <p>
                <a href="#">Blogs</a>
              </p>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <p>
                <a href="#">Contact Us</a>
              </p>
              <p>
                <a href="#">Whatsapp</a>
              </p>
            </div>

            <div className="footer-column">
              <h4>Follow Us</h4>
              <p>
                <a href="#">Instagram</a>
              </p>
              <p>
                <a href="#">Facebook</a>
              </p>
              <p>
                <a href="#">Twitter</a>
              </p>
              <p>
                <a href="#">Youtube</a>
              </p>
            </div>
          </div>

          <div className="footer-logo">
            <h1>way4track</h1>
          </div>
        </div>

        <div className="footer-bottom">
          <p className='copyright'>
            ©2025 All Rights Reserved • Terms Of Use • Privacy Policy • Legal
            Policies
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
