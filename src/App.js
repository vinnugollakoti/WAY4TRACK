import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./components/Products/ProductsPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartPage from "./components/Cart/Cart";
import ProductTheme1 from "./components/ProductTheme1/ProductTheme1";
import ProductTheme2 from "./components/ProductTheme2/ProductTheme2";
import ProductTheme3 from "./components/ProductTheme3/ProductTheme3";
import ProductTheme4 from "./components/ProductTheme4/ProductTheme4";
import AddressPage from "./components/AddressPage/AddressPage";
import OrderDetailsPage from "./components/OrderDetailsPage/OrderDetailsPage";
import LoginPage from "./components/Login/Login";
import RegisterClient from "./components/RegisterClient/RegisterClient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/address-page" element={<AddressPage />} />
        <Route path="/order-details" element={<OrderDetailsPage />} />
        <Route path="/product-theme-1" element={<ProductTheme1 />} />
        <Route path="/product-theme-2" element={<ProductTheme2 />} />
        <Route path="/product-theme-3" element={<ProductTheme3 />} />
        <Route path="/product-theme-4" element={<ProductTheme4 />} />
        <Route path="/register-client" element={<RegisterClient />} />
      </Routes>
    </Router>
  );
}

export default App;
