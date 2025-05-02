import React, { useState, useEffect } from "react";
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
import Navbar from "./components/Navbar/Navbar";
import CartSidebar from "./components/CartSidebar/CartSidebar";

import ApiService, {
  initialAuthState,
} from "./components/Services/ApiServices";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

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

  return (
    <CartProvider>
      <Router>
        <Navbar onCartClick={() => setCartOpen(true)} />
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/address-page" element={<AddressPage />} />
          <Route path="/order-details" element={<OrderDetailsPage />} />
          <Route path="/register-client" element={<RegisterClient />} />
          {products.map((product) => {
            const ThemeComponent = getThemeComponent(product.layoutType);
            return (
              <Route
                key={product.id}
                path={`/product-theme/${product.id}`}
                element={<ThemeComponent data={product} />}
              />
            );
          })}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
