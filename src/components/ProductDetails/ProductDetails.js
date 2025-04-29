import React, { useEffect, useState } from "react";
import ApiService from "../Services/ApiServices";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css"; // Include your CSS here

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Using useNavigate here
  const [product, setProduct] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("");

  const fetchProductDetails = async () => {
    try {
      const response = await ApiService.post("/products/getProductDetails", {
        id,
      });
      console.log(response.data, "Data");
      setProductDetails(response.data || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setProductDetails([]);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const dummyProducts = [
    {
      id: 1,
      productName: "Fuel Monitoring System",
      productDescription:
        "For Car, Bike, Scooter, Truck, Bus with 15+ Premium Features",
      cost: 2599,
      originalPrice: 4699,
      image_url:
        "https://res.cloudinary.com/dabzdwxet/image/upload/v1736447276/innovation_dljzjt.jpg",
      variants: {
        accessories: ["Without Relay", "With Relay"],
        network: ["Airtel"],
        subscription: ["1 year", "2 years", "3 years", "5 years"],
      },
    },
  ];

  const images = [
    {
      id: 0,
      original: "/images/image1.jpg",
      thumbnail: "/images/image1.jpg",
    },
    {
      id: 1,
      original: "/images/image2.jpg",
      thumbnail: "/images/image2.jpg",
    },
    {
      id: 2,
      original: "/images/image3.jpg",
      thumbnail: "/images/image3.jpg",
    },
    {
      id: 3,
      original: "/images/image4.jpg",
      thumbnail: "/images/image4.jpg",
    },
  ];

  const [currentImage, setCurrentImage] = useState(images[0].original);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleThumbnailClick = (newImage) => {
    setCurrentImage(newImage);
  };

  useEffect(() => {
    const foundProduct = dummyProducts.find((prod) => prod.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <div>Product not found!</div>;

  const handleAddToCart = () => {
    console.log("Product added to cart:", product);
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedAccessory || !selectedNetwork || !selectedSubscription) {
      alert("Please select accessory, network, and subscription!");
      return;
    }

    const orderItem = {
      ...product,
      selectedAccessory,
      selectedNetwork,
      selectedSubscription,
    };

    console.log("Buying product now:", orderItem);
    navigate("/checkout", { state: { product: orderItem } });
  };

  return (
    <div className="product-details-container">
      <div className="col-md-8">
        <div className="gallery-container">
          <div className="product-main-image">
            <img
              src={currentImage}
              alt="Main display"
              className="product-img-fluid zoom-in"
            />
          </div>

          <div className="thumbnails d-flex flex-wrap gap-2 mt-3">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.thumbnail}
                alt={`Thumbnail ${index + 1}`}
                onMouseEnter={() => {
                  handleThumbnailClick(image.original);
                  setHoveredIndex(image.id);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`thumbnail rounded ${
                  currentImage === image.original ? "active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="right-panel">
        <h1 className="product-title">{product.productName}</h1>
        <p className="product-subtitle">{product.productDescription}</p>
        <p className="price">
          <span className="discounted-price">₹{product.cost}</span>
          <span className="original-price">₹{product.originalPrice}</span>
        </p>

        <div className="variants">
          <h4>Accessories:</h4>
          {product.variants.accessories.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedAccessory(opt)}
              className={
                selectedAccessory === opt ? "btn-selected" : "variants-button"
              }
            >
              {opt}
            </button>
          ))}

          <h4>Network:</h4>
          {product.variants.network.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedNetwork(opt)}
              className={
                selectedNetwork === opt ? "btn-selected" : "variants-button"
              }
            >
              {opt}
            </button>
          ))}

          <h4>Subscription:</h4>
          {product.variants.subscription.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedSubscription(opt)}
              className={
                selectedSubscription === opt
                  ? "btn-selected"
                  : "variants-button"
              }
            >
              {`With ${opt} subscription`}
            </button>
          ))}
        </div>

        <div className="actions">
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now" onClick={handleBuyNow}>
            Buy it now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

// import React, { useEffect, useState } from "react";
// import ApiService from "../Services/ApiServices";
// import { useParams } from "react-router-dom";
// import "./ProductDetails.css"; // Include your CSS here

// const ProductDetailsPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [productDetails, setProductDetails] = useState([]);

//   const fetchProductDetails = async () => {
//     try {
//       const response = await ApiService.post(
//         "/products/getProductDetails",
//         { id }
//         // {
//         //   companyCode: initialAuthState.companyCode,
//         //   unitCode: initialAuthState.unitCode,
//         // }
//       );
//       console.log(response.data, "Data");

//       setProductDetails(response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//       setProductDetails([]);
//     }
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, []);

//   const dummyProducts = [
//     {
//       id: 1,
//       productName: "Fuel Monitoring System",
//       productDescription:
//         "For Car, Bike, Scooter, Truck, Bus with 15+ Premium Features",
//       cost: 2599,
//       originalPrice: 4699,
//       image_url:
//         "https://res.cloudinary.com/dabzdwxet/image/upload/v1736447276/innovation_dljzjt.jpg",
//       variants: {
//         accessories: ["Without Relay", "With Relay"],
//         network: ["Airtel"],
//         subscription: ["1 year", "2 years", "3 years", "5 years"],
//       },
//     },
//     // Add other products if needed
//   ];
//   const images = [
//     {
//       id: 0,
//       original: "/images/image1.jpg",
//       thumbnail: "/images/image1.jpg",
//     },
//     {
//       id: 1,
//       original: "/images/image2.jpg",
//       thumbnail: "/images/image2.jpg",
//     },
//     {
//       id: 2,
//       original: "/images/image3.jpg",
//       thumbnail: "/images/image3.jpg",
//     },
//     {
//       id: 3,
//       original: "/images/image4.jpg",
//       thumbnail: "/images/image4.jpg",
//     },
//   ];

//   const [currentImage, setCurrentImage] = useState(images[0].original);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   // Handler to update the main image when a thumbnail is clicked
//   const handleThumbnailClick = (newImage) => {
//     setCurrentImage(newImage);
//   };

//   useEffect(() => {
//     const foundProduct = dummyProducts.find((prod) => prod.id === parseInt(id));
//     setProduct(foundProduct);
//   }, [id]);

//   if (!product) return <div>Product not found!</div>;

//   return (
//     <div className="product-details-container">
//       <div className="col-md-8">
//         <div className="gallery-container">
//           {/* Main Image */}
//           <div className="product-main-image">
//             <img
//               src={currentImage}
//               alt="Main display"
//               className="product-img-fluid zoom-in"
//             />
//           </div>

//           {/* Thumbnails */}
//           <div className="thumbnails d-flex flex-wrap gap-2 mt-3">
//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image.thumbnail}
//                 alt={`Thumbnail ${index + 1}`}
//                 onMouseEnter={() => {
//                   handleThumbnailClick(image.original);
//                   setHoveredIndex(image.id);
//                 }}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className={`thumbnail rounded ${
//                   currentImage === image.original ? "active" : ""
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="right-panel">
//         <h1 className="product-title">{product.productName}</h1>
//         <p className="product-subtitle">{product.productDescription}</p>
//         <p className="price">
//           <span className="discounted-price">₹{product.cost}</span>
//           <span className="original-price">₹{product.originalPrice}</span>
//         </p>

//         <div className="variants">
//           <h4>Accessories:</h4>
//           {product.variants.accessories.map((opt) => (
//             <button key={opt}>{opt}</button>
//           ))}

//           <h4>Network:</h4>
//           {product.variants.network.map((opt) => (
//             <button key={opt}>{opt}</button>
//           ))}

//           <h4>Subscription:</h4>
//           {product.variants.subscription.map((opt) => (
//             <button key={opt}>{`With ${opt} subscription`}</button>
//           ))}
//         </div>

//         <div className="actions">
//           <button className="add-to-cart">Add to Cart</button>
//           <button className="buy-now">Buy it now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;
