import React from "react";
import CartList from "./CartList";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { WithCart } from "./WithProvider";

let CartPage = () => {
  return (
    <div>
      <Link className="text-4xl" to="/">
        <TiArrowBack />
      </Link>

      <div className="w-full h-screen p-10 bg-gray-200">
        <div className="w-full h-full p-6 overflow-y-scroll bg-white">
          <CartList />
        </div>
      </div>
    </div>
  );
};
export default WithCart(CartPage);
