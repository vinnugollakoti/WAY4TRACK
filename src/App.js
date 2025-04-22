import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductTheme1 from "./components/ProductTheme1/ProductTheme1";
import ProductTheme2 from "./components/ProductTheme2/ProductTheme2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product-theme-1" element={<ProductTheme1 />} />
        <Route path="/product-theme-2" element={<ProductTheme2 />} />
      </Routes>
    </Router>
  );
}

export default App;
