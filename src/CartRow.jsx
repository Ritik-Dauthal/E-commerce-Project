import React from "react";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import Loading from "./Loading";

let CartRow = ({ handleRemove, OnQuantityChange, product, quantity }) => {
  const handleMinusClick = () => {
    handleRemove(product.id);
  };
  const handleChange = (event) => {
    OnQuantityChange(product.id, +event.target.value);
  };
  return (
    <div className="flex flex-row items-center px-2 py-2 space-x-4 border-gray-200">
      <span className="flex items-center w-10 h-10">
        <MdOutlineRemoveCircleOutline
          className="cursor-pointer"
          onClick={handleMinusClick}
        />
      </span>

      <div className="w-10 h-10">
        <img className="object-cover w-full h-full" src={product.thumbnail} />
      </div>
      <h3 className="font-bold text-green-800 grow">{product.title}</h3>
      <span className="font-bold text-green-800 w-28">${product.price}</span>
      <div className="w-28">
        <input
          className="w-8 font-bold text-black border-2 border-gray-400"
          type="number"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <span className="w-20 font-bold text-green-800">
        {" "}
        ${product.price * quantity}
      </span>
    </div>
  );
};
export default CartRow;
