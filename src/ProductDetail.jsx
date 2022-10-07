import React, { useState, useEffect, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { getProductData } from "./api";
import Loading from "./Loading";
import NoProductFound from "./NoProductFound";

function ProductDetail({ onAddToCart }) {
  const params = useParams();
  const id = +params.xyz;
  const [Product, Setproduct] = useState();
  const [loading, Setloading] = useState(true);
  const [count, setCount] = useState(1);

  console.log("ProductDetail is running");
  useEffect(
    function () {
      const d = getProductData(id);
      d.then(function (data) {
        Setproduct(data);
        Setloading(false);
      }).catch(function () {
        Setloading(false);
      });
    },
    [id]
  );

  function handleCountChange(event) {
    setCount(+event.target.value);
  }
  function handleButtonClick() {
    onAddToCart(id, count);
  }

  if (loading) {
    return <Loading />;
  }
  if (!Product) {
    return <NoProductFound />;
  }
  function handleitemchange() {
    return setCount(1);
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          {id > 1 && (
            <Link to={"/products/" + (id - 1)}>
              <HiChevronLeft onClick={handleitemchange} className="text-6xl" />
              previous
            </Link>
          )}
        </div>
        <div>
          <Link to={"/products/" + (id + 1)}>
            <HiChevronRight onClick={handleitemchange} className="text-6xl" />
            next
          </Link>
        </div>
      </div>
      <div className="h-screen">
        <div className="h-1/2 aspect-square">
          <img className="object-cover w-full h-full" src={Product.thumbnail} />
        </div>
        <div className="h-1/2">
          <div className="text-2xl text-gray-500">
            Category - {Product.category}
          </div>
          <div className="mt-2 text-2xl font-bold text-green-700">
            Title - {Product.title}
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-600">
            Stock - {Product.stock}
          </div>
          <div className="mt-2 text-2xl font-bold text-blue-600">
            Description - {Product.description}
          </div>
          <div className="mt-2 text-2xl font-bold text-red-700">
            Discount - {Product.discountPercentage}
          </div>
          <div className="mt-2 text-2xl font-bold text-gray-800">
            ${Product.price}
          </div>
          <div className="mt-2 text-2xl text-green-900">
            Rating - {Product.rating}
          </div>
          <div className="flex flex-col mt-4 lg:flex-row">
            <div>
              <Link
                className="px-2 text-white bg-black border rounded-md border-md"
                to="/"
              >
                Back to list
              </Link>
            </div>
            <div className="mt-2 lg:mt-0">
              <button
                onClick={handleButtonClick}
                className="px-2 text-white rounded-md bg-primary-dark"
              >
                Add to cart
              </button>
              <input
                onChange={handleCountChange}
                className="w-12 font-bold text-white border border-gray-300 bg-cyan-500 "
                type="number"
                value={count}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(ProductDetail);
