// DemoSection.js
import "./DemoSection.css";
import { useState } from "react";
import { useWebsiteData } from "./WebsiteDataContext";
import ApiService from "../Services/ApiServices"; // Adjust path as needed
import { initialAuthState } from "../Services/ApiServices"; // Adjust path as needed
import toast, { Toaster } from "react-hot-toast";

function DemoSection() {
  const websiteData = useWebsiteData(); // Get data from context
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    selectedProducts: []
  });

  // Filter valid products
  const validProducts = websiteData.filter(
    (product) =>
      product.name !== "Dummy Product" &&
      product.device &&
      product.device.length > 0 &&
      product.device[0].image
  );

  // Flatten all devices from valid products
  const allDevices = validProducts.flatMap(product => 
    product.device.map(device => ({
      ...device,
      productId: product.id,
      productName: product.name
    }))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductSelect = (deviceId) => {
    setFormData(prev => {
      const isSelected = prev.selectedProducts.includes(deviceId);
      
      if (isSelected) {
        return {
          ...prev,
          selectedProducts: prev.selectedProducts.filter(item => item !== deviceId)
        };
      } else {
        return {
          ...prev,
          selectedProducts: [...prev.selectedProducts, deviceId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare selected products details
    const selectedProductsDetails = formData.selectedProducts.map(deviceId => {
      const device = allDevices.find(d => d.id === deviceId);
      return {
        deviceId: device?.id,
        deviceName: device?.name || device?.webProductName,
        productName: device?.productName,
        price: device?.amount
      };
    });

    // Prepare payload for API
    const payload = {
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhoneNumber: formData.mobile,
      selectedProducts: selectedProductsDetails,
      totalProductsSelected: formData.selectedProducts.length,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      demoDate: new Date().toISOString().split('T')[0] // Current date
    };

    try {
      // Make POST request to demo endpoint
      const response = await ApiService.post(
        "/demoLead/handleDemoLeadDetails",
        payload
      );

      // Log all form data with product details
      console.log("Demo Booking Form Submission:", {
        customer: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile
        },
        selectedProducts: selectedProductsDetails,
        totalProductsSelected: formData.selectedProducts.length
      });

      if (response.status === 200 || response.status) {
        toast.success('Demo booked successfully! Opening calendar...');
        
        // Open Google Calendar
        window.open("https://calendar.app.google/tgGno7Nm5j7JXxZEA", "_blank");
        
        // Close modal and reset form
        setShowDemoModal(false);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          selectedProducts: []
        });
      } else {
        toast.error('Failed to book demo. Please try again.');
      }
    } catch (error) {
      console.error('Error booking demo:', error);
      toast.error('Failed to book demo. Please try again.');
      
      // Still open calendar even if API fails
      window.open("https://calendar.app.google/tgGno7Nm5j7JXxZEA", "_blank");
      setShowDemoModal(false);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        selectedProducts: []
      });
    }
  };

  const isFormValid = formData.name && formData.email && formData.mobile;

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
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
                Join a 15-min live demo call and discover how WAY4TRACK <br />{" "}
                can save you time, money, and stress.
              </p>
            </div>
            <div className="demo-button">
              <button
                className="demo-btn"
                onClick={() => setShowDemoModal(true)}
              >
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

      {/* Demo Booking Modal */}
      {showDemoModal && (
        <div className="demo-modal-overlay" onClick={() => setShowDemoModal(false)}>
          <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="demo-modal-close"
              onClick={() => setShowDemoModal(false)}
            >
              ×
            </button>
            
            <div className="demo-modal-header">
              <h2>Book Your Demo</h2>
              <p>Fill in your details and select products you're interested in</p>
            </div>

            <form onSubmit={handleSubmit} className="demo-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="products-selection">
                <h3>Select Products for Discussion</h3>
                {allDevices.length > 0 ? (
                  <div className="products-grid">
                    {allDevices.map((device, index) => {
                      const isSelected = formData.selectedProducts.includes(device.id);
                      const discountedPrice = Math.round(
                        (device.amount || 100) * (1 - (device.discount || 0) / 100)
                      );

                      return (
                        <div
                          key={device.id || index}
                          className={`product-select-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleProductSelect(device.id)}
                        >
                          <div className="product-select-image">
                            <img
                              src={device.image?.[0]}
                              alt={device.name || device.webProductName}
                              onError={(e) => {
                                e.target.src = "/images/placeholder-product.png";
                              }}
                            />
                            <div className="product-checkbox">
                              <div className={`checkbox ${isSelected ? 'checked' : ''}`}>
                                {isSelected && '✓'}
                              </div>
                            </div>
                          </div>
                          <div className="product-select-info">
                            <h4>{device.name || device.webProductName}</h4>
                            <div className="product-price">
                              <span className="current-price">₹{discountedPrice}</span>
                              {device.discount > 0 && (
                                <span className="old-price">₹{device.amount || 100}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-products-message">
                    <p>No products available for selection.</p>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="demo-submit-btn"
                disabled={!isFormValid}
              >
                Submit & Open Calendar
                <span className="icon">↗</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DemoSection;