import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductsPage from "./components/Products/ProductsPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartPage from "./components/Cart/Cart";
import ProductTheme1 from "./components/ProductTheme1/Landingpage1";
import ProductTheme2 from "./components/ProductTheme2/Landingpage2";
import ProductTheme3 from "./components/ProductTheme3/LandingPage3";
// import ProductTheme4 from "./components/ProductTheme4/ProductTheme4";
import AddressPage from "./components/AddressPage/AddressPage";
import OrderDetailsPage from "./components/OrderDetailsPage/OrderDetailsPage";
import LoginPage from "./components/Login/Login";
import VerifyOtp from "./components/VerifyOtp/VerifyOtp";
import RegisterClient from "./components/RegisterClient/RegisterClient";
import Navbar from "./components/Navbar/Navbar";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Footer from "./components/footer/Footer";
import About from "./components/about/AboutUs"; // Import your About component
import Contact from "./components/contact/ContactPage";
import Hero from "./components/careers/Hero";
// import Homepage from "./components/Home/Homepage";
import PromotionAPI from "./components/promotion/PromotionAPI";
import BlogList from "./components/Blogs/BlogList";
import BlogDetail from "./components/Blogs/BlogDetail";
import RelatedBlogs from "./components/Blogs/RelatedBlogs";
import ProductTheme4 from "./components/ProductTheme4/index";
import SchoolBus from "./components/New_Templates/school_bus";

import "./App.css";

import "aos/dist/aos.css";
import AOS from "aos";

import MyOrders from "./components/MyOrders/MyOrders";
import OrderItemDetails from "./components/OrderItemDetails/OrderItemDetails";

import ApiService, {
  initialAuthState,
} from "./components/Services/ApiServices";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [aisProducts, setAisProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await ApiService.post(
        "/website-product/getWebsiteproductDetails",
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setProducts(response.data || []);
      const filteredProducts = response.data?.filter((product) =>
        product?.name?.replace(/\s+/g, "").toLowerCase().startsWith("ais140")
      );
      setAisProducts(filteredProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const getThemeComponent = (layoutType) => {
    switch (layoutType) {
      case "theme1":
        return ProductTheme1;
      case "theme2":
        return ProductTheme2;
      case "theme3":
        return ProductTheme3;
      case "theme4":
        return ProductTheme4;
      default:
        return () => <div>Invalid Theme</div>;
    }
  };

  // theme 4
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });

    // Import Bootstrap JS
    const bootstrap = document.createElement("script");
    bootstrap.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
    bootstrap.async = true;
    document.body.appendChild(bootstrap);

    return () => {
      document.body.removeChild(bootstrap);
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar onCartClick={() => setCartOpen(true)} />
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-item/:orderId/:deviceId"
            element={
              <ProtectedRoute>
                <OrderItemDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="/address-page" element={<AddressPage />} />
          <Route
            path="/order-details"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/product-theme-2" element={<ProductTheme2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Careers" element={<Hero />} />
          <Route path="/" element={<PromotionAPI theme="default" />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/blogs" element={<RelatedBlogs />} />
          <Route path="/blogdetails" element={<BlogDetail />} />
          <Route path="/category/:category" element={<BlogList />} />
          <Route path="/theme1" element={<ProductTheme1 />} />
          <Route path="/theme2" element={<ProductTheme2 />} />
          <Route path="/theme3" element={<ProductTheme3 />} />
          <Route path="/theme4" element={<ProductTheme4 />} />
\         <Route path="/school-bus" element={<SchoolBus />} />

          {products.map((product) => {
            const ThemeComponent = getThemeComponent(product.layoutType);
            return (
              <Route
                key={product.id}
                path={`/product-theme/${product.id}`}
                element={
                  <ThemeComponent data={product} aisProducts={aisProducts} />
                }
              />
            );
          })}
        </Routes>

        {/* Add Footer here */}
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
