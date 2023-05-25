import { createContext, useState, useEffect, useContext } from "react";
export const CartContext = createContext();
import { SessionContext } from "../contexts/SessionContext";

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { token, isLoggedIn } = useContext(SessionContext);

  const fetchProductsFromCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const parsed = await response.json();

        let productsformat = parsed.map((c) => {
          let prodFormat = { ...c.product, cartId: c._id };
          return prodFormat;
        });
        setCart(productsformat);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProductsFromCart();
    }
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
