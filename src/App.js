import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Bike from "./components/New_Templates/Bike";
import Homepage from "./components/New_Templates/Home";
import Mining from "./components/New_Templates/Mining";
import SchoolBus from "./components/New_Templates/school_bus";
import ProductsOverview from "./components/New_Templates/ProductsOverview";
import About from "./components/about/AboutUs";
import AddressPage from "./components/AddressPage/AddressPage";
import OrderDetailsPage from "./components/OrderDetailsPage/OrderDetailsPage";
import LoginPage from "./components/Login/Login";
import Contact from "./components/contact/ContactPage";
import Hero from "./components/careers/Hero";
import RelatedBlogs from "./components/Blogs/RelatedBlogs";
import BlogDetail from "./components/Blogs/BlogDetail";
import ProductTheme2 from "./components/ProductTheme2/Landingpage2";
import Products from "./components/New_Templates/Products";
import CartPage from "./components/New_Templates/CartPage";
import OldCartPage from "./components/Cart/Cart";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import VerifyOtp from "./components/VerifyOtp/VerifyOtp";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  const [websiteData, setWebsiteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const payload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const response = await axios.post(
          "https://sharontelematics.org/api/website-product/getWebsiteProductDetails",
          payload
        );

        if (response.data.status) {
          setWebsiteData(response.data.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching website data: " + err.message);
        console.error("Error fetching website data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage websiteData={websiteData} />} />
          <Route path="/theme1/:id" element={<Bike websiteData={websiteData} />} />
          <Route path="/theme2/:id" element={<Mining websiteData={websiteData} />} />
          <Route path="/theme3/:id" element={<SchoolBus websiteData={websiteData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductsOverview websiteData={websiteData} />} />
          <Route path="/products" element={<Products websiteData={websiteData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/Careers" element={<Hero />} />
          <Route path="/blogs" element={<RelatedBlogs />} />
          <Route path="/blogdetails" element={<BlogDetail />} />
          <Route path="/product-theme-2" element={<ProductTheme2 />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/address-page" element={<AddressPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
          <Route path="/old-cart" element={<OldCartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
