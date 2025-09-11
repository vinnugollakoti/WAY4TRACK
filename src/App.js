import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css"
import Bike from "./components/New_Templates/Bike"
import Homepage from "./components/New_Templates/Home"
import Mining from "./components/New_Templates/Mining"
import SchoolBus from "./components/New_Templates/school_bus"
import ProductsOverview from "./components/New_Templates/ProductsOverview";

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Homepage websiteData={websiteData} />}
        />
        <Route
          path="/theme1/:id"
          element={<Bike websiteData={websiteData} />}
        />
        <Route
          path="/theme2/:id"
          element={<Mining websiteData={websiteData} />}
        />
        {/* Add routes for other themes as needed */}
        <Route
          path="/theme3/:id"
          element={<SchoolBus websiteData={websiteData} />}
        />
        {/* <Route
          path="/theme4/:id"
          element={<SchoolBus websiteData={websiteData} />}
        /> */}
        <Route
          path="/product"
          element={<ProductsOverview />}
        />
      </Routes>
    </Router>
  )
}

export default App