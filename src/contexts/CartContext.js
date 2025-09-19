import React, { createContext, useState, useEffect } from "react";
import ApiService, {
  initialAuthState,
} from "../components/Services/ApiServices";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const companyCode = initialAuthState.companyCode;
  const unitCode = initialAuthState.unitCode;

  const clientDbId = localStorage.getItem("client_db_id");

  console.log(cartItems, "cart context cart items");

  const fetchCartItems = async () => {
    if (clientDbId) {
      try {
        const response = await ApiService.post(
          "/cart/getCartsByCompanyAndUnit",
          {
            companyCode,
            unitCode,
          }
        );
        // console.log("response :", response.data)
        if (response.status) {
          setCartItems(response.data);
        } else {
          console.error("Failed to fetch cart items:", response.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    } else {
      const localItems = JSON.parse(
        localStorage.getItem("guestCartItems") || "[]"
      );
      setCartItems(localItems);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [companyCode, unitCode]);

  const addToCart = async (item) => {
    const clientID = localStorage.getItem("client_db_id");
    console.log("clientID :", clientID, "===", item?.clientId)
    console.log("rrr :", clientID !== null && Number(clientID) === Number(item?.clientId))
    console.log("item:", item)

    if (clientID !== null && Number(clientID) === Number(item?.clientId)) {
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
          alert("Item added to carts");
          const guestCartItems = JSON.parse(
            localStorage.getItem("guestCartItems") || "[]"
          );

          guestCartItems.push(item);
          localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
          fetchCartItems();
        } else {
          console.error("Failed to add item to cart:", response.message);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }

    } else {
      const guestCartItems = JSON.parse(
        localStorage.getItem("guestCartItems") || "[]"
      );
      guestCartItems.push(item);
      localStorage.setItem("guestCartItems", JSON.stringify(guestCartItems));
      alert("Item added to cart");
    }
  };

  const removeFromCart = async (id) => {
    const payload = {
      id: id,
    };
    const response = await ApiService.post("/cart/deleteCartDetails", payload);
    if (response.status) {
      console.log("Item deleted Successfully");
      fetchCartItems();
    } else {
      console.log("Failed to delete cart item");
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = Number(item.totalAmount) || 0;
      // const itemQuantity = Number(item.quantity) || 1;
      // return total + itemCost * itemQuantity;
      return itemCost;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, fetchCartItems, removeFromCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
