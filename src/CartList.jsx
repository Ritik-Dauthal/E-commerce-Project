import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartRow from "./CartRow";

let CartList = ({ data, cart, updateCart }) => {
  const [localCart, SetLocalCart] = useState(cart);

  useEffect(() => {
    SetLocalCart(cart);
  }, [cart]);

  const handleRemove = (Productid) => {
    const newcart = { ...cart };

    delete newcart[Productid];

    updateCart(newcart);
  };

  const handleQuantityChange = (Productid, newValue) => {
    const newLocalcart = { ...localCart, [Productid]: newValue };
    SetLocalCart(newLocalcart);
  };
  const handleUpdateClick = () => {
    updateCart(localCart);
  };

  return (
    <div>
      <div className="flex px-1 py-2 space-x-4 bg-gray-200 border-4 border-gray-300">
        <span className="w-20 font-bold">Remove</span>
        <span className="font-bold grow">Product</span>
        <span className="w-20 font-bold">Price</span>
        <span className="w-32 font-bold">Quantity</span>
        <span className="w-20 font-bold">Subtotal</span>
      </div>

      <div>
        {data.map((product) => (
          <CartRow
            key={product.id}
            product={product}
            quantity={localCart[product.id]}
            OnQuantityChange={handleQuantityChange}
            handleRemove={handleRemove}
          />
        ))}
      </div>
      <div className="flex justify-end px-4 py-2 border-gray-300">
        <button
          className="px-2 text-white bg-red-500"
          onClick={handleUpdateClick}
        >
          updateCart
        </button>
      </div>
    </div>
  );
};
export default CartList;
