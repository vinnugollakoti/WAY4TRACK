import React from "react";
import { useNavigate } from "react-router-dom";
import "./AIS140Selector.css"; // We'll create this for styles

const AIS140Selector = ({ products, selectedProduct }) => {
  const navigate = useNavigate();

  const ais140Products = products?.filter((p) =>
    p.name?.replace(/\s+/g, "").toLowerCase().startsWith("ais140")
  );

  const formatedProductName = selectedProduct?.name
    .replace(/\s+/g, "")
    .toLowerCase();

  const showAisCards = formatedProductName.startsWith("ais140");

  const handleCardClick = (item) => {
    navigate(`/product-theme/${item.id}`);
  };

  if (!showAisCards || !ais140Products?.length) return null;

  return (
    <div className="ais-selector-wrapper">
      <h2 className="ais-title">Explore AIS-140 Products</h2>
      <div className="ais-grid">
        {ais140Products.map((item) => (
          <div
            key={item.id}
            className={`ais-card ${
              selectedProduct.id === item.id
                ? "ais-card-active"
                : "ais-card-default"
            }`}
            onClick={() => handleCardClick(item)}
          >
            <h3 className="ais-card-title">{item.name}</h3>
            <p className="ais-card-description">{item.shortDescription}</p>
            {selectedProduct.id === item.id && (
              <div className="ais-badge">Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIS140Selector;

// // components/AIS140Selector.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const AIS140Selector = ({ products, selectedProduct }) => {
//   const navigate = useNavigate();

//   const ais140Products = products?.filter((p) => p.name?.startsWith("AIS-140"));

//   const showAisCards = selectedProduct?.name?.startsWith("AIS-140");

// //   if (!showAisCards || !ais140Products?.length) return null;

//   const handleCardClick = (item) => {
//     navigate(`/product-theme/${item.id}`);
//   };

//   return (
//     <div className="hero-extra-cards mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
//       {showAisCards && products?.length > 0 && (
//         <div className="hero-extra-cards mt-4">
//           {products.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => handleCardClick(item)}
//               className={`extra-card p-3 mb-2 rounded shadow-sm bg-light ${
//                 selectedProduct.id === item.id
//                   ? "border-blue-500"
//                   : "border-gray-300"
//               }`}
//             >
//               <h5 className="font-semibold text-lg mb-1">{item.name}</h5>
//               <p className="text-sm text-gray-600">{item.shortDescription}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AIS140Selector;
