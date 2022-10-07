import React from "react";
import CartList from "./CartList";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { getProductData } from "./api";
import { useState, useEffect } from "react";
import Loading from "./Loading";

let CartPage = ({ cart, updateCart }) => {
  const [savedCart, savedCartData] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const sastiPromise = Object.keys(cart).map(function (productId) {
      return getProductData(productId);
    });
    const badiPromise = Promise.all(sastiPromise);
    badiPromise.then(function (responses) {
      savedCartData(responses);
      setLoad(false);
    });
  }, [cart]);

  if (load) {
    return <Loading />;
  }

  return (
    <div>
      <Link className="text-4xl" to="/">
        <TiArrowBack />
      </Link>

      <div className="w-full h-screen p-10 bg-gray-200">
        <div className="w-full h-full p-6 overflow-y-scroll bg-white">
          <CartList data={savedCart} cart={cart} updateCart={updateCart} />
        </div>
      </div>
    </div>
  );
};
export default CartPage;
