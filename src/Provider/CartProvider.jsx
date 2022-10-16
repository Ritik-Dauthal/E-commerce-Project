import React, { useState } from "react";
import { useEffect } from "react";
import { getCart, getProductsByIds, saveCart } from "../api";
import { CartContext } from "../Context";
import { WithUser } from "../WithProvider";

const CartProvider = ({ LoggedIn, children }) => {
  const [cart, setCart] = useState([]);

  useEffect(
    function () {
      if (LoggedIn) {
        getCart().then(function (savedCart) {
          setCart(savedCart);
        });
      } else {
        const savedDataString = localStorage.getItem("my-Cart") || "{}";
        const savedData = JSON.parse(savedDataString);
        quanityMapToCart(savedData);
      }
    },
    [LoggedIn]
  );

  function quanityMapToCart(quantityMap) {
    getProductsByIds(Object.keys(quantityMap)).then(function (products) {
      const savedCart = products.map((pro) => ({
        product: pro,
        quantity: quantityMap[pro.id],
      }));

      setCart(savedCart);
    });
  }

  function handleAddToCart(productId, count) {
    const quantityMap = cart.reduce(
      (p, current) => ({ ...p, [current.product.id]: current.quantity }),
      {}
    );
    const oldCount = quantityMap[productId] || 0;

    const newCart = { ...quantityMap, [productId]: oldCount + count };

    updateCart(newCart);
  }
  function updateCart(quantityMap) {
    if (LoggedIn) {
      saveCart(quantityMap);
      quanityMapToCart(quantityMap);
    } else {
      const QuantityMapString = JSON.stringify(quantityMap);
      localStorage.setItem("my-Cart", QuantityMapString);
      quanityMapToCart(quantityMap);
    }
  }

  const totalCount = cart.reduce(function (previous, current) {
    return previous + current.quantity;
  }, 0);
  return (
    <CartContext.Provider
      value={{ cart, totalCount, updateCart, handleAddToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default WithUser(CartProvider);
