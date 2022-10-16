import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartRow from "./CartRow";
import { WithCart } from "./WithProvider";

let CartList = ({ cart, updateCart }) => {
  const [quantityMap, SetquantityMap] = useState();

  const cartToQuantityMap = () =>
    cart.reduce(
      (previous, current) => ({
        ...previous,
        [current.product.id]: current.quantity,
      }),
      {}
    );

  useEffect(() => {
    SetquantityMap(cartToQuantityMap);
  }, [cart]);

  const handleUpdateClick = () => {
    updateCart(quantityMap);
  };

  const handleQuantityChange = (Productid, newValue) => {
    const newQuantity = { ...quantityMap, [Productid]: newValue };
    SetquantityMap(newQuantity);
  };

  const handleRemove = (Productid) => {
    const newQuantity = cartToQuantityMap();
    delete newQuantity[Productid];
    updateCart(newQuantity);
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
        {cart.map((CartItem) => (
          <CartRow
            key={CartItem.product.id}
            product={CartItem.product}
            quantity={quantityMap[CartItem.product.id] || CartItem.quantity}
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
export default WithCart(CartList);
