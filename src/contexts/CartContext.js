import React, { createContext, useState, useEffect } from "react";
import ApiService, {
  initialAuthState,
} from "../components/Services/ApiServices";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;

  console.log(cartItems,"cart context cart items")

  const fetchCartItems = async () => {
    try {
      const response = await ApiService.post("/cart/getCartsByCompanyAndUnit", {
        companyCode,
        unitCode,
      });

      if (response.status) {
        setCartItems(response.data);
      } else {
        console.error("Failed to fetch cart items:", response.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [companyCode, unitCode]);

  const addToCart = async (item) => {
    try {
      const cartData = {
        ...item,
        companyCode,
        unitCode,
      };

      const response = await ApiService.post(
        "/cart/handleCreateCart",
        cartData
      );

      if (response.status) {
        alert("Item added to cart");
        fetchCartItems();
      } else {
        console.error("Failed to add item to cart:", response.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = Number(item.cost) || 0;
      const itemQuantity = Number(item.quantity) || 1;
      return total + itemCost * itemQuantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, fetchCartItems, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
